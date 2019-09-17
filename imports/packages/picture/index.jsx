import React, { useContext } from "react";

import { useTheme } from "@material-ui/core";
import _ from "lodash";

export const Picture = ({ images, src, ...props }) => {
  const theme = useTheme();

  return (
    <picture>
      {images.map((image, i) => {
        return (
          <source
            key={i}
            srcSet={image.path}
            media={`(min-width: ${image.width}px)`}
            type={image.type || "image/jpeg"}
          />
        );
      })}
      <img src={src} {...props} />
    </picture>
  );
};

export default Picture;
