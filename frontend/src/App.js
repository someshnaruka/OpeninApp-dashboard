import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import SingIn from './pages/SingIn';
import Register from './pages/Register';
import Dashboard from './components/Dashboard';
import Home from './pages/Home';
import { useEffect } from 'react';
import { getAuth } from "firebase/auth";
import { app } from './config/firebase';
import toast, {Toaster} from "react-hot-toast"
import { useDispatch } from 'react-redux';
import { loginRedux } from './features/userSlice';
function App() {
const dispatch=useDispatch();

  useEffect(()=>{
    const auth = getAuth(app);
    auth.onAuthStateChanged(function(user) {
      if (user) {
   
        const userInfo={
          displayName:user.displayName,
          email:user.email,
          photoURL:user.photoURL
        }
        dispatch(loginRedux(userInfo));
      } else {
        toast("Sign In to Continue")
        
      }
    });
  })
  return (
    <div className="App">
    <Toaster></Toaster>
      <Router>
<Routes>
<Route exact path='/signin' element={<SingIn></SingIn>}></Route>
<Route exact path='/register' element={<Register></Register>}></Route>
<Route exact path='/' element={<Home></Home>}></Route>


</Routes>



      </Router>
    </div>
  );
}

export default App;
