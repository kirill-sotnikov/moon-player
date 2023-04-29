import { useRouter } from "next/router";
import { Album } from "../src/components/Album";

const AlbumPage = () => {
  const router = useRouter();
  const { album } = router.query;

  if (album) {
    return <Album albumName={album as string} />;
  } else {
    return "PLEASE WAIT";
  }
};

export default AlbumPage;
