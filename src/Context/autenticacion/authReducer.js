import {
  REGITRO_EXITOSO,
  REGITRO_ERROR,
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION,
} from "../../Types";

export default (state, action) => {
  switch (action.type) {
    case LOGIN_EXITOSO:
    case REGITRO_EXITOSO:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        autenticado: true,
        mensaje: null,
        cargando: false,

      };
    case CERRAR_SESION:
    case LOGIN_ERROR:
    case REGITRO_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        usuario: null,
        autenticado: null,
        mensaje: action.payload,
        cargando: false,

      };
    case OBTENER_USUARIO:
      return {
        ...state,
        usuario: action.payload,
        autenticado: true,
        cargando: false,

      };
    default:
      return state;
  }
};
