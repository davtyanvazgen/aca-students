import React, { Component } from "react";
import { Button, ListGroup, Image, Card } from "react-bootstrap";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

import FireManager from "../../firebase/FireManager";
import EditStudentModal from "./editInfoStudent";

export default class StudentItem extends Component {
  constructor(props) {
    super(props);
    this.toggleCource = this.toggleCource.bind(this);
    this.toggleStatus = this.toggleStatus.bind(this);

    this.state = {
      allCources: [],
      getCourcesError: "",
      isHidden: true,
      dropdownOpenCource: false,
      dropdownOpenStatus: false,
      allStatuses: [],
      modalShow: false
    };
  }

  toggleCource() {
    this.setState({
      dropdownOpenCource: !this.state.dropdownOpenCource
    });
  }

  toggleStatus() {
    this.setState({
      dropdownOpenStatus: !this.state.dropdownOpenStatus
    });
  }

  componentDidMount() {
    FireManager.getCources()
      .then(querySnapshot => {
        this.setState({
          allCources: querySnapshot.docs.map(doc => doc.data())
        });
      })
      .catch(err => {
        this.setState({ getCourcesError: err.message });
      });

    FireManager.getStatuses()
      .then(querySnapshot => {
        this.setState({
          allStatuses: querySnapshot.docs.map(doc => doc.data())
        });
      })
      .catch(err => {
        this.setState({ getCourcesError: err.message });
      });
  }

  getCourseById() {
    console.log(this.state.cources, this.state.getCourcesError);
  }

  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden
    });
  }

  handleStatusChange = e => {
    debugger;
  };

  render() {
    const { allStatuses, allCources } = this.state;

    let modalClose = () => this.setState({ modalShow: false });

    return (
      <Card
        className="col-12 container"
        key={this.props.student.id}
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
            src="https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/man-student.png"
          />
          <div className="col-10 border border-secondary">
            Course:
            <Dropdown
              isOpen={this.state.dropdownOpenCource}
              toggle={this.toggleCource}
            >
              <DropdownToggle caret>
                {this.props.student.courceName}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Choose Cource</DropdownItem>
                {allCources.map(cource => (
                  <DropdownItem
                    key={cource.id}
                    onClick={this.handleStatusChange}
                  >
                    {cource.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            Status:
            <Dropdown
              isOpen={this.state.dropdownOpenStatus}
              toggle={this.toggleStatus}
            >
              <DropdownToggle caret>
                {this.props.student.statusName}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Choose Status</DropdownItem>
                {allStatuses.map(status => (
                  <DropdownItem key={status.id} name={status.name}>
                    {status.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button variant="info" onClick={this.toggleHidden.bind(this)}>
              More Information
            </Button>
            {!this.state.isHidden && (
              <ListGroup>
                <ListGroup.Item disabled>
                  E-mail: {this.props.student.email}
                </ListGroup.Item>
                <ListGroup.Item disabled>
                  Phone: {this.props.student.phone}{" "}
                </ListGroup.Item>
              </ListGroup>
            )}
          </div>
        </div>

        <Button
          variant="warning"
          onClick={() => this.setState({ modalShow: true })}
        >
          Edit information
        </Button>

        <EditStudentModal
          show={this.state.modalShow}
          onHide={modalClose}
          student={this.props.student}
        />

        <div className="row">
          <div className="col-12 border border-secondary">
            {`${this.props.student.fullName}`.toUpperCase()}
          </div>
        </div>
      </Card>
    );
  }
}
