import React, { useContext } from "react";
import proyectoContext from "../../Context/proyectos/proyectoContext";
import tareaContext from "../../Context/tareas/tareaContext";

const Proyecto = ({ proyecto }) => {
  //obtener el State de proeyectos
  const proyectosContext = useContext(proyectoContext);
  const { proyectoActual } = proyectosContext;
  // obtener la funcion del context de tarea
  const tareasContext = useContext(tareaContext);
  const {obtenerTareas} = tareasContext;
  //una funcion para agregar el proyecto actual
  const seleccionarProyecto = id=>{
    proyectoActual(id)//fijar un proyecto actual  
    obtenerTareas(id)//filtrar las tareas cuando se den click
  }
  return (
    <li>
      <button
        type="button"
        className="btn btn-blank"
        onClick={() => seleccionarProyecto(proyecto._id)}
      >{proyecto.nombre}</button>
    </li>
  );
};

export default Proyecto;
