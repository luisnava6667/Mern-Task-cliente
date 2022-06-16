import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertaContext from "../../Context/alertas/alertaContext";
import AuthContext from "../../Context/autenticacion/authContext";

const NuevaCuenta = (props) => {
  //permite navegar

  //extraer los valore del context
  const alertaContetxt = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContetxt;
  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, registrarUsuario } = authContext;
  //en caso que el usuario se haya autenticado o sea un registro registrado duplicado
  useEffect(() => {
    if (autenticado) {
      // this.props.history.push('/proyectos');
      //redireccionar
      props.history.push("/proyectos");
    }
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    // eslint-disable-next-line
  }, [mensaje, autenticado, props.history]);

  //state para iniciar la sesion
  const [usuario, guardarUsuario] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmar: "",
  });
  //extraer de usuarios
  const { nombre, email, password, confirmar } = usuario;
  const onChangeIniciar = (e) => {
    guardarUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };
  //cuando el usuario quiere iniciar sesion
  const onSubmit = (e) => {
    e.preventDefault();
    //validar que no haya campos vacios
    if (
      nombre.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmar.trim() === ""
    ) {
      mostrarAlerta("Todos los campos son obligatorios", "alerta-error");
      return;
    }
    //password minimo de 6 caracteres
    if (password.length < 6) {
      mostrarAlerta(
        "El password debe ser de al menos 6 caracteres",
        "alerta-error"
      );
      return;
    }
    //los 2 pasword sean iguales
    if (password !== confirmar) {
      mostrarAlerta("Los password no son iguales", "alerta-error");
      return;
    }
    //pasarlo al action
    // console.log(usuario);
    registrarUsuario({
      nombre,
      email,
      password,
    });
  };
  return (
    <div className="form-usuario">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}
      <div className="contenedor-form sobra-dark">
        <h1>Obtener una cuenta</h1>
        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Tu Nombre"
              value={nombre}
              onChange={onChangeIniciar}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Tu Email"
              value={email}
              onChange={onChangeIniciar}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Tu Password"
              value={password}
              onChange={onChangeIniciar}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="confirmar">Confirmar Password</label>
            <input
              type="password"
              id="confirmar"
              name="confirmar"
              placeholder="Repite tu Password"
              value={confirmar}
              onChange={onChangeIniciar}
            />
          </div>
          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Registrarme"
            />
          </div>
        </form>
        <Link to={"/"} className="enlace-cuenta">
          Volver a Iniciar Sesión
        </Link>
      </div>
    </div>
  );
};

export default NuevaCuenta;
