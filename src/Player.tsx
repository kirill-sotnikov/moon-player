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
  duration: number | null;
  play: () => void;
  pause: () => void;
  isPlay: boolean;
  setMusic: ({}: PlayerContextType["comp"]) => void;
  musicList: Array<string>;
  setMusicList: Dispatch<SetStateAction<any[]>>;
  playerRef: HTMLAudioElement | null;
}

const playerContext = createContext<PlayerContextType>({
  comp: { src: "", album: "", index: 0 },
  duration: null,
  isPlay: false,
  play: () => {},
  pause: () => {},
  setMusic: () => {},
  musicList: [],
  setMusicList: () => {},
  playerRef: null,
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
  const [duration, setDuration] = useState<number | null>(null);

  useEffect(() => {
    console.log(duration);
  }, [duration]);

  const setMusic = useCallback<PlayerContextType["setMusic"]>(
    (comp) => {
      setComp(comp);
    },
    [playerRef]
  );

  const play = useCallback(() => {
    playerRef.play();
    setIsPlay(true);
  }, [playerRef]);

  const pause = useCallback(() => {
    playerRef.pause();
    setIsPlay(false);
  }, [playerRef]);

  const prevTrack = useCallback(() => {
    const prevMusicIndex = comp.index - 1;
    const prevMusicName = musicList[prevMusicIndex];

    if (musicList[prevMusicIndex]) {
      playerRef.src = `api/file/${comp.album}?file=${prevMusicName}`;
      setMusic({
        src: `api/file/${comp.album}?file=${prevMusicName}`,
        album: comp.album,
        index: prevMusicIndex,
      });
      setTimeout(() => {
        play();
      }, 100);
    }
  }, [musicList, playerRef, comp]);

  const nextTrack = useCallback(() => {
    // pause();

    const nextMusicIndex = comp.index + 1;
    const nextMusicName = musicList[nextMusicIndex];

    if (musicList[nextMusicIndex]) {
      playerRef.src = `api/file/${comp.album}?file=${nextMusicName}`;
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

      navigator.mediaSession.metadata = new MediaMetadata({
        title: track && track.replace(".mp3", "").replaceAll("_", " "),
        artist:
          srcWithArtist &&
          srcWithArtist
            .replace("api/file/", "")
            .split("-")[1]
            .replace("_", " "),
        album: comp.album,
        artwork: [{ src: `${srcWithArtist}?file=img.jpeg` }],
      });

      navigator.mediaSession.setActionHandler("nexttrack", nextTrack);

      navigator.mediaSession.setActionHandler("previoustrack", prevTrack);
    }
  }, [comp.src]);

  return (
    <playerContext.Provider
      value={{
        playerRef,
        comp,
        setMusic,
        play,
        pause,
        isPlay,
        musicList,
        setMusicList,
        duration,
      }}
    >
      <audio
        src={comp.src}
        ref={setPlayerRef}
        onCanPlay={(event) => setDuration(event.currentTarget.duration)}
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
