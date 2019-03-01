import React from "react"


export default function StatusesButton(props) {
   
    return (
        <div className="btn-group-vertical border border-primary" role="group" aria-label="Basic example">
            {props.statuses.map(status => (
                <button 
                    type="button"
                    onClick={()=>{props.statuseStudents(status)}} 
                    className="btn btn-secondary border border-primary"
                    key = {status.id}>
                    {status.name}
                </button>
            ))}
        </div>
    )
}

// import React ,{Component}from "react"

// export default class StatusesButton extends Component {
    
   
//     toggleColor =(e)=>{
//         debugger;
//        let el =document.getElementById(e);
//       let color = el.style.background === 'rgb(204, 204, 204)'? '#1c1212':"#ccc";
//       el.style.background = color;
//     }
    
//   render(){
//     return (
//         <div className="btn-group-vertical border border-primary" role="group" aria-label="Basic example">
//             {this.props.statuses.map(status => (
//                 <button 
//                     type="button"
//                     id = {status.id}
//                     style = {{background:'#ccc'}}
//                     onClick={()=>{this.props.statuseStudents(status);this.toggleColor(status.id)}}
//                     className="btn btn-secondary border border-primary"
//                     key = {status.id}>
//                     {status.name}
//                 </button>
//             ))}
//         </div>
//     )
//   }
// }