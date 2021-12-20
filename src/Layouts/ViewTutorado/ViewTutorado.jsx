import React from 'react'
import './ViewTutorado.css'
import BarTutorado from '../BarTutorado/BarTutorado'    
const ViewTutorado = ({children,...props}) => {
    return ( 
        <div className="Tutorado_wrapper">
            <BarTutorado  nombrePage={props.nombrePage}/>
            <div className="TutoradoContainer_wrapper">
               <div className="TutoradoContainer">
                    {children}
               </div>
            </div>
        </div>
    )
}

export default ViewTutorado
