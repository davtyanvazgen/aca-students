import React from "react"


export default function StatusesButton(props) {

    return (
        <div className="btn-group-vertical border border-primary" role="group" aria-label="Basic example">
            {props.statuses.map(statuses => (
                <button type="button" className="btn btn-secondary border border-primary" key={statuses.id}>{statuses.name}</button>
            ))}
        </div>
    )
}

