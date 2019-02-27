import React, { Component } from "react";
import { Button, ButtonGroup } from "reactstrap";
import { Link } from "react-router-dom";

class Buttons extends Component {
    constructor(props) {
        super(props);
        this.state = { cSelected: [] };
        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    }

    onRadioBtnClick(rSelected) {
        this.setState({ rSelected });
    }

    render() {
        return (
            <div>
                <ButtonGroup>
                    <Link to="/students">
                        <Button
                            className="mr-1"
                            color="dark"
                            onClick={() => this.onRadioBtnClick(1)}
                            active={this.state.rSelected === 1}
                        >
                            Students
                        </Button>
                    </Link>

                    <Link to="/cources">
                        <Button
                            className="mr-1"
                            color="dark"
                            onClick={() => this.onRadioBtnClick(2)}
                            active={this.state.rSelected === 2}
                        >
                            Cources
                        </Button>
                    </Link>

                    <Link to="/statuses">
                        <Button
                            className="mr-1"
                            color="dark"
                            onClick={() => this.onRadioBtnClick(3)}
                            active={this.state.rSelected === 3}
                        >
                            Statuses
                        </Button>
                    </Link>
                </ButtonGroup>
                {/* <p>Selected: {this.state.rSelected}</p> */}
            </div>
        );
    }
}

export default Buttons;