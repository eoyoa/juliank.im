import { Layer } from "../common/Layer.tsx";
import { Fallback2DScene } from "./fallback/Fallback2DScene.tsx";

export function Background() {
  return (
    <Layer>
      <Fallback2DScene />
    </Layer>
  );
}
