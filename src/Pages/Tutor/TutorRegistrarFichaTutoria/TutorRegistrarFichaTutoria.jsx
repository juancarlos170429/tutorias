import React from 'react'
import './TutorRegistrarFichaTutoria.css'
import ViewTutor from '../../../Layouts/ViewTutor/ViewTutor'
import Cookies from "universal-cookie";
import MaterialTable from "material-table";
import axios from "axios";
import * as ImIcons from "react-icons/im"
import { useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Row, Col } from "react-bootstrap";
import { forwardRef } from 'react';
import Add from '@material-ui/icons/Add';
import {useHistory} from 'react-router-dom'
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };
  
  const columnas = [
    {
      title: "CodEstudiante",
      field: "CodEstudiante",
      width: "10%",
    },
    {
      title: "Nombres",
      field: "Nombres",
      width: "15%",
    },
    {
      title: "ApPaterno",
      field: "ApPaterno",
      width: "15%",
    },
    {
      title: "ApMaterno",
      field: "ApMaterno",
      width: "15%",
    },
    {
      title: "Persona de Referencia",
      field: "PersonaReferenciaTutorando",
      width: "25%",
    },
    {
      title: "Celular de Referencia",
      field: "CelularReferenciaTutorando",
      width: "15%",
    },
  ];
const TutorRegistrarFichaTutoria = (props) => {
    const history = useHistory()
  const cookie = new Cookies();
  const [data, setData] = useState([]);
  const [idFichaTutoria, setIdFichaTutoria] = useState("");
  const [codEstudiante, setCodEstudiante] = useState("");
  const [codDocente, setCodDocente] = useState(cookie.get("CodDocente"));
  const [nombres, setNombres] = useState("");
  const [apPaterno, setApPaterno] = useState("");
  const [apMaterno, setApMaterno] = useState("");
  const [celularRef, setCelularReferencia] = useState("");
  const [personaRef, setPersonaReferencia] = useState("");
  const [modalActualizar, setModalActualizar] = useState(false);
  const [flag, setFlag] = useState(0)
  const abrirCerrarModalActualizar = () => {
    limpiar();
    setModalActualizar(!modalActualizar);
  };
  const abrirCerrarModalWarning=()=>{
    setWarningview(!warningView);
}
const abrirCerrarModalWarningCelular=()=>{
  setWarningCelular(!warningCelular);
}
const baseUrl2 = `https://tutorias-api.herokuapp.com/fichas`;
  const peticionPut = async () => {
    const pattern = new RegExp('^[A-Z]+$', 'i');
    if (
      !(celularRef == "") && !(parseInt(celularRef) <= 999999999 && parseInt(celularRef) >= 900000000) || pattern.test(celularRef)
    ) {
      setWarningCelular(true);
      return;
    }
    if(!(personaRef == "") && /\d/.test(personaRef))
    {
      setWarningview(true); 
      return
    }
    await axios
      .put(baseUrl2 + `/${idFichaTutoria}`, {
        IdFichaTutoria: idFichaTutoria,
        CelularReferenciaTutorando: celularRef,
        PersonaReferenciaTutorando: personaRef,
      })
      .then((response) => {
        limpiar();
        abrirCerrarModalActualizar();
        setFlag(0);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const [warningView, setWarningview] = useState(false);
  const [warningCelular, setWarningCelular] = useState(false);

  const baseUrl = `https://tutorias-api.herokuapp.com/fichas/asignacion/${codDocente}`;
  const datosaEnviar=(codigo,id,nombres,paterno,materno)=>{
    
    history.push(`/Tutor_Registrar_Ficha_Tutoria/${codigo}?id=${id}&nombres=${nombres}&apPaterno=${paterno}&apMaterno=${materno}`)
  }
  console.log(baseUrl);
  const peticionGet = async () => {
    await axios
      .get(baseUrl)
      .then((response) => {
        setData(response.data);
        setFlag(flag+1);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (!cookie.get("CodDocente")) {
      props.history.push('/LoginTutor');
    }
    if (flag < 1){
        peticionGet();
    }
  },[peticionPut]);

  const Actualizar = (id) => {
    data.forEach((elemento) => {
      if (elemento.CodEstudiante === id) {
        setIdFichaTutoria(elemento.IdFichaTutoria);
        setCodEstudiante(elemento.CodEstudiante);
        setNombres(elemento.Nombres);
        setApPaterno(elemento.ApPaterno);
        setApMaterno(elemento.ApMaterno);
        setPersonaReferencia(elemento.PersonaReferenciaTutorando);
        setCelularReferencia(elemento.CelularReferenciaTutorando);
      }
    });
  };
  const limpiar = () => {
    setIdFichaTutoria("");
    setCodEstudiante("");
    setNombres("");
    setApPaterno("");
    setApMaterno("");
    setPersonaReferencia("");
    setCelularReferencia("");
  };
    return (
        <div>
            <ViewTutor nombrePage={"Estudiantes Asignados"}>
            <MaterialTable
                  fixedHeader={true}
                  columns={columnas}
                  data={data}
                  title="Tutorados"
                  icons={tableIcons}
                  options={{
                    actionsColumnIndex: -1,
                    paging: true,
                    pageSizeOptions: [8],
                    pageSize: 12,
                    headerStyle: {
                      backgroundColor: "#85b7e9",
                      color: "black",
                      fontSize: '15px',
                      textAlign:'center'
                    },
                  }}
                  actions={[
                    {
                      icon: Edit,
                      tooltip: "Actualizar datos de ficha",
                      onClick: (e, rowData) => {
                        alert(
                          "¿Deseas actualizar los datos del tutorado " +
                            rowData.Nombres +
                            " " +
                            rowData.ApPaterno +
                            " " +
                            rowData.ApMaterno +
                            "?"
                        );
                        abrirCerrarModalActualizar();
                        let id = rowData.CodEstudiante;
                        Actualizar(id);
                      },
                    },
                    {
                      icon: AddBox,
                      tooltip: "Agregar nueva sesión",
                      onClick: (e, rowData) => {
                        datosaEnviar(rowData.CodEstudiante,rowData.IdFichaTutoria,rowData.Nombres,rowData.ApPaterno,rowData.ApMaterno)
                      },
                    },
                  ]}
                  localization={{
                    header: {
                      actions: "Acciones",
                    },
                  }}
                />
            </ViewTutor>
        </div>
    )
}

export default TutorRegistrarFichaTutoria
