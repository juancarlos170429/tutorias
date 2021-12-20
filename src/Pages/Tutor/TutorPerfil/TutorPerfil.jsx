import React ,{useState,useEffect}from 'react'
import './TutorPerfil.css'
import {Row,Col} from 'react-bootstrap'
import ViewTutor from '../../../Layouts/ViewTutor/ViewTutor'
import axios from 'axios'
import * as MdIcons from "react-icons/md"
import * as ImIcons from "react-icons/im"
import * as BiIcons from "react-icons/bi"
import * as FaIcons from "react-icons/fa"
import * as RiIcons from "react-icons/ri"
import * as AiIcons from "react-icons/ai"
import * as BsIcons from "react-icons/bs"
import Cookies from 'universal-cookie'
import {Modal,ModalBody,ModalFooter,ModalHeader} from 'reactstrap'
import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/storage'; 
const firebaseConfig = {
    apiKey: "AIzaSyCfKFX7pT4MbEqB4nyEI8ggR0G_MgTMWDY",
    authDomain: "tutoria-20626.firebaseapp.com",
    projectId: "tutoria-20626",
    storageBucket: "tutoria-20626.appspot.com",
    messagingSenderId: "937165411476",
    appId: "1:937165411476:web:98a591d8e8364ac51bd081",
    measurementId: "G-1D480E6ZDQ"
};
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
const TutorPerfil = (props) => {
    const[successView,setSuccessView]=useState(false);
    const abrirCerrarModalSuccess=()=>{
        setSuccessView(!successView);
    }
    const[errorView,setErrorview]=useState(false);
    const abrirCerrarModalError=()=>{
        setErrorview(!errorView);
      }
        
    const urlPass=`https://tutorias-api.herokuapp.com/UpPass`
    const [passNow,setPassNow]=useState('')
    const [passNew,setPassNew]=useState('')
    const putPass=async()=>{
        await axios.put(urlPass+`/${cookie.get('Email')}`,{ContraseniaAnt:passNow,ContraseniaNew:passNew})
        .then(response=>{
            return response.data;
        }).then(response=>{
            if(response.length>0){
               abrirCerrarModalError()
            }
            else{
                abrirCerrarModalSuccess()
            }
        })
        .catch(error=>{
            console.log(error)
        })
    }
    const baseUrl=`https://tutorias-api.herokuapp.com/FotoPerfil`;
    const[direccionUrl,setDireccionUrl]=useState([{
        Foto:"./imagenes/carga.gif"
    }])
    const[aux,setAux]=useState([{
        Foto:"./imagenes/FondoTadoPerfil.JPG"
    }])
    const[modalEditar,setModalEditar]=useState(false);
    const[modalEditarFoto,setModalEditarFoto]=useState(false);
    const abrirCerrarModalEditarFoto=()=>{
        setModalEditarFoto(!modalEditarFoto);
      }
    const abrirCerrarModalEditar=()=>{
        setModalEditar(!modalEditar);
      }
      const[modalEditarContra,setModalEditarContra]=useState(false);
      const abrirCerrarModalEditarContra=()=>{
          setModalEditarContra(!modalEditarContra);
        }
    // const prueba=()=>{
    //     console.log(aux)
    //     console.log(cookie.get('Email'))
    // }
    const peticionPut=async()=>{      
        await axios.put(baseUrl+`/${cookie.get('Email')}`,{
            Foto:aux
        }).then(response=>{
            abrirCerrarModalEditarFoto()
            console.log(aux)
        }).catch(error=>{
            console.log(error);
        })  
    }
    const cookie =new Cookies();
    const peticionGet=async()=>{
        await axios.get(baseUrl+`/${cookie.get('Email')}`)
      .then(response=>{
        setDireccionUrl(response.data);
        
      }).catch(error=>{
        console.log(error);
      })
    }
    let image=direccionUrl; 
    let referencia=cookie.get('Email')
    const handlechange=(e)=>{
        const file=e.target.files[0];
        const refe=firebase.storage().ref(`/profilephotos/${referencia}`);
        const task=refe.put(file);

        task.on('state_changed',snapshot =>{
            let porcentaje=(snapshot.bytesTransferred/snapshot.totalBytes)*100
        console.log(porcentaje)
        image=task.snapshot.getDownloadURL;
    
    })
    firebase.storage().ref(`/profilephotos/${referencia}`).getDownloadURL().then((url)=> {
        // `url` is the download URL for 'images/stars.jpg'
        // Or inserted into an <img> element:
        console.log("logro entrar")
        var imgw=document.getElementById('img')
        image=url;
        console.log(url)
        setAux(image)
        imgw.src=url;
      }).catch(function(error) {
        // Handle any errors
      });
       
   }
    useEffect(()=>{
        peticionGet();
        if (!cookie.get("CodDocente")) {
            props.history.push('/LoginTutor');
          }
    },[])
    return (
        <div>
            <ViewTutor nombrePage={"Mi Perfil"}>
            <img className="TutorP_portada"src="./imagenes/FondoTadoPerfil.JPG" alt="" />     
                <div className="TutorP_wrapper_datos">
                    <div className='TutorP_left'>
                        <img className="TutorP_sizephoto"src={direccionUrl[0].Foto} alt='some value'/>
                        <hr />
                        <div className="TutorP_name">
                            <label >  {cookie.get('Nombres')} {cookie.get('ApPaterno')+" "+cookie.get('ApMaterno')}</label>
                        </div>                        
                        <div className="TutorP_email">                                    
                            <label > {cookie.get('Email')}</label>
                        </div>
                        <div className="TutorP_email">
                            <label>Categoria : {cookie.get('Categoria')}</label>
                        </div>
                    </div>
                    <div className='TutorP_right'>
                        <div className="TutorP_datos">
                            <div className="TutorP_card_dato">
                                <AiIcons.AiOutlinePhone className="TutorP_iconCard"/>
                                <label className="TutorP_label"> <h6>{cookie.get('Celular')}</h6></label>  
                            </div>
                            <div className="TutorP_card_dato">
                                <AiIcons.AiOutlineIdcard className="TutorP_iconCard"/>
                                <label className="TutorP_label"> <h6>(DNI) - {cookie.get('DNI')}</h6></label>  
                            </div>
                            <div className="TutorP_card_dato">
                                <label ><b>Es Tutor :  </b></label>
                                <label className="TutorP_label"> <h6>{cookie.get('Estutor')}</h6></label>  
                            </div>
                            <div className="TutorP_card_dato">
                                <BsIcons.BsGeoAlt className="TutorP_iconCard"/>
                                <label className="TutorP_label"> <h6>{cookie.get('Direccion')}</h6></label>  
                            </div>
                        </div>
                        <div className="TutorP_opcions">
                            <AiIcons.AiFillCamera className="TutorP_btnFoto" onClick={()=>abrirCerrarModalEditarFoto()}/>
                            <button onClick={()=>abrirCerrarModalEditarContra()} className="TutorP_btnOpcion"  >
                                Editar contraseña 
                                <RiIcons.RiLockPasswordFill className="TutorP_icons"/>
                            </button>
                            <button onClick={()=>abrirCerrarModalEditar()} className="TutorP_btnOpcion">
                                Editar
                                <BiIcons.BiEdit className="TutorP_icons"/>
                            </button>
                        </div>
                    </div>
                </div> 
                <Modal isOpen={modalEditar} size="lg">
                    <ModalHeader>Editar datos</ModalHeader>
                    <ModalBody>
                    <div className="form-group">
                        <Row>
                            <Col>
                            <label>Codigo: </label>
                            <br/> 
                            <input type="text" className="form-control" value={cookie.get('CodAdmin')} name="IDEstudiante" readOnly />
                            <br/>
                            <label>Nombres: </label>
                            <br/> 
                            <input type="text" className="form-control"  value={cookie.get('Nombres')+cookie.get('ApPaterno')+" "+cookie.get('ApMaterno')} name="Nombres" readOnly />
                            <br/>
                            <label>DNI: </label>
                            <br/>
                            <input type="text" className="form-control" value={cookie.get('DNI')} name="dni" readOnly/>
                            <br/>
                
                            
              
                            </Col>
                            <Col>
                            
                            <label>Correo: </label>
                            <br/> 
                            <input type="email" className="form-control" value={cookie.get('Categoria')} name="correo" />
                            <br/>       
                            <label>Celular :</label>
                            <br />
                            <input type="text" className="form-control" value={cookie.get('Celular')} name="telefono" />
                            <br/>
                            <label htmlFor="">Direccion</label>
                            <input type="text" className="form-control" value={cookie.get('Direccion')} name="direccion"/>
                            </Col>
                        </Row>
                                         
                              
                    </div>
                    </ModalBody>
                    <ModalFooter>
                    <button className="TutorP_btnOpcion_modal" >Editar</button>{""}
                    <button className="TutorP_btnOpcion_modal" onClick={()=>abrirCerrarModalEditar()}>Cancelar</button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={modalEditarContra} centered>
                    <ModalHeader>Cambiar contraseña</ModalHeader>
                    <ModalBody>
                    <div className="form-group">
                        <Col>
                            <Row>
                            <Col>
                            <label> Ingrese contraseña actual</label>
                            <br/> 
                            <input type="text" className="form-control" name="IDEstudiante" onChange={ (e) => setPassNow(e.target.value)}/>
                            </Col> 
                            </Row>
                            <Row>
                            </Row>
                            <Row>
                            <Col className="mt-2">
                            <label>Ingrese contraseña nueva</label>
                            <br/> 
                            <input type="text" className="form-control" name="IDEstudiante" onChange={ (e) => setPassNew(e.target.value)}/>
                            <br/>
                            </Col>
                            </Row>
                        </Col>  
                    </div>
                    </ModalBody>
                    <ModalFooter>
                    <button className="TutorP_btnOpcion_modal" onClick={()=>putPass()}>Editar</button>{""}
                    <button className="TutorP_btnOpcion_modal" onClick={()=>abrirCerrarModalEditarContra()}>Cancelar</button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={modalEditarFoto} centered>
                    <ModalHeader>Elija la fotografia</ModalHeader>
                    <ModalBody>
                    <div className="form-group">
                        <Col>
                            <Row>
                            
                            <br/> 
                            <input type="file" onChange={handlechange}
                                        
                                    />
                            <br/>
                            </Row>
                        </Col>  
                    </div>
                    </ModalBody>
                    <ModalFooter>
                    <button className="TutorP_btnOpcion_modal" onClick={()=>peticionPut()} >Editar</button>{""}
                    <button className="TutorP_btnOpcion_modal " onClick={()=>abrirCerrarModalEditarFoto()}>Cancelar</button>
                    </ModalFooter>
                </Modal>
                <Modal  isOpen={successView} centered>
                    <ModalHeader>
                        <div className="text-center">
                            <FaIcons.FaCheckCircle className="logoEditContra1 "/>
                        </div>
                        <div className="text-center lblModalContra1">
                            <b>La contraseña se actualizo correctamente</b>
                        </div>
                    </ModalHeader>
                    <ModalFooter>
                    <ImIcons.ImCross onClick={()=>{abrirCerrarModalSuccess();abrirCerrarModalEditarContra();}}/>
                    </ModalFooter>
                </Modal>
                <Modal  isOpen={errorView} centered>
                    <ModalHeader>
                    <div className="text-center">
                            <MdIcons.MdError className="logoEditContra text-danger"/>
                        </div>
                        <div className="text-center lblModalContra">
                            <b>La contraseña actual no es correcta</b>
                        </div>
                    </ModalHeader>
                    <ModalFooter>
                    <ImIcons.ImCross onClick={()=>abrirCerrarModalError()}/>
                    </ModalFooter>
                </Modal>
            </ViewTutor>
        </div>
    )
}

export default TutorPerfil