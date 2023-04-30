import Image from "next/image";

type BigButtonProps = Parameters<typeof Image>[0];

export const BigButton = ({ ...props }: BigButtonProps) => {
  return <Image alt="img" width={40} height={40} {...props} />;
};
