import React, {useContext} from "react";
import tareaContext from "../../Context/tareas/tareaContext";
import proyectoContext from "../../Context/proyectos/proyectoContext";



const Tarea = ({ tarea }) => {
   //Extraer si el proyecto esta activo
   const proyectosContext = useContext(proyectoContext);
   const { proyecto } = proyectosContext;
  // obtener la funcion del context de tarea
  const tareasContext = useContext(tareaContext);
  const { eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual } = tareasContext;
  //extrae el proyecto
  const [proyectoActual] = proyecto;
    //funcion que se ejecuta cuanodo el usuario presiona el boton de eliminar tarea
    const tareaEliminar = id => {
      eliminarTarea(id,proyectoActual._id);
      obtenerTareas(proyectoActual.id)
    }
    //funcion que modifica el estado de la tarea
    const cambiarEstado= tarea=>{
      if(tarea.estado){
        tarea.estado=false;
      }else{
        tarea.estado=true;
      }
      actualizarTarea(tarea)
    }
    //Agrega una tarea actual cuando el usuario deses editarla
    const selecionarTarea= tarea=>{
      guardarTareaActual(tarea)
    }

  return (
    <li className="tarea sombra">
      <p>{tarea.nombre}</p>
      <div className="estado">
        {tarea.estado ? (
          <button type="button" className="completo" onClick={()=>cambiarEstado(tarea)} >
            Completo
          </button>
        ) : (
          <button type="button" className="incompleto" onClick={()=>cambiarEstado(tarea)}>
            Incompleto
          </button>
        )}
      </div>
      <div className="acciones">
        <button type="button" className="btn btn-primario" onClick={()=>selecionarTarea(tarea)}>
          Editar
        </button>
        <button type="button" className="btn btn-secundario" onClick={()=>tareaEliminar(tarea._id)}>
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default Tarea;
