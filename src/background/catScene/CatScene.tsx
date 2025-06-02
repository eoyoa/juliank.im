import { Canvas } from "@react-three/fiber";

export function CatScene() {
  return (
    <Canvas frameloop={"demand"}>
      <ambientLight intensity={0.1} />
      <directionalLight color="red" position={[0, 0, 5]} />
      <mesh>
        <boxGeometry />
        <meshBasicMaterial color={"white"} />
      </mesh>
    </Canvas>
  );
}
