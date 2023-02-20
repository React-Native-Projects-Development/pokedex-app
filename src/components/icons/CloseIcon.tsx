import * as React from 'react';

import {SvgCss} from 'react-native-svg';

interface Props {
  width?: number | string;
  height?: number | string;
}

const xml = `
<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_1_1064)">
<path d="M9.14658 7.50054L14.602 2.00354C15.0571 1.54516 15.0571 0.802548 14.602 0.344172C14.1473 -0.114204 13.4101 -0.114204 12.9559 0.344172L7.50004 5.84118L2.04422 0.343965C1.58998 -0.114411 0.852333 -0.114411 0.398094 0.343965C-0.0571773 0.802342 -0.0571773 1.54496 0.398094 2.00333L5.8535 7.50034L0.398094 12.9969C-0.0571773 13.4555 -0.0571773 14.1979 0.398094 14.6563C0.624904 14.8862 0.923185 14.9996 1.22147 14.9996C1.51892 14.9996 1.81741 14.8862 2.04401 14.6563L7.50004 9.15929L12.9559 14.6567C13.1827 14.8864 13.4807 15 13.7792 15C14.0763 15 14.375 14.8864 14.6016 14.6567C15.0566 14.1981 15.0566 13.4557 14.6016 12.9973L9.14658 7.50054Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_1_1064">
<rect width="15" height="15" fill="white"/>
</clipPath>
</defs>
</svg>
`;

export default ({height = 20, width = 20}: Props) => (
  <SvgCss xml={xml} width={width} height={height} />
);
