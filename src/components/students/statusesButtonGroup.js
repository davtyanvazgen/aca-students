import React from "react"
import {ButtonToolbar, ToggleButton, ToggleButtonGroup} from "react-bootstrap";
export default function StatusesButton(props) {
    return (
        <ButtonToolbar  style={ { margin: "auto", padding: "10px 25%" } }>
            <ToggleButtonGroup className="btn-group-vertical" type="radio" name="statuses">
                    <ToggleButton variant="danger" onChange={ () => { props.statuseStudents("all") }}>All statuses</ToggleButton>
                {props.statuses.map(status => (
                    <ToggleButton variant="danger" value={ status.name } key={ status.id } id = { status.id } onChange={ () => { props.statuseStudents(status) }}>
                        { status.name }
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
        </ButtonToolbar>
    )
}