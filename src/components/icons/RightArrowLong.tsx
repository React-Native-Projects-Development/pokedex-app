import * as React from 'react';

import {SvgCss} from 'react-native-svg';

interface Props {
  width?: number | string;
  height?: number | string;
}

const xml = `
<svg width="22" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.6" d="M0.95237 4.8724H18.7487L14.5022 1.62567C14.1302 1.25388 14.1302 0.650754 14.5022 0.279012C14.8742 -0.0930041 15.4773 -0.0930041 15.8488 0.279012L21.721 5.1513C22.093 5.5231 22.093 6.12628 21.721 6.49797L15.8488 11.3705C15.6629 11.5566 15.4192 11.6495 15.1755 11.6495C14.9319 11.6495 14.6882 11.5566 14.5022 11.3705C14.1302 10.9987 14.1302 10.3956 14.5022 10.0239L18.7487 6.77698H0.95237C0.426465 6.77698 0 6.35057 0 5.82466C0 5.29876 0.42641 4.8724 0.95237 4.8724Z" fill="#DADADA"/>
</svg>
`;

export default ({width = 20, height = 20}: Props) => (
  <SvgCss xml={xml} width={width} height={height} />
);
