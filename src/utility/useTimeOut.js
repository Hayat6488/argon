import React from "react";

export default function useTimeout(callback, delay) {
  const stableCallback = React.useRef(callback);

  React.useEffect(() => {
    stableCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    const tick = () => stableCallback.current();

    if (typeof delay !== "number") return;

    const t = setTimeout(tick, delay);

    return () => clearTimeout(t);
  }, [delay]);
}
