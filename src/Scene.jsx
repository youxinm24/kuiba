import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

/**
 * STL模型组件（包含背景环面）
 */
function STLModel() {
  const modelGroup = useRef();
  const geometry = useLoader(STLLoader, "/kuiba.stl");

  // 计算模型包围盒以自动调整大小
  const bbox = new THREE.Box3().setFromObject(new THREE.Mesh(geometry));
  const size = new THREE.Vector3();
  bbox.getSize(size);
  const maxDim = Math.max(size.x, size.y, size.z);
  const scale = 4 / maxDim;

  return (
    <group ref={modelGroup} rotation={[-Math.PI / 2, 0, 1.75 * Math.PI]}>
      {/* STL模型 */}
      <mesh position={[0, 0, 0]} scale={scale}>
        <primitive object={geometry} attach="geometry" />
        <meshStandardMaterial color="#808080" metalness={0.3} roughness={0.6} />
      </mesh>

      {/* 扁平背景圆环 */}
      <mesh position={[0, 1, 0]} rotation={[-Math.PI / 2, 0, 1.75 * Math.PI]}>
        <ringGeometry args={[1.1, 1.3, 64]} /> {/* 内径1.1，外径1.3，分段64 */}
        <meshStandardMaterial
          color="#4169E1"
          metalness={0.2}
          roughness={0.3}
          transparent={true}
          opacity={0.8}
          side={THREE.DoubleSide} // 确保两面都可见
        />
      </mesh>
    </group>
  );
}

/**
 * Scene 组件 - 3D场景
 */
function Scene() {
  return (
    <group name="sceneContainer">
      {/* STL模型（包含背景环面） */}
      <STLModel />

      {/* 添加轨道控制器 - 只启用手动旋转 */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        rotateSpeed={1}
        autoRotate={false}
      />

      {/* 环境光照 */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
      <directionalLight position={[-5, 5, 5]} intensity={0.8} />
      <directionalLight position={[0, 0, 5]} intensity={0.6} />

      {/* 添加环境光球，提供更好的光照效果 */}
      <hemisphereLight
        skyColor="#ffffff"
        groundColor="#444444"
        intensity={0.7}
      />
    </group>
  );
}

export default Scene;
