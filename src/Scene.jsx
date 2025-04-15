import React, { useRef, useState } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { OrbitControls } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import * as THREE from "three";

/**
 * STL模型组件（包含背景环面和底座）
 */
function STLModel({ isGlowing, leftRingPosition, leftRingRotation }) {
  const mediaQuery = window.matchMedia("(max-width: 768px)"); // 判断是否是移动端
  const modelGroup = useRef();
  const geometry = useLoader(STLLoader, "/manji.stl");

  // 计算模型包围盒以自动调整大小
  const bbox = new THREE.Box3().setFromObject(new THREE.Mesh(geometry));
  const size = new THREE.Vector3();
  bbox.getSize(size);
  const maxDim = Math.max(size.x, size.y, size.z);
  const scale = 4 / maxDim;

  // 使用 spring 动画
  const { positionZ } = useSpring({
    positionZ: isGlowing ? (mediaQuery.matches ? -5 : -3.6) : -0.5,
    config: { mass: 1, tension: 180, friction: 12 },
  });

  return (
    <animated.group ref={modelGroup} position-z={positionZ}>
      {/* STL模型 */}
      {isGlowing && (
        <mesh
          position={[0, -2, 0]}
          scale={scale}
          rotation={[-Math.PI / 2, 0, 1.75 * Math.PI]}
        >
          <primitive object={geometry} attach="geometry" />
          <meshStandardMaterial
            color="#808080"
            metalness={0.3}
            roughness={0.6}
          />
        </mesh>
      )}
      {/* 圆形底座 */}
      <mesh position={[0, -2, 0]} rotation={[0, 0, 0]}>
        {/* 圆形底座 半径0.8 高度0.9 圆环数32  */}
        <cylinderGeometry args={[1.1, 1.5, 0.05, 32]} />
        {/* 调整底座大小和高度 */}
        <meshStandardMaterial
          color="#808080"
          metalness={0.7}
          roughness={0.2}
          transparent={true}
          opacity={0.9}
        />
      </mesh>

      {/* 后环*/}
      <mesh position={[0, 1.2, -1.2]} rotation={[0, -0.25, 0]}>
        <Round isGlowing={isGlowing} size={1.2} />
      </mesh>

      {/* 左环 */}
      <mesh
        position={[leftRingPosition.x, leftRingPosition.y, leftRingPosition.z]}
        rotation={[leftRingRotation.x, leftRingRotation.y, leftRingRotation.z]}
      >
        <Round isGlowing={isGlowing} size={0.6} />
      </mesh>

      {/* 右上环 */}
      <mesh
        position={[2.4, 1.1, 1.1]}
        rotation={[
          -25 * (Math.PI / 180),
          -129 * (Math.PI / 180),
          21 * (Math.PI / 180),
        ]}
      >
        <Round isGlowing={isGlowing} size={0.7} />
      </mesh>

      {/* 左上环 */}
      <mesh
        position={[-2.4, 1.1, 1.1]}
        rotation={[
          -25 * (Math.PI / 180),
          129 * (Math.PI / 180),
          21 * (Math.PI / 180),
        ]}
      >
        <Round isGlowing={isGlowing} size={0.7} />
      </mesh>

      {/* 左上环 */}
      <mesh
        position={[-1.6, -1, 1.9]}
        rotation={[
          26 * (Math.PI / 180),
          129 * (Math.PI / 180),
          21 * (Math.PI / 180),
        ]}
      >
        <Round isGlowing={isGlowing} size={0.6} />
      </mesh>

      {/* 右下环 */}
      <mesh
        position={[1.6, -1, 1.9]}
        rotation={[
          26 * (Math.PI / 180),
          -129 * (Math.PI / 180),
          21 * (Math.PI / 180),
        ]}
      >
        <Round isGlowing={isGlowing} size={0.6} />
      </mesh>
    </animated.group>
  );
}

function Round({ isGlowing, size = 1 }) {
  // 定义发光和不发光状态的颜色和强度
  const glowColor = "#00D0FF";

  // 外环动画
  const outerSpring = useSpring({
    color: glowColor,
    emissive: glowColor,
    emissiveIntensity: isGlowing ? 2 : 0,
    opacity: isGlowing ? 1 : 0,
    config: { mass: 2, tension: 80, friction: 20 },
  });

  // 内环动画 - 保持固定状态
  const innerSpring = useSpring({
    color: glowColor,
    emissive: glowColor,
    emissiveIntensity: isGlowing ? 2 : 0,
    opacity: isGlowing ? 1 : 0,
    config: { mass: 2, tension: 80, friction: 20 },
  });

  // 扩散环动画
  const [rippleScale, setRippleScale] = React.useState(0.1);

  useFrame(() => {
    if (isGlowing) {
      setRippleScale((scale) => {
        const newScale = scale + 0.015; // 加快扩散速度
        return newScale > 1.2 * size ? 0.1 : newScale;
      });
    }
  });

  return (
    <group>
      {/* 外环 */}
      <mesh>
        <ringGeometry args={[1.4 * size, 1.33 * size, 64]} />
        <animated.meshStandardMaterial
          color={outerSpring.color}
          emissive={outerSpring.emissive}
          emissiveIntensity={outerSpring.emissiveIntensity}
          metalness={0.2}
          roughness={0.1}
          transparent={true}
          opacity={outerSpring.opacity}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* 内环 */}
      <mesh position={[0, 0, -0.1]}>
        <ringGeometry args={[1.2 * size, 0.95 * size, 64]} />
        <animated.meshStandardMaterial
          color={innerSpring.color}
          emissive={innerSpring.emissive}
          emissiveIntensity={innerSpring.emissiveIntensity}
          metalness={0.2}
          roughness={0.1}
          transparent={true}
          opacity={innerSpring.opacity}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* 扩散环 */}
      {isGlowing && (
        <mesh position={[0, 0, -0.05]}>
          <ringGeometry
            args={[rippleScale, Math.max(0.05, rippleScale - 0.05), 64]}
          />
          <meshStandardMaterial
            color={glowColor}
            emissive={glowColor}
            emissiveIntensity={2}
            metalness={0.2}
            roughness={0.1}
            transparent={true}
            opacity={2 * Math.max(0, 1 - rippleScale / 1.2)}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      )}
    </group>
  );
}

/**
 * Scene 组件 - 3D场景
 */
function Scene({ isGlowing, leftRingPosition, leftRingRotation }) {
  return (
    <group name="sceneContainer">
      <STLModel
        isGlowing={isGlowing}
        leftRingPosition={leftRingPosition}
        leftRingRotation={leftRingRotation}
      />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        rotateSpeed={1}
        autoRotate={false}
      />

      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
      <directionalLight position={[-5, 5, 5]} intensity={0.8} />
      <directionalLight position={[0, 0, 5]} intensity={0.6} />

      <hemisphereLight
        skyColor="#ffffff"
        groundColor="#444444"
        intensity={0.7}
      />
    </group>
  );
}

export default Scene;
