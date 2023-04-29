import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default () => {
  const [albumList, setAlbumList] = useState<string[]>();
  const [isPause, setIsPause] = useState(false);
  const [nowPlay, setNowPlay] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    console.log(nowPlay);
  }, [nowPlay]);

  useEffect(() => {
    axios.get("api/albumList").then((data) => setAlbumList(data.data));
  }, []);

  return (
    <div>
      <h1>Player</h1>
      {albumList &&
        albumList.map(
          (item) =>
            item && (
              <div key={item}>
                <Link href={item}>{item}</Link>
              </div>
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
