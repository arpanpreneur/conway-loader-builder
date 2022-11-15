import React from "react";
import { Input, Modal, Typography, message } from "antd";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

const { Paragraph, Title } = Typography;

export default function GenerateCodeModal({
  height,
  width,
  cellSizeR,
  cellSizeC,
  initialBoard,
  aliveColor,
  deadColor,
  randomColor,
  animationDelay,
  fixCellSizes,
  loopPattern,

  isModalOpen,
  handleOk,
  handleCancel,
}) {
  const generatedCode = `
  loader = conwayLoader.createLoader({
    rootNode: document.getElementById("root"),
    height: ${height},
    width: ${width},
    animationDelay: ${animationDelay},
    randomColor: ${randomColor},
    initialBoard: ${JSON.stringify(initialBoard)},
    deadColor: '${deadColor}',
    aliveColor: '${aliveColor}',
    loopPattern: ${loopPattern}
  });

  loader.render();
  loader.start();

  // You can stop the loader interval timer anytime using loader.stop();
  `;

  return (
    <Modal
      title="Generate Loader Code"
      open={isModalOpen}
      onCancel={handleCancel}
      okType="primary"
      okText="Copy Code"
      cancelText="Close"
      width={650}
      onOk={async () => {
        await navigator.clipboard.writeText(generatedCode);
        message.success("Code Copied to Clipboard");
      }}
    >
      <div style={{ overflow: "scroll", height: 500 }}>
        <Typography>
          <Title level={5}>Install it</Title>
          <Paragraph code copyable>
            {"npm install conway-loader"}
          </Paragraph>

          <Title level={5}>Import (CommonJS)</Title>
          <Paragraph code copyable>
            {"const conwayLoader = require('conway-loader')"}
          </Paragraph>

          <Title level={5}>Import (ES6)</Title>
          <Paragraph code copyable>
            {"import conwayLoader from 'conway-loader"}
          </Paragraph>
        </Typography>
        <Title level={5}>Code</Title>
        <SyntaxHighlighter language="javascript" style={docco}>
          {generatedCode}
        </SyntaxHighlighter>
      </div>
    </Modal>
  );
}
