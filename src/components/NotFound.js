import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <button className="btn btn-link mb-5" onClick={() => navigate("/")}>Back</button>
      <div className="d-flex justify-content-center align-items-center">
        <h1>Looks like you are lost</h1>
      </div>
    </>
  );
};
export default NotFound;