import { useEffect, useState } from "react";
import { usePlayer } from "../Player";
import { ButtonPlayStop } from "./ButtonPlayStop";

export const ControlBar = () => {
  const { duration, playerRef, play, pause, isPlay } = usePlayer();
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    playerRef.addEventListener("timeupdate", (event: any) => {
      setCurrentTime(event.currentTarget.currentTime);
    });
  }, []);

  if (!duration || !playerRef) {
    return null;
  }

  return (
    <div className="controlBar">
      <div
        onClick={(event) => {
          playerRef.pause();
          console.log(
            Math.round(
              (duration / event.currentTarget.clientWidth) * event.clientX
            )
          );
          console.log(playerRef.duration);

          playerRef.currentTime = Math.round(
            (duration / event.currentTarget.clientWidth) * event.clientX
          );

          playerRef.play();
        }}
      >
        <div
          className="controlBarStatus"
          onClick={() => {
            console.log("click");
          }}
          style={{
            width: `${(playerRef.currentTime / duration) * 100}%`,
          }}
        ></div>
      </div>
      <div
        style={{
          display: "flex",
          height: 45,
          alignItems: "center",
          padding: "0 20px",
        }}
      >
        {isPlay ? (
          <ButtonPlayStop onClick={() => pause()} active={true} />
        ) : (
          <ButtonPlayStop
            onClick={() => {
              setTimeout(() => {
                play();
              }, 100);
            }}
            active={false}
          />
        )}
        <span
          style={{
            fontWeight: "lighter",
            color: "#afafad",
            margin: "0 0 0 auto",
          }}
        >
          {Math.floor(playerRef.currentTime / 60)}:
          {Math.floor(playerRef.currentTime % 60) < 10
            ? `0${Math.floor(playerRef.currentTime % 60)}`
            : Math.floor(playerRef.currentTime % 60)}
        </span>
      </div>
    </div>
  );
};
