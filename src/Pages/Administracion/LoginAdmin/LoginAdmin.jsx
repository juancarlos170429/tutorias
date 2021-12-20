import React from 'react'
import './LoginAdmin.css'
import { Link } from 'react-router-dom'
import * as ImIcons from "react-icons/im"
import {useState,useEffect} from 'react';
import axios from 'axios'
import {Modal,ModalFooter,ModalHeader} from 'reactstrap'
import Cookies from 'universal-cookie/es6';
const LoginAdmin = (props) => {
    const baseURL="https://tutorias-api.herokuapp.com/loginCoordinador";
    const cookies=new Cookies();
    const[user,setUser]=useState('')
    const[password,setPassword]=useState('')
    const [mostrar,setMostrar]=useState(false)
    const CambiarMostrar = () => setMostrar(!mostrar);
    const[warningView,setWarningview]=useState(false);
    const abrirCerrarModalWarning=()=>{
        setWarningview(!warningView);
      }
      
    const Login=async()=>{
        await axios.post(baseURL,{Usuario:user,Contrasenia:password})
        .then(response=>{
            return response.data;
        }).then(response=>{
            if(response.length>0){
                var respuesta=response[0];
                cookies.set('CodContra',respuesta.CodCoordinador,{path:'/'});
                cookies.set('CodAdmin',respuesta.CodDocente,{path:'/'});
                cookies.set('Nombres',respuesta.Nombres,{path:'/'});
                cookies.set('ApPaterno',respuesta.ApPaterno,{path:'/'});
                cookies.set('ApMaterno',respuesta.ApMaterno,{path:'/'});
                cookies.set('DNI',respuesta.DNI,{path:'/'});
                cookies.set('Categoria',respuesta.Categoria,{path:'/'});
                cookies.set('Celular',respuesta.Celular,{path:'/'});
                cookies.set('Email',respuesta.Email,{path:'/'});
                cookies.set('Direccion',respuesta.Direccion,{path:'/'});
                cookies.set('Estutor',respuesta.EsTutor,{path:'/'});
                props.history.push('/Admin_Asignar_Tutor');
            }
            else{
                abrirCerrarModalWarning();
            }
        })
        .catch(error=>{
            console.log(error)
        })
    }
    const comprobar=()=>{ 
        if(user===''||password===''){
            abrirCerrarModalWarning();
        }
        else {
            Login()
        }
    }
    useEffect(()=>{
        if(cookies.get('CodAdmin')){
            props.history.push('/Admin_Asignar_Tutor');
        }
    })
    return (
        <div className="LogA_wrapper">
            <div className="LogA_regresar">
                <Link to="/LogMenu" style={{ textDecoration: 'none' }}>
                    <ImIcons.ImCross className="LogA_icono_back"/>
                </Link>
            </div>
            <div className="LogA_wrapper_card">
                <div className="LogA_card">
                    <h2 className="LogA_title">Administración</h2>
                    <img className="LogA_logo"src="../imagenes/management.png" alt=""/>
                    <div className='LogA_input_wrapper'>
                        <label className="LogA_label"><b>Ingrese Usuario:</b> </label>
                        <br />
                        <input
                        type="text"
                        className="form-control"
                        name="username" 
                        onChange={ (e) => setUser(e.target.value)} 
                        placeholder="Usuario"
                        />
                    </div>
                    <div className='LogA_input_wrapper'>
                        <label className="LogA_label"><b>Ingrese Contraseña:</b> </label>
                        <br />
                        <input
                        type={mostrar ? 'text' : 'password'}
                        className="form-control"
                        onChange={ (e) => setPassword(e.target.value)}
                        name="password"          
                        placeholder={mostrar ? 'Ingrese su contraseña' : '***********'}
                        />
                        <label className="" >
                            <input type="checkbox" onChange={CambiarMostrar} value="remember-me"/> Mostrar contraseña
                        </label>
                    </div>
                    <Link  style={{ textDecoration: 'none' }}>
                        <button className="LogA_ingresar" onClick={comprobar} >Iniciar Sesión</button>
                    </Link>
                </div>
            </div>
            <Modal  isOpen={warningView} centered>
                <ModalHeader>
                    <ImIcons.ImWarning />   La contraseña o el usuario no son correctos
                </ModalHeader>
                <ModalFooter>
                    <ImIcons.ImCross onClick={()=>abrirCerrarModalWarning()}/>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default LoginAdmin
