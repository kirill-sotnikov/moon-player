import axios from "axios";
import { memo, useEffect, useState } from "react";
import { keyof } from "ts-keyof";
import { AlbumIcon } from "./AlbumIcon";
import { Audio } from "./Audio";
import { BigButton } from "./BigButton";

interface AlbumProps {
  albumNameAndAuthor: string;
}

export const Album = memo<AlbumProps>(({ albumNameAndAuthor }) => {
  const [musicList, setMusicList] = useState<Array<string>>([]);
  const [nowPlay, setNowPlay] = useState<HTMLAudioElement | null>(null);
  const [isPause, setIsPause] = useState(false);
  const [albumName, author] = albumNameAndAuthor.split("-");

  useEffect(() => {
    axios.get(`api/album/${albumNameAndAuthor}`).then((data) => {
      setMusicList(
        data.data.filter((item: string) => item && !item.includes(".txt"))
      );
    });
  }, []);

  if (!musicList) {
    return <p>please wait</p>;
  }

  return (
    <div className="albumWrapper">
      <AlbumIcon
        src={`api/file/${albumNameAndAuthor}?file=img.jpeg`}
        alt="ICON"
      />

      <div
        style={{
          padding: "0 20px 20px 20px",
          marginTop: -50,
          paddingTop: 20,
        }}
      >
        <h1 className="AlbumTitle">{albumName.replaceAll("_", " ")}</h1>
        {musicList &&
          musicList.map((item, index, array) => (
            <Audio
              index={index + 1}
              title={item.replace(".mp3", "")}
              nowPlay={nowPlay}
              setNowPlay={setNowPlay}
              src={`api/file/${albumNameAndAuthor}?file=${item}`}
              key={item}
              album={albumNameAndAuthor}
              nextAudio={array[index + 1] && array[index + 1]}
            ></Audio>
          ))}
      </div>
      {nowPlay && (
        <div className="AlbumControlledButtons">
          <BigButton
            src="/BigButtonPause.svg"
            alt="ButtonPause"
            onClick={() => {
              if (nowPlay) {
                nowPlay.pause();
                setIsPause(true);
              }
            }}
          />
          <BigButton
            src="/BigButtonPlay.svg"
            alt="ButtonPlay"
            style={{ marginLeft: 10 }}
            onClick={() => {
              if (nowPlay) {
                nowPlay.play();
                setIsPause(false);
              }
            }}
          />
          {/* <button>PLAY</button>
          <button>PAUSE</button> */}
        </div>
      )}
    </div>
  );
});

Album.displayName = keyof({ Album });
