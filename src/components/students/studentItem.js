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
    constructor(props){
        super(props);
        // this.toggleCource = this.toggleCource.bind(this);
        // this.toggleStatus = this.toggleStatus.bind(this);

        this.state = {
            allCources: [],
            getCourcesError: "",
            isHidden: true,
            dropdownOpenCource: false,
            dropdownOpenStatus: false,
            allStatuses:[],
            selectedCource:this.props.student.courceName,
            selectedStatuse:this.props.student.statusName
        }
    }

    componentDidMount() {
        FireManager.getCources()
            .then(querySnapshot => {
                this.setState({ allCources: querySnapshot.docs.map(doc => doc.data()) });
            })
            .catch(err => {
                this.setState({ getCourcesError: err.message });
            });
            
            FireManager.getStatuses()
            .then(querySnapshot => {
                this.setState({ allStatuses: querySnapshot.docs.map(doc => doc.data()) });
            })
            .catch(err => {
                this.setState({ getCourcesError: err.message });
            });
    }

    // getCourseById (){
    //     console.log(this.state.cources, this.state.getCourcesError)
    // }

    toggleHidden () {
        this.setState({
            isHidden: !this.state.isHidden
        })
    }
    handleSelectCourceChange = (e)=>{
        let {student} = this.props;
        let selectedCource = this.state.allCources.filter(cource=>(cource.name === e.target.value));
        debugger;
        student.cource = selectedCource[0].id;
        student.courceName = selectedCource[0].name;
       
        FireManager.changeCources(student).then(
            this.setState({
                selectedCource:e.target.value
            })
        ).catch(err=>{
            console.log(err.message)
        }) 
    }

    handleSelectStatusChange = (e)=>{
        let {student} = this.props;
        let selectedStatuse = this.state.allStatuses.filter(status=>(status.name === e.target.value));
        debugger;
        student.status = selectedStatuse[0].id;
        student.statusName = selectedStatuse[0].name;

        FireManager.changeCources(student).then(
            this.setState({
                selectedStatuse:e.target.value
            })
        ).catch(err=>{
            console.log(err.message)
        }) 
    }
    render () {
        const {allStatuses, allCources, selectedCource, selectedStatuse} = this.state;
        let modalClose = () => this.setState({ modalShow: false });
        return (
            <Card className="col-12 container" key={this.props.student.id} bg="primary" text="white">
                <div className="row">
                    <Image className="col-2 border border-secondary" style={{width: "70px", height: "100%" +
                            "" +
                            "", paddingLeft: "0px", paddingRight: "0px"}}
                           variant="top"
                           src="https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/man-student.png"/>
                    <div className="col-10 border border-secondary">
                        
                        <select onChange = {this.handleSelectCourceChange} value = {selectedCource}>
                            {allCources.map(cource => (
                                <option key = {cource.id} value = {cource.name}>{cource.name}</option>
                            ))}
                        </select>

                        <select onChange = {this.handleSelectStatusChange} value = {selectedStatuse}>
                            {allStatuses.map(status => (
                                <option key = {status.id} value = {status.name}>{status.name}</option>
                            ))}
                        </select>
    
                        <Button variant="info" onClick = {this.toggleHidden.bind(this)}>More Information</Button>
                        {!this.state.isHidden && <ListGroup>
                                <ListGroup.Item disabled>E-mail: {this.props.student.email}</ListGroup.Item>
                                <ListGroup.Item disabled>Phone: {this.props.student.phone} </ListGroup.Item>
                            </ListGroup> }
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
        )
    }
}

