import {
  ComponentPropsWithoutRef,
  Dispatch,
  SetStateAction,
  memo,
  useState,
} from "react";
import { keyof } from "ts-keyof";
import { ButtonPlayStop } from "./ButtonPlayStop";

interface AudioProps extends ComponentPropsWithoutRef<"audio"> {
  setNowPlay: Dispatch<SetStateAction<HTMLAudioElement>>;
  nowPlay: HTMLAudioElement;
  title: string;
  index: number;
  nextAudio: string;
  album: string;
}

export const Audio = memo<AudioProps>(
  ({ setNowPlay, nextAudio, title, nowPlay, album, index, ...props }) => {
    const [ref, setRef] = useState<HTMLAudioElement>(null);
    const [isPlay, setIsPlay] = useState(false);

    return (
      <div
        style={{
          margin: "15px 0 0 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>
          <span
            style={{
              fontWeight: "inherit",
              color: isPlay ? "#9c74e3" : "#473a5d",
              marginRight: 10,
            }}
          >
            {index}{" "}
          </span>
          <span>{title.replaceAll("_", " ")}</span>
        </span>
        <audio
          {...props}
          controls
          preload="none"
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
            const all = document.querySelectorAll("audio");

            all.forEach((item) => {
              if (
                decodeURIComponent(item.src).replace(
                  "http://localhost:3000/",
                  ""
                ) === `api/file/${album}?file=${nextAudio}`
              ) {
                item.play();
              }
            });
          }}
        ></audio>
        {ref && (
          <>
            {/* <button
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
            </button> */}
            <ButtonPlayStop
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
              active={isPlay}
            />
          </>
        )}
      </div>
    );
  }
);

Audio.displayName = keyof({ Audio });
