import * as React from 'react';

import {SvgCss} from 'react-native-svg';
import colors from 'theme/colors';

interface Props {
  width?: number | string;
  height?: number | string;
  color?: string;
}

export default ({
  width = '100%',
  height = '100%',
  color = colors.red,
}: Props) => {
  const xml = `
<svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.6328 1.47266C12.1289 0.1875 9.91406 0.433594 8.51953 1.85547L8 2.40234L7.45312 1.85547C6.08594 0.433594 3.84375 0.1875 2.33984 1.47266C0.617188 2.94922 0.535156 5.57422 2.06641 7.16016L7.37109 12.6289C7.69922 12.9844 8.27344 12.9844 8.60156 12.6289L13.9062 7.16016C15.4375 5.57422 15.3555 2.94922 13.6328 1.47266Z" fill=${color}/>
</svg>
`;
  return <SvgCss xml={xml} width={width} height={height} />;
};
