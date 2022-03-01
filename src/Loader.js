import React from "react";
import "./Loader.css";

function Loader() {
  return (
    <>
      <div className="flex justify-center items-center w-screen h-screen">
        <div class="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
}

export default Loader;
