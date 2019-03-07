import React from "react"
import {ButtonToolbar} from "react-bootstrap"
import {ToggleButton} from "react-bootstrap"
import {ToggleButtonGroup} from "react-bootstrap"
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'

function CourcesButton(props) {
    return (
        <ButtonToolbar style={ { margin: "auto", padding: "10px 25%" } }>
            <ToggleButtonGroup type="checkbox">
                {props.cources && props.cources.map(cources => (
                    <ToggleButton variant="primary" value={ cources.name } key={ cources.id } id = { cources.id } onChange={ () => { props.courceStudents(cources) }}>
                        { cources.name }
                    </ToggleButton>
                    ))}
            </ToggleButtonGroup>
        </ButtonToolbar>
    )
}

export default compose(
    firestoreConnect(() => ['cources']), // or { collection: 'todos' }
    connect((state, props) => ({
        cources: state.firestore.ordered.cources
    }))
)(CourcesButton)