import React, { useReducer } from "react";
import {
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTOS,
  AGREGAR_PROYECTO,
  PROYECTO_ERROR,
  VALIDAR_FORMULARIO,
  PROYECTO_ACTUAL,
  ELIMINAR_PROYECTO,
} from "../../Types";

import clienteAxios from "../../config/axios";
import proyectoContext from "./proyectoContext";
import proyectoReducer from "./proyectoReducer";

const ProyectoState = (props) => {
  // const proyectos = [
  //   { id: 1, nombre: "Diseño Virtual" },
  //   { id: 2, nombre: "Intranet" },
  //   { id: 3, nombre: "diseño de Sitio Web" },
  //   { id: 4, nombre: "diseño de Sitio Web" },
  // ];
  const initialState = {
    proyectos: [],
    formulario: false,
    errorformulario: false,
    proyecto: null,
    mensaje: null,
  };
  //dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(proyectoReducer, initialState);
  //serie de funciones para el crud
  const mostrarFormulario = () => {
    dispatch({
      type: FORMULARIO_PROYECTO,
    });
  };
  //obtener los proyectos
  const obtenerProyecto = async() => {

   try {
      const respuesta = await clienteAxios.get("/api/proyectos");
    dispatch({
      type: OBTENER_PROYECTOS,
      payload: respuesta.data.proyectos,
    });
   } catch (error) {
    // console.log(error); 
    const alerta = {
      msg: 'Hubo un Error',
      categoria: 'alerta-error'
    }
    dispatch({
      type: PROYECTO_ERROR,
      payload: alerta
    })

  }
    
   
  };
  //agregar nuevo proyecto
  const agregarProyecto = async (proyecto) => {
    try {
      const resultado = await clienteAxios.post("/api/proyectos", proyecto);
      // console.log(resultado);
      //?Insertar el proyecto en el state
    dispatch({
      type: AGREGAR_PROYECTO,
      payload: resultado.data,
    });
    } catch (error) {
      // console.log(error); 
      const alerta = {
        msg: 'Hubo un Error',
        categoria: 'alerta-error'
      }
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta
      })

    }

    
  };
  //VALIDA EL FORMULARIO POR ERRORES
  const mostrarError = () => {
    dispatch({
      type: VALIDAR_FORMULARIO,
    });
  };
  //selecciona el proyecto que el usuario dio click
  const proyectoActual = (proyectoID) => {
    dispatch({
      type: PROYECTO_ACTUAL,
      payload: proyectoID,
    });
  };
  //Elimina un proyecto
  const eliminarProyecto = async (proyectoID) => {
      try {
        await clienteAxios.delete(`/api/proyectos/${proyectoID}`);
        dispatch({
          type: ELIMINAR_PROYECTO,
          payload: proyectoID,
        });
      } catch (error) {
        // console.log(error); 
        const alerta = {
          msg: 'Hubo un Error',
          categoria: 'alerta-error'
        }
        dispatch({
          type: PROYECTO_ERROR,
          payload: alerta
        })

      }
  };
  return (
    <proyectoContext.Provider
      value={{
        proyectos: state.proyectos,
        formulario: state.formulario,
        errorformulario: state.errorformulario,
        proyecto: state.proyecto,
        mensaje: state.mensaje,
        mostrarFormulario,
        obtenerProyecto,
        agregarProyecto,
        mostrarError,
        proyectoActual,
        eliminarProyecto,
      }}
    >
      {props.children}
    </proyectoContext.Provider>
  );
};

export default ProyectoState;
