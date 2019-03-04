import React from "react";
import StudentItem from "../../containers/studentItem"
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'

function StudentsList(props) {
    return (
        <>
            {props.allStudents.map(student => (
                <StudentItem
                    key={ student.id }
                    student= { student }
                    repeatFiltering = {props.repeatFiltering}
                    allCources =  { props.cources }
                    allStatuses = { props.statuses }
                    removeStudent={props.removeStudent}
                />
            ))}
        </>

    );
}

export default compose(
    firestoreConnect(() => ['statuses', 'cources']), // or { collection: 'todos' }
    connect((state, props) => ({
        statuses: state.firestore.ordered.statuses,
        cources: state.firestore.ordered.cources
    }))
)(StudentsList)