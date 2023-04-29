import axios from "axios";
import { memo, useEffect, useState } from "react";
import { keyof } from "ts-keyof";
import { AlbumIcon } from "./AlbumIcon";
import { Audio } from "./Audio";

interface AlbumProps {
  albumName: string;
}

export const Album = memo<AlbumProps>(({ albumName }) => {
  const [musicList, setMusicList] = useState<Array<string>>([]);
  const [nowPlay, setNowPlay] = useState<HTMLAudioElement | null>(null);
  const [isPause, setIsPause] = useState(false);
  const [icon, setIcon] = useState("");

  useEffect(() => {
    axios.get(`api/album/${albumName}`).then((data) => {
      setMusicList(
        data.data.filter((item: string) => item && !item.includes(".txt"))
      );
    });
    axios.get(`api/file/${albumName}?file=img.txt`).then((data) => {
      setIcon(data.data);
    });
  }, []);

  return (
    <div>
      {icon && <AlbumIcon src={icon} alt="ICON" />}
      <div
        style={{
          padding: "0 20px",
          marginTop: icon ? -50 : 0,
          paddingTop: !icon && 20,
        }}
      >
        <h1 className="AlbumTitle">{albumName}</h1>
        {musicList &&
          musicList.map((item, index, array) => (
            <Audio
              index={index}
              title={item.replace(".mp3", "")}
              nowPlay={nowPlay}
              setNowPlay={setNowPlay}
              src={`api/file/${albumName}?file=${item}`}
              key={item}
              album={albumName}
              nextAudio={array[index + 1] && array[index + 1]}
            ></Audio>
          ))}
      </div>
      <button
        onClick={() => {
          if (nowPlay) {
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
});

Album.displayName = keyof({ Album });
