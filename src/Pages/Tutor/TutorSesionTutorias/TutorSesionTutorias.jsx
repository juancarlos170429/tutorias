import React ,{useEffect,useState}from 'react'
import { Col, Row } from "react-bootstrap";
import './TutorSesionTutorias.css'
import ViewTutor from '../../../Layouts/ViewTutor/ViewTutor'
import { makeStyles } from "@material-ui/core/styles";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import Cookies from 'universal-cookie/es6';
import axios from "axios";
import * as ImIcons from "react-icons/im"
import {Link} from "react-router-dom"
import * as IconName from "react-icons/fa";
const defaultState = {
    Descripcion: ""  
  };
  
  
  
  
  function Map(id,descr){
    var lista = []
      descr.forEach((elemento)=>{
        if(elemento.IdSesion==id){
          lista.push(elemento)
        } 
      }
    )
    return lista
  }
  
  function Rowe({ onChange, onRemove, area, option }) {
    
    const [descount,setdescount]=useState(0);
    
    return (
      <div>
        <input
          placeholder="Ingrese la descripción de la sesión"
          className="form-control"
          value={area}
          maxLength="150"
          onChange={e => {onChange("area", e.target.value)
          let text=e.target.value   
          let contador=text.length
          setdescount(contador)         
        
        }}
        />
         <label style={{display:"flex",justifyContent:"end",}} className="form-label">
                    <h6 style={{fontSize:"12px",paddingTop:"12px",paddingLeft:"6px"}} >{descount}/150</h6>
                    </label>
        <button onClick={onRemove} className="TutorST_btn_con__delete-descripcion">      
          <span className="TutorST_icon__delete-descripcion"><IconName.FaRegTrashAlt /></span>
        </button>
       
      </div>
    );
  }
  
  function RoweUpdate({ onChange, onRemove, value, option }) {
    
    const [descount,setdescount]=useState(0);
    //console.log("area")
    //console.log(area)
    return (
      <div>
        <input
          placeholder="Ingrese la descripción de la sesión"
          className="form-control"
          defaultValue={value}
          maxLength="150"
          onChange={e => {onChange("Descripcion", e.target.value)
          let text=e.target.value   
          let contador=text.length
          setdescount(contador)         
        }}
        />
        <button onClick={onRemove}>      
          <span className="icon__delete-descripcion"><IconName.FaRegTrashAlt className="icon__delete-descripcion"/></span>
        </button>
       
      </div>
    );
  }
  
  var moment = require('moment');
  
  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      flexWrap: "wrap",
      marginLeft: theme.spacing(5),
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));
  
  function inputsToArray(inputs) {
    var arr = [];
    for (var i = 0; i < inputs.length; i++) {
       if (inputs[i].checked)
          arr.push(inputs[i].value);
    }
    return arr;
  }
  
  //-------------------------------------------
  const TutorSesionTutorias = (props) => {
    const cookie = new Cookies();
  
    const codigoDocente = cookie.get('CodDocente');
  
    const classes = useStyles();
    const[flag,setFlag]=useState(0);
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const [sesiones, setSesiones] = useState([]);
    const [descount,setdescount]=useState(0);
    const [obscount,setobscount]=useState(0);
    const [idFichaTutoria, setIdFichaTutoria] = useState("");
    const [semestre, setSemestre] = useState("2021-2");
    const [fecha, setFecha] = useState("");
    const [tipoTutoria, setTipoTutoria] = useState("Académica");
    const [descripcion, setDescripcion] = useState("");
    const [observaciones, setObservaciones] = useState("");
    const [observacionesActualizadas, setObservacionesActualizadas] = useState("");
    const [referencias, setReferencias] = useState("");
    const [codDocente, setCodDocente] = useState(cookie.get("CodDocente"));
    const [modalInsertar, setModalInsertar] = useState(false);
    const [mostrar,setMostrar]=useState(false);
    const [modalVerSesion, setModalVerSesion] = useState(false);
    const abrirCerrarMostrar=()=>{setMostrar(!mostrar)}
    const[warningView,setWarningview]=useState(false);
    const[descripciones,setDescripciones] = useState([])
    const[descripcionesGeneral, setDescripcionesGeneral] = useState([])
    const[idSesion, setIdSesion] = useState("");
    const [check1,setCheck1]=useState(false)
    const [check2,setCheck2]=useState(false)
    const [check3,setCheck3]=useState(false)
    
    const [btnValue,setBtnValue]=useState(false)
    const url=`https://tutorias-api.herokuapp.com/Conf/Observacion`
  
    //-------------------------------
    const [rows, setRows] = useState([defaultState]);
    const [rowsUpdate, setRowsUpdate] = useState([defaultState]);
    const handleOnChange = (index, name, value) => {
      const copyRows = [...rows];
      copyRows[index] = {
        ...copyRows[index],
        [name]: value
      };
      setRows(copyRows);
    };
    const handleOnChangeUpdate = (index, name, value) => {
      const copyRows2 = [...rowsUpdate];
      copyRows2[index] = {
        ...copyRows2[index],
        [name]: value
      };
      setRowsUpdate(copyRows2);
    };
  
    const handleOnAdd = () => {
      setRows(rows.concat(defaultState));
    };
    const handleOnAddUpdate = () => {
      setRowsUpdate(rowsUpdate.concat(defaultState));
    };
  
    const handleOnRemove = index => {
      const copyRows = [...rows];
      copyRows.splice(index, 1);
      setRows(copyRows);
    };
  
    const handleOnRemoveUpdate = index => {
      const copyRows2 = [...rowsUpdate];
      copyRows2.splice(index, 1);
      setRowsUpdate(copyRows2);
    };
  
    //-------------------------------
    
    const getInfo=async(ses,index)=>{
      await axios.get(url+`/${ses}`)
      .then(response=>{
        return response.data;
      }).then(response=>{
              if(response.length>0){
                 abrirCerrarMostrar()
                 if(mostrar){
                  document.getElementById("inputmal"+index).value="******************-"
                  document.getElementById("btnVerDatos"+index).innerText="Ver datos privados"
                 }
                 else{
                  document.getElementById("inputmal"+index).value=response[0].Observacion
                  document.getElementById("btnVerDatos"+index).innerText="Ocultar datos"
                 }
              }
              else{
                abrirCerrarMostrar()
                if(mostrar){
                  document.getElementById("inputmal"+index).value="******************"
                  document.getElementById("btnVerDatos"+index).innerText="Ver datos privados"
                 }
                 else{
                  document.getElementById("inputmal"+index).value="SU TUTORADO NO LE DIO ACCESO A ESTA INFORMACION"
                  document.getElementById("btnVerDatos"+index).innerText="Ocultar datos "
                 }
                
              }
          })
      .catch(error=>{
        console.log(error);
      })
    }
  
    const abrirCerrarModalWarning=()=>{
      setWarningview(!warningView);
  }
    const limpiar = () => {
      setTipoTutoria("Académica");
      setDescripcion("");
      setObservaciones("");
      setFecha("");
      setDescripciones([]);
      
    };
    const baseUrl = `https://tutorias-api.herokuapp.com/fichas/asignacion/${codDocente}`;
    const peticionGet = async () => {
      await axios
        .get(baseUrl)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      setFlag(flag+1)
    };
  
    const peticionGetDescripcionesGeneral= async (id) => {
      await axios
        .get(`https://tutorias-api.herokuapp.com/descripciones/ficha/${id}`)
        .then((response) => {
          setDescripcionesGeneral(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
        setFlag(flag+1)
    };
  
    const baseUrlSesiones = `https://tutorias-api.herokuapp.com/sesiones`;
    const baseUrlDescripciones=`https://tutorias-api.herokuapp.com/descripcionesLista`
    const peticionPost = async (id,fecha,referencias) => {
      await axios
        .post(baseUrlSesiones, {
          IdSesion:id,
          IdFichaTutoria:idFicha_,
          Fecha: fecha,
          TipoTutoria: tipoTutoria,
          Semestre: semestre,
          Observaciones: observaciones,
          Referencias: referencias,
          CodDocente: codigoDocente
        })
        .then((response) => {
          setSesiones(sesiones.concat(response.data));
          limpiar();
          abrirCerrarModalInsertar();
        })
        .catch((error) => {
          setWarningview(true);
          console.log(error);
        });
    };
    const peticionPut = async (id, refs) => {
      const baseUrlUpdateSesiones = `https://tutorias-api.herokuapp.com/sesiones/${id}`;
      //console.log(id)
      //console.log(tipoTutoria)
      //console.log(observaciones)
      //console.log(refs)
      await axios
        .put(baseUrlUpdateSesiones, {
          TipoTutoria: tipoTutoria,
          Observaciones: observaciones,
          Referencias: refs,
        })
        .then((response) => {
          limpiar();
          abrirCerrarModalVerSesion();
        })
        .catch((error) => {
          setWarningview(true);
          console.log(error);
        });
    }; 
    const peticionBorrarDescripciones = async(id) =>{
      const baseUrlBorrarDescripciones = `https://tutorias-api.herokuapp.com/descripciones/borrar/${id}`;
      console.log(baseUrlBorrarDescripciones)
      await axios
        .delete(baseUrlBorrarDescripciones)
        .then(() => {
          console.log('ya borre')
        })
        .catch((error) => {
          setWarningview(true);
          console.log(error);
        });
    }
    const crearIDSesion=()=>{
      var registro = new Date();
      var codigoDocente=cookie.get("CodDocente")
      var id=`S${codigoDocente}${registro.getFullYear()}${registro.getMonth()}${registro.getDate()}${registro.getHours()}${registro.getMinutes()}${registro.getSeconds()}`
      return id
    }
    const peticionPostDescripcion=async(id)=>{
      var aux=[]
      for(let i=0;i<rows.length;i++){
        aux.push({IdSesion:id,Descripcion:rows[i].area,Visibilidad:1})
      }
      console.log(aux)
      await axios.post(baseUrlDescripciones,aux)
      .then((response) => {
      })
      .catch((error) => {
        setWarningview(true);
        console.log(error);
      });
    }
  
    const peticionPostDescripcionUpdate=async(id)=>{
      var aux=[]
      for(let i=0;i<rowsUpdate.length;i++){   
        aux.push({IdSesion:id,Descripcion:rowsUpdate[i].Descripcion,Visibilidad:1})
      }
      console.log(rowsUpdate)
      console.log("soy el aux uwu")
      console.log(aux)
      await axios.post(baseUrlDescripciones,aux)
      .then((response) => {
        limpiar();
        abrirCerrarModalVerSesion();
      })
      .catch((error) => {
        setWarningview(true);
        console.log(error);
      });
    }
    const peticionSesiones = async (id) => {
      await axios
        .get(`https://tutorias-api.herokuapp.com/sesiones/ficha/${id}`)
        .then((response) => {
  
          setSesiones(response.data);
          
        })
        .catch((error) => {
          console.log(error);
        });
        setFlag(flag+1)
    };
    
    const getSesion = (id) => {
      sesiones.forEach((elemento)=>{
        if(elemento.IdSesion==id){
          setSemestre(elemento.Semestre);
          setFecha(elemento.Fecha);
          setTipoTutoria(elemento.TipoTutoria);
          setDescripcion(elemento.Descripcion);
          setObservaciones(elemento.Observaciones);
          setReferencias(elemento.Referencias)
        }
      })
    }
    // Recuperar checkbox marcados
    const recuperarRefs = ()=>{
      var refsList = []
      if(modalInsertar){
        var refs = document.querySelectorAll('input[type=checkbox]')
        for(var checkbox of refs){
            if(checkbox.checked == true){
              refsList.push(checkbox.value)
            }
            else{
              refsList = refsList.filter(e => e !== checkbox.value);
            }
          }
        }
      return refsList
    }
    const recuperarRefsUpdate = ()=>{
      var refsList = []
      if(modalVerSesion){
        var refs = document.querySelectorAll('input[type=checkbox]')
        //console.log(refs)
        for(var checkbox of refs){
            if(checkbox.checked == true){
              refsList.push(checkbox.value)
            }
            else{
              refsList = refsList.filter(e => e !== checkbox.value);
            }
          }
        }
      return refsList
    }
    
    const verificarInputs=()=>{
    }
    const chck1=()=>{
      setCheck1(!check1)
    }
    const chck2=()=>{
      setCheck2(!check2)
    }
    const chck3=()=>{
      setCheck3(!check3)
    }
    //--------------------------------------------------------------------------------------------------------
    const verifier=()=>{
      if(observaciones!=""&&chck1!=false&&chck2!=false&&chck3!=false&&rows.length>1){
        setBtnValue(false)
      }
      else{
        setBtnValue(true)
      }
  
    }
    
    const verifier_input=()=>{
      // true: si tiene defectos , false: no tiene defectos
      var bandera = true;
  
      if (rows.length >= 1){
        var contador = 0;
        for (var i = 0 ; i < rows.length; i ++ ){
          if (rows[i].area.trim() === ""){
            contador = contador + 1;
          }
        }
        if (contador === 0){
          bandera = false;
        }
      }
      
      return bandera;
      
    }
  //----------------POST SESION Y VALIDACIONES
  
    const postGeneral=async()=>{
      var id = crearIDSesion()
      var fecha = new Date().toISOString()
      var referen = recuperarRefs()
      const textRef = referen.join('-')
      if (observaciones==="" || verifier_input()===true){
        setWarningview(true);
      }
      else{
        await peticionPost(id,fecha,textRef);
        await peticionPostDescripcion(id);
  
        limpiarSesion(2)
        setFlag(0)
      }    
      // window.location.reload();
    }
    const putGeneral=async(id)=>{
      var referenciasUpdate = recuperarRefsUpdate()
      const refsUpdate = referenciasUpdate.join('-')
      if (observaciones===""){
        console.log(observaciones)
        setWarningview(true);
      }
      else{
        await peticionPut(id,refsUpdate);
        await peticionBorrarDescripciones(id);
        await peticionPostDescripcionUpdate(id);
        limpiarSesion(2)
        setFlag(0)
      }    
      // window.location.reload();
    }
  
    const limpiarSesion=(op)=>{
      if(op===1){
        setObservaciones("")
      setCheck1(false)
      setCheck2(false)
      setCheck3(false)
      setRows([defaultState])
      setBtnValue(false)
      abrirCerrarModalInsertar()
      }
      else{
        setObservaciones("")
      setCheck1(false)
      setCheck2(false)
      setCheck3(false)
      setRows([defaultState])
      setBtnValue(false)
      }
    }
    const peticionGetDescripciones = async (id) => {
      await axios
        .get(`https://tutorias-api.herokuapp.com/descripciones/${id}`)
        .then((response) => {
          setDescripciones(response.data);
          setRowsUpdate(response.data)
          console.log(rowsUpdate)
        })
        .catch((error) => {
          console.log(error);
        });
    };
    useEffect(() => {
      //peticionSesiones();
      if (!cookie.get("CodDocente")) {
        props.history.push('/LoginTutor');
      }
      if(flag<3){
        peticionGet();  
        peticionSesiones(idFicha_);
        peticionGetDescripcionesGeneral(idFicha_);
      }
    },[postGeneral]);
    const abrirCerrarModalInsertar = () => {
      setModalInsertar(!modalInsertar);
    };
    const abrirCerrarModalVerSesion = (id) => {
      console.log(id)
      getSesion(id);
      peticionGetDescripciones(id)
      setIdSesion(id)
      setModalVerSesion(!modalVerSesion);
    };
    const { searchParams } = new URL(window.location.href);
    const idFicha_ = searchParams.get("id");
    const nombres = searchParams.get("nombres");
    const apellidos=`${searchParams.get("apPaterno")} ${searchParams.get("apMaterno")}`
    return (
        <div>
            <ViewTutor>
                <h5> Sesiones de {nombres} {apellidos}</h5>
                <div className="TutorST_wrapper_opcions">
                  <div className="TutorST_opcions">
                    <Link to="/Tutor_Registrar_Ficha_Tutoria" style={{ textDecoration: 'none' }}> 
                      <button className="TutorST_btn_back">
                        <b>Regresar</b>
                      </button>
                    </Link>
                    <button 
                      onClick={() => {abrirCerrarModalInsertar();verificarInputs()}}
                      className={btnValue?"TutorST_btn_Continuar":"TutorST_btn_Nuevo"}>
                          <b>{btnValue?"Continuar Sesión":"Nueva Sesión"}</b>
                    </button>
                  </div>
                </div>
                <div className="TutorST_wrapper_sesiones">
                { 
                  sesiones.map((obj,index) => (
                  <div className="TutorST_sesion">
                  <Row className = "w-100">
                  <Col className = "col-4">
                 
                  <b>Semestre</b>
                        <input
                          type="text"
                          className="form-control"
                          name="Semestre"
                          value={obj.Semestre}
                          readOnly
                        />

                  <b>Fecha</b>
                        <input
                          type="text"
                          className="form-control"
                          name="Fecha"
                          value={moment(obj.Fecha).format("DD/MM/YYYY")} readOnly
                        />

                  <b>Tipo de tutoria</b>
                        <input
                          type="text"
                          className="form-control"
                          name="TipoTutoria"
                          value={obj.TipoTutoria}
                          readOnly
                        />

                  <b>Referencias</b>
                        <input
                          type="text"
                          className="form-control"
                          name="Referencias"
                          value={obj.Referencias}
                          readOnly
                        />

                  </Col>
                  <Col className = "col-8">

                  <b>Descripciones</b>
                  {
                      Map(obj.IdSesion, descripcionesGeneral).map((descripcion, index) => (
                        <div className="mb-2">
                        <input
                          className="form-control"
                          value={descripcion.Descripcion}
                          readonly=""          
                        />  
                      </div>
                     ))
                  }

                  <b>Observaciones</b>
                  <textarea 
                          type="text"
                          className="form-control"
                          name="Referencias"
                          value = { (obj.CodDocente === codigoDocente) ? obj.Observaciones : "No tiene acceso a esta información"}
                          rows= "3"
                          readOnly
                  />

                  <button
                    onClick={() => {abrirCerrarModalVerSesion(obj.IdSesion)}}
                    className={ (obj.CodDocente === codigoDocente) ? "TutorST_btn_back mt-2":"TutorST_btn_Ocultar"}
                  >
                    <b>{"Editar Sesión"}</b>
                  </button>
                  </Col>
                  </Row>
                  </div>
                ))}
                </div>
                <Modal
                    isOpen={modalInsertar}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                  >
                    <ModalHeader>Nueva sesión</ModalHeader>

                    <ModalBody>
                      <Col>
                        <Row>
                          <Row>
                            <Col>
                              <Row>
                                <Col className="col-3">
                                  <h6 className="TutorST_titulos">Semestre: </h6>
                                </Col>
                                <Col className="col-3">
                                  <input
                                    type="text"
                                    name="Semestre"
                                    className="form-control input-sm"
                                    value={semestre}
                                    readonly=""
                                  />
                                </Col>
                                <Col className="col-3">
                                  <h6 className="TutorST_titulos" >Tipo de Tutoría :</h6>
                                </Col>

                                <Col className="col-3">
                                  <select
                                    className="form-select form-select-sm"
                                    aria-label=".form-select-sm example"
                                    onChange={(e) => setTipoTutoria(e.target.value)}
                                  >
                                    <option value="Académica">Académica</option>
                                    <option value="Personal">Personal</option>
                                    <option value="Profesional">Profesional</option>
                                  </select>
                                </Col>
                                
                              </Row>
                            </Col>
                          </Row>
                        </Row>
                        <hr/>
                        <Row>
                          <Col>
                            <label for="exampleFormControlTextarea1" className="form-label">
                              <b>Descripciones : </b><label className="TutorST_label-descripcion"> (Información genérica de la sesión, será mostrada a otros docentes y el tutorando)</label>
                            </label>
                            <div className="TutorST_Descrip">
                              {rows.map((row, index) => (
                                <Rowe
                                  {...row}
                                  onChange={(name, value) => handleOnChange(index, name, value)}
                                  onRemove={() => handleOnRemove(index)}
                                  key={index}
                                  
                                />
                              ))}
                              <div className="TutorST_wrapper_add_desc">
                                <button onClick={handleOnAdd} className= "TutorST_agregar-descripcion">
                                    Agregar       
                                </button>
                              </div>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <label for="exampleFormControlTextarea1" className="form-label mt-2">
                              <b>Observación : </b> <label className="TutorST_label-observaciones"> (Información privada y sensible del alumno, será manejada solo por usted )</label>
                            </label>
                            <textarea
                              placeholder="Ingrese las observaciones de la sesión"
                              onChange={(e) => {setObservaciones(e.target.value) 
                                let text=e.target.value            
                                setobscount(text.length) }}
                              className="form-control"
                              id="exampleFormControlTextarea1"
                              rows="2"
                              value={observaciones}
                              maxlength="1000"
                            ></textarea>
                            <label style={{display:"flex",justifyContent:"end",marginBottom:"0"}} className="form-label">
                              <h6 style={{fontSize:"12px",paddingTop:"3px"}} >{obscount}/1000</h6>
                              </label>
                          </Col>
                        </Row>

                        <Row>
                          <label for="exampleFormControlTextarea1" className="form-label mt-2">
                              <b>Referencias : </b>
                          </label>
                        </Row>
                        <div id="referencias">
                          <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="Psicologia" value="Psicología" checked={check1?true:false} onChange={chck1} />
                            <label className="form-check-label" for="Psicología">Psicología</label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="Bienestar Estudiantil" value="Bienestar Estudiantil"checked={check2?true:false} onChange={chck2}/>
                            <label className="form-check-label" for="Bienestar Estudiantil">Bienestar Estudiantil</label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="Directora de Escuela" value="Directora de Escuela"checked={check3?true:false} onChange={chck3}/>
                            <label className="form-check-label" for="Directora de Escuela">Directora de Escuela</label>
                          </div>
                        </div>
                        
                      </Col>
                    </ModalBody>
                    <ModalFooter>
                        {/* <div className="label_limpiar">
                          hola
                        </div>
                        <div className="label_guardar">
                          hola 2
                        </div>
                        <div className="label_cancelar">
                          hola 3
                        </div> */}
                    <button
                        className="TutorST_btn_modal mx-2"
                        onClick={() => {
                          limpiarSesion(1);
                        }}
                      >
                        Cerrar y Limpiar
                      </button>
                      <button
                        className="TutorST_btn_modal mx-2"
                        onClick={() => {
                          postGeneral();
                        }}
                      >
                        Insertar
                      </button>
                      <button
                        className="TutorST_btn_modal mx-2"
                        onClick={() => {abrirCerrarModalInsertar();verifier()}}
                      >
                        Cancelar
                      </button>
                    </ModalFooter>
                  </Modal>
                  <div>
                    
                  <Modal
                    isOpen={modalVerSesion}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                  >
                  <ModalHeader>Sesion</ModalHeader>
                    <ModalBody>
                        <div>
                        <Col>
                          <Row>
                            <Row>
                              <Col>
                                <Row>
                                  <Col className="col-2">
                                    <h6 className="TutorST_titulos">Semestre: </h6>
                                  </Col>
                                  <Col className="col-4">
                                    <input
                                      type="text"
                                      name="Semestre"
                                      className="form-control input-sm"
                                      value={semestre}
                                      readonly=""
                                    />
                                  </Col>
                                  <Col className="col-2">
                                    <h6 className="TutorST_titulos" >Tipo Tutoria :</h6>
                                  </Col>
                                  <Col className="col-4">
                                    <select
                                      className="form-select form-select-sm"
                                      aria-label=".form-select-sm example"
                                      onChange={(e) => setTipoTutoria(e.target.value)}
                                      value={tipoTutoria}
                                    >
                                      <option value="Académica">Académica</option>
                                      <option value="Personal">Personal</option>
                                      <option value="Profesional">Profesional</option>
                                    </select>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
              
                            <Row className="mt-2">
                              <Col className="col-2">
                                <h6 className="TutorST_titulos">Fecha :</h6>
                              </Col>
                              <Col className="col-4">
                                <form className={classes.container} noValidate>
                                  <div>
                                    <input
                                    type="text"
                                    className="form-control input -sm"
                                    name="Fecha"
                                    value={moment(fecha).format("DD/MM/YYYY")}
                                    readonly = ""
                                    />
                                  </div>
                                </form>
                              </Col>
                            </Row>
                          </Row>
                          <hr/>
                          <Row>
                          <Col>
                            <label for="exampleFormControlTextarea1" className="form-label">
                              <b>Descripciones : </b><label className="label-descripcion"> (Información genérica de la sesión, será mostrada a otros docentes y el tutorando)</label>
                            </label>
                              <div className="App">
                              {rowsUpdate.map((row, index) => (
                                  <RoweUpdate
                                  {...row}
                                  onChange={(name, value) => handleOnChangeUpdate(index, name, value)}
                                  onRemove={() => handleOnRemoveUpdate(index)}
                                  value = {row.Descripcion}
                                  key={index}
                                  />
                                  ))}
                                  <button onClick={handleOnAddUpdate} className= "agregar-descripcion">
                                      Agregar       
                                  </button>        
                            </div>
                          </Col>
                        </Row>
                          <Row>
                            <Col>
                            <label for="exampleFormControlTextarea1" className="form-label mt-2">
                              <b>Observación : </b> <label className="label-observaciones"> (Información privada y sensible del alumno, será manejada solo por usted )</label>
                            </label>
                              <input
                                value = {observaciones}
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                rows="2"
                                onChange={(e)=>{
                                  setObservaciones(e.target.value)}}
                              ></input>
                            </Col>
                          </Row>
                        </Col>
                        <Col>
                        <Row>
                          <label for="exampleFormControlTextarea1" className="form-label mt-2">
                              <b>Referencias : </b>
                          </label>
                        </Row>
                        <div id="referencias">
                          <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="Psicologia" value="Psicología" checked={check1?true:false} onChange={chck1} />
                            <label className="form-check-label" for="Psicología">Psicología</label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="Bienestar Estudiantil" value="Bienestar Estudiantil"checked={check2?true:false} onChange={chck2}/>
                            <label className="form-check-label" for="Bienestar Estudiantil">Bienestar Estudiantil</label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="Directora de Escuela" value="Directora de Escuela"checked={check3?true:false} onChange={chck3}/>
                            <label className="form-check-label" for="Directora de Escuela">Directora de Escuela</label>
                          </div>
                        </div>
                        </Col>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                      <button
                        className="btnColoG mx-2"
                        onClick={() => {
                          putGeneral(idSesion);
                        }}
                      >
                        Actualizar
                      </button>
                      <button
                        className="btnColoC mx-2"
                        onClick={() => abrirCerrarModalVerSesion()}
                      >
                        Salir
                      </button>
                    </ModalFooter>
                  </Modal>


                  </div>
                  <Modal isOpen={warningView} centered>

                      <ModalHeader>
                          <ImIcons.ImWarning /> Algun(os) de los campos no esta(n) correctamente llenado(s) 
                      </ModalHeader>
                    
                      <ModalFooter>
                      <ImIcons.ImCross onClick={()=>abrirCerrarModalWarning()}/>
                      </ModalFooter>
                  </Modal>
            </ViewTutor>
        </div>
    )
}

export default TutorSesionTutorias
