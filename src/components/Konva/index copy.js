import React, { useEffect, useRef, useState } from "react";
import names from "../../api/names";
import "./index.css";
import { Layer, Text } from "react-konva";
import Konva from "konva";
import { Button, Dropdown, Menu } from "antd";
import { SketchPicker } from "react-color";

const KonvaContainer = () => {
  const [stage, setStage] = useState(null);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [selectedPersonNameX, setSelectedPersonNameX] = useState(0);
  const [selectedPersonNameY, setSelectedPersonNameY] = useState(0);
  const [selectedPersonDistanceX, setSelectedPersonDistanceX] = useState(20);
  const [selectedPersonDistanceY, setSelectedPersonDistanceY] = useState(20);
  const [selectedPersonCityX, setSelectedPersonCityX] = useState(40);
  const [selectedPersonCityY, setSelectedPersonCityY] = useState(50);
  const [fontSize, setFontSize] = useState(12);
  const [textColor, setTextColor] = useState("#000");

  useEffect(() => {
    const test = document.getElementById("container");
    setStage(test);
    renderStage()
  });

  const renderNames = () => {
    return names.map((elem) => {
      return (
        <p key={elem.id} onClick={() => setSelectedPerson(elem.id)}>
          {elem.name}
        </p>
      );
    });
  };

  const renderName = () => {
    if (selectedPerson !== null) {
      const person = names.find((elem) => elem.id === selectedPerson);
      return (
        <Text
          text={person.name}
          x={selectedPersonNameX}
          y={selectedPersonNameY}
          fontSize={fontSize}
          fill={textColor}
          draggable
          onDragEnd={(e) => {
            setSelectedPersonNameX(e.target.x());
            setSelectedPersonNameY(e.target.y());
          }}
        ></Text>
      );
    }
    return null;
  };
  const renderDistance = () => {
    if (selectedPerson !== null) {
      const person = names.find((elem) => elem.id === selectedPerson);
      return (
        <Text
          text={person.distance}
          x={selectedPersonDistanceX}
          y={selectedPersonDistanceY}
          fontSize={fontSize}
          fill={textColor}
          draggable
          onDragEnd={(e) => {
            setSelectedPersonDistanceX(e.target.x());
            setSelectedPersonDistanceY(e.target.y());
          }}
        ></Text>
      );
    }
    return null;
  };
  const renderCity = () => {
    if (selectedPerson !== null) {
      const person = names.find((elem) => elem.id === selectedPerson);
      return (
        <Text
          text={person.city}
          x={selectedPersonCityX}
          y={selectedPersonCityY}
          fontSize={fontSize}
          fill={textColor}
          draggable
          onDragEnd={(e) => {
            setSelectedPersonCityX(e.target.x());
            setSelectedPersonCityY(e.target.y());
          }}
        ></Text>
      );
    }
    return null;
  };

  const menu = (
    <Menu onClick={(e) => setFontSize(parseInt(e.key))}>
      <Menu.Item key="12">12</Menu.Item>
      <Menu.Item key="18">18</Menu.Item>
      <Menu.Item key="20">20</Menu.Item>
      <Menu.Item key="22">22</Menu.Item>
    </Menu>
  );

  const colorpicker = (
    <SketchPicker
      color={textColor}
      onChangeComplete={(color) => setTextColor(color.hex)}
    />
  );

  /*   const exportImage = (uri, name) => {
    const link = document.createElement("a");
    link.download = name;
    link.href = uri;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    // delete link;
  }; */

  const logstage = () => {
    const data = document.getElementById("stagecontainer");
    console.log(data);
  };

  const renderStage = () => {
    // var test = document.getElementById("container");
    let newstage = new Konva.Stage({
      width: 500,
      height: 500,
      container: stage,
    });
    console.log(newstage);
  };

  return (
    <div className="konvacontainer">
      <div className="nameslist">
        <h1>Desafiantes</h1>
        {renderNames()}
      </div>
      <div className="konvacontent">
        <div className="textEditor">
          <Dropdown overlay={menu}>
            <a>Tamanho da fonte</a>
          </Dropdown>
          <Dropdown overlay={colorpicker}>
            <a>Cor do texto</a>
          </Dropdown>
        </div>
        <div id="container"></div>
        {/*  <Stage
          // width={500}
          // height={500}
          style={{ backgroundColor: "#e0e0e0", marginBottom: 10 }}
        >
          <Layer>
            {renderName()}
            {renderDistance()}
            {renderCity()}
          </Layer>
        </Stage> */}
        <div className="buttonsgroup">
          <Button onClick={() => setSelectedPerson(null)}>Limpar</Button>
          <Button onClick={() => logstage()}>Exportar</Button>
        </div>
      </div>
    </div>
  );
};

export default KonvaContainer;


/*
import React from "react";
import Konva from "konva";
import "./index.css";
import names from "../../api/names";

class KonvaContainer extends React.Component {
  state = {
    stage: null,
    selectedPerson: {
      isSelected: false,
      id: null,
      name: { value: "", x: 0, y: 0 },
      distance: { value: "", x: 20, y: 0 },
      city: { value: "", x: 40, y: 0 },
    },
    fontSize: 12,
    textColor: "#000",
  };

  setSelectedPerson(object) {
    const sPerson = {
      name: { value: "", x: 0, y: 0 },
      distance: { value: "", x: 20, y: 0 },
      city: { value: "", x: 40, y: 0 },
    };
    sPerson.id = object.id;
    sPerson.name.value = object.name;
    sPerson.distance.value = object.distance;
    sPerson.city.value = object.city;

    this.setState(
      (prevState) => ({
        selectedPerson: {
          ...prevState.selectedPerson,
          ...sPerson,
        },
      }),
      this.drawStage()
    );
  }

  drawStage() {
    let layer = new Konva.Layer();
    let circle = new Konva.Circle({
      x: 50,
      y: 50,
      radius: 50,
      fill: "red",
      stroke: "black",
      strokeWidth: 4,
      draggable: true,
    });

    layer.add(circle);

    let stage = this.state.stage;

    stage.add(layer);
    this.setState((prevState) => ({ ...prevState, ...stage }));
    // this.state.stage.add(layer);
  }

  renderKonva(container) {
    if (!container) {
      this.state.stage.destroy();
      return;
    }

    var stage = new Konva.Stage({
      container,
      height: 500,
      width: 500,
    });
    
    this.state.stage = stage;
  }

  renderNames() {
    return names.map((elem) => {
      return (
        <p key={elem.id} onClick={() => this.setSelectedPerson(elem)}>
          {elem.name}
        </p>
      );
    });
  }

  renderText(object) {
    if (this.selectedPerson.isSelected) {
    }
  }

  render() {
    return (
      <div className="konvacontainer">
        <div className="nameslist">
          <h1>Desafiantes</h1>
          {this.renderNames()}
        </div>
        <div
          ref={(ref) => this.renderKonva(ref)}
          style={{ backgroundColor: "#c0c0c0" }}
        ></div>
      </div>
    );
  }
}

export default KonvaContainer;

*/