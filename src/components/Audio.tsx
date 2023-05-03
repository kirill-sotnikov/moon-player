import { ComponentPropsWithoutRef, memo } from "react";
import { keyof } from "ts-keyof";
import { usePlayer } from "../Player";

interface AudioProps extends ComponentPropsWithoutRef<"audio"> {
  title: string;
  index: number;
  album: string;
}

export const Audio = memo<AudioProps>(
  ({ src, title, album, index, ...props }) => {
    const { comp, play, setMusic, pause, isPlay } = usePlayer();
    const localSrc = "api/file" + src.split("/file")[1];

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
              color: isPlay && src === comp.src ? "#9c74e3" : "#473a5d",
              marginRight: 10,
            }}
          >
            {index + 1}{" "}
          </span>
          <span>{title.replaceAll("_", " ")}</span>
        </span>

        <>
          {isPlay && src === comp.src ? (
            <button
              onClick={() => {
                pause();
              }}
            >
              pause
            </button>
          ) : (
            <button
              onClick={() => {
                setMusic({ src, album, index });
                setTimeout(() => {
                  play();
                }, 100);
              }}
            >
              play
            </button>
          )}
          {/* <ButtonPlayStop onClick={(event) => {}} active={isPlay} /> */}
        </>
      </div>
    );
  }
);

Audio.displayName = keyof({ Audio });
