import React from "react";

function useKeyDown(code, callback) {
  React.useEffect(() => {
    window.addEventListener("keydown", (ev) => {
      if (ev.code === code) {
        callback();
      }
    });
    return () => {
      window.removeEventListener("keydown", (ev) => {});
    };
  }, []);
  return;
}

export default useKeyDown;
