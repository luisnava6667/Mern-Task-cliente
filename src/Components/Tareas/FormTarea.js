import React, { useContext, useState, useEffect } from "react";
import proyectoContext from "../../Context/proyectos/proyectoContext";
import tareaContext from "../../Context/tareas/tareaContext";

const FormTarea = () => {
  //Extraer si el proyecto esta activo
  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;
  // obtener la funcion del context de tarea
  const tareasContext = useContext(tareaContext);
  const {
    tareaseleccionada,
    errortarea,
    agregarTarea,
    validarTarea,
    obtenerTareas,
    actualizarTarea,
    limpiarTarea,
  } = tareasContext;
  //Effect que detecta si hay una tarea seleccionada
  useEffect(() => {
    if (tareaseleccionada !== null) {
      guardarTarea(tareaseleccionada);
    } else {
      guardarTarea({
        nombre: "",
      });
    }
  }, [tareaseleccionada]);
  //State del formulario
  const [tarea, guardarTarea] = useState({
    nombre: "",
  });
  //Extraer el nombre de la tarea
  const { nombre } = tarea;
  //si no hay proyecto seleccionado
  if (!proyecto) return null;
  //Array destructuring para extraer el proyecto actual
  const [proyectoActual] = proyecto;
  //leer los valores del formulario
  const handleChange = (e) => {
    guardarTarea({
      ...tarea,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    //validar
    if (nombre.trim() === "") {
      validarTarea();
      return;
    }
    //revisa si es edicion o nueva tarea
    if (tareaseleccionada === null) {
      //tareanueva
      //agregar la nueva tarea
      tarea.proyecto = proyectoActual._id;
      
      agregarTarea(tarea);
    } else {
      //actualizar tarea existente
      actualizarTarea(tarea)
      //elimina tarea seleccionada del state
      limpiarTarea();
    }

    //obtener y filtrar las tareas del proyecto actual
    obtenerTareas(proyectoActual.id);
    //reiniciar el Form
    guardarTarea({
      nombre: "",
    });
  };
  return (
    <div className="formulario">
      <form onSubmit={onSubmit}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Tarea..."
            name="nombre"
            onChange={handleChange}
            value={nombre}
          />
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={tareaseleccionada ? "Editar Tarea" : "Agregar Tarea"}
          />
        </div>
      </form>
      {errortarea ? (
        <p className="mensaje error">El nombre de la tarea es obligatorio</p>
      ) : null}
    </div>
  );
};

export default FormTarea;
