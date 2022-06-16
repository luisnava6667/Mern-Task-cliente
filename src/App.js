import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from "./Components/Auth/Login";
import NuevaCuenta from "./Components/Auth/NuevaCuenta";
import Proyectos from "./Components/Proyectos/Proyectos";
import ProyectoState from "./Context/proyectos/proyectoState";
import TareaState from "./Context/tareas/tareaState";
import AlertaState from "./Context/alertas/alertaState";
import AuthState from "./Context/autenticacion/authState";
import tokenAuth from "./config/token";
import RutaPrivada from "./Components/rutas/RutaPrivada";


//reivisar si tenemos un token
const token = localStorage.getItem('token');
if(token){
  tokenAuth(token);
}

function App() {
  // console.log(process.env.REACT_APP_BACKEND_URL);
  
    return (
      <ProyectoState>
        <TareaState>
          <AlertaState>
            <AuthState>
              <Router>
                  <Switch>
                      <Route exact path="/" component={Login} />
                      <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
                      <RutaPrivada exact path="/proyectos" component={Proyectos} />
                  </Switch>
              </Router>
            </AuthState>
          </AlertaState>
        </TareaState>
      </ProyectoState>
    );
  }
  

export default App;
