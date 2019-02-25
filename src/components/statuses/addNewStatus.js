import React, { Component } from "react";
import "./style.css";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import FireManager from "../../firebase/FireManager";
import { v1 } from "uuid";
import Status from './status'

export default class AddStatus extends Component {
  state = {
    newStatus: "",
    statuses: [],
    getStatusesError: ""
  };

  componentDidMount() {
    FireManager.getStatuses()
      .then(querySnapshot => {
        this.setState({ statuses: querySnapshot.docs.map(doc => doc.data()) });
      })
      .catch(err => {
        this.setState({ getStatusesError: err.message });
      });
  }

  handleChange = event => {
    this.setState({ newStatus: event.target.value });
  };

  addNewStatus = () => {
    const newStatus = {
      name: this.state.newStatus,
      id: v1()
    };
    console.log("newStatus =" ,newStatus)

    FireManager.addStatus(newStatus).then(() => {
      let {statuses} = this.state;
      this.setState({
        statuses: [...statuses, newStatus]
      });
      this.setState({ newStatus: "" });
    });
  };

  render() {
    const { statuses, newStatus } = this.state;

    return (
      <>
        <div id="container">
          <div className="miniContainer">
            <Form>
              <FormGroup>
                <Label for="examplePassword">Add new cource</Label>
                <Input
                  type="text"
                  value={newStatus}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <Button color="success" block onClick={this.addNewStatus}>
                Add
              </Button>
            </Form>
          </div>
        </div>
        <h1>Current cources</h1>
        {statuses.map(status => (
          //revise key
          <Status key={status.name} status={status}/>
        ))}
        ));
      </>
    );
  }
}
