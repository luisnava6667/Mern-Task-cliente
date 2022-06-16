import React from "react";
import ListadoProyectos from "../Proyectos/ListadoProyectos";
import NuevoProyecto from "../Proyectos/NuevoProyecto";


const Sidebar = () => {
  return (
    <aside>
      <h1>MERN<span>Task</span></h1>
      <NuevoProyecto/>
      <div className="proyectos">
          <h2>Tus Proyectos</h2>
          <ListadoProyectos />
      </div>
    </aside>
  );
};

export default Sidebar;
