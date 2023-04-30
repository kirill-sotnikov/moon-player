import { useRouter } from "next/router";
import { Album } from "../src/components/Album";
import { memo } from "react";

const AlbumPage = memo(() => {
  const router = useRouter();
  const { album } = router.query;

  if (album) {
    return <Album albumNameAndAuthor={album as string} />;
  } else {
    return <p>PLEASE WAIT</p>;
  }
});

export default AlbumPage;
