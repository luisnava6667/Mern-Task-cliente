import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import AlertaContext from "../../Context/alertas/alertaContext";
import AuthContext from "../../Context/autenticacion/authContext";

const Login = (props) => {
  //extraer los valore del context
  const alertaContetxt = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContetxt;
  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, iniciarSesion } = authContext;
  //en caso que el password o el usuario no existan
  useEffect(() => {
    if (autenticado) {
      props.history.push("/proyectos");
    }
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    // eslint-disable-next-line
  }, [mensaje, autenticado, props.history]);
  //useState para iniciar sesion
  const [usuario, guardarUsuario] = useState({
    email: "",
    password: "",
  });
  //extraer de usuarios
  
  const { email, password } = usuario;
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
    if(email.trim()==='' ||password.trim()===''){
      mostrarAlerta('Todos los campos son obligatorios','alerta-error');
      return;
    }
    //pasarlo al action
    iniciarSesion({email,password});
  };
  return (
    <div className="form-usuario">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}
      <div className="contenedor-form sobra-dark">
        <h1>Iniciar Sesión</h1>
        <form onSubmit={onSubmit}>
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
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Iniciar Sesión"
            />
          </div>
        </form>
        <Link to={"/nueva-cuenta"} className="enlace-cuenta">
          obtener Cuenta
        </Link>
      </div>
    </div>
  );
};

export default Login;
