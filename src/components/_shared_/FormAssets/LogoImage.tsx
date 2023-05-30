import React from 'react';

import { Image } from 'native-base';

import logo from '../../../../assets/logo-form.webp';

const LogoImage: React.FC = () => {
  return <Image source={logo} style={{ height: 100, width: 100 }} alt="Logo" />;
};

export default LogoImage;
