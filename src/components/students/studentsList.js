import React from "react";
import StudentItem from "../../containers/studentItem"

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
                />
            ))}
        </>

    );
}

export default StudentsList;