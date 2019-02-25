import React, { Component } from "react";
import "./style.css";
import FireManager from "../../firebase/FireManager";
import { v1 } from "uuid";
import Statuse from "./statuse";
import AddStatusForm from "./addStatuseForm";

export default class AddStatuse extends Component {
  state = {
    newStatuse: "",
    statuses: [],
    getStatuseError: ""
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
    this.setState({ newStatuse: event.target.value });
  };

  addNewStatuse = () => {
    const newStatuse = {
      name: this.state.newStatuse,
      id: v1()
    };
    FireManager.addStatuse(newStatuse)
      .then(() => {
        const statuses = this.state.statuses;
        this.setState({
          statuses: [...statuses, newStatuse]
        });
      })
      .catch(err => {
        this.setState({ addStatuseError: err && err.message });
      });

    this.setState({ newStatuse: "" });
  };

  removeStatuse = statuse => {
    FireManager.removeStatuse(statuse).catch(err => {
      this.setState({ removeStatuseError: err && err.message });
    });
    const oldStatuses = this.state.statuses;
    const newStatuses = oldStatuses.filter(el => el.id !== statuse.id);
    this.setState({
      statuses: newStatuses
    });
  };

  render() {
    const { statuses, newStatuse } = this.state;

    return (
      <>
        <div id="containerFormStatuse">
          <div className="miniContainerFormStatuse">
            <AddStatusForm
              value={newStatuse}
              handleChange={this.handleChange}
              addNewStatuse={this.addNewStatuse}
            />
          </div>
        </div>

        <div className="statuseList">
          <h1>All statuses</h1>
          {statuses.map(statuse => (
            <Statuse
              key={statuse.id}
              statuse={statuse}
              removeStatuse={this.removeStatuse}
            />
          ))}
        </div>
      </>
    );
  }
}
