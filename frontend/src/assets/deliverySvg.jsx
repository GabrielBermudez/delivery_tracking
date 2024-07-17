import * as React from "react";

function DeliverySvg(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="30"
      height="30"
      fill="white"
      {...props}
    >
      <path d="M19 15c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1m0-2c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3m-9-7H5v2h5V6m7-1h-3v2h3v2.65L13.5 14H10V9H6c-2.21 0-4 1.79-4 4v3h2c0 1.66 1.34 3 3 3s3-1.34 3-3h4.5l4.5-5.65V7a2 2 0 00-2-2M7 17c-.55 0-1-.45-1-1h2c0 .55-.45 1-1 1z" />
    </svg>
  );
}

export default DeliverySvg;
