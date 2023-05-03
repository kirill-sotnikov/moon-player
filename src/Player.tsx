import {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface PlayerContextType {
  comp: { src: string; album; index: number | null };
  play: () => void;
  pause: () => void;
  isPlay: boolean;
  setMusic: ({}: PlayerContextType["comp"]) => void;
  musicList: Array<string>;
  setMusicList: Dispatch<SetStateAction<any[]>>;
}

const playerContext = createContext<PlayerContextType>({
  comp: { src: "", album: "", index: 0 },
  isPlay: false,
  play: () => {},
  pause: () => {},
  setMusic: () => {},
  musicList: [],
  setMusicList: () => {},
});

export const PlayerContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [playerRef, setPlayerRef] = useState<HTMLAudioElement | null>(null);
  const [comp, setComp] = useState<PlayerContextType["comp"]>({
    src: "",
    album: "",
    index: 0,
  });
  const [isPlay, setIsPlay] = useState(false);
  const [musicList, setMusicList] = useState([]);

  const setMusic = useCallback<PlayerContextType["setMusic"]>(
    (comp) => {
      setComp(comp);
    },
    [playerRef]
  );

  useEffect(() => {
    console.log(musicList);
  }, [musicList]);

  const play = useCallback(() => {
    playerRef.play();
    setIsPlay(true);
  }, [playerRef]);

  const pause = useCallback(() => {
    playerRef.pause();
    setIsPlay(false);
  }, [playerRef]);

  const nextTrack = useCallback(() => {
    // pause();

    const nextMusicIndex = comp.index + 1;
    const nextMusicName = musicList[nextMusicIndex];
    console.log(`api/file/${comp.album}?file=${nextMusicName}`);

    if (musicList[nextMusicIndex]) {
      setMusic({
        src: `api/file/${comp.album}?file=${nextMusicName}`,
        album: comp.album,
        index: nextMusicIndex,
      });
      setTimeout(() => {
        play();
      }, 100);
    }
  }, [musicList, playerRef, comp]);

  useEffect(() => {
    if ("mediaSession" in navigator) {
      const [srcWithArtist, track] = comp.src.split("?file=");
      console.log(srcWithArtist, track);

      navigator.mediaSession.metadata = new MediaMetadata({
        title: track && track.replace(".mp3", "").replaceAll("_", " "),
        artist:
          srcWithArtist && srcWithArtist.replace("api/file/", "").split("-")[1],
        album: comp.album,
        artwork: [{ src: `${srcWithArtist}?file=img.jpeg` }],
      });
    }
  }, [comp.src]);

  return (
    <playerContext.Provider
      value={{ comp, setMusic, play, pause, isPlay, musicList, setMusicList }}
    >
      <audio
        src={comp.src}
        ref={setPlayerRef}
        onCanPlay={() => console.log("can play")}
        onEnded={() => {
          console.log("END");

          nextTrack();
        }}
      ></audio>
      {playerRef && children}
    </playerContext.Provider>
  );
};

export const usePlayer = () => useContext(playerContext);
