import { ComponentPropsWithoutRef, FC } from "react";

export const AlbumIcon: FC<ComponentPropsWithoutRef<"img">> = (props) => {
  return <img style={{ width: "100%" }} className="AlbumIcon" {...props} />;
};
