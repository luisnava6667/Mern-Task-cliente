import React, { useReducer } from "react";
import AuthReducer from "./authReducer";
import AuthContext from "./authContext";

import {
  REGITRO_EXITOSO,
  REGITRO_ERROR,
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION,
} from "../../Types";
import clienteAxios from "../../config/axios";
import tokenAuth from "../../config/token";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    autenticado: null,
    usuario: null,
    mensaje: null,
    cargando: true
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  //Las funciones
  const registrarUsuario = async (datos) => {
    try {
      const respuesta = await clienteAxios.post("/api/usuarios", datos);
    //   console.log(respuesta.data);
      dispatch({
        type: REGITRO_EXITOSO,
        payload: respuesta.data,
      });
      //obtener el usuario
      usuarioAutenticado();
    } catch (error) {
      // console.log(error.response.data.msg);
      const alerta = {
        msg: error.response.data.msg,
        categoria: "alerta-error",
      };
      dispatch({
        type: REGITRO_ERROR,
        payload: alerta,
      });
    }
  };

  //retorna el usuario autenticado
  const usuarioAutenticado = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      //si existe el token
      // console.log(token);
      //TODO: funcion para enviar el token por header
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios.get("/api/auth");
        // console.log(respuesta);
      dispatch({
        type: OBTENER_USUARIO,
        payload: respuesta.data.usuario,
      });
    } catch (error) {
      // console.log(error.response);
      dispatch({
        type: LOGIN_ERROR,
      });
    }
  };
  //cuando el usario inicia sesion 
  const iniciarSesion = async (datos) => {
    try {
      const respuesta = await clienteAxios.post("/api/auth", datos);
      // console.log(respuesta);
      dispatch({
        type: LOGIN_EXITOSO,
        payload: respuesta.data,
      })
      //obtener el usuario
      usuarioAutenticado();
    } catch (error) {
       console.log(error.response.data.msg);
      const alerta = {
        msg: error.response.data.msg,
        categoria: "alerta-error",
      };
      dispatch({
        type: LOGIN_ERROR,
        payload: alerta,
      });
    }
  } 
  //cierra la sesion del usuario
  const cerrarSesion = () => {
    dispatch({
      type: CERRAR_SESION,
    })
  }


  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        cargando: state.cargando,
        registrarUsuario,
        iniciarSesion,
        usuarioAutenticado,
        cerrarSesion,

      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthState;
