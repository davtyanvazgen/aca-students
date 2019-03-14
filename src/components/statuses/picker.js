import React from "react";
import { ChromePicker } from "react-color";
import { Button, Row, Col } from "reactstrap";

export default class Picker extends React.Component {
  render() {
    return (
      <>
        <Col>
          <Row>
            <Button
              style={{
                backgroundColor: `${this.props.background}`,
                border: "none"
              }}
            >
              {this.props.name ? this.props.name : "Short status"}
            </Button>
          </Row>
          <Row>
            <Button
              style={{
                backgroundColor: `${this.props.background}`,
                border: "none"
              }}
            >
              {this.props.longName ? this.props.longName : "Long Status"}
            </Button>
          </Row>
        </Col>

        <Col>
          <ChromePicker
            color={this.props.background}
            onChangeComplete={this.props.handleChangeComplete}
          />
        </Col>
      </>
    );
  }
}
