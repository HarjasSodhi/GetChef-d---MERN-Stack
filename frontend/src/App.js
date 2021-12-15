import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { createContext, useState, useEffect } from 'react'
import Navbar from "./Components/Common/Navbar/Navbar";
import Footer from "./Components/Common/Footer/Footer";
import './App.css'
import ForgotPage from './Pages/ForgotPass/ForgotPage'
import Signuppage from './Pages/Signup/SignupPage'
import HomePage from './Pages/Home/HomePage'
import LoginPage from './Pages/Login/LoginPage';
import ProfilePage from './Pages/Profile/ProfilePage'
import PlanDetailpage from './Pages/PlanDetail/PlanDetailPage';
import OrdersPage from './Pages/Orders/OrdersPage'
import PlansPage from './Pages/Plans/PlansPage'
import PageNotFound from './Pages/404Page/PageNotFound'

export const AuthProvider = createContext();

function App() {

  const [user, setUser] = useState(sessionStorage.getItem("user") === null ? undefined : JSON.parse(sessionStorage.getItem("user")));

  useEffect(() => {
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    let retrievedUser = JSON.parse(sessionStorage.getItem("user"));
    if (retrievedUser) {
      setUser(retrievedUser)
    }
  }, [])

  return (
    <AuthProvider.Provider value={{ user, setUser }}>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/login' exact><LoginPage /></Route>
          <Route path='/signup' exact><Signuppage /></Route>
          <Route path='/forgotPassword' exact><ForgotPage /></Route>
          <Route path='/profile' exact><ProfilePage /></Route>
          <Route path='/plans' exact><PlansPage /></Route>
          <Route path='/plans/:id' exact><PlanDetailpage /></Route>
          <Route path='/orders' exact><OrdersPage /></Route>
          <Route path='/' exact><HomePage /></Route>
          <Route path='*'><PageNotFound /></Route>
        </Switch>
        <Footer />
      </Router>
    </AuthProvider.Provider>
  );
}

export default App;