import React from "react";
import FireManager from "../../firebase/FireManager";
import CourcesButton from "./courcesButtonGroup"
import StatusesButton from "./statusesButtonGroup"
import StudentsList from "../students/studentsList";
import AllCources from "./allCources";
import AllStatuses from "./allStatuses";

class Main extends React.PureComponent {
  state = {
    students: [],
    withStatusStudents:[],
    withCourcesStudents:[],
    getStudentsError: "",
    statuses: [],
    cources: [],
    selectedCource:[],
    selectedStatus:'',
    showStudentsArr:[]
  };

  
  componentDidMount() {
    FireManager.getStudents()
      .then(querySnapshot => {
        this.setState({ students: querySnapshot.docs.map(doc => doc.data()) });
      })
      .catch(err => {
        this.setState({ getStudentsError: err.message });
      });

    FireManager.getCources()
      .then(querySnapshot => {
        this.setState({ cources: querySnapshot.docs.map(doc => doc.data()) });
      })
      .catch(err => {
        this.setState({ getStudentsError: err.message });
      });

     FireManager.getStatuses()
       .then(querySnapshot => {
         this.setState({ statuses: querySnapshot.docs.map(doc => doc.data()) });
       })
       .catch(err => {
         this.setState({ getStudentsError: err.message });
       });
       
  }

  

  statuseStudents = (status) => {
    this.filteredStudents()
  let { selectedStatus } = this.state;
    if (!selectedStatus || selectedStatus !== status.id) {
      selectedStatus = status.id
      this.setState({
        selectedStatus
      })
    } else {
  
       selectedStatus = '';
        this.setState({
          selectedStatus
        })
    }
   
  }

  filteredStudents = () => {
  
    let { selectedCource ,selectedStatus, students, allStudents} = this.state;
    let filters = selectedStatus?[...selectedCource,selectedStatus]:[...selectedCource];
    let resultArr = [];
    console.log('resultArr skzbum',resultArr);
      if (!selectedStatus && selectedCource.length) {
        debugger;
        resultArr = students.filter(student =>(filters.indexOf(student.cource) !== -1));
          console.log('chka ka',resultArr)
      }
      if (selectedStatus && !selectedCource.length) {
        resultArr = students.filter(student =>(filters.indexOf(student.status) !== -1));
        console.log('ka chka',resultArr)
      }
      if (selectedStatus && selectedCource.length) {
        resultArr = students.filter(student =>(filters.indexOf(student.status) !== -1)&& filters.indexOf(student.cource) !== -1);
        console.log('erkusn el ka',resultArr)
      }
      if (!selectedStatus && !selectedCource.length) {
        resultArr = students;
        console.log('wochmek chka')
      }
      console.log("resultArr werjnakan",resultArr);
      this.setState({
        showStudentsArr:resultArr
      })
 
  }
  
  courceStudents = (cource) => {
    const temporaryArrForCource=[];
    const {selectedCource} = this.state;
    if (selectedCource.indexOf(cource.id) === -1) {
      selectedCource.push(cource.id);
      this.setState({
        selectedCource
      })
    } else {
      selectedCource.splice(selectedCource.indexOf(cource.id),1);
      this.setState({
        selectedCource
      })
    }
  
    const{withCourcesStudents} = this.state;

    if(cource)
    this.state.students.find(student=>{
      if (cource.id === student.cource){
        temporaryArrForCource.push(student);
      }
      this.setState({
        withCourcesStudents:   withCourcesStudents.concat(temporaryArrForCource)
      })
      
    })
    this.filteredStudents();
    
  }

  //show students with selected status
  statuseStudents = statuse => {
    const withStatusStudents = [];
    this.state.students.find(student => {
      if (statuse.id === student.status) {
        withStatusStudents.push(student);
        this.setState({ withStatusStudents: withStatusStudents });
      } else {
        return false;
      }
    });
  };

  render() {
    const { students, statuses, cources, withCourcesStudents,withStatusStudents,showStudentsArr } = this.state;
    return (
      
        <div className="container border border-primary">
          <div className="row">
            <div className="col-12 border border-primary">
                <CourcesButton cources = { cources }
                  courceStudents = { this.courceStudents }
                  
                />
            </div>
          </div>
          <div className="row">
            <div className="col-2 border border-primary">
                <StatusesButton statuses = { statuses }
                  students={ students }
                  statuseStudents = {this.statuseStudents}/>
            </div>
            <div className="col-10 row container border border-primary">
                <StudentsList allStudents={ showStudentsArr } 
                  withStatusStudents={withStatusStudents} 
                  withCourcesStudents={withCourcesStudents}
                  filteredStudents = {this.filteredStudents}
                  />
                  
            </div>
            <button onClick ={this.filteredStudents}>aaaaaaa</button>
          </div>
        </div> )
  }
}

export default Main;
