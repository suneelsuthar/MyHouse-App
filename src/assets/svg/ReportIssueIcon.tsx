import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
const ReportIssueIcon = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={22}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10.508 7.282v3.5m0 3.5h.009m8.74-3.5a8.75 8.75 0 1 1-17.5 0 8.75 8.75 0 0 1 17.5 0Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill={props.color} d="M.008.282h21v21h-21z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default ReportIssueIcon;
