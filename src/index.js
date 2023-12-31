import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './index.css';
import App from './App';
import Layout from "./components/Layout";
import StockImages from './components/StockImages';
import Single from "./components/Single"
import NotFound from "./components/NotFound"
import Profile from "./components/Profile"
import reportWebVitals from './reportWebVitals';
import Provider from './context/FirestoreContext';
import AuthProvider, { useAuthContext } from './context/AuthContext';


function AppRoutes() {
  const { currentUser } = useAuthContext()
  return(
    <Routes>
      <Route path="/" element={<App />}/>
      <Route path="/images/:id" element={<Single />}/>
      <Route path="*" element={<NotFound />}/>
      <Route path="/profile" element={<Profile />}/>
      {currentUser && <Route path="/stockimages" element={<StockImages/>} />}
    </Routes>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Provider>
        <Router>
          <Layout>
            <AppRoutes />
          </Layout>
        </Router>
      </Provider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
