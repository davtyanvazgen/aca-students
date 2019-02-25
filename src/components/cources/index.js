import React, { Component } from "react";
import "./style.css";
import FireManager from "../../firebase/FireManager";
import { v1 } from "uuid";
import Cource from "./cource";
import AddForm from "./addCourceForm";

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
    FireManager.addCource(newCource)
      .then(() => {
        const cources = this.state.cources;
        this.setState({
          cources: [...cources, newCource]
        });
      })
      .catch(err => {
        this.setState({ addCourceError: err && err.message });
      });

    this.setState({ newCource: "" });
  };

  removeCource = cource => {
    FireManager.removeCource(cource).catch(err => {
      this.setState({ removeCourceError: err && err.message });
    });
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
        <div id="containerForm">
          <div className="miniContainerForm">
            <AddForm
              value={newCource}
              handleChange={this.handleChange}
              addNewCource={this.addNewCource}
            />
          </div>
        </div>

        <div className="courceList">
          <h1>Current cources</h1>
          {cources.map(cource => (
            <Cource
              key={cource.id}
              cource={cource}
              removeCource={this.removeCource}
            />
          ))}
        </div>
      </>
    );
  }
}
