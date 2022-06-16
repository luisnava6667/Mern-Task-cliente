import React, {useContext, useEffect} from "react";
import Barra from "../Layout/Barra";
import Sidebar from "../Layout/Sidebar";
import FormTarea from "../Tareas/FormTarea";
import ListadoTareas from "../Tareas/ListadoTareas";
import AuthContext from "../../Context/autenticacion/authContext";


const Proyectos = () => {
  //extraer la informacion de autenticacion
  const authContext = useContext(AuthContext);
  const {usuarioAutenticado} = authContext;
  useEffect(()=>{
    usuarioAutenticado();
        //eslint-disable-next-line
  },[]);
  return (
    <div className="contenedor-app">
      <Sidebar />
      <div className="seccion-pincipal">
        <Barra />
        <main>
          <FormTarea/>
          <div className="contendor-tareas">
            <ListadoTareas/>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Proyectos;
