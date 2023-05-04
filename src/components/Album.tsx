import axios from "axios";
import { memo, useEffect } from "react";
import { keyof } from "ts-keyof";
import { usePlayer } from "../Player";
import { AlbumIcon } from "./AlbumIcon";
import { Audio } from "./Audio";
import { BigButton } from "./BigButton";
import { ControlBar } from "./ControlBar";

interface AlbumProps {
  albumNameAndAuthor: string;
}

export const Album = memo<AlbumProps>(({ albumNameAndAuthor }) => {
  const { comp, isPlay, pause, play, musicList, setMusicList } = usePlayer();
  const [albumName, author] = albumNameAndAuthor.split("-");

  useEffect(() => {
    axios.get(`api/album/${albumNameAndAuthor}`).then((data) => {
      setMusicList(data.data.filter((item: string) => item));
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

      <>
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
                index={index}
                title={item.replace(".mp3", "")}
                src={`api/file/${albumNameAndAuthor}?file=${item}`}
                key={item}
                album={albumNameAndAuthor}
              ></Audio>
            ))}
        </div>
        {comp.src && (
          <div className="AlbumControlledButtons">
            <BigButton
              src="/BigButtonPause.svg"
              alt="ButtonPause"
              onClick={() => {
                if (isPlay) {
                  pause();
                }
              }}
            />
            <BigButton
              src="/BigButtonPlay.svg"
              alt="ButtonPlay"
              style={{ marginLeft: 10 }}
              onClick={() => {
                if (!isPlay) {
                  play();
                }
              }}
            />
            {/* <button>PLAY</button>
          <button>PAUSE</button> */}
          </div>
        )}
      </>
      <ControlBar />
    </div>
  );
});

Album.displayName = keyof({ Album });
