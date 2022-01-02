import dotEnv from "dotenv";
import "normalize.css";
import ReactDom from "react-dom";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import App from "./components/App";
import configureStore from "./redux/configureStore";

dotEnv.config();

const store = configureStore();

ReactDom.render(
  <ReduxProvider store={store}>
    <Router>
      <App />
    </Router>
  </ReduxProvider>,
  document.querySelector("#root")
);
