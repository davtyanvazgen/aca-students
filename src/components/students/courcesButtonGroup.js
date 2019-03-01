import React from "react"


export default function CourcesButton(props) {

    const toggleColor = function(id) {
        
        let el = document.getElementById(id);
        let color = el.style.background;
        color = color === 'green'?'lime':'green';
        el.style.background = color;
    }
    return (
        <div className="btn-group border border-primary" style={ { margin: "auto", padding: "10px 25%" } } role="group" aria-label="Basic example">
            {props.cources.map(cources => (
                <button 
                    type="button" 
                    id = {cources.id}
                    style = {{background:'green'}}
                    onClick={()=>{props.courceStudents(cources);toggleColor(cources.id)}}
                    className="btn btn-secondary border border-primary" 
                    key={cources.id}>
                    {cources.name}
                </button>
            ))}
        </div>
    )
}