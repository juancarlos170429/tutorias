import React, { useEffect,useState } from 'react'
import * as BsIcons from "react-icons/bs"
import * as ImIcons from "react-icons/im"
import axios from 'axios'
import Cookies from 'universal-cookie'
import './BarTutor.css'
import {VscFeedback} from "react-icons/vsc"
import { Link } from 'react-router-dom'
const BarTutor = (props) => {
    const {nombrePage}=props;
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
   const cookie=new Cookies()
    const cerrarSesion=()=>{
        cookie.remove('CodDocente',{path:'/'});
        cookie.remove('Nombres',{path:'/'});
        cookie.remove('ApPaterno',{path:'/'});
        cookie.remove('ApMaterno',{path:'/'});
        cookie.remove('DNI',{path:'/'});
        cookie.remove('Categoria',{path:'/'});
        cookie.remove('Celular',{path:'/'});
        cookie.remove('Email',{path:'/'});
        cookie.remove('Direccion',{path:'/'});
        cookie.remove('Estutor',{path:'/'});
        
    }
    useEffect(()=>{
        peticionGet();
      },[])
    return (
        <div>
             <div className="navbarTutor">
                <div>Bienvenido :  {cookie.get('Nombres')} </div>
               
                <div>{nombrePage}</div>
                <Link className="link " to="/LoginTutor" style={{ textDecoration: 'none' }} onClick={()=>cerrarSesion()}>
                    <b className="text-wrap">Cerrar sesión</b>
                </Link>
            </div>
            <div className="sidebarTutor">
                <div className="sidebarTutorTop">
                    <img className="logoSidebarTutor" src="../../logo.png" alt="" />
                    <h6 className="labelTutor">Tutorias</h6>
                </div>
                <br />
                <div className="sidebarTutorFoto">
                    <img className="Tutor_FotoTutor" src={direccionUrl[0].Foto} alt="" />      
                </div>
                
                <div className="sidebarTutor_opcions">
                    <div className="Tutor_opcionsTutor_top">
                        
                        <Link className ="Tutor_opcion top" to="/Tutor_Registrar_Ficha_Tutoria" style={{ textDecoration: 'none' }} title="Estudiantes Asignados">
                            <div className="Tutor_opcion_partleft">
                                <ImIcons.ImClipboard className="Tutor_iconobar"/>
                            </div>
                            <div className="Tutor_opcion_partright">
                                <span>Estudiantes asignados</span>
                            </div>
                            
                        </Link>
                        <a href="https://forms.gle/MWNQ8MGwZowKkLYg9" rel="noreferrer"  target="_blank" className ="Tutor_opcion top" style={{ textDecoration: 'none' }} title="Feedback">
                            <div className="Tutor_opcion_partleft">
                                <VscFeedback className="Tutor_iconobar"/>
                            </div>
                            <div className="Tutor_opcion_partright">
                                <span> Feedback </span>
                            </div>
                        </a>
                    </div>
                    <div className="Tutor_opcionsTutor_bot">
                        <Link className ="Tutor_opcion bot" to="/Tutor_Perfil" style={{ textDecoration: 'none' }} title="Estudiantes Asignado">
                            <div className="Tutor_opcion_partleft">
                                <BsIcons.BsPersonSquare className="Tutor_iconobar"/>
                            </div>
                            <div className="Tutor_opcion_partright">
                                <span>Mi Perfil</span>
                            </div>
                        </Link>
                        <Link className ="Tutor_opcion bot" to="/Tutor_Eula" style={{ textDecoration: 'none' }} title="Estudiantes Asignado">
                            <div className="Tutor_opcion_partleft">
                                <BsIcons.BsFileEarmarkText className="Tutor_iconobar"/>
                            </div>
                            <div className="Tutor_opcion_partright">
                                <span>EULA</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BarTutor
