import axios from "axios";
import { useEffect, useState } from "react";
import { AlbumPreview } from "../src/components/AlbumPreview";

export default () => {
  const [albumList, setAlbumList] = useState<string[]>();
  const [isPause, setIsPause] = useState(false);
  const [nowPlay, setNowPlay] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    console.log(nowPlay);
  }, [nowPlay]);

  useEffect(() => {
    axios.get("api/albumList").then((data) => setAlbumList(data.data));
  }, []);

  return (
    <div style={{ paddingTop: 20 }}>
      <h1 style={{ margin: "0 20px 20px 20px" }}>Albums</h1>
      <div className="albumList">
        {albumList &&
          albumList.map(
            (item) =>
              item && (
                <AlbumPreview key={item} albumName={item} />
                // <div key={item}>
                //   <img
                //     src={`api/file/${item}?file=img.jpeg`}
                //     alt="albumImage"
                //     width={120}
                //     height={120}
                //   />
                //   <Link href={item}>{item.replaceAll("_", " ")}</Link>
                // </div>
              )
          )}
      </div>
    </div>
  );
};
