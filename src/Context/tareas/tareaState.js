import React, { useReducer } from "react";
import clienteAxios from "../../config/axios";
// import { v4 as uuidv4 } from "uuid";
import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
  LIMPIAR_TAREA,
} from "../../Types";
import tareaContext from "./tareaContext";
import tareaReducer from "./tareaReducer";

const TareaState = (props) => {
  const initialState = {
    // tareas: [
    //   { id: 1, nombre: "Elegir Plataforma", estado: true, proyectoId: 1 },
    //   { id: 2, nombre: "Elegir Colores", estado: false, proyectoId: 2 },
    //   { id: 3, nombre: "Elegir Plataforma de Pago", estado: false, proyectoId: 3 },
    //   { id: 4, nombre: "Elegir Hosting", estado: true, proyectoId: 4 },
    //   { id: 5, nombre: "Elegir Plataforma", estado: true, proyectoId: 1 },
    //   { id: 6, nombre: "Elegir Colores", estado: false, proyectoId: 2 },
    //   { id: 7, nombre: "Elegir Plataforma de Pago", estado: false, proyectoId: 3 },
    //   { id: 8, nombre: "Elegir Plataforma de Pago", estado: false, proyectoId: 2 },
    //   { id: 9, nombre: "Elegir Hosting", estado: true, proyectoId: 4 },
    // ],
    tareasproyecto: [],
    errortarea: false,
    tareaseleccionada: null,
  };
  //Crear el Dispatch y el state
  const [state, dispatch] = useReducer(tareaReducer, initialState);
  //CREAR LAS FUNCIONES
  //obtener las tareas de un proyecto
  const obtenerTareas = async (proyecto) => {
    try {
      const resultado = await clienteAxios.get(`/api/tareas`, {
        params: { proyecto },
      });
      // console.log(resultado);
      dispatch({
        type: TAREAS_PROYECTO,
        payload: resultado.data.tareas,
      });
    } catch (error) {
      console.log(error);
    }
  };
  //AGREGAR una tarea al proyecto seleccionado
  const agregarTarea = async (tarea) => {
    console.log(tarea);
    // tarea.id =uuidv4();
    try {
      const resultado = await clienteAxios.post("/api/tareas", tarea);
      console.log(resultado);
      dispatch({
        type: AGREGAR_TAREA,
        payload: tarea,
      });
    } catch (error) {
      console.log(error);
    }
  };
  //valida y muestra un error en caso que sea necesario
  const validarTarea = () => {
    dispatch({
      type: VALIDAR_TAREA,
    });
  };
  //ELIMINAR TAREA POR ID
  const eliminarTarea = async (id, proyecto) => {
    try {
      await clienteAxios.delete(`/api/tareas/${id}`, {params: {proyecto}});
      dispatch({
        type: ELIMINAR_TAREA,
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  };
  //cambia el estado de la tarea
  // const cambiarEstadoTarea = (tarea) => {
  //   dispatch({
  //     type: ESTADO_TAREA,
  //     payload: tarea,
  //   });
  // };
  //Extraer la tarea para la edicion
  const guardarTareaActual = (tarea) => {
    dispatch({
      type: TAREA_ACTUAL,
      payload: tarea,
    });
  };
  //edita o modifica una tarea
  const actualizarTarea = async(tarea) => {
    try {
      const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
      console.log(resultado);
      dispatch({
        type: ACTUALIZAR_TAREA,
        payload: resultado.data.tarea,
      });
    } catch (error) {
      console.log(error);
    }
  };
  // Elimina la tarea seleccionada
  const limpiarTarea = () => {
    dispatch({
      type: LIMPIAR_TAREA,
    });
  };
  return (
    <tareaContext.Provider
      value={{
        // tareas: state.tareas,
        tareasproyecto: state.tareasproyecto,
        errortarea: state.errortarea,
        tareaseleccionada: state.tareaseleccionada,
        obtenerTareas,
        agregarTarea,
        validarTarea,
        eliminarTarea,
        // cambiarEstadoTarea,
        guardarTareaActual,
        actualizarTarea,
        limpiarTarea,
      }}
    >
      {props.children}
    </tareaContext.Provider>
  );
};
export default TareaState;
