import { useRouter } from "next/router";
import { memo } from "react";

interface AlbumPreviewProps {
  albumName: string;
}

export const AlbumPreview = memo<AlbumPreviewProps>(({ albumName }) => {
  const router = useRouter();

  return (
    <div
      style={{ padding: "0 5px", marginTop: 20 }}
      onClick={() => {
        router.push(`${albumName}`);
      }}
    >
      <img
        src={`album_placeholder.png`}
        alt="albumImage"
        width={"100%"}
        onLoad={(event) => {
          event.currentTarget.style.paddingTop = "0px";

          if (event.currentTarget.src.includes("album_placeholder.png")) {
            event.currentTarget.src = `api/file/${albumName}?file=img.jpeg`;
          }
        }}
        style={{
          borderRadius: 2,
          paddingTop: "100%",
        }}
      />
      <p
        style={{
          fontSize: 12,
          wordBreak: "break-word",
          margin: "2px 0",
          fontWeight: "bold",
        }}
      >
        {albumName.split("-")[0].replaceAll("_", " ")}
      </p>
      <p
        style={{
          fontSize: 12,
          wordBreak: "break-word",
          margin: "2px 0",
          color: "gray",
        }}
      >
        {albumName.split("-")[1].replaceAll("_", " ")}
      </p>
    </div>
  );
});
