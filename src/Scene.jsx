import React, { useRef, useState } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { OrbitControls, Html } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import * as THREE from "three";

/**
 * STL模型组件（包含背景环面和底座）
 */
function STLModel({ isGlowing, leftRingPosition, leftRingRotation }) {
  const mediaQuery = window.matchMedia("(max-width: 768px)"); // 判断是否是移动端
  const modelGroup = useRef();
  const geometry = useLoader(STLLoader, "/manji.stl");

  // 环的数据
  const ringsData = {
    center: {
      title: "中心环",
      content: "核心控制单元，负责协调和管理其他环的运行状态。能量输出：100%",
    },
    top: {
      title: "顶部环",
      content: "能量转换装置，将环境能量转化为可用能源。效率：85%",
    },
    rightTop: {
      title: "右上环",
      content: "信号增幅器，提升整体系统的通信能力。信号强度：92%",
    },
    rightBottom: {
      title: "右下环",
      content: "稳定器，维持系统平衡和能量流动。稳定性：95%",
    },
    leftBottom: {
      title: "左下环",
      content: "能量存储单元，储存多余能量供紧急使用。储能量：78%",
    },
    leftTop: {
      title: "左上环",
      content: "防护屏障发生器，提供系统防护。防护强度：88%",
    },
  };

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

      <mesh
        position={[0, -2, 0]}
        scale={scale}
        rotation={[-Math.PI / 2, 0, 1.75 * Math.PI]}
      >
        <primitive object={geometry} attach="geometry" />
        <meshStandardMaterial
          color="#808080"
          metalness={0.3} //金属度
          roughness={0.6} //粗糙度
        />
      </mesh>

      {/* 圆形底座 */}
      <mesh position={[0, -2, 0]} rotation={[0, 0, 0]}>
        {/* 圆形底座 半径0.8 高度0.9 圆环数32  */}
        <cylinderGeometry args={[1.1, 1.5, 0.05, 32]} />
        {/* 调整底座大小和高度 */}
        <meshStandardMaterial
          color={isGlowing ? "#ffffff" : "#808080"}
          metalness={0.7}
          roughness={0.2}
          transparent={true}
          opacity={0.9}
        />
      </mesh>

      {/* 后环*/}
      <mesh position={[0, 1.2, -1.2]} rotation={[0, -0.25, 0]}>
        <Round isGlowing={isGlowing} size={1.2} delay={0} />
      </mesh>

      {/* 左环 */}
      {/* <mesh
        position={[leftRingPosition.x, leftRingPosition.y, leftRingPosition.z]}
        rotation={[leftRingRotation.x, leftRingRotation.y, leftRingRotation.z]}
      >
        <Round isGlowing={isGlowing} size={0.6} />
      </mesh> */}

      {/* 右上环 */}
      <mesh
        position={[2.4, 1.1, 1.1]}
        rotation={[
          -25 * (Math.PI / 180),
          -129 * (Math.PI / 180),
          21 * (Math.PI / 180),
        ]}
      >
        <Round
          isGlowing={isGlowing}
          size={0.7}
          ringData={ringsData.rightTop}
          delay={300}
        />
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
        <Round
          isGlowing={isGlowing}
          size={0.7}
          ringData={ringsData.leftTop}
          delay={300}
        />
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
        <Round
          isGlowing={isGlowing}
          size={0.6}
          ringData={ringsData.leftBottom}
          delay={600}
        />
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
        <Round
          isGlowing={isGlowing}
          size={0.6}
          ringData={ringsData.rightBottom}
          delay={600}
        />
      </mesh>
    </animated.group>
  );
}

// 数据面板组件
function DataPanel({ position, title, content, isVisible }) {
  if (!isVisible) return null;

  return (
    <Html position={position}>
      <div
        style={{
          background: "rgba(0, 20, 40, 0.8)",
          padding: "20px",
          borderRadius: "10px",
          border: "1px solid #00D0FF",
          color: "#fff",
          width: "200px",
          backdropFilter: "blur(5px)",
          boxShadow: "0 0 20px rgba(0, 208, 255, 0.3)",
          transform: "translateX(20px)",
        }}
      >
        <h3
          style={{
            margin: "0 0 10px 0",
            color: "#00D0FF",
            fontSize: "16px",
            fontFamily: "Arial, sans-serif",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            margin: "0",
            fontSize: "14px",
            lineHeight: "1.4",
            color: "rgba(255, 255, 255, 0.9)",
          }}
        >
          {content}
        </p>
      </div>
    </Html>
  );
}

function Round({ isGlowing, size = 1, ringData, delay = 0 }) {
  const glowColor = "#00D0FF";
  const [isHovered, setIsHovered] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [isDelayedGlowing, setIsDelayedGlowing] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false); // 添加状态追踪是否已经执行过动画
  const meshRef = useRef();

  // 处理延迟显示
  React.useEffect(() => {
    if (isGlowing) {
      const timer = setTimeout(() => {
        setIsDelayedGlowing(true);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      setIsDelayedGlowing(false);
      setHasAnimated(false); // 重置动画状态，这样下次开启时可以再次触发
    }
  }, [isGlowing, delay]);

  // 震动动画
  const { vibrationX, vibrationY, scale } = useSpring({
    from: {
      vibrationX: 0,
      vibrationY: 0,
      scale: 0.95,
    },
    to: async (next) => {
      if (isDelayedGlowing && !hasAnimated) {
        // 只在首次显示时执行震动
        setHasAnimated(true); // 标记动画已执行
        // 初始显示时的震动效果
        await next({
          vibrationX: 0.02,
          vibrationY: 0.02,
          scale: 1.05,
          config: {
            tension: 300, // 弹性系数
            friction: 10, // 摩擦系数
          },
        });
        await next({
          vibrationX: -0.02,
          vibrationY: -0.02,
          scale: 0.98,
          config: { tension: 300, friction: 10 },
        });
        await next({
          vibrationX: 0,
          vibrationY: 0,
          scale: 1,
          config: { tension: 300, friction: 20 },
        });
      } else if (!isDelayedGlowing) {
        await next({
          vibrationX: 0,
          vibrationY: 0,
          scale: 0.95,
          config: { tension: 300, friction: 20 },
        });
      } else {
        // 如果已经显示且动画已执行过，保持正常大小
        await next({
          vibrationX: 0,
          vibrationY: 0,
          scale: 1,
          config: { tension: 300, friction: 20 },
        });
      }
    },
  });

  // 外环动画
  const outerSpring = useSpring({
    color: glowColor,
    emissive: glowColor,
    emissiveIntensity: isDelayedGlowing ? (isHovered ? 3 : 2) : 0,
    opacity: isDelayedGlowing ? 1 : 0,
    config: { mass: 2, tension: 80, friction: 20 },
  });

  // 内环动画
  const innerSpring = useSpring({
    color: glowColor,
    emissive: glowColor,
    emissiveIntensity: isDelayedGlowing ? (isHovered ? 3 : 2) : 0,
    opacity: isDelayedGlowing ? 1 : 0,
    config: { mass: 2, tension: 80, friction: 20 },
  });

  // 扩散环动画
  const [rippleScale, setRippleScale] = React.useState(0.1);

  useFrame(() => {
    if (isDelayedGlowing) {
      setRippleScale((scale) => {
        const newScale = scale + 0.015;
        return newScale > 1.2 * size ? 0.1 : newScale;
      });
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    if (ringData) {
      setShowPanel(!showPanel);
    }
  };

  return (
    <animated.group
      ref={meshRef}
      onPointerEnter={(e) => {
        e.stopPropagation();
        setIsHovered(true);
        document.body.style.cursor = ringData ? "pointer" : "default";
      }}
      onPointerLeave={(e) => {
        e.stopPropagation();
        setIsHovered(false);
        document.body.style.cursor = "default";
      }}
      onClick={handleClick}
      onPointerMissed={() => setShowPanel(false)}
      position-x={vibrationX}
      position-y={vibrationY}
      scale={scale}
    >
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
      {isDelayedGlowing && (
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

      {/* 数据面板 - 只在有ringData时显示 */}
      {ringData && (
        <DataPanel
          position={[size * 2, 0, 0]}
          title={ringData.title}
          content={ringData.content}
          isVisible={showPanel}
        />
      )}
    </animated.group>
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
        enablePan={true} // 启用平移
        enableRotate={true} // 启用旋转
        rotateSpeed={1} // 旋转速度
        autoRotate={false} // 禁用自动旋转
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
