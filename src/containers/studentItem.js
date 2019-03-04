import React, { PureComponent } from "react";
import FireManager from "../firebase/FireManager";
import StudentCard from "../components/students/studentCard";

export default class StudentItem extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            isHidden: true,
            dropdownOpenCource: false,
            dropdownOpenStatus: false,
            selectedCource:this.props.student.courceName,
            selectedStatuse:this.props.student.statusName
        }
    }


    toggleHidden  = () => {
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
    setModalShow = () => {
        this.setState({ modalShow: true })
    }
    setModalClose = () => {
        this.setState({modalShow:false})
    }
    render () {
        const {allStatuses, allCources, selectedCource, selectedStatuse, isHidden, modalShow} =this.state;
        const { student } = this.props;
        return (
            <StudentCard  
                allCources  = { this.props.allCources }
                allStatuses = { this.props.allStatuses }
                selectedCource = { selectedCource }
                selectedStatuse = { selectedStatuse }
                student = { student }
                handleSelectCourceChange = { this.handleSelectCourceChange }
                handleSelectStatusChange = { this.handleSelectStatusChange }
                toggleHidden = { this.toggleHidden }
                isHidden = { isHidden }
                modalShow = { modalShow }
                setModalShow = { this.setModalShow }
                modalClose = { this.setModalClose }
                removeStudent={this.props.removeStudent}
            />
        )
    }
}

