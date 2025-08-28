import * as React from "react";
import Svg, { Path } from "react-native-svg";
const PowerConsumptionIcon = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    fill="none"
    {...props}
  >
    <Path
      fill={props.color}
      fillRule="evenodd"
      d="M9.51.54.54 12.5h8.97L3.53 24.46 24.46 9.51H12.5L21.47.54H9.51Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default PowerConsumptionIcon;
