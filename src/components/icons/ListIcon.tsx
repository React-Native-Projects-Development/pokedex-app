import * as React from 'react';

import {SvgCss} from 'react-native-svg';

interface Props {
  width?: number | string;
  height?: number | string;
}

const xml = `
<svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M1 0C0.447715 0 0 0.447715 0 1V3C0 3.55228 0.447715 4 1 4H3C3.55228 4 4 3.55228 4 3V1C4 0.447715 3.55228 0 3 0H1ZM6 0C5.44772 0 5 0.447715 5 1V3C5 3.55228 5.44772 4 6 4H17C17.5523 4 18 3.55228 18 3V1C18 0.447715 17.5523 0 17 0H6ZM0 7C0 6.44772 0.447715 6 1 6H3C3.55228 6 4 6.44772 4 7V9C4 9.55229 3.55228 10 3 10H1C0.447715 10 0 9.55229 0 9V7ZM6 6C5.44772 6 5 6.44772 5 7V9C5 9.55229 5.44772 10 6 10H17C17.5523 10 18 9.55229 18 9V7C18 6.44772 17.5523 6 17 6H6ZM0 13C0 12.4477 0.447715 12 1 12H3C3.55228 12 4 12.4477 4 13V15C4 15.5523 3.55228 16 3 16H1C0.447715 16 0 15.5523 0 15V13ZM6 12C5.44772 12 5 12.4477 5 13V15C5 15.5523 5.44772 16 6 16H17C17.5523 16 18 15.5523 18 15V13C18 12.4477 17.5523 12 17 12H6Z" fill="#303943"/>
</svg>

`;

export default ({width = 20, height = 20}: Props) => (
  <SvgCss xml={xml} width={width} height={height} />
);
