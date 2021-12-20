
import './App.css';
import {Switch, Route, BrowserRouter} from "react-router-dom";
import AsignarTutor from './Pages/Administracion/AsignarTutor/AsignarTutor';
import Main from './Pages/Inicio/Inicio'
import LogMenu from './Pages/LogMenu/LogMenu';
import LoginAdmin from './Pages/Administracion/LoginAdmin/LoginAdmin';
import AdminEstudiantes from './Pages/Administracion/AdminEstudiantes/AdminEstudiantes';
import Eula from './Pages/Administracion/Eula/Eula';
import AdminDocentes from './Pages/Administracion/AdminDocentes/AdminDocentes';
import AdminPerfil from './Pages/Administracion/AdminPerfil/AdminPerfil';
import LogTutorado from './Pages/Tutorado/LogTutorado/LogTutorado';
import TutoradoTutorAsignado from './Pages/Tutorado/TutoradoTutorAsignado/TutoradoTutorAsignado';
import TEula from './Pages/Tutorado/TEula/TEula'
import TutoradoPerfil from './Pages/Tutorado/TutoradoPerfil/TutoradoPerfil';
import LoginTutor from './Pages/Tutor/LoginTutor/LoginTutor';
import ViewTutor from './Layouts/ViewTutor/ViewTutor';
import TutorRegistrarFichaTutoria from './Pages/Tutor/TutorRegistrarFichaTutoria/TutorRegistrarFichaTutoria';
import TutorEula from './Pages/Tutor/TutorEula/TutorEula';
import TutorPerfil from './Pages/Tutor/TutorPerfil/TutorPerfil';
import TutorSesionTutorias from './Pages/Tutor/TutorSesionTutorias/TutorSesionTutorias';

function App() {
  return (
    <div>
     <BrowserRouter>
        <Switch>
           <Route exact path="/" component={Main}/>
           <Route exact path="/bar" component={ViewTutor}/>
           <Route exact path="/LogMenu" component={LogMenu}/>
           <Route exact path="/LoginAdmin" component={LoginAdmin}/>
           <Route exact path="/Admin_Asignar_Tutor" component={AsignarTutor}/>
           <Route exact path="/Admin_Estudiantes" component={AdminEstudiantes}/>
           <Route exact path="/Admin_Docentes" component={AdminDocentes}/>
           <Route exact path="/Admin_Perfil" component={AdminPerfil}/>
           <Route exact path="/Eula" component={Eula}/>
           <Route exact path="/LoginTutorado" component={LogTutorado}/>
           <Route exact path="/Tutorado_TutorAsignado" component={TutoradoTutorAsignado}/>
           <Route exact path="/Tutorado_Eula" component={TEula}/>
           <Route exact path="/Tutorado_Perfil" component={TutoradoPerfil}/> 
           <Route exact path="/LoginTutor" component={LoginTutor}/> 
           <Route exact path="/Tutor_Registrar_Ficha_Tutoria" component={TutorRegistrarFichaTutoria}/> 
           <Route exact path="/Tutor_Registrar_Ficha_Tutoria/:id" component={TutorSesionTutorias}/>
           <Route exact path="/Tutor_Eula" component={TutorEula}/> 
           <Route exact path="/Tutor_Perfil" component={TutorPerfil}/> 
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
