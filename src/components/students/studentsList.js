import React from "react";
import StudentItem from "./studentItem"

function StudentsList(props) {
    
    return (
        <>
            {props.allStudents.map(student => (
                <StudentItem key={ student.id } 
                    student= { student } 
                    repeatFiltering = {props.repeatFiltering}
                />
            ))}
        </>

    );
}

export default StudentsList;