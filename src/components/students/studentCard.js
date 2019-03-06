import React, { useState } from "react";
import { Button, ListGroup, Image, Card } from "react-bootstrap";
import EditStudentModal from "../../containers/editInfoStudent";
import { withFirestore } from "react-redux-firebase";

function StudentCard(props) {
  const { allStatuses, allCources, student, firestore } = props;
  const [selectedCource, setCource] = useState(student.courceName);
  const [selectedStatuse, setStatuse] = useState(student.statusName);

  function handleRemove() {
    firestore
      .collection("students")
      .doc(student.id)
      .delete();
  }

  function handleSelectCourceChange(e) {
    console.log("dffdfdf");
    setCource(e.target.value);
    let newCource = allCources.filter(cource => cource.name === e.target.value);
    firestore
      .collection("students")
      .doc(student.id)
      .update({
        cource: newCource[0].id,
        courceName: newCource[0].name
      });
  }

  function handleSelectStatusChange(e) {
    setStatuse(e.target.value);
    let newStatuse = allStatuses.filter(
      statuse => statuse.name === e.target.value
    );

    firestore
      .collection("students")
      .doc(student.id)
      .update({
        status: newStatuse[0].id,
        statusName: newStatuse[0].name
      });
  }

  // toggleHidden  = () => {
  //     this.setState({
  //         isHidden: !this.state.isHidden
  //     })
  // }
  //
  //
  //
  //
  // setModalShow = () => {
  //     this.setState({ modalShow: true })
  // }
  // setModalClose = () => {
  //     this.setState({modalShow:false})
  // }

  return (
    <Card
      className="col-12 container"
      key={student.id}
      bg="primary"
      text="white"
    >
      <div className="row">
        <Image
          className="col-2 border border-secondary"
          style={{
            width: "70px",
            height: "100%" + "" + "",
            paddingLeft: "0px",
            paddingRight: "0px"
          }}
          variant="top"
          src="https://www.nastol.com.ua/download.php?img=201801/1920x1200/nastol.com.ua-265532.jpg"
        />
        <div className="col-10 border border-secondary">
          <select onChange={handleSelectCourceChange} value={selectedCource}>
            {allCources &&
              allCources.map(cource => (
                <option key={cource.id} value={cource.name}>
                  {cource.name}
                </option>
              ))}
          </select>

          <select onChange={handleSelectStatusChange} value={selectedStatuse}>
            {allStatuses &&
              allStatuses.map(status => (
                <option key={status.id} value={status.name}>
                  {status.name}
                </option>
              ))}
          </select>

          {/*<Button variant="info" onClick = {props.toggleHidden}>More Information</Button>*/}
          {/*{!props.isHidden && <ListGroup>*/}
          {/*<ListGroup.Item disabled>E-mail: {student.email}</ListGroup.Item>*/}
          {/*<ListGroup.Item disabled>Phone: {student.phone} </ListGroup.Item>*/}
          {/*</ListGroup> }*/}
        </div>
      </div>
      {/*<Button*/}
      {/*variant="warning"*/}
      {/*onClick={() => props.setModalShow()}*/}
      {/*>*/}
      {/*Edit information*/}
      {/*</Button>*/}

      <Button variant="warning" onClick={handleRemove}>
        delete
      </Button>

      {/*<EditStudentModal*/}
      {/*show={props.modalShow}*/}
      {/*onHide={props.modalClose}*/}
      {/*student={props.student}*/}
      {/*/>*/}
      <div className="row">
        <div className="col-12 border border-secondary">
          {`${student.fullName}`.toUpperCase()}
        </div>
      </div>
    </Card>
  );
}

export default withFirestore(StudentCard);
