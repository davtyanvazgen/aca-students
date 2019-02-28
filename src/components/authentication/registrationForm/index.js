import React, { Component } from 'react';
import RegistrationForm from './addRegForm';
//import SelectForm from './select'


class AddStudent extends Component {
    state = {
        allStatuses:[],
        selectValue:{}
    }
    changeSelectValue = (value)=>{
        this.setState({
            selectValue:value
        })
    }

    changeAllStatuses = (value)=>{
        this.setState({
          allStatuses:value
        })
       
    }

    render() {
        return (
            <div>
                <RegistrationForm 
                    selectValue = {this.state.selectValue} 
                    changeSelectValue = {this.changeSelectValue} 
                    changeAllStatuses ={this.changeAllStatuses} 
                    allStatuses = {this.state.allStatuses}
                />
            </div>
        )
    }
}
export default AddStudent