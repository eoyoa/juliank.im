import { Foreground } from "./foreground/Foreground.tsx";
import { Background } from "./background/Background.tsx";
import "./MainContent.css";

export function MainContent() {
  return (
    <div className={"container"}>
      <Foreground />
      <Background />
    </div>
  );
}
