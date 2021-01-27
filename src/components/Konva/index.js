import React, { useRef, useState } from "react";
import names from "../../api/names";
import "./index.css";
import { Layer, Text, Stage, Image } from "react-konva";
import { Button, Dropdown, Menu } from "antd";
import { SketchPicker } from "react-color";
import useImage from "use-image";
import testefundo from "../../img/testefundo.jpg";

const KonvaContainer = () => {
  const stageRef = useRef();

  const [selectedPerson, setSelectedPerson] = useState(null);
  const [selectedPersonNameX, setSelectedPersonNameX] = useState(0);
  const [selectedPersonNameY, setSelectedPersonNameY] = useState(0);
  const [selectedPersonDistanceX, setSelectedPersonDistanceX] = useState(0);
  const [selectedPersonDistanceY, setSelectedPersonDistanceY] = useState(20);
  const [selectedPersonCityX, setSelectedPersonCityX] = useState(0);
  const [selectedPersonCityY, setSelectedPersonCityY] = useState(40);
  const [fontSize, setFontSize] = useState(14);
  const [textColor, setTextColor] = useState("#000");
  const [image] = useImage(testefundo);

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
          fontStyle="bold"
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
          fontStyle="bold"
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
          fontStyle="bold"
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
      <Menu.Item key="32">32</Menu.Item>
      <Menu.Item key="42">42</Menu.Item>
    </Menu>
  );

  const colorpicker = (
    <SketchPicker
      color={textColor}
      onChangeComplete={(color) => setTextColor(color.hex)}
    />
  );

  const downloadURI = (uri, name) => {
    const link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSaveImage = (e) => {
    e.preventDefault();

    const dataURL = stageRef.current.toDataURL({
      mimeType: "image/png",
      quality: 1.0,
      pixelRatio: 2,
    });
    downloadURI(dataURL, "teste");
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
            <span>Tamanho da fonte</span>
          </Dropdown>
          <Dropdown overlay={colorpicker}>
            <span>Cor do texto</span>
          </Dropdown>
        </div>

        <Stage
          width={500}
          height={500}
          ref={stageRef}
          style={{ backgroundColor: "#e0e0e0", marginBottom: 10 }}
        >
          <Layer>
            <Image image={image} width={500} height={500}/>
            {renderName()}
            {renderDistance()}
            {renderCity()}
          </Layer>
        </Stage>
        <div className="buttonsgroup">
          <Button onClick={() => setSelectedPerson(null)}>Limpar</Button>
          <Button onClick={handleSaveImage}>Exportar</Button>
        </div>
      </div>
    </div>
  );
};

export default KonvaContainer;
