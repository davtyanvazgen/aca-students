import React, { PureComponent } from "react";
import { Button, ListGroup, Image, Card } from "react-bootstrap";
import FireManager from "../../firebase/FireManager";
import EditStudentModal from "./editInfoStudent";
export default class StudentItem extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            allCources: props.allCources,
            getCourcesError: "",
            isHidden: true,
            dropdownOpenCource: false,
            dropdownOpenStatus: false,
            allStatuses:props.allStatuses,
            selectedCource:this.props.student.courceName,
            selectedStatuse:this.props.student.statusName
        }
    }

    componentWillUnmount() {
        FireManager.getCources();
        FireManager.getStatuses();
    }

    toggleHidden () {
        this.setState({
            isHidden: !this.state.isHidden
        })
    }

    handleSelectCourceChange = (e)=>{
        let {student} = this.props;
        let selectedCource = this.state.allCources.filter(cource=>(cource.name === e.target.value));
        student.cource = selectedCource[0].id;
        student.courceName = selectedCource[0].name;
        FireManager.changeCources(student).then(
            this.setState({
                selectedCource:e.target.value
            })
        ).catch(err=>{
            console.log(err.message)
        })
        this.props.repeatFiltering();
    }

    handleSelectStatusChange = (e)=>{
        let {student} = this.props;
        let selectedStatuse = this.state.allStatuses.filter(status=>(status.name === e.target.value));

        student.status = selectedStatuse[0].id;
        student.statusName = selectedStatuse[0].name;

        FireManager.changeCources(student).then(
            this.setState({
                selectedStatuse:e.target.value
            })
        ).catch(err=>{
            console.log(err.message)
        })
        this.props.repeatFiltering();
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
                           src="https://www.nastol.com.ua/download.php?img=201801/1920x1200/nastol.com.ua-265532.jpg"/>
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

