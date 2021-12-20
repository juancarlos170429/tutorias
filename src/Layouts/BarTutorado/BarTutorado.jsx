import React ,{useEffect,useState}from 'react'
import axios from 'axios'
import * as FaIcons from "react-icons/fa"
import * as BsIcons from "react-icons/bs"
import {VscFeedback} from "react-icons/vsc"
import Cookies from 'universal-cookie'
import { Link } from 'react-router-dom'
import './BarTutorado.css'
const BarTutorado = (props) => {
    const baseUrl=`https://tutorias-api.herokuapp.com/FotoPerfil`;
    const[direccionUrl,setDireccionUrl]=useState([{
        Foto:"./imagenes/carga.gif"
    
    }])
    const peticionGet=async()=>{
        await axios.get(baseUrl+`/${cookie.get('Email')}`)
      .then(response=>{
        setDireccionUrl(response.data);
        
      }).catch(error=>{
        console.log(error);
      })
    }
    useEffect(()=>{
        peticionGet();
      },[])
    const {nombrePage}=props;
    const cookie=new Cookies()
    const cerrarSesion=()=>{
        cookie.remove('CodEstudiante',{path:'/'});
        cookie.remove('Nombres',{path:'/'});
        cookie.remove('ApPaterno',{path:'/'});
        cookie.remove('ApMaterno',{path:'/'});
        cookie.remove('Celular',{path:'/'});
        cookie.remove('Email',{path:'/'});
        cookie.remove('Direccion',{path:'/'});
        cookie.remove('SemestreIngreso',{path:'/'});   
    }
    useEffect(()=>{
        peticionGet();
    })
    return (
        <div>
            <div className="navbarTutorado">
                <div>Bienvenido : {cookie.get('Nombres')} </div>
                <div>{nombrePage}</div>
                <Link className="link " to="/LoginTutorado" style={{ textDecoration: 'none' }} onClick={()=>cerrarSesion()}>
                    <b className="text-wrap">Cerrar sesión</b>
                </Link>
            </div>
            <div className="sidebarTutorado">
                <div className="sidebarTutoradoTop">
                    <img className="logoSidebarTutorado" src="../../logo.png" alt="" />
                    <h6 className="labelTutorado">Tutorias</h6>
                </div>
                <br />
                <div className="sidebarTutoradoFoto">
                    <img className="Tado_FotoTutorado" src={direccionUrl[0].Foto} alt="" />      
                </div>
                
                <div className="sidebarTutorado_opcions">
                    <div className="Tado_opcionsTutorado_top">
                        
                        <Link className ="Tado_opcion top" to="/Tutorado_TutorAsignado" style={{ textDecoration: 'none' }} title="Estudiantes Asignado">
                            <div className="Tado_opcion_partleft">
                                <FaIcons.FaChalkboardTeacher className="Tado_iconobar"/>
                            </div>
                            <div className="Tado_opcion_partright">
                                <span>Tutor Asignado</span>
                            </div>
                            
                        </Link>
                        <a href="https://forms.gle/MWNQ8MGwZowKkLYg9" rel="noreferrer"  target="_blank" className ="Tado_opcion top" style={{ textDecoration: 'none' }} title="Feedback">
                            <div className="Tado_opcion_partleft">
                                <VscFeedback className="Tado_iconobar"/>
                            </div>
                            <div className="Tado_opcion_partright">
                                <span> Feedback </span>
                            </div>
                        </a>
                    </div>
                    <div className="Tado_opcionsTutorado_bot">
                        <Link className ="Tado_opcion bot" to="/Tutorado_Perfil" style={{ textDecoration: 'none' }} title="Estudiantes Asignado">
                            <div className="Tado_opcion_partleft">
                                <BsIcons.BsPersonSquare className="Tado_iconobar"/>
                            </div>
                            <div className="Tado_opcion_partright">
                                <span>Mi Perfil</span>
                            </div>
                        </Link>
                        <Link className ="Tado_opcion bot" to="/Tutorado_Eula" style={{ textDecoration: 'none' }} title="Estudiantes Asignado">
                            <div className="Tado_opcion_partleft">
                                <BsIcons.BsFileEarmarkText className="Tado_iconobar"/>
                            </div>
                            <div className="Tado_opcion_partright">
                                <span>EULA</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default BarTutorado
