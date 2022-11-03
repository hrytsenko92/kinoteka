import React from "react";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { TestComponent } from "./components/TestComponent";

const App: React.FC = () => {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          Hello, this is my React app.
          <TestComponent />
        </BrowserRouter>
      </Provider>
    </>
  );
};
export default App;
