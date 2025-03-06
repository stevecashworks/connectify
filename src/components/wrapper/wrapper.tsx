"use client";

import store from "@/state/store";
import { useEffect } from "react";
import { Provider } from "react-redux";

const Wrapper = ({ children }: { children: Readonly<React.ReactNode> }) => {
  useEffect(() => {
    document.title = "connectify";
  }, []);
  return(
    <Provider store={store}>

  <div>{children}</div>
    </Provider>

  ) 
};
export default Wrapper;
