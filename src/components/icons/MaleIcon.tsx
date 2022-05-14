import * as React from 'react';

import {SvgCss} from 'react-native-svg';

interface Props {
  width?: number | string;
  height?: number | string;
}

const xml = `
<svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.8" d="M10.4219 0.5H8.26172C7.96094 0.5 7.82422 0.855469 8.01562 1.07422L8.48047 1.53906L6.26562 3.75391C5.66406 3.37109 4.95312 3.125 4.1875 3.125C2 3.125 0.25 4.90234 0.25 7.0625C0.25 9.25 2 11 4.1875 11C6.34766 11 8.125 9.25 8.125 7.0625C8.125 6.29688 7.87891 5.58594 7.49609 4.98438L9.71094 2.76953L10.1758 3.23438C10.3945 3.45312 10.75 3.28906 10.75 2.98828V0.828125C10.75 0.664062 10.5859 0.5 10.4219 0.5ZM4.1875 9.25C2.95703 9.25 2 8.29297 2 7.0625C2 5.85938 2.95703 4.875 4.1875 4.875C5.39062 4.875 6.375 5.85938 6.375 7.0625C6.375 8.29297 5.39062 9.25 4.1875 9.25Z" fill="#6C79DB"/>
</svg>
`;

export default ({width = 20, height = 20}: Props) => (
  <SvgCss xml={xml} width={width} height={height} />
);
