import { Composition } from "remotion";
import { RigTest } from "./RigTest";

export const RemotionRoot: React.FC = () => (
  <Composition id="RigTest" component={RigTest} durationInFrames={1} fps={30} width={1920} height={1080} />
);
