import React from 'react'
import BarTutor from '../BarTutor/BarTutor'
import './ViewTutor.css'
const ViewTutor = ({children,...props}) => {
    return (
        <div className="Tutor_wrapper">
            <BarTutor  nombrePage={props.nombrePage}/>
            <div className="TutorContainer_wrapper">
               <div className="TutorContainer">
                    {children}
               </div>
            </div>
        </div>
    )
}

export default ViewTutor
