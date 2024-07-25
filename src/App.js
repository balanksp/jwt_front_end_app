import './App.css';
import AdminPage from './components/AdminPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
// import { BrowserRouter as  Route, Routes  } from 'react-router-dom';
import { Route, Routes  } from 'react-router-dom';
import UserPage from './components/UserPage';

function App() {
  return (

   <>
           <RegisterPage></RegisterPage>
           <LoginPage></LoginPage>
            <AdminPage></AdminPage>
            <UserPage></UserPage>
   </>

   
    // <div>
    //   <Router>
    //     <Routes>
    //       <Route path="/" element={<RegisterPage />}></Route>
    //       <Route path="/loginPage" element={<LoginPage />}></Route>
    //     </Routes>
    //   </Router>
    // </div>

  //   <Router>
  //   <Switch>
  //     <Route path="/register" component={RegisterPage} />
  //     <Route path="/login" component={LoginPage} />
  //     <Route path="/" component={LoginPage} /> {/* Default route to login */}
  //   </Switch>
  // </Router>

  // <>
  // <Routes >
  //   <Route path="/register" component={RegisterPage} />
  //   <Route path="/login" component={LoginPage} />
  //   <Route path="/admin" component={AdminPage} /> 
  //   <Route path="/product/:id" component={UserPage} />
  //   <Route path="/" component={LoginPage} /> 
  // </Routes >  
  // </>

  );
}

export default App;
