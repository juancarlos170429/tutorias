import React from 'react'
import "./ViewAdmin.css"
import BarAdmin from "../BarAdmin/BarAdmin.jsx"
const ViewAdmin = ({children,...props}) => {
    return (
        <div className="Admin_wrapper">
            <BarAdmin  nombrePage={props.nombrePage}/>
            <div className="AdminContainer_wrapper">
               <div className="AdminContainer">
                    {children}
               </div>
            </div>
        </div>
    )
}

export default ViewAdmin
