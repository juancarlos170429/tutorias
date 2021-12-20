import React ,{ useState,useEffect}from 'react'
import axios from 'axios'
import ViewAdmin from '../../../Layouts/ViewAdmin/ViewAdmin'
import "./AsignarTutor.css"
import * as XLSX from 'xlsx'
import * as ImIcons from "react-icons/im"
import * as FaIcons from "react-icons/fa"
import {Modal,ModalBody,ModalFooter,ModalHeader} from 'reactstrap'  
const AsignarTutor = () => {
    const baseUrlEstudiantes=`https://tutorias-api.herokuapp.com/estudiantes`;
    const baseUrlTutores=`https://tutorias-api.herokuapp.com/tutores`;
    const baseUrlAsignaciones=`https://tutorias-api.herokuapp.com/asignaciones`;
    const baseUrlAsignacionesList=`https://tutorias-api.herokuapp.com/Listasignaciones`;
    const [estudiantesList,setEstudiantesList]=useState([])
    const[data,setData]=useState([]);
    const[codEstudiante,setCodEstudiante]=useState('Codigo estudiante')
    const[codDocente,setCodDocente]=useState('Codigo docente')
    const[estudiantes,setEstudiantes]=useState([])
    const [tutoresList,setTutoresList]=useState([])
    const [semestre, setSemestre] =useState('Elija el semestre')
    const listaSemestres=["2017-I","2017-II","2018-I","2018-II","2019-I","2019-II","2020-I","2020-II"]
    const [warningView,setWarningview]=useState(false);
    const[modalInsertar,setModalInsertar]=useState(false);
    const[excel,setExcel]=useState([{
      CODIGO:'',
      NOMBRES:''
    }]);
    const baseUrlExcel=`https://tutorias-api.herokuapp.com/asignacionesLista`
    const peticionPostExcel=async()=>{
      await axios.post(baseUrlExcel,excel)
      .then(response=>{
      setData(data.concat(response.data));
      
      document.getElementById('inputGroupFile04').value ='';
      }).catch(error=>{
      console.log(error);
      })
    }
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
    //const[aleatorio,setAleatorio]=useState([]);
    const abrirCerrarModalInsertar=()=>{
        
        setModalInsertar(!modalInsertar);
      }
    const abrirCerrarModalWarning=()=>{
        setWarningview(!warningView);
      }
    

    const peticionGetAsignaciones=async()=>{
      await axios.get(baseUrlAsignaciones)
      .then(response=>{
        setData(response.data);
      }).catch(error=>{
        console.log(error);
      })
    }
    const peticionPostAsignarAlea=async(lista)=>{
      await axios.post(baseUrlAsignacionesList,lista)
        .then(response=>{
          setData(data.concat(response.data));
        }).catch(error=>{
          console.log(error);
        })
    }
    const peticionPostAsignar=async()=>{
      await axios.post(baseUrlAsignaciones,{CodDocente:codDocente,CodEstudiante:codEstudiante})
        .then(response=>{
          setData(data.concat(response.data));
          abrirCerrarModalInsertar();
        }).catch(error=>{
          console.log(error);
        })
    }
    const peticionGetEstudiantesSemestre=async(sem)=>{
        await axios.get(baseUrlEstudiantes+`/semestre/${sem}`)
        .then(response=>{
          setEstudiantesList(response.data);
          console.log(estudiantesList)
        }).catch(error=>{
          console.log(error);
        })
        
      } 
      const peticionGetTutores=async()=>{
        await axios.get(baseUrlTutores)
        .then(response=>{
          setTutoresList(response.data);
          
        }).catch(error=>{
          console.log(error);
        })
        
      } 
      const peticionGetEstudiantes=async()=>{
        await axios.get(baseUrlEstudiantes)
        .then(response=>{
          setEstudiantes(response.data);
          
        }).catch(error=>{
          console.log(error);
        })
        
      } 
      
    const HallarAlumnosxCurso=(sem)=>{
         peticionGetEstudiantesSemestre(sem);
         peticionGetTutores();
        console.log(semestre)
        console.log(sem)
        let elemento = document.getElementById("drop");
        elemento.blur();
    }
    const prueba=()=>{
        const Lista=[]
        console.log(estudiantesList)
        console.log(tutoresList)
        setSemestre('elija el semestre')
        var Est=estudiantesList.length 
        var Tut=tutoresList.length
        console.log(Est)
        console.log(Tut)
        var pos=0;
        for(var i=0;i<Est;i++){
            if(pos<Tut){
                //setAleatorio([...aleatorio,{CodDocente:tutoresList[pos].Nombres,CodEstudiante:estudiantesList[i].Nombres}])
                //peticionPostAsignarAlea(estudiantesList[i].CodEstudiante,tutoresList[pos].CodDocente);
                Lista.push({CodDocente:tutoresList[pos].CodDocente,CodEstudiante:estudiantesList[i].CodEstudiante})
                console.log(estudiantesList[i].Nombres+" su tutores sera :"+tutoresList[pos].Nombres);
                pos++;
            }
            else{
                //setAleatorio([...aleatorio,{CodDocente:tutoresList[0].Nombres,CodEstudiante:estudiantesList[i].Nombres}])
                //peticionPostAsignarAlea(estudiantesList[i].CodEstudiante,tutoresList[0].CodDocente);
                Lista.push({CodDocente:tutoresList[0].CodDocente,CodEstudiante:estudiantesList[i].CodEstudiante})
                console.log(estudiantesList[i].Nombres+" su tutores sera :"+tutoresList[0].Nombres);
                pos=1;                
            }
        }
        console.log(Lista);
        peticionPostAsignarAlea(Lista);
    }
    const comprobar=()=>{
        if(semestre==="Elija el semestre")
        {
            abrirCerrarModalWarning()
        }
        else{
            prueba();
        }
    }
    const Insertarprueba=()=>{
      
      if(codEstudiante==='codigo estudiante'||codDocente==='codigo docente'){
        abrirCerrarModalWarning()
      }
      else{
        peticionPostAsignar();
    }
    }
    const editar=()=>{
      alert('on pressed')
    }
    useEffect(()=>{
      peticionGetAsignaciones();  
    })
    return (
        <div>
            <ViewAdmin nombrePage={"Asignar tutor"}>
                <h5>Lista de alumnos :</h5>
                <div className="AT_drop">
                <select id="drop"value={semestre} onChange={(e) => {setSemestre(e.target.value); HallarAlumnosxCurso(e.target.value);}}className="form-select form-select-sm">
                        <option value="elija el semestre">Elija el semestre</option>
                        {
                            listaSemestres.map((item, index) => (
                                <option key={index} value={item}>{item}</option>
                            ))
                        }
                    </select>
                </div>   
                <div className="AT_wrapper_table">
                    <table className="table table-bordered bg-light ">
                        <thead style={{backgroundColor:'#85b7e9'}}>
                            <tr>
                                <th>Nombre Tutor</th>
                                <th>Nombre Estudiante</th>
                                <th>Editar</th>           
                            </tr>
                        </thead>
                        <tbody>
                                {data.map((estudiante,index)=>(
                                    <tr key={index}>
                                        <td>{estudiante.NombreE +" "}{estudiante.ApPE +" "}{estudiante.ApME}</td>
                                        <td>{estudiante.NombreTutor+" "}{estudiante.ApPTutor+" "}{estudiante.ApMTutor}</td>
                                        <td className="AT_editar">
                                            < FaIcons.FaEdit  onClick={editar}/>
                                        </td>
                                    </tr>
                                ))}                                        
                        </tbody>
                    </table>
                </div>     
                <div className="AT_opcions">
                    <button className="AT_opcion_button" onClick={()=>{peticionGetEstudiantes();peticionGetTutores();abrirCerrarModalInsertar()}}>Asignar Manualmente</button>
                    <button className="AT_opcion_button" onClick={comprobar}>Repartir de Forma Aleatoria</button>
                </div>
                <hr />
                <div className="input-group">
                    <input 
                    type="file"  
                    className="form-control"
                    id="inputGroupFile04" 
                    aria-describedby="inputGroupFileAddon04" 
                    aria-label="Upload"
                    onChange={(e)=>{
                        const file=e.target.files[0];
                        readExcel(file);}}/>
                    <button className="AT_btnImportar" type="button" id="inputGroupFileAddon04" onClick={()=>peticionPostExcel()}>Importar</button>
                </div>
                <Modal isOpen={warningView} centered>

                    <ModalHeader>
                        <ImIcons.ImWarning />              Debe de elegir una opcion para poder usar esta opcion 
                    </ModalHeader>
                 
                    <ModalFooter>
                    <ImIcons.ImCross onClick={()=>abrirCerrarModalWarning()}/>
                    </ModalFooter>
                </Modal>
                <Modal
                    isOpen={modalInsertar}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    >
               
                    <ModalHeader>Asignar</ModalHeader>
                    <ModalBody>
                        <div className='AT_M_wrapper'>
                            <h6>Codigo Estudiante :</h6>
                            <select value={codEstudiante} onChange={(e) => {setCodEstudiante(e.target.value)}}className="form-select form-select-sm">
                                <option value="codigo estudiante">codigo estudiante</option>
                                {
                                    estudiantes.map((item, index) => (
                                        <option key={index} value={item.CodEstudiante}>{item.CodEstudiante}----{item.Nombres} {item.ApPaterno},{item.ApMaterno} </option>
                                    ))
                                }
                            </select>
                        </div>
                        <hr />
                        <div className='AT_M_wrapper'>
                            <h6>Codigo Docente :</h6>
                            <select value={codDocente} onChange={(e) => {setCodDocente(e.target.value)}}className="form-select form-select-sm">
                                <option value="codigo docente">codigo docente</option>
                                {
                                    tutoresList.map((item, index) => (
                                        <option key={index} value={item.CodDocente}>{item.CodDocente}----{item.Nombres} {item.ApPaterno},{item.ApMaterno} </option>
                                    ))
                                }
                          </select>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                            <button className="AT_btns_modal" onClick={Insertarprueba}>Insertar</button>{""}
                            <button className="AT_btns_modal" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>
                    </ModalFooter>
              </Modal>                        
            </ViewAdmin>
        </div>
    )
}

export default AsignarTutor
