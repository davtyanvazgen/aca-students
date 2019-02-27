import React, { Component } from "react"
import {Card} from "react-bootstrap";
import {ListGroup} from "react-bootstrap";
import {Button} from "react-bootstrap";
import {Image} from "react-bootstrap";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import FireManager from "../../firebase/FireManager"


export default class StudentItem extends Component {
    constructor(props){
        super(props);
        this.toggleCource = this.toggleCource.bind(this);
        this.toggleStatus = this.toggleStatus.bind(this);

        this.state = {
            cources: [],
            getCourcesError: "",
            isHidden: true,
            dropdownOpenCource: false,
            dropdownOpenStatus: false

        }
    }

    toggleCource() {
        this.setState({
            dropdownOpenCource: !this.state.dropdownOpenCource
        });
    }

    toggleStatus() {
        this.setState({
            dropdownOpenStatus: !this.state.dropdownOpenStatus
        });
    }


    componentDidMount() {
        FireManager.getCources()
            .then(querySnapshot => {
                this.setState({ cources: querySnapshot.docs.map(doc => doc.data()) });
            })
            .catch(err => {
                this.setState({ getCourcesError: err.message });
            });

    }

    getCourseById (){
        console.log(this.state.cources, this.state.getCourcesError)
    }

    toggleHidden () {
        this.setState({
            isHidden: !this.state.isHidden
        })
    }

    render () {
        return (
            <Card className="col-12 container" key={this.props.student.id} bg="primary" text="white">
                <div className="row">
                    <Image className="col-2 border border-secondary" style={{width: "70px", height: "100%" +
                            "" +
                            "", paddingLeft: "0px", paddingRight: "0px"}}
                           variant="top"
                           src="https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/man-student.png"/>
                    <div className="col-10 border border-secondary">
                        Course: <Dropdown isOpen={this.state.dropdownOpenCource} toggle={this.toggleCource}>
                            <DropdownToggle caret>
                                {this.props.student.courceName}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem header>Choose Cource</DropdownItem>
                                <DropdownItem>Some Action</DropdownItem>
                                <DropdownItem>Foo Action</DropdownItem>
                                <DropdownItem>Bar Action</DropdownItem>
                                <DropdownItem>Quo Action</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        Status: <Dropdown isOpen={this.state.dropdownOpenStatus} toggle={this.toggleStatus}>
                        <DropdownToggle caret>
                            {this.props.student.statusName}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem header>Choose Status</DropdownItem>
                            <DropdownItem>Some Action</DropdownItem>
                            <DropdownItem>Foo Action</DropdownItem>
                            <DropdownItem>Bar Action</DropdownItem>
                            <DropdownItem>Quo Action</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                        <Button variant="info" onClick={this.toggleHidden.bind(this)}>More Information</Button>
                        {!this.state.isHidden && <ListGroup>
                                <ListGroup.Item disabled>E-mail: {this.props.student.email}</ListGroup.Item>
                                <ListGroup.Item disabled>Phone: {this.props.student.phone} </ListGroup.Item>
                            </ListGroup> }
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 border border-secondary">
                        {`${this.props.student.fullName}`.toUpperCase()}
                    </div>
                </div>
            </Card>
        )
    }
}

