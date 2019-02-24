import React, { Component } from "react";
import "./style.css";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import FireManager from "../../firebase/FireManager";
import { v1 } from "uuid";

// export default class AddCource extends Component {
//   state = {
//     cources: [],
//     getCourcesError: ""
//   };

// componentDidMount() {
//   FireManager.getCources()
//     .then(querySnapshot => {
//       this.setState({ cources: querySnapshot.docs.map(doc => doc.data()) });
//     })
//     .catch(err => {
//       this.setState({ getCourcesError: err.message });
//     });
// }

//   addNewCource() {
//     FireManager.addCource("php");
//   }

//   render() {
// const { cources } = this.state;
// const currentCources = cources.map(cource => (
//   //revise key
//   <h3 key={cource.name}>{cource.name}</h3>
// ));

//     return (
//       <>
//         <h1>Current cources</h1>
//         {currentCources}
//         <div id="container">
//           <button onClick={() => alert()}>click</button>
//           <div className="miniContainer">
//             <Form>
//               <FormGroup>
//                 <Label for="examplePassword">Add new cource</Label>
//                 <Input type="text" />
//               </FormGroup>
//               <Button color="success" block onClick={this.addNewCource}>
//                 Add
//               </Button>
//             </Form>
//           </div>
//         </div>
//       </>
//     );
//   }
// }

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

  handleSubmit = event => {
    alert("A name was submitted: " + this.state.newCource);
    event.preventDefault();
  };

  render() {
    const { cources } = this.state;
    const currentCources = cources.map(cource => (
      //revise key
      <h3 key={cource.name}>{cource.name}</h3>
    ));

    const addNewCource = () => {
      const newCource = {
        name: this.state.newCource,
        id: v1()
      };

      FireManager.addCource(newCource).then(() => {
        let cources = this.state.cources;
        this.setState({
          cources: [...cources, newCource.name]
        });
        this.setState({ newCource: "" });
      });
    };

    return (
      <>
        <div id="container">
          <div className="miniContainer">
            <Form>
              <FormGroup>
                <Label for="examplePassword">Add new cource</Label>
                <Input
                  type="text"
                  value={this.state.newCource}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <Button color="success" block onClick={addNewCource}>
                Add
              </Button>
            </Form>
          </div>
        </div>
        <h1>Current cources</h1>
        {currentCources}
      </>
    );
  }
}
