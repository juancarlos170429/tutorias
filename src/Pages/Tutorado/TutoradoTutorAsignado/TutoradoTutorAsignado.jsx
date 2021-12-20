import React,{useEffect, useState} from 'react'
import ViewTutorado from '../../../Layouts/ViewTutorado/ViewTutorado'
import axios from 'axios'
import * as AiIcons from "react-icons/ai"
import * as MdIcons from "react-icons/md"
import * as BsIcons from "react-icons/bs"
import Cookies from 'universal-cookie'
import './TutoradoTutorAsignado.css'
const TutoradoTutorAsignado = () => {
    const cookie =new Cookies();
    const [data,setData]=useState([
        {
            CodDocente:"",
            Nombres:"",
            ApPaterno:"",
            ApMaterno: "",
            DNI: "",
            Categoria:"",
            Celular: "",
            Email: "",
            Direccion: "",
            EsTutor: ""
        }
    ])
    const baseUrlFoto=`https://tutorias-api.herokuapp.com/FotoPerfil`;
    const[direccionUrl,setDireccionUrl]=useState([{
        Foto:"./imagenes/carga.gif"
    
    }])
    const baseUrl=`https://tutorias-api.herokuapp.com/asignaciones`
    const peticionGetDatos=async()=>{
        await axios.get(baseUrl+`/${cookie.get('CodEstudiante')}`)
        .then(response=>{
            setData(response.data)
            if(response.data>0){
                console.log(response.data[0].Email)
                peticionGet(response.data[0].Email);
            }
            else{
                console.log("no tiene tutor p pulpin")
                setDireccionUrl([{Foto:"./imagenes/perfil_blanco.png"}])
            }
            
        }).catch(error=>{
            console.log(error)
        })
    }
    const peticionGet=async(email)=>{
        await axios.get(baseUrlFoto+`/${email}`)
      .then(response=>{
        setDireccionUrl(response.data);
        
      }).catch(error=>{
        console.log(error);
      })
    }
    useEffect(()=>{
        peticionGetDatos();        
    },[])
    return (
        <div>
            <ViewTutorado nombrePage={"Tutor Asignado"}>
                <label><b>Datos del Tutor :</b></label>
                <div className='TadoTA_wrapper_foto'>
                    {
                        direccionUrl.map((foto)=>(
                            <img className="TadoTA_foto" src={foto.Foto} alt="" />
                        ))
                    }
                </div>
                {
                    data.map((dato=>(
                        <div className="TadoTA_wrapper_datos">
                            <div className="TadoTA_card_dato">
                                <AiIcons.AiOutlineIdcard className="TadoTA_iconCard"/>
                                <label className="TadoTA_label"> <h6>{dato.Nombres}  {dato.ApPaterno} {dato.ApMaterno}</h6></label>  
                            </div>
                            <div className="TadoTA_card_dato">
                                <MdIcons.MdOutlineAlternateEmail className="TadoTA_iconCard"/>
                                <label className="TadoTA_label"> <h6>{dato.Email}</h6></label>  
                            </div>
                            <div className="TadoTA_card_dato">
                                <BsIcons.BsGeoAlt className="TadoTA_iconCard"/>
                                <label className="TadoTA_label"> <h6> {dato.Direccion}</h6></label>  
                            </div>
                            <div className="TadoTA_card_dato">
                                <AiIcons.AiOutlinePhone className="TadoTA_iconCard"/>
                                <label className="TadoTA_label"> <h6>{dato.Celular}</h6></label>  
                            </div>                            
                        </div>  
                    )))
                }
                <label className="lblTuAsignado"><b>Solicitar Cambio de Tutor :</b></label>
                <div class="input-group" >
                    <span class="input-group-text">Ingrese el motivo :</span>
                    <textarea class="form-control" aria-label="With textarea" rows="6"></textarea>
                </div> 
                <div className='TadoTA_wrapper_btn'>
                    <button className="TadoTA_btn"><b>Enviar</b></button>
                </div>              
            </ViewTutorado>
        </div>
    )
}

export default TutoradoTutorAsignado
