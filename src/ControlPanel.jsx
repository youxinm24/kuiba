import React from "react";
import styled from "styled-components";

const FloatingPanel = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgba(15, 28, 35, 0.85);
  padding: 20px;
  border-radius: 10px;
  color: #fff;
  width: 300px;
  font-family: Arial, sans-serif;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 208, 255, 0.3);
  box-shadow: 0 0 20px rgba(0, 208, 255, 0.2);
  z-index: 1000;

  h3 {
    margin: 0 0 15px 0;
    color: #00d0ff;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .control-group {
    margin-bottom: 15px;
    position: relative;

    label {
      display: block;
      margin-bottom: 5px;
      font-size: 14px;
      color: #00d0ff;
    }

    .value-display {
      position: absolute;
      right: 0;
      top: 0;
      color: #00d0ff;
      font-size: 12px;
      background: rgba(15, 28, 35, 0.8);
      padding: 2px 6px;
      border-radius: 4px;
    }

    input[type="range"] {
      width: 100%;
      margin: 10px 0;
      -webkit-appearance: none;
      background: transparent;

      &::-webkit-slider-runnable-track {
        width: 100%;
        height: 4px;
        background: rgba(0, 208, 255, 0.3);
        border-radius: 2px;
      }

      &::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 16px;
        width: 16px;
        border-radius: 50%;
        background: #00d0ff;
        margin-top: -6px;
        cursor: pointer;
        transition: all 0.2s ease;
        box-shadow: 0 0 10px rgba(0, 208, 255, 0.5);

        &:hover {
          transform: scale(1.1);
          background: #fff;
        }
      }
    }
  }
`;

const ControlPanel = ({
  position,
  rotation,
  onPositionChange,
  onRotationChange,
}) => {
  return <></>;
  const handlePositionChange = (axis, value) => {
    onPositionChange({ ...position, [axis]: parseFloat(value) });
  };

  const handleRotationChange = (axis, value) => {
    onRotationChange({ ...rotation, [axis]: parseFloat(value) });
  };

  return (
    <FloatingPanel>
      <div className="section">
        <h3>
          位置控制{" "}
          <small style={{ fontSize: "12px", opacity: 0.7 }}>Position</small>
        </h3>
        <div className="control-group">
          <label>X 轴位置</label>
          <span className="value-display">{position.x.toFixed(2)}</span>
          <input
            type="range"
            min="-5"
            max="5"
            step="0.1"
            value={position.x}
            onChange={(e) => handlePositionChange("x", e.target.value)}
          />
        </div>
        <div className="control-group">
          <label>Y 轴位置</label>
          <span className="value-display">{position.y.toFixed(2)}</span>
          <input
            type="range"
            min="-5"
            max="5"
            step="0.1"
            value={position.y}
            onChange={(e) => handlePositionChange("y", e.target.value)}
          />
        </div>
        <div className="control-group">
          <label>Z 轴位置</label>
          <span className="value-display">{position.z.toFixed(2)}</span>
          <input
            type="range"
            min="-5"
            max="5"
            step="0.1"
            value={position.z}
            onChange={(e) => handlePositionChange("z", e.target.value)}
          />
        </div>
      </div>

      <div className="section">
        <h3>
          旋转控制{" "}
          <small style={{ fontSize: "12px", opacity: 0.7 }}>Rotation</small>
        </h3>
        <div className="control-group">
          <label>X 轴旋转</label>
          <span className="value-display">
            {((rotation.x * 180) / Math.PI).toFixed(0)}°
          </span>
          <input
            type="range"
            min={-Math.PI}
            max={Math.PI}
            step="0.1"
            value={rotation.x}
            onChange={(e) => handleRotationChange("x", e.target.value)}
          />
        </div>
        <div className="control-group">
          <label>Y 轴旋转</label>
          <span className="value-display">
            {((rotation.y * 180) / Math.PI).toFixed(0)}°
          </span>
          <input
            type="range"
            min={-Math.PI}
            max={Math.PI}
            step="0.1"
            value={rotation.y}
            onChange={(e) => handleRotationChange("y", e.target.value)}
          />
        </div>
        <div className="control-group">
          <label>Z 轴旋转</label>
          <span className="value-display">
            {((rotation.z * 180) / Math.PI).toFixed(0)}°
          </span>
          <input
            type="range"
            min={-Math.PI}
            max={Math.PI}
            step="0.1"
            value={rotation.z}
            onChange={(e) => handleRotationChange("z", e.target.value)}
          />
        </div>
      </div>
    </FloatingPanel>
  );
};

export default ControlPanel;
