import Image from "next/image";

import appSvg from "../../../../public/appicon.svg";
import Link from "next/link";

interface AppIconProps {
  width?: number;
  alt?: string;
  centered?: boolean;
  sx?: any;
}

export function AppIcon({
  width = 150,
  alt = "App Icon",
}: AppIconProps) {
  const iconContent = <Image src={appSvg} alt={alt} width={width} priority />;

  return (
    <Link color="inherit" href="/">
      {iconContent}
    </Link>
  );
}
