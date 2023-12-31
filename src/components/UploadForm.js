import { useMemo,  useContext } from "react"
import { Context } from "../context/FirestoreContext"
import { useAuthContext } from "../context/AuthContext";
import Firestore from "../handlers/firestore";
import Storage from "../handlers/storage";

const { writeDoc } = Firestore
const { uploadFile, downloadFile } = Storage 

const Preview = () => {
  const { state } = useContext(Context)
  const { currentUser } = useAuthContext()
   const { inputs : { path } } = state  // destructuring the current state
  return (
    path && <div
      className="rounded p-1 m-5"
      style={{
        width: "30%",
        height: "300px",
        backgroundImage: `url(${path}`,
        backgroundSize: "cover",
      }}
    ></div>
  );
};

const UploadForm = () => {
  const { dispatch, state, read } = useContext(Context)
  const { currentUser } = useAuthContext()
  const { isCollapsed : isVisible, inputs  } = state // destructuring the current state

  const handleOnChange = (e) => dispatch({ type: 'setInputs', payload: { value: e}})

  const username = currentUser?.displayName.split(" ").join("")
  const handleOnSubmit = (e) => {
    e.preventDefault()
    uploadFile(state.inputs)
    .then(downloadFile)
    .then(url => {
      writeDoc({...inputs, path: url, user: username.toLowerCase()}, "stocks").then(() => {
        read()
        dispatch({ type: "collapse", payload: { bool: false }})
      })
    })

  }
    const isDisabled = useMemo(() => {
      return !!Object.values(inputs).some(input => !input)
    }, [inputs])
    return (
      isVisible && <>
      <p className="display-6 text-center mb-3">Upload Stock Image</p>
      <div className="mb-5 d-flex align-items-center justify-content-center">
      <Preview />
      <form className="mb-2" style={{ textAlign: "left" }} onSubmit={handleOnSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              name="title"
              placeholder="title"
              aria-describedby="text"
              onChange={handleOnChange}
            />
          </div>
          <div className="mb-3">
            <input type="file" className="form-control" name="file" onChange={handleOnChange}/>
          </div>
          <button
            type="submit"
            className="btn btn-success float-end"
            disabled={isDisabled}
          >
            Save and upload
          </button>
        </form>
      </div>
      </>
    );
  };
export default UploadForm;  