import React, { useState } from "react";
import {Button, Card, CardText, CardBody, CardTitle, Row, Input, Col} from "reactstrap";
import { withFirestore } from "react-redux-firebase";
import DeleteCourceModal from "./deleteCourceModal";
import EditCourceModal from "./editCourceModal";

const Cource = ({ cources, cource, students, firestore }) => {
    const [modalShow, setModalShow] = useState(false);
    const [studentsSameCource, setStudentsSameCource] = useState([]);
    const [removeStudentsError, setRemoveStudentsError] = useState("");
    const [removaCourceError, setRemovaCourceError] = useState("");
    const [modalShowEdit, setModalShowEdit] = useState(false);

    const areYouSure = cource => {
        const studentsForDelete = students.filter(
            student => student.cource === cource.id
        );
        setStudentsSameCource(studentsForDelete);
        setModalShow(true);
    };

    const handleSortSelect = (e) => {
        let sort = parseInt(e.target.value);
        firestore
            .collection("cources")
            .doc(cource.id)
            .update({sort});
        if(cource.sort > sort){
            for(let i=sort; i < cource.sort; i++){
                cources.forEach(el => {
                    if(el.sort === i){
                        firestore
                            .collection("cources")
                            .doc(el.id)
                            .update({sort: i+1});
                    }
                })
            }
        }
        if(cource.sort < sort){
            for(let i = cource.sort + 1; i <= sort; i++){
                cources.forEach(el => {
                    if(el.sort === i){
                        firestore
                            .collection("cources")
                            .doc(el.id)
                            .update({sort: i-1});
                    }
                })
            }
        }


    };

    const handleRemove = () => {

        for(let i = cource.sort + 1; i <= cources.length; i++){
            cources.forEach(el => {
                if(el.sort === i){
                    firestore
                        .collection("cources")
                        .doc(el.id)
                        .update({sort: i-1});
                }
            })
        }

        studentsSameCource.forEach(student => {
            firestore
                .collection("deletedStudents")
                .doc(student.id)
                .set(student)
        });

        studentsSameCource.forEach(student => {
            firestore
                .collection("students")
                .doc(student.id)
                .delete()
                .catch(err => {
                    setRemoveStudentsError(err);
                });
        });

        firestore
            .collection("cources")
            .doc(cource.id)
            .delete()
            .catch(err => {
                setRemovaCourceError(err);
            });

        setModalShow(false);
    };

    const modalClose = () => {
        setStudentsSameCource([]);
        setModalShow(false);
    };

    const editModalClose = () => {
        setModalShowEdit(false);
    };
    console.log(cource.sort);
    return (
        <div>
            <Card
                key={cource.id}
                style={{
                    borderRadius: "7px",
                    boxShadow: `0 0 15px ${cource.color}`,
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
                            backgroundColor: cource.color
                        }}
                    >
                        <Row style={{width: "100%"}}>
                            <Col xs="10">
                                <h5 style={{ color: "white" }}>{cource.longName}</h5>
                            </Col>
                            <Col xs="2" style={{padding: "0px 0px"}}>
                                <Input bsSize="sm"  type="select" value={cource.sort} onChange={handleSortSelect}>
                                   {cources.map(el => (
                                       <option key={el.id} value={el.sort}>{el.sort}</option>
                                   ))}
                                </Input>
                            </Col>
                        </Row>
                    </CardTitle>
                    <CardText style={{ marginLeft: "10px" }}>
                        Short name: {cource.name}
                    </CardText>
                    <div style={{ marginTop: "50px" }}>
                        <Button
                            size="sm"
                            color="danger"
                            className="float-right  mr-2"
                            onClick={() => {
                                areYouSure(cource);
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
                    </div>
                </CardBody>
            </Card>

            <DeleteCourceModal
                show={modalShow}
                onHide={modalClose}
                studentsSameCource={studentsSameCource}
                cource={cource}
                handleRemove={handleRemove}
            />

            <EditCourceModal
                show={modalShowEdit}
                onHide={editModalClose}
                cource={cource}
                students={students}
            />
        </div>
    );
};

export default withFirestore(Cource);
