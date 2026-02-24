import * as React from "react";
import Svg, { G, Path, Defs } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const CompletedIcon = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    fill="none"
    {...props}
  >
    <G filter="url(#a)">
      <Path
        fill={props.color}
        d="M15 3C8.924 3 4 7.924 4 14s4.924 11 11 11 11-4.924 11-11S21.076 3 15 3Zm-1.698 14.898c-.127.127-.306.232-.465.232-.159 0-.338-.11-.47-.238l-2.962-2.961.941-.942 2.496 2.497 6.6-6.648.926.957-7.066 7.103Z"
      />
    </G>
    <Defs></Defs>
  </Svg>
);
export default CompletedIcon;
