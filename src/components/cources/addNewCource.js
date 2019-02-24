import React, { Component } from "react";
import "./style.css";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import FireManager from "../../firebase/FireManager";
import { v1 } from "uuid";
import Cource from "./cource";

export default class AddCource extends Component {
  state = {
    newCource: "",
    cources: [],
    getCourcesError: ""
  };

  componentDidMount() {
    FireManager.getCources()
      .then(querySnapshot => {
        this.setState({ cources: querySnapshot.docs.map(doc => doc.data()) });
      })
      .catch(err => {
        this.setState({ getCourcesError: err.message });
      });
  }

  handleChange = event => {
    this.setState({ newCource: event.target.value });
  };

  addNewCource = () => {
    const newCource = {
      name: this.state.newCource,
      id: v1()
    };
    FireManager.addCource(newCource).then(() => {
      let cources = this.state.cources;
      this.setState({
        cources: [...cources, newCource]
      });
      this.setState({ newCource: "" });
    });
  };

  removeCource = cource => {
    const oldCources = this.state.cources;
    const newCources = oldCources.filter(el => el.id !== cource.id);
    this.setState({
      cources: newCources
    });
  };

  render() {
    const { cources, newCource } = this.state;

    return (
      <>
        <div id="container">
          <div className="miniContainer">
            <Form>
              <FormGroup>
                <Label for="examplePassword">Add new cource</Label>
                <Input
                  type="text"
                  value={newCource}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <Button color="success" block onClick={this.addNewCource}>
                Add
              </Button>
            </Form>
          </div>
        </div>
        <h1>Current cources</h1>
        {cources.map(cource => (
          <Cource
            key={cource.id}
            cource={cource}
            removeCource={this.removeCource}
          />
        ))}
      </>
    );
  }
}
