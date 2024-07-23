import './App.css';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import { Router } from 'react-router-dom';
import { Routes,Route } from 'react-router-dom';

console.log(LoginPage, RegisterPage);

function App() {
  return (
    <>

    {/* <LoginPage></LoginPage> */}
    <RegisterPage></RegisterPage>

    </>
    // <div>
    //   <Router>
    //     <Routes>
    //       <Route path="/" element={<RegisterPage />}></Route>
    //       <Route path="/loginPage" element={<LoginPage />}></Route>
    //     </Routes>
    //   </Router>
    // </div>
  );
}

export default App;
