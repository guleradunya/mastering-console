import { Composition } from "remotion";
import { CHORUS, Deneme, FPS } from "./Deneme";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="Deneme"
      component={Deneme}
      durationInFrames={Math.round((CHORUS.end - CHORUS.songStart) * FPS)}
      fps={FPS}
      width={1920}
      height={1080}
    />
  );
};
