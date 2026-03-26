import { Layer } from "../common/Layer.tsx";
import { useDetectGPU } from "@react-three/drei";
import { Suspense } from "react";
import { Fallback2DScene } from "./fallback/Fallback2DScene.tsx";
import { CatScene } from "./catScene/CatScene.tsx";

export function Background() {
  const gpuTier = useDetectGPU();
  // console.debug("gpuTier:", gpuTier);

  return (
    <Layer
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <Suspense fallback={null}>
        {gpuTier.tier <= 1 ? <Fallback2DScene /> : <CatScene />}
      </Suspense>
    </Layer>
  );
}
