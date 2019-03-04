import css from "@emotion/css";
import React, { useEffect, useState } from "react";

type IconFile = {
  name: string;
  styleType?: "ios" | "md";
};

const fetchIcons = async ({ styleType, name }: IconFile) => {
  let svgIcon = "";

  try {
    const response = await fetch(
      require(`ionicons/dist/ionicons/svg/${styleType}-${name}.svg`)
    );

    svgIcon = await response.text();
  } catch (err) {
    console.error(err);
    svgIcon = "#";
  }
  return svgIcon;
};

export type IconProps = React.HTMLProps<HTMLBaseElement> & IconFile;

export const Icon = ({ name, styleType = "ios", ...props }: IconProps) => {
  const [svgIcon, setSvgIcon] = useState("");

  useEffect(() => {
    fetchIcons({ name, styleType }).then(fetchedSvgIcon =>
      setSvgIcon(fetchedSvgIcon)
    );
  }, []);

  return (
    <i
      css={css`
        svg {
          width: 1em;
          height: 1em;
          fill: currentColor;
          vertical-align: middle;
        }
      `}
      dangerouslySetInnerHTML={{ __html: svgIcon }}
      {...props}
    />
  );
};
