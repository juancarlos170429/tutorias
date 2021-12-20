import React from 'react'
import { Link } from "react-router-dom";
import * as ImIcons from "react-icons/im"
import './LogMenu.css'
const LogMenu = () => {
    return (
        <div className="LM_wrapper">
            <div>
                <div className='LM_bar'>
                      <h1 className="LM_tittle"> SISTEMA DE TUTORIAS</h1>
                </div>
                <div className ="LM_logowrapper">
                    <img className="LM_logo"src="../logo.png" alt="" />
                </div>
            </div>
            <div className="LM_regresar">
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <ImIcons.ImCross className="LM_icono"/>
                </Link>
            </div>
            <div className="LM_cards">
                <div className="tarjeta">
                    <img className="LM_icono_card" src="../Imagenes/reading.png" alt=""/>
                    <h2>Tutorados</h2>
                    <Link to="/LoginTutorado" style={{ textDecoration: 'none' }}>
                        <button className="LM_btn" >
                            Ingresar
                        </button>
                    </Link>
                </div>
                <div className="tarjeta">
                    <img className="LM_icono_card" src="../Imagenes/education.png" alt=""/>
                    <h2>Tutor</h2>
                    <Link to="/LoginTutor" style={{ textDecoration: 'none' }}>
                        <button className="LM_btn" >
                            Ingresar
                        </button>
                    </Link>
                </div>
                <div className="tarjeta">
                    <img className="LM_icono_card" src="../Imagenes/management.png" alt=""/>
                    <h2>Administrador</h2>
                    <Link to="/LoginAdmin" style={{ textDecoration: 'none' }}>
                        <button className="LM_btn" >
                            Ingresar
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LogMenu
