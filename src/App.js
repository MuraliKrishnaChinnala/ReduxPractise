import React from "react";
import "./styles.css";
import { Provider } from "react-redux";
import store from "./store";
import Posts from "./Posts";

export default function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Posts />
      </Provider>
    </div>
  );
}
