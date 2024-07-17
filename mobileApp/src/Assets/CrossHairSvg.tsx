import * as React from "react"
import Svg, { Path, Circle } from "react-native-svg"

function CrossHairSvg() {
  return (
    <Svg
      width={27}
      height={26}
      viewBox="0 0 27 26"
      fill="none"
    >
      <Path
        d="M13.5 20a7 7 0 100-14 7 7 0 000 14zM13.5 6V4M20.5 13h2M13.5 20v2M6.5 13h-2"
        stroke="#000000"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx={13.5} cy={13} r={2} fill="#000000" />
    </Svg>
  )
}

export default CrossHairSvg;
