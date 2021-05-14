import * as React from "react";

import Loader from "./loader.component";

const useFullPageLoader = () => {
  const [loading, setLoading] = React.useState(false);

  return [
    loading ? <Loader /> : null,
    () => setLoading(true), //show loader

    () => setLoading(false), //hide loader
  ] as const;
};

export default useFullPageLoader;
