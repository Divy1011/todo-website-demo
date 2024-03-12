import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./Layout/layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <BrowserRouter>
      <Layout />
      <ToastContainer />
      </BrowserRouter>
  );
}

export default App;
