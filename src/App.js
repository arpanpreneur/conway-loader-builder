import "./App.css";
import { useEffect, useState } from "react";
import React from "react";
import { Button, message, Layout, Typography, Input, Row, PageHeader, Descriptions, Col, Switch } from "antd";
import { CopyOutlined, CodeFilled } from "@ant-design/icons";
import GridRenderer from "./components/GridRenderer";
import { buildMatrix, resizedMatrix } from "./helpers/matrixHelpers";
import LoadFromCodeModal from "./components/LoadFromCodeModal";
import ReactConwayLoader from "./components/ReactConwayLoader";
import GenerateCodeModal from "./components/GenerateCodeModal";

const { Content } = Layout;
const { Title } = Typography;

function App() {
  const [numRows, setNumRows] = useState(10);
  const [numCols, setNumCols] = useState(10);

  const [mainMatrix, setMainMatrix] = useState([]);

  const [loadMatrixModalOpen, setLoadMatrixModalOpen] = useState(false);
  const [generateCodeModalOpen, setGenerateCodeModalOpen] = useState(false);

  const [previewHeight, setPreviewHeight] = useState(150);
  const [previewWidth, setPreviewWidth] = useState(150);
  
  const [randomColor, setRandomColor] = useState(true);
  const [aliveColor, setAliveColor] = useState("#000000");
  const [deadColor, setDeadColor] = useState("#FFFFFF");

  const [loopPattern, setLoopPattern] = useState(true);
  const [animationDelay, setAnimationDelay] = useState(100);

  const initMatrix = () => {
    const tempMatrix = buildMatrix(numRows, numCols, (i, j) => 0);
    setMainMatrix(tempMatrix);
  };

  const updateMatrix = (row, col, val) => {
    const tempMatrix = structuredClone(mainMatrix);
    tempMatrix[row][col] = val;

    setMainMatrix(tempMatrix);
  };

  const handleLoadMatrix = (codeString) => {
    const tempMatrix = JSON.parse(codeString);

    const xRows = tempMatrix ? tempMatrix.length : 0;
    const xCols = xRows > 0 ? tempMatrix[0].length : 0;

    setNumRows(xRows);
    setNumCols(xCols);
    setMainMatrix(tempMatrix);

    setLoadMatrixModalOpen(false);
  };

  
  useEffect(() => {
    initMatrix();
  }, [])

  return (
    <div className="App">
      <PageHeader
        ghost={false}
        title="Conway Loader Builder"
        subTitle="Use this to create and debug Presets for Conway Loader"
        extra={[
          <Button
            key="1"
            type="primary"
            icon={<CodeFilled />}
            onClick={() => setGenerateCodeModalOpen(true)}
          >
            Generate Code
          </Button>,
          <Button 
            key="2" 
            onClick={() => setMainMatrix(resizedMatrix(mainMatrix, numRows, numCols))}
          >
            Resize Seed Matrix
          </Button>,
          <Button key="3" onClick={initMatrix}>
            Reset Seed
          </Button>,
          <Button
            key="4"
            icon={<CopyOutlined />}
            onClick={async () => {
              await navigator.clipboard.writeText(JSON.stringify(mainMatrix));
              message.success("Matrix Copied to Clipboard");
            }}
          >
            Copy Matrix
        </Button>,
          <Button key="5" onClick={() => setLoadMatrixModalOpen(true)}>Load Matrix</Button>,
        ]}
      >
        <Descriptions size="small" column={4}>
          <Descriptions.Item>
            <Input value={numRows} addonBefore="Rows" onChange={(e) => setNumRows(e.target.value)} />
          </Descriptions.Item>

          <Descriptions.Item>
            <Input value={numCols} addonBefore="Cols" onChange={(e) => setNumCols(e.target.value)} />
          </Descriptions.Item>

          <Descriptions.Item>
            <Input value={previewHeight} addonBefore="Preview Height" addonAfter="px" onChange={(e) => setPreviewHeight(e.target.value)} />
          </Descriptions.Item>

          <Descriptions.Item>
            <Input value={previewWidth} addonBefore="Preview Width" addonAfter="px" onChange={(e) => setPreviewWidth(e.target.value)} />
          </Descriptions.Item>

          <Descriptions.Item>
            <Input value={animationDelay} addonBefore="Animation Delay" addonAfter="ms" onChange={(e) => setAnimationDelay(e.target.value)} />
          </Descriptions.Item>

          <Descriptions.Item>
              <Col span={12} style={{padding: 4}} >
                <Switch checked={loopPattern} checkedChildren="Loop Pattern" unCheckedChildren="Loop Pattern" onChange={(e) => setLoopPattern(e)} />
              </Col>
              <Col span={12} style={{padding: 4}} >
                <Switch checked={randomColor} checkedChildren="Random Color" unCheckedChildren="Random Color" onChange={(e) => setRandomColor(e)} />
              </Col>      
          </Descriptions.Item>

         
          <Descriptions.Item>
            <Input type="color" value={aliveColor} addonBefore="Alive Color" onChange={(e) => setAliveColor(e.target.value)} />
            <Input type="color" value={deadColor} addonBefore="Dead Color" onChange={(e) => setDeadColor(e.target.value)} />
          </Descriptions.Item>

        </Descriptions>
        <Content>
          <Row>
            <Col xs={16}>
              <Title level={4}>Seed Matrix</Title>
              <div style={{width: '100%', overflow: 'scroll'}}>
                <GridRenderer
                  displayMatrix={mainMatrix}
                  onCellClick={(row, col) => updateMatrix(row, col, 1 - mainMatrix[row][col])}
                />
              </div>
            </Col>
            <Col xs={8}>
              <Title level={4}>Loader Simulation</Title>
              {mainMatrix && mainMatrix.length > 0 && mainMatrix[0].length > 0 && <ReactConwayLoader 
                height={previewHeight}
                width={previewWidth}
                animationDelay={animationDelay}
                randomColor={randomColor}
                initialBoard={mainMatrix} 
                aliveColor={aliveColor}
                deadColor={deadColor}
                loopPattern={loopPattern}            
              />}
            </Col>
          </Row>
         
        </Content>
      </PageHeader>
      <LoadFromCodeModal
        isModalOpen={loadMatrixModalOpen}
        handleOk={handleLoadMatrix}
        handleCancel={() => setLoadMatrixModalOpen(false)}
      />
      <GenerateCodeModal
        isModalOpen={generateCodeModalOpen}
        handleCancel={() => setGenerateCodeModalOpen(false)}

        height={previewHeight}
        width={previewWidth}
        animationDelay={animationDelay}
        randomColor={randomColor}
        initialBoard={mainMatrix} 
        aliveColor={aliveColor}
        deadColor={deadColor}
        loopPattern={loopPattern}
      />
    </div>
  );
}

export default App;
