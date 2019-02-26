import React from "react"
import {Card} from "react-bootstrap";
import {ListGroup} from "react-bootstrap";
import {Button} from "react-bootstrap";
import {Image} from "react-bootstrap";


export default function StudentItem(props) {

    return (
        <Card className="col-12 container"  key={props.student.id} bg="primary" text="white">

            <div className="row">
                <Image className="col-2 border border-secondary" style={ { width: "70px", height: "100px" } } variant="top" src="https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/man-student.png" />
                <div className="col-10 border border-secondary">
                    <ListGroup >
                        <ListGroup.Item disabled>Courses: { props.student.courceId }</ListGroup.Item>
                        <ListGroup.Item disabled>Status: { props.student.statusId } </ListGroup.Item>
                    </ListGroup>
                    <Button variant="info">More Information</Button>
                </div>
            </div>

            <div className="row">
            <div className="col-12 border border-secondary" >
                { `${props.student.name} ${props.student.surname}`.toUpperCase() }
                </div>
            </div>
        </Card>
    )
}

