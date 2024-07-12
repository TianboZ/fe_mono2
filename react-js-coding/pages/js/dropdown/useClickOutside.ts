import { useEffect } from "react";

const useClickOutside = (ref: HTMLElement, cb: any) => {
  const handleClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target) && cb) {
      console.log(e.target);
      cb();
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);
};

export default useClickOutside;
