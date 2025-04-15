import React, { Suspense, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import Scene from "./Scene";
import "./base.css";
import Button from "./button";
import ControlPanel from "./ControlPanel";

const Loader = () => (
  <Html center>
    <div
      style={{
        color: "#FFFFFF",
        fontSize: "16px",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
      }}
    >
      Loading...
    </div>
  </Html>
);

// 主应用组件
const App = () => {
  const [isGlowing, setIsGlowing] = useState(false);
  const audioRef = useRef(new Audio("/maimen.mp3"));
  
  // 添加位置和旋转状态
  const [leftRingPosition, setLeftRingPosition] = useState({
    x: -2,
    y: 0.8,
    z: 0,
  });
  const [leftRingRotation, setLeftRingRotation] = useState({
    x: 2.2,
    y: 1.7,
    z: 0,
  });

  const handleToggleGlow = () => {
    setIsGlowing(!isGlowing);
    // 播放音效
    if (!isGlowing) {
      audioRef.current.currentTime = 0; // 重置音频播放位置
      audioRef.current.play();
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#000",
        position: "relative",
      }}
    >
      <div
        className="canvas-container"
        style={{ width: "100%", height: "100%" }}
      >
        <Canvas
          gl={{
            antialias: true,
            shadowMap: {
              enabled: true,
              type: THREE.PCFSoftShadowMap,
            },
          }}
          camera={{
            position: [0, 0, 10],
            fov: 50,
            near: 0.1,
            far: 1000,
          }}
        >
          <color attach="background" args={["#0F1C23"]} />
          <ambientLight intensity={1} />
          <Suspense fallback={<Loader />}>
            <Scene 
              isGlowing={isGlowing} 
              leftRingPosition={leftRingPosition}
              leftRingRotation={leftRingRotation}
            />
          </Suspense>
        </Canvas>
      </div>

      <Button onClick={handleToggleGlow} isGlowing={isGlowing} />
      
      <ControlPanel
        position={leftRingPosition}
        rotation={leftRingRotation}
        onPositionChange={setLeftRingPosition}
        onRotationChange={setLeftRingRotation}
      />
    </div>
  );
};

export default App;
