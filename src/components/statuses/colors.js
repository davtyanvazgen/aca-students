// import React from "react";

// import { SketchPicker } from "react-color";

// export default class Color extends React.Component {
//   render() {
//     return <SketchPicker />;
//   }
// }

import React from "react";
import { SketchPicker } from "react-color";

export default class Color extends React.Component {
  state = {
    c: ""
  };

  handleChangeComplete = color => {
    this.setState({ c: color.hex });
    console.log(this.state.c);
  };

  handleClick() {
    console.log(this.state.c);
  }
  render() {
    return (
      <>
        <SketchPicker
          color={this.state.c}
          onChangeComplete={this.handleChangeComplete}
        />
        <button style={{ backgroundColor: `${this.state.c}` }}>ok</button>
      </>
    );
  }
}
