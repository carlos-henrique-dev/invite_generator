import React from "react";
import Konva from "konva";
import "./index.css";

class KonvaContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: null,
    };
  }

  renderKonva(container) {
    if (!container) {
      this.state.destroy();
      return;
    }

    var stage = new Konva.Stage({
      container,
      height: 500,
      width: 500,
    });

    this.state = stage;

    var layer = new Konva.Layer();
  }

  render() {
    return (
      <div className="konvacontainer">
        <div
          ref={(ref) => this.renderKonva(ref)}
          style={{ backgroundColor: "#c0c0c0" }}
        ></div>
      </div>
    );
  }
}

export default KonvaContainer;
