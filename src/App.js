import { HashRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./Layout/layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <HashRouter>
      <Layout />
      <ToastContainer />
      </HashRouter>
  );
}

export default App;
