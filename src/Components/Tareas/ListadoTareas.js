import React, { Fragment, useContext } from "react";
import Tarea from "./Tarea";
import proyectoContext from "../../Context/proyectos/proyectoContext";
import tareaContext from "../../Context/tareas/tareaContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const ListadoTareas = () => {
  //obtener el State de proeyectos
  const proyectosContext = useContext(proyectoContext);
  const { proyecto, eliminarProyecto } = proyectosContext;
  // obtener las tareas del proyecto
  const tareasContext = useContext(tareaContext);
  const { tareasproyecto } = tareasContext;
  //si no hay proyecto seleccionado
  if (!proyecto) return <h2>Selecciona un Proyecto</h2>;
  //Array destructuring para extraer el proyecto actual
  const [proyectoActual] = proyecto;

  //elimina un proyecto
  const onClickEliminar = () => {
    eliminarProyecto(proyectoActual._id);
  };
  return (
    <Fragment>
      <h2>Proyecto: {proyectoActual.nombre}</h2>
      <ul className="listado-tareas">
        {tareasproyecto.length === 0 ? (
          <li className="tarea">
            <p>No hay tareas</p>
          </li>
        ) : 
          <TransitionGroup>
            {tareasproyecto.map((tarea) => (
              <CSSTransition key={tarea._id} timeout={200} classNames="tarea">
                <Tarea tarea={tarea} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        }
      </ul>
      <button
        type="button"
        className="btn btn-eliminar"
        onClick={onClickEliminar}
      >
        Eliminar Proyecto &times;
      </button>
    </Fragment>
  );
};

export default ListadoTareas;
