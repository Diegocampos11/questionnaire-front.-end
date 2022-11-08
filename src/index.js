import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import "./css/index.css";
import reportWebVitals from "./reportWebVitals";
import ErrorPage from "./error-page";
import "antd/dist/antd.css";
import Root from "./routes/root";
import Form from "./routes/form";
import DataSent from "./routes/dataSent";
// import { Provider } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "form",
    element: <Form />,
  },
  {
    path: "data-sent",
    element: <DataSent />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
      <RouterProvider router={router} />
    {/* </Provider> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
