import React, { useContext, useEffect } from "react";
import Proyecto from "./Proyecto";
import proyectoContext from "../../Context/proyectos/proyectoContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import AlertaContext from "../../Context/alertas/alertaContext";

const ListadoProyectos = () => {
  //extraer proyectos de state inicial
  const proyectosContext = useContext(proyectoContext);
  const { mensaje, proyectos, obtenerProyecto } = proyectosContext;
  const alertaContext = useContext(AlertaContext);
  const {alerta, mostrarAlerta} = alertaContext;
  //obtener proyectos cuando carga el componente
  useEffect(() => {
    if(mensaje){
      //si hay un error
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    
    obtenerProyecto();
    //eslint-disable-next-line
  }, [mensaje]);
  //revisar si proyectos tienen contenido
  if (proyectos.length === 0) return <p>No hay proyectos, comienza creando uno</p>;
  return (
    <ul className="listado-proyectos">
      {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>):null}
      <TransitionGroup>
      {proyectos.map((proyecto) => (
        <CSSTransition
        key={proyecto._id} timeout={200} className='proyecto'>
          <Proyecto proyecto={proyecto} />
        </CSSTransition>
      ))}
      </TransitionGroup>
    </ul>
  );
};

export default ListadoProyectos;
