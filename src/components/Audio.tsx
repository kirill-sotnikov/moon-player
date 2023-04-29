import {
  ComponentPropsWithoutRef,
  Dispatch,
  SetStateAction,
  memo,
  useState,
} from "react";

interface AudioProps extends ComponentPropsWithoutRef<"audio"> {
  setNowPlay: Dispatch<SetStateAction<HTMLAudioElement>>;
  nowPlay: HTMLAudioElement;
}

export const Audio = memo<AudioProps>(({ setNowPlay, nowPlay, ...props }) => {
  const [ref, setRef] = useState<HTMLAudioElement>(null);
  const [isPlay, setIsPlay] = useState(false);

  return (
    <div>
      <audio
        {...props}
        controls
        style={{ display: "none" }}
        onPlay={(event) => {
          if (nowPlay && nowPlay !== ref) {
            nowPlay.pause();
          }
          setNowPlay(event.currentTarget);
          setIsPlay(true);
        }}
        onPause={() => setIsPlay(false)}
        ref={(event) => {
          setRef(event);
        }}
        onEnded={() => {
          console.log("END");
        }}
      ></audio>
      {ref && (
        <>
          <button
            onClick={(event) => {
              if (isPlay) {
                ref.pause();
              } else {
                if (nowPlay === ref) {
                  ref.play();
                } else {
                  ref.currentTime = 0;
                  ref.play();
                }
              }
            }}
          >
            {isPlay ? "PAUSE" : "PLAY"}
          </button>
        </>
      )}
    </div>
  );
});
