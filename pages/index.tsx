import axios from "axios";
import { useEffect, useState } from "react";
import { Audio } from "../src/components/Audio";

export default () => {
  const [music, setMusic] = useState<string[]>();
  const [isPause, setIsPause] = useState(false);
  const [nowPlay, setNowPlay] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    console.log(nowPlay);
  }, [nowPlay]);

  useEffect(() => {
    axios.get("api/musicList").then((data) => setMusic(data.data));
  }, []);

  return (
    <div>
      <h1>Player</h1>
      {music &&
        music.map(
          (item) =>
            item && (
              <span key={item}>
                {item.replace(".mp3", "")}
                <Audio
                  nowPlay={nowPlay}
                  setNowPlay={setNowPlay}
                  src={`api/file/${item}`}
                ></Audio>
              </span>
            )
        )}
      <button
        onClick={() => {
          if (isPause && nowPlay) {
            nowPlay.play();
            setIsPause(false);
          }
        }}
      >
        PLAY
      </button>
      <button
        onClick={() => {
          if (nowPlay) {
            nowPlay.pause();
            setIsPause(true);
          }
        }}
      >
        PAUSE
      </button>
    </div>
  );
};
