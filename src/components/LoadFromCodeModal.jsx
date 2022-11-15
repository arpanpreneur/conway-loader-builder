import React from "react";
import { Input, Modal } from "antd";
import { useState } from "react";

const { TextArea } = Input;

export default function ({ isModalOpen, handleOk, handleCancel }) {
  const [codeString, setCodeString] = useState("");

  return <Modal title="Load Matrix" open={isModalOpen} onOk={() => handleOk(codeString)} onCancel={handleCancel}>
    <TextArea
      rows={10}
      placeholder="Paste your matrix here..."
      value={codeString}
      onChange={(e) => setCodeString(e.target.value)}
    />
  </Modal>;
}
