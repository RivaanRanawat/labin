import React from "react";
import { useLocation } from "react-router";

function Explore() {
  let location = useLocation();
  return (
    <div style={{ marginTop: "100px" }}>
      <iframe
        src={location.state.expUrl}
        width="1440"
        height="700"
        allowfullscreen
      ></iframe>
    </div>
  );
}

export default Explore;
