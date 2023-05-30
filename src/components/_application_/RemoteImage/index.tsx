import { IImageProps, Image, Skeleton } from 'native-base';
import React from 'react';

type RemoteImage = { imagePath?: string } & IImageProps;

const RemoteImage: React.FC<RemoteImage> = ({ imagePath, ...props }) => {
  if (!imagePath) {
    return <Skeleton h={props.height || '20'} borderRadius="sm" />;
  }

  return <Image src={imagePath} {...props} />;
};

export default RemoteImage;
