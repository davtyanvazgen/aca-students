import React from "react"


export default function StatusesButton(props) {

    return (
        <div className="btn-group-vertical border border-primary" role="group" aria-label="Basic example">
            {props.statuses.map(status => (
                <button key={status.id} onClick={()=>{props.statuseStudents(status)}} type="button" className="btn btn-secondary border border-primary" >{status.name}</button>
            ))}
        </div>
    )
}