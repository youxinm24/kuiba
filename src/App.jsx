import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from 'three';
import Scene from "./Scene";
import "./base.css";

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
  return (
    <div className="canvas-container" style={{ width: "100vw", height: "100vh", background: "#000" }}>
      <Canvas
        gl={{ 
          antialias: true,
          shadowMap: {
            enabled: true,
            type: THREE.PCFSoftShadowMap
          }
        }}
        camera={{ 
          position: [0, 0, 10],  // 调整相机位置
          fov: 50,               // 减小视场角使视图更集中
          near: 0.1,
          far: 1000
        }}
      >
        <color attach="background" args={["#0F1C23"]} />
        {/* 环境光 */}
        <ambientLight intensity={1} />  
        <Suspense fallback={<Loader />}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default App;
