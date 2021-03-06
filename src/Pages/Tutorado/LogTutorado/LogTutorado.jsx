import React from 'react'
import { Link } from 'react-router-dom'
import * as ImIcons from "react-icons/im"
import {useState,useEffect} from 'react';
import axios from 'axios'
import {Modal,ModalFooter,ModalHeader} from 'reactstrap'
import Cookies from 'universal-cookie/es6';
import './LogTutorado.css'
const LogTutorado = (props) => {
    const baseURL="https://tutorias-api.herokuapp.com/loginEstudiantes";
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
                cookies.set('CodEstudiante',respuesta.CodEstudiante,{path:'/'});
                cookies.set('Nombres',respuesta.Nombres,{path:'/'});
                cookies.set('ApPaterno',respuesta.ApPaterno,{path:'/'});
                cookies.set('ApMaterno',respuesta.ApMaterno,{path:'/'});       
                cookies.set('Celular',respuesta.Celular,{path:'/'});
                cookies.set('Email',respuesta.Email,{path:'/'});
                cookies.set('Direccion',respuesta.Direccion,{path:'/'});
                cookies.set('SemestreIngreso',respuesta.SemestreIngreso,{path:'/'});
                props.history.push('/Tutorado_TutorAsignado');
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
        if(cookies.get('CodEstudiante')){
            props.history.push('/Tutorado_TutorAsignado');
        }
    })
    return (
        <div className="LogTutorado_wrapper">
            <div className="LogTutorado_regresar">
                <Link to="/LogMenu" style={{ textDecoration: 'none' }}>
                    <ImIcons.ImCross className="LogTutorado_icono_back"/>
                </Link>
            </div>
            <div className="LogTutorado_wrapper_card">
                <div className="LogTutorado_card">
                    <h2 className="LogTutorado_title">Tutorado</h2>
                    <img className="LogTutorado_logo"src="../Imagenes/reading.png" alt=""/>
                    <div className='LogTutorado_input_wrapper'>
                        <label className="LogTutorado_label"><b>Ingrese Usuario:</b> </label>
                        <br />
                        <input
                        type="text"
                        className="form-control"
                        name="username" 
                        onChange={ (e) => setUser(e.target.value)} 
                        placeholder="Usuario"
                        />
                    </div>
                    <div className='LogTutorado_input_wrapper'>
                        <label className="LogTutorado_label"><b>Ingrese Contrase??a:</b> </label>
                        <br />
                        <input
                        type={mostrar ? 'text' : 'password'}
                        className="form-control"
                        onChange={ (e) => setPassword(e.target.value)}
                        name="password"          
                        placeholder={mostrar ? 'Ingrese su contrase??a' : '***********'}
                        />
                        <label className="" >
                            <input type="checkbox" onChange={CambiarMostrar} value="remember-me"/> Mostrar contrase??a
                        </label>
                    </div>
                    <Link  style={{ textDecoration: 'none' }}>
                        <button className="LogTutorado_ingresar" onClick={comprobar} >Iniciar Sesi??n</button>
                    </Link>
                </div>
            </div>
            <Modal  isOpen={warningView} centered>
                <ModalHeader>
                    <ImIcons.ImWarning />   La contrase??a o el usuario no son correctos
                </ModalHeader>
                <ModalFooter>
                    <ImIcons.ImCross onClick={()=>abrirCerrarModalWarning()}/>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default LogTutorado
