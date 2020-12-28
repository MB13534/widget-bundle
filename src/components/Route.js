import React from "react";

const Route = ({ path, children }) => {
  const [currentPath, setCurrentPath] = React.useState(
    window.location.pathname
  );
  React.useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", onLocationChange);
    return () => {
      window.removeEventListener("popstate", onLocationChange);
    };
  }, []);

  return currentPath === path ? children : null;
};

export default Route;
