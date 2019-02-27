import React, { Component } from "react";
import FireManager from '../../../firebase/FireManager'

export default class SelectForm extends Component {
    state = {
      newCource: "",
      cources: [],
      getCourcesError: "",
      selectValue:{},
    };
  
    componentDidMount() {
      FireManager.getCources()
        .then(querySnapshot => {
          this.setState({ 
            cources: querySnapshot.docs.map(doc => doc.data()) ,
            selectValue:querySnapshot.docs.map(doc => doc.data())[0]
          });
          this.props.changeSelectValue(this.state.selectValue); 
        })
        .catch(err => {
          this.setState({ getCourcesError: err.message });
        });

      FireManager.getStatuses()
        .then(querySnapshot => {
          this.props.changeAllStatuses (querySnapshot.docs.map(doc => doc.data()));
          console.log('1 selectForm did mounting',querySnapshot.docs.map(doc => doc.data()))
        })
        .catch(err => {
          console.log(err.message);
        });
    
    }

     handleSelectChange = (e) =>{
       const index = e.target.selectedIndex;
       this.props.changeSelectValue(this.state.cources[index])
        this.setState({
          selectValue:this.state.cources[index].name
        })
    }
    render () {
        const {cources} = this.state;
        return (
            <select onChange = {this.handleSelectChange} value = {this.state.selectValue.name}>
                {cources.map(cource => (
                    <option key = {cource.id} value = {cource.name}>{cource.name}</option>
                ))}
            </select>
        )
    }
}
  