import React from "react"


export default function CourcesButton(props) {

    return (
        <div className="btn-group border border-primary" style={ { margin: "auto", padding: "10px 25%" } } role="group" aria-label="Basic example">
            {props.cources.map(cources => (
                <button 
                    type="button" 
                    onClick={()=>{props.courceStudents(cources)}}
                    className="btn btn-secondary border border-primary" 
                    key={cources.id}>
                    {cources.name}
                </button>
            ))}
        </div>
    )
}