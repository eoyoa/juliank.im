import { Canvas } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import { Suspense } from "react";
import { Model } from "./Model";
import { Vector3 } from "three";
import { Fallback2DScene } from "../fallback/Fallback2DScene.tsx";

export function CatScene() {
  const targetPos = new Vector3(1.5, 0, -0.25);

  return (
    <Canvas>
      <Suspense fallback={<Fallback2DScene />}>
        <Model />
      </Suspense>

      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={6} color="white" />

      <OrthographicCamera
        makeDefault
        zoom={400}
        near={0.0001}
        far={1000}
        position={targetPos.clone().add(new Vector3(-1, 1, -1))}
        onUpdate={(cam) => {
          cam.lookAt(targetPos);
        }}
      />
    </Canvas>
  );
}
