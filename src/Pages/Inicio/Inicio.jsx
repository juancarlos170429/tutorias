import React from 'react'
import './Inicio.css'
import { Link } from "react-router-dom";
const Inicio = () => {
    return (
        <div className="M_wrapper">
            <div className="M_Contenedor">
                <h1 className="M_tittle">SISTEMA DE TUTORIAS</h1>
                <h3 className="M_subtittle">Ingenieria Informática y de Sistemas</h3>
                <p className="M_text">
                La tutoría del estudiante tiene como finalidad primordial,
                constituirse como un medio para hacer auténticos los fines que a su
                vez le están señalados por la Ley Universitaria. Por lo mismo, se
                centra en cuidar que la enseñanza-aprendizaje, profesionalización e
                investigación científica se realicen en el pregrado, en un marco de
                excelencia integral y sostenible a lo largo de la formación
                profesional que se ofrece, mediante un seguimiento permanente basado
                en los principios de inclusión social y de respeto al Estado
                Constitucional de Derecho.
                </p>
                <p className="M_text">
                Bienvenid@ al Sistema de Tutorías del Departamento Académico de Ing.
                Informática y de Sistemas, por favor, haga click en Ingresar y
                use sus credenciales para hacer uso del sistema.
                </p>
                <Link to="/LogMenu" style={{ textDecoration: "none" }}>
                <button className="M_btn">Ingresar</button>
                </Link>
            </div>
        </div>
    )
}

export default Inicio
