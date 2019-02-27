import React, { Component } from 'react';
import RegistrationForm from './addRegForm';
//import SelectForm from './select'


class AddStudent extends Component {
    state = {
        allCources:[],
        selectValue:{}
    }
    changeSelectValue = (value)=>{
        this.setState({
            selectValue:value
        })
    }
    // changeAllCources = (value)=>{
    //     this.setState({
    //         allCources:value
    //     })
    // }
    render() {
        return (
            <div>
                <RegistrationForm selectValue = {this.state.selectValue} changeSelectValue = {this.changeSelectValue} allCources ={this.state.allCources} changeallCources = {this.changeallCources}/>
            </div>
        )
    }
}
export default AddStudent