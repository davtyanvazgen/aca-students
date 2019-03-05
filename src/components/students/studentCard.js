import React from "react";
import { Button, ListGroup, Image, Card } from "react-bootstrap";
import EditStudentModal from "../../containers/editInfoStudent";

export default function StudentCard(props) {
  const { allStatuses, allCources, selectedCource, selectedStatuse } = props;
  return (
    <Card
      className="col-12 container"
      key={props.student.id}
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
          <select
            onChange={props.handleSelectCourceChange}
            value={selectedCource}
          >
            {allCources.map(cource => (
              <option key={cource.id} value={cource.name}>
                {cource.name}
              </option>
            ))}
          </select>

          <select
            onChange={props.handleSelectStatusChange}
            value={selectedStatuse}
          >
            {allStatuses.map(status => (
              <option key={status.id} value={status.name}>
                {status.name}
              </option>
            ))}
          </select>

          <Button variant="info" onClick={props.toggleHidden}>
            More Information
          </Button>
          {!props.isHidden && (
            <ListGroup>
              <ListGroup.Item disabled>
                E-mail: {props.student.email}
              </ListGroup.Item>
              <ListGroup.Item disabled>
                Phone: {props.student.phone}{" "}
              </ListGroup.Item>
            </ListGroup>
          )}
        </div>
      </div>
      <Button variant="warning" onClick={() => props.setModalShow()}>
        Edit information
      </Button>

      <Button
        variant="warning"
        onClick={() => props.removeStudent(props.student)}
      >
        delete
      </Button>

      <EditStudentModal
        show={props.modalShow}
        onHide={props.modalClose}
        student={props.student}
      />
      <div className="row">
        <div className="col-12 border border-secondary">
          {`${props.student.fullName}`.toUpperCase()}
        </div>
      </div>
    </Card>
  );
}
