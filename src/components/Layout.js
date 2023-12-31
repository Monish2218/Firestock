import { useEffect, useContext } from "react";
import { Context } from "../context/FirestoreContext";
import { useAuthContext } from "../context/AuthContext";
import Navbar from "./Navbar";
import UploadForm from "./UploadForm";

function AddButton() {
  const { state, dispatch } = useContext(Context);
  const { isCollapsed: isVisible } = state; // destructuring the current state
  const toggle = (bool) => dispatch({ type: "collapse", payload: { bool } });
  return (
    <>
      <button className="btn btn-success float-end" onClick={() => toggle(!isVisible)} >
        {isVisible ? "Close" : "+ Add"}
      </button>
      <div className="clearfix mb-4"></div>
    </>
  );
}

function Layout({ children }) {
  const { read } = useContext(Context);
  const { authenticate } = useAuthContext();

  useEffect(() => {
    read();
    authenticate();
  }, []);
  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <AddButton />
        <UploadForm />
        {children}
      </div>
    </>
  );
}
export default Layout;