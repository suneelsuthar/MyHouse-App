import * as React from "react";
import Svg, { Path } from "react-native-svg";
const ReservationsIcon = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={27}
    height={14}
    fill="none"
    {...props}
  >
    <Path
      fill={props.color}
      d="M26.927 10.448 24.518.812V.727a1.412 1.412 0 0 0 0-.143l-.128-.2a.66.66 0 0 1-.1-.099l-.214-.142h-.114A1.083 1.083 0 0 0 23.478 0H4.634a2.494 2.494 0 0 0-2.423 1.896L.073 10.448a2.495 2.495 0 0 0 2.423 3.093h22.008a2.494 2.494 0 0 0 2.423-3.093Zm-24.716.813a.356.356 0 0 1 0-.3L4.349 2.41a.37.37 0 0 1 .342-.27h17.361l-2.323 9.264H2.496a.343.343 0 0 1-.285-.143Zm22.578 0a.342.342 0 0 1-.285.142h-2.452l1.426-5.93 1.425 5.488a.357.357 0 0 1-.114.3Z"
    />
    <Path
      fill={props.color}
      d="M17.777 4.276H7.799a1.07 1.07 0 0 0 0 2.138h9.978a1.07 1.07 0 0 0 0-2.138ZM16.35 7.127H6.374a1.069 1.069 0 0 0 0 2.138h9.977a1.07 1.07 0 0 0 0-2.138Z"
    />
  </Svg>
);
export default ReservationsIcon;
