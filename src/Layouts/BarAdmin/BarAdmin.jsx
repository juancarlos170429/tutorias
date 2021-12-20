import React,{useState,useEffect} from 'react'
import axios from 'axios'
import './BarAdmin.css'
import Cookies from 'universal-cookie'
import { Link } from 'react-router-dom'
import * as AiIcons from "react-icons/ai"
import * as BsIcons from "react-icons/bs"
import * as FaIcons from "react-icons/fa"
import {VscFeedback} from "react-icons/vsc"
const BarAdmin = (props) => {
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
        cookie.remove('CodAdmin',{path:'/'});
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
    const {nombrePage}=props;
    useEffect(()=>{
        peticionGet();
    }) 
    return (
        <div>
            <div className="navbarAdmin">
                <div>Bienvenido : {cookie.get('Nombres')}</div>
                <div>{nombrePage}</div>
                <Link className="link " to="/LoginAdmin" style={{ textDecoration: 'none' }} onClick={()=>cerrarSesion()}>
                    <b className="text-wrap">Cerrar sesión</b>
                </Link>
            </div>
            <div className="sidebarAdmin">
                <div className="sidebarAdminTop">
                    <img className="logoSidebarAdmin" src="../../logo.png" alt="" />
                    <h6 className="labelAdmin">Tutorias</h6>
                </div>
                <br />
                <div className="sidebarAdminFoto">
                    <img className="FotoAdmin" src={direccionUrl[0].Foto} alt="" />      
                </div>
                
                <div className="sidebarAdmin_opcions">
                    <div className="opcionsAdmin_top">
                        <Link className ="opcion top" to="/Admin_Asignar_Tutor" style={{ textDecoration: 'none' }} title="Estudiantes Asignado">
                            <div className="opcion_partleft">
                                <AiIcons.AiOutlineUserSwitch className="iconobar"/>
                            </div>
                            <div className="opcion_partright">
                                <span>Asignar tutor</span>
                            </div>
                            
                        </Link>
                        <a href="https://forms.gle/MWNQ8MGwZowKkLYg9" rel="noreferrer"  target="_blank" className ="opcion top" style={{ textDecoration: 'none' }} title="Feedback">
                            <div className="opcion_partleft">
                                <VscFeedback className="iconobar"/>
                            </div>
                            <div className="opcion_partright">
                                <span> Feedback </span>
                            </div>
                        </a>
                    </div>
                    <div className="opcionsAdmin_bot">
                        <Link className ="opcion bot" to="/Admin_Estudiantes" style={{ textDecoration: 'none' }} title="Estudiantes Asignado">
                            <div className="opcion_partleft">
                                <FaIcons.FaUserFriends className="iconobar"/>
                            </div>
                            <div className="opcion_partright">
                                <span> Estudiantes </span>
                            </div>
                        </Link>
                        <Link className ="opcion bot" to="/Admin_Docentes" style={{ textDecoration: 'none' }} title="Estudiantes Asignado">
                            <div className="opcion_partleft">
                                <FaIcons.FaUserTie className="iconobar"/>
                            </div>
                            <div className="opcion_partright">
                                <span> Docentes</span>
                            </div>
                        </Link>
                        <Link className ="opcion bot" to="/Admin_Perfil" style={{ textDecoration: 'none' }} title="Estudiantes Asignado">
                            <div className="opcion_partleft">
                                <BsIcons.BsPersonSquare className="iconobar"/>
                            </div>
                            <div className="opcion_partright">
                                <span>Mi Perfil</span>
                            </div>
                        </Link>
                        <Link className ="opcion bot" to="/Eula" style={{ textDecoration: 'none' }} title="Estudiantes Asignado">
                            <div className="opcion_partleft">
                                <BsIcons.BsFileEarmarkText className="iconobar"/>
                            </div>
                            <div className="opcion_partright">
                                <span>EULA</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BarAdmin
