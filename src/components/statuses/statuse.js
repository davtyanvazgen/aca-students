import React, { useState } from "react";
import {Button, Card, CardBody, CardTitle, CardText, Col, Input, Row} from "reactstrap";
import { withFirestore } from "react-redux-firebase";
import DeleteStatusModal from "./deleteStatusModal";
import EditStatuseModal from "./editStatusModal";

const Statuse = ({ statuses, statuse, firestore, students }) => {
    const [modalShow, setModalShow] = useState(false);
    const [studentsSameStatus, setStudentsSameStatus] = useState([]);
    const [removeStudentError, setRemoveStudentsError] = useState("");
    const [deleteStatusError, setDeleteStatusError] = useState("");
    const [modalShowEdit, setModalShowEdit] = useState(false);
    const [editStatusError, setEditStatusError] = useState("");

    const areYouSure = statuse => {
        const studentsForDelete = students.filter(
            student => student.status === statuse.id
        );
        setStudentsSameStatus(studentsForDelete);
        setModalShow(true);
    };

    const handleSortSelect = (e) => {
        let sort = parseInt(e.target.value);
        firestore
            .collection("statuses")
            .doc(statuse.id)
            .update({sort});
        if(statuse.sort > sort){
            for(let i=sort; i < statuse.sort; i++){
                statuses.forEach(el => {
                    if(el.sort === i){
                        firestore
                            .collection("statuses")
                            .doc(el.id)
                            .update({sort: i+1});
                    }
                })
            }
        }
        if(statuse.sort < sort){
            for(let i = statuse.sort + 1; i <= sort; i++){
                statuses.forEach(el => {
                    if(el.sort === i){
                        firestore
                            .collection("statuses")
                            .doc(el.id)
                            .update({sort: i-1});
                    }
                })
            }
        }


    };

    const handleRemove = () => {
        for(let i = statuse.sort + 1; i <= statuses.length; i++){
            statuses.forEach(el => {
                if(el.sort === i){
                    firestore
                        .collection("statuses")
                        .doc(el.id)
                        .update({sort: i-1});
                }
            })
        }

        studentsSameStatus.forEach(student => {
            firestore
                .collection("deletedStudents")
                .doc(student.id)
                .set(student)
        });

        studentsSameStatus.forEach(student => {
            firestore
                .collection("students")
                .doc(student.id)
                .delete()
                .catch(err => {
                    setRemoveStudentsError(err);
                });
        });

        firestore
            .collection("statuses")
            .doc(statuse.id)
            .delete()
            .catch(err => {
                setDeleteStatusError(err);
            });

        setModalShow(false);
    };

    const modalClose = () => {
        setStudentsSameStatus([]);
        setModalShow(false);
    };

    const editModalClose = () => {
        setModalShowEdit(false);
    };
    console.log(studentsSameStatus);

    return (
        <div>
            <Card
                key={statuse.id}
                style={{
                    borderRadius: "7px",
                    boxShadow: `0 0 15px ${statuse.color}`,
                    border: "none"
                }}
            >
                <CardBody
                    style={{
                        padding: "0px 0px 20px 0px",
                        backgroundColor: "#dfebef",
                        borderRadius: "7px"
                    }}
                >
                    <CardTitle
                        style={{
                            borderRadius: "7px 7px 0px 0px",
                            padding: "10px 0 10px 15px",
                            backgroundColor: statuse.color
                        }}
                    >
                        <Row style={{width: "100%"}}>
                            <Col xs="10">
                                <h5 style={{ color: "white" }}>{statuse.longName}</h5>
                            </Col>
                            <Col xs="2" style={{padding: "0px 0px"}}>
                                <Input bsSize="sm"  type="select" value={statuse.sort} onChange={handleSortSelect}>
                                    {statuses.map(el => (
                                        <option key={el.id} value={el.sort}>{el.sort}</option>
                                    ))}
                                </Input>
                            </Col>
                        </Row>

                    </CardTitle>
                    <CardText style={{ marginLeft: "10px" }}>
                        Short name: {statuse.name}
                    </CardText>
                    <div style={{ marginTop: "50px" }}>
                        {statuse.id !== "fc4a5a70-4739-11e9-8e2b-71e4e6f455b5" ?
                            (
                                <>
                                    <Button
                                        size="sm"
                                        color="danger"
                                        className="float-right  mr-2"
                                        onClick={() => {
                                            areYouSure(statuse);
                                        }}
                                    >
                                        Delete
                                    </Button>
                                    <Button
                                        size="sm"
                                        color="success"
                                        className="float-right mr-1"
                                        onClick={() => setModalShowEdit(true)}
                                    >
                                        Edit
                                    </Button>
                                </>
                            )
                            : (
                                <Button
                                    size="sm"
                                    color="success"
                                    className="float-right mr-1"
                                    onClick={() => setModalShowEdit(true)}
                                >
                                    Edit
                                </Button>
                            )
                        }

                    </div>
                </CardBody>
            </Card>

            <DeleteStatusModal
                show={modalShow}
                onHide={modalClose}
                studentsSameStatus={studentsSameStatus}
                statuse={statuse}
                handleRemove={handleRemove}
            />

            <EditStatuseModal
                show={modalShowEdit}
                onHide={editModalClose}
                statuse={statuse}
                students={students}
            />
        </div>
    );
};

export default withFirestore(Statuse);