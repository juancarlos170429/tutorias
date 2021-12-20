import React ,{useState,useEffect}from 'react'
import './AdminEstudiantes.css'
import * as XLSX from 'xlsx'
import axios from 'axios';
import { Row,Col } from 'react-bootstrap';
import * as ImIcons from "react-icons/im"
import {Modal,ModalBody,ModalFooter,ModalHeader} from 'reactstrap'
import ViewAdmin from '../../../Layouts/ViewAdmin/ViewAdmin'
const AdminEstudiantes = () => {
    const baseUrl=`https://tutorias-api.herokuapp.com/estudiantes`;
    const baseUrlExcel=`https://tutorias-api.herokuapp.com/estudiantesLista`;
    const[modalInsertar,setModalInsertar]=useState(false);
    const [codEstudiante, setCodEstudiante] = React.useState("");
    const [nombres, setNombres] = React.useState("");
    const [apPaterno, setApPaterno] = React.useState("");
    const [apMaterno, setApMaterno] = React.useState("");
    const [validate,setValidate]=useState([]);
    const [email,setEmail]=React.useState("");
    const [celular, setCelular] = React.useState("");
    const [direccion, setDireccion] = React.useState("");
    const [semestreIngreso, setSemestreIngreso]= React.useState("");
    const [warningView,setWarningview]=useState(false);
    const [excel,setExcel]=useState([
      {
        CODIGO:'',
        NOMBRES:''
      }
    ]
      )
      //*metodos para el api*/
    const[data,setData]=useState([]);
    const peticionGet=async()=>{
        await axios.get(baseUrl)
        .then(response=>{
          setData(response.data);
          
        }).catch(error=>{
          console.log(error);
        })
        
      } 
      const peticionPostExcel=async()=>{
        console.log(excel)
        await axios.post(baseUrlExcel,excel)
        .then(response=>{
        setData(data.concat(response.data));
        limpiar();
        document.getElementById('inputGroupFile04').value ='';
        }).catch(error=>{
        console.log(error);
        })
      }
      
      const peticionPost=async()=>{
        var a = [];
        if(!codEstudiante.trim()){
          a.push('Codigo Estudiante |')
        }
        if(!apPaterno.trim()){
          a.push(' apellido paterno |')
        }
        if(!apMaterno.trim()){
          a.push(' apellido materno |')
        }
        if(!email.trim()){
          a.push(' email  |')
        }
        if(!direccion.trim()){
          a.push(' direccion |')
        }
        if(!semestreIngreso.trim()){
          a.push(' semestre ingreso |')
        }     
        if(!(parseInt(celular)<=999999999 &&parseInt(celular)>=900000000) ||!celular.trim()){
          a.push(' celular ')
        }
        setValidate(a)
        if(a.length>0){
          setWarningview(true)
          return
        }
        // delete clienteSeleccionado.IdCliente;
        await axios.post(baseUrl,{CodEstudiante:codEstudiante,Nombres:nombres,ApPaterno:apPaterno,ApMaterno:apMaterno,Email:email,Direccion:direccion,Celular:celular, SemestreIngreso:semestreIngreso})
        .then(response=>{
            
          setData(data.concat(response.data));
          abrirCerrarModalInsertar();
            limpiar();
        }).catch(error=>{
          console.log(error);
        })
      }
    //const guardarExcel=()=>{
      //console.log(excel)
     //document.getElementById('inputGroupFile04').value =''; 
    //}
      const readExcel=(file)=>{
        const promise=new Promise((resolve,reject)=>{
            const fileReader=new FileReader();
            fileReader.readAsArrayBuffer(file)
            fileReader.onload=(e)=>{
                const bufferArray=e.target.result;
                const wb=XLSX.read(bufferArray,{type:'buffer'});

                const wsname=wb.SheetNames[0];

                const ws=wb.Sheets[wsname];
                const data=XLSX.utils.sheet_to_json(ws);
                resolve(data);
            };
            fileReader.onerror=((error)=>{
                reject(error);
            })
        })
        promise.then((d)=>{
            setExcel(d);
        })
    }
    const abrirCerrarModalInsertar=()=>{
        setModalInsertar(!modalInsertar);
      }

      const abrirCerrarModalWarning=()=>{
        setWarningview(!warningView);
      }
    const limpiar=()=>{
        setCodEstudiante('')
        setNombres('')
        setApPaterno('')
        setApMaterno('')
        setEmail('')
        setDireccion('')
        setCelular('')
        setSemestreIngreso('')
        setExcel([{
            CodEstudiante:'',
            Nombres:'',
            ApPaterno:'',
            ApMaterno:'',
            Email:'',
            Direccion:'',
            Celular:'',
            SemestreIngreso:''
          }])
    }
    useEffect(()=>{
        peticionGet();
        
    })
    return (
        <div>
            <ViewAdmin nombrePage={"Estudiantes"}>
                <h5>Lista de estudiantes:</h5>
                <div className="AE_wrapper_table">
                    <table className="table table-bordered bg-light ">
                       <thead style={{backgroundColor:'#85b7e9'}}>
                            <tr>
                                <th>Código</th>
                                <th>Nombres</th>
                                <th>Apellidos</th>
                                <th>Email</th>
                                <th>Direccion</th>
                                <th>Telefono</th>
                                <th>Semestre</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            data.map((estudiante,index)=>(
                                <tr key={index}>
                                    <td>{estudiante.CodEstudiante}</td>
                                    <td>{estudiante.Nombres}</td>
                                    <td>{estudiante.ApPaterno},{estudiante.ApMaterno}</td>
                                    <td>{estudiante.Email}</td>
                                    <td>{estudiante.Direccion}</td>                                            
                                    <td>{estudiante.Celular}</td>
                                    <td>{estudiante.SemestreIngreso}</td>
                                </tr>
                            ))
                        }                                        
                        </tbody>
                    </table> 
                </div>
                <button className="AE_btnAgregar" onClick={()=>abrirCerrarModalInsertar()}> <b>Agregar estudiante</b></button> 
                <div class="input-group">
                    <input type="file"  
                    className="form-control" 
                    id="inputGroupFile04" 
                    aria-describedby="inputGroupFileAddon04" 
                    aria-label="Upload"
                    onChange={(e)=>{
                        const file=e.target.files[0];
                        readExcel(file);}}                         
                    />
                    <button className="AE_importar" type="button" id="inputGroupFileAddon04"onClick={()=>peticionPostExcel()}>Importar</button>
                </div>
                <Modal isOpen={warningView} centered>
                    <ModalHeader>
                      <ImIcons.ImWarning /> el/los campo(s) : {validate} no esta(n) correctamente llenado(s) 
                    </ModalHeader>
                    <ModalFooter>
                    <ImIcons.ImCross onClick={()=>abrirCerrarModalWarning()}/>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={modalInsertar} size="lg" centered>
                    <ModalHeader>Insertar estudiante de base de datos</ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <Row>
                                <Col>
                                    <label>Codigo: </label>
                                    <br/> 
                                    <input type="text" className="form-control" name="CodEstudiante" onChange={ (e) => setCodEstudiante(e.target.value)}/>
                                    <br/>
                                    <label>Nombre: </label>
                                    <br/> 
                                    <input type="text" className="form-control" name="Nombres" onChange={ (e) => setNombres(e.target.value)}/>
                                    <br/>
                                    <label>Apellido Paterno: </label>
                                    <br/>
                                    <input type="text" className="form-control" name="ApPaterno"onChange={ (e) => setApPaterno(e.target.value)}/>
                                    <br/>
                                    <label>Apellido Materno: </label>
                                    <br/> 
                                    <input type="text" className="form-control" name="ApMaterno" onChange={ (e) => setApMaterno(e.target.value)}/>
                                    <br/>
                                </Col>
                                <Col>
                                    <label>Email: </label>
                                    <br/> 
                                    <input type="text" className="form-control" name="Email" onChange={ (e) => setEmail(e.target.value)}/>
                                    <br/>
                                    <label>Direccion: </label>
                                    <br/> 
                                    <input type="text" className="form-control" name="Direccion" onChange={ (e) => setDireccion(e.target.value)}/>
                                    <br/>
                                    <label>Celular: </label>
                                    <br/> 
                                    <input type="text" className="form-control" name="Celular" onChange={ (e) => setCelular(e.target.value)}/>
                                    <br/>
                                    <label>Semestre de Ingreso: </label>
                                    <br/> 
                                    <input type="text" className="form-control" name="SemestreIngreso" onChange={ (e) => setSemestreIngreso(e.target.value)}/>
                                    <br/>           
                                </Col>
                            </Row>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className="AE_btnopcions" onClick={()=>peticionPost()} >Insertar</button>{""}
                        <button className="AE_btnopcions" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>
                    </ModalFooter>
                </Modal>
            </ViewAdmin>
        </div>
    )
}

export default AdminEstudiantes
