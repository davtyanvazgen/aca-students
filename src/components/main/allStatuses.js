import React, { Component } from "react";
import { Button } from "reactstrap";

class AllStatuses extends Component {
  showStudentsStatus = statuse => {
    this.props.statuseStudents(statuse);
  };

  render() {
    const { statuses } = this.props;
    return (
      <div>
        {statuses.map(statuse => (
          <Button
            key={statuse.id}
            onClick={() => {
              this.showStudentsStatus(statuse);
            }}
            color="warning"
            className="mr-2"
          >
            {statuse.name}
          </Button>
        ))}
      </div>
    );
  }
}

export default AllStatuses;
