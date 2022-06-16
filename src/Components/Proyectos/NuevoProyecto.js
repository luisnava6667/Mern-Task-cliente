import React, { Fragment, useState, useContext } from "react";
import proyectoContext from "../../Context/proyectos/proyectoContext";

const NuevoProyecto = () => {
  //obtener el State del formulario
  const proyectosContext = useContext(proyectoContext);
  const { formulario, errorformulario, mostrarFormulario, agregarProyecto, mostrarError } = proyectosContext;
  //State para el Proyecto
  const [proyecto, guardarProyecto] = useState({
    nombre: "",
  });
  //extraer el nombre del proyecto
  const { nombre } = proyecto;
  //lee los contenidos del inpput
  const onChangeProyecto = (e) => {
    guardarProyecto({
      ...proyecto,
      [e.target.name]: e.target.value,
    });
  };
  //cuando el usuario envia un proyecto
  const onSubmitProyecto = (e) => {
    e.preventDefault();
    //validar el proyecto
    if (nombre ==='') {
      mostrarError();
      return;
    }
    //agregar el state
    agregarProyecto(proyecto)
    //reiniciar form
    guardarProyecto({
      nombre:''
    })
  };
  //mostrar el formulario
  const onClickFormulario = () => {
    mostrarFormulario()
  }
  return (
    <Fragment>
      <button type="button" className="btn btn-block btn-primario" onClick={onClickFormulario}>
        Nuevo Proyecto
      </button>
      {formulario ? (
        <form className="formulario-nuevo-proyecto" onSubmit={onSubmitProyecto}>
          <input
            type="text"
            className="input-text"
            placeholder="Nobre Proyecto"
            name="nombre"
            value={nombre}
            onChange={onChangeProyecto}
          />
          <input
            type="submit"
            className="btn btn-primario btn-block"
            value="Agregar Nuevo Proyecto"
          />
        </form>
      ) : null}
      {errorformulario ? <p className="mensaje error">El nombre del Proyecto es obligatorio</p> : null}
    </Fragment>
  );
};

export default NuevoProyecto;
