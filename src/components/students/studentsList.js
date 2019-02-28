import React,{useState,useEffect} from "react";
// import { Button } from 'react-bootstrap/';
// import { Card } from 'react-bootstrap/'
// import { ListGroup } from 'react-bootstrap/'
import StudentItem from "./studentItem"

function StudentsList(props) {
    return (
        <>
            {props.allStudents.map(student => (
                <StudentItem key={ student.id } student={ student }
                    
                />
            ))}
        </>

    );
}

export default StudentsList;