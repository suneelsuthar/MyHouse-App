import * as React from "react";
import Svg, { Path } from "react-native-svg";
const NewMessageIcon = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={23}
    height={23}
    fill="none"
    {...props}
  >
    <Path
      fill={props.color}
      d="M5.75 5.75a1.15 1.15 0 1 0 0 2.3 1.15 1.15 0 0 0 0-2.3Zm0 4.6a1.15 1.15 0 1 0 0 2.3 1.15 1.15 0 0 0 0-2.3Zm11.5 0h-6.9a1.15 1.15 0 1 0 0 2.3h6.9a1.15 1.15 0 1 0 0-2.3Zm0-4.6h-6.9a1.15 1.15 0 1 0 0 2.3h6.9a1.15 1.15 0 0 0 0-2.3ZM19.55 0H3.45A3.45 3.45 0 0 0 0 3.45v11.5a3.45 3.45 0 0 0 3.45 3.45h13.329l4.255 4.266a1.15 1.15 0 0 0 .816.334c.15.004.3-.028.437-.092A1.15 1.15 0 0 0 23 21.85V3.45A3.45 3.45 0 0 0 19.55 0Zm1.15 19.078-2.633-2.645a1.152 1.152 0 0 0-.817-.333H3.45a1.15 1.15 0 0 1-1.15-1.15V3.45A1.15 1.15 0 0 1 3.45 2.3h16.1a1.15 1.15 0 0 1 1.15 1.15v15.628Z"
    />
  </Svg>
);
export default NewMessageIcon;
