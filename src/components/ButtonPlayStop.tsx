import Image from "next/image";
import { memo } from "react";
import { keyof } from "ts-keyof";

interface ButtonPlayStopProps
  extends Omit<Parameters<typeof Image>[0], "src" | "alt"> {
  active: boolean;
}

export const ButtonPlayStop = memo<ButtonPlayStopProps>(
  ({ active, ...props }) => {
    if (active) {
      return (
        <Image
          alt="image"
          src={"/ButtonPause.svg"}
          width={53}
          height={24}
          {...props}
        />
      );
    }

    return (
      <Image
        alt="image"
        src={"/ButtonPlay.svg"}
        width={53}
        height={24}
        {...props}
      />
    );
  }
);

ButtonPlayStop.displayName = keyof({ ButtonPlayStop });
