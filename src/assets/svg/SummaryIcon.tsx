import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SummaryIcon = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      fill={props.color}
      stroke={props.color}
      strokeWidth={0.2}
      d="M19.316.183V18.39h.791v.99H.908v-.99H1.7v-6.333h3.367v6.333H6.45V8.099h3.367V18.39H11.2V4.14h3.367v14.25h1.383V.183h3.367ZM16.941 18.39h1.383V1.174h-1.383V18.39Zm-4.75 0h1.383V5.13h-1.383v13.26Zm-4.75 0h1.383v-9.3H7.441v9.3Zm-4.75 0h1.383v-5.342H2.691v5.342Z"
    />
  </Svg>
);
export default SummaryIcon;
