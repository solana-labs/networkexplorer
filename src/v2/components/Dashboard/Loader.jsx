import React from 'react';
import ContentLoader from 'react-content-loader';
import theme from 'v2/theme';
import getColor from 'v2/utils/getColor';

const Loader = () => (
  <ContentLoader
    speed={2}
    primaryColor={getColor('primaryLoader')(theme)}
    secondaryColor={getColor('secondaryLoader')(theme)}
  >
    <rect x="0" y="2" rx="0" ry="0" width="533" height="290" />
  </ContentLoader>
);

export default Loader;
