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
        src={`api/file/${albumName}?file=img.jpeg`}
        alt="albumImage"
        width={"100%"}
        style={{
          borderRadius: 2,
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
