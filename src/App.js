import './App.css';
import { createBrowserHistory } from 'history'
import { Router, Switch } from 'react-router-dom'
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate';
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import News from './pages/News/News';
import { Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import FilmDetail from './pages/FilmDetail/FilmDetail';
import { CheckoutTemplate } from './templates/CheckoutTemplate/CheckoutTemplate';
import Checkout from './pages/Checkout/Checkout';
import { UserLoginTemplate } from './templates/UserLoginTemplate/UserLoginTemplate';
import Loading from './components/Loading/Loading';
import Profile from './pages/Profile/Profile';
import AdminTemplate from './templates/AdminTemplate/AdminTemplate';
import Dashboard from './pages/Admin/Dashboard/Dashboard';
import Films from './pages/Admin/Films/Films';
import Showtime from './pages/Admin/Showtime/Showtime';
import AddFilm from './pages/Admin/Films/AddFilm/AddFilm';
import EditFilm from './pages/Admin/Films/EditFilm/EditFilm';
import AddUser from './pages/Admin/Dashboard/AddUser/AddUser';
import EditUser from './pages/Admin/Dashboard/EditUser/EditUser';

export const history = createBrowserHistory()

function App() {
  return (
    <Router history={history}>
      <Loading />
      <Switch >
        <HomeTemplate exact path='/home' Component={Home} />
        <HomeTemplate exact path='/contact' Component={Contact} />
        <HomeTemplate exact path='/news' Component={News} />
        <HomeTemplate exact path='/' Component={Home} />
        <HomeTemplate exact path='/detail/:id' Component={FilmDetail} />

        <CheckoutTemplate exact path='/checkout/:id' Component={Checkout} />
        
        <UserLoginTemplate exact path='/login' Component={Login} />

        <UserLoginTemplate exact path='/register' Component={Register} />
        <HomeTemplate exact path='/profile' Component={Profile} />

        <AdminTemplate exact path='/admin' Component={Dashboard} />
        <AdminTemplate exact path='/admin/films' Component={Films} />
        <AdminTemplate exact path='/admin/films/addfilm' Component={AddFilm} />
        <AdminTemplate exact path='/admin/films/editfilm/:id' Component={EditFilm} />
        <AdminTemplate exact path='/admin/dashboard' Component={Dashboard} />
        <AdminTemplate exact path='/admin/dashboard/editUser/:id' Component={EditUser} />
        <AdminTemplate exact path='/admin/dashboard/adduser' Component={AddUser} />
        <AdminTemplate exact path='/admin/showtime' Component={Showtime} />
        <AdminTemplate exact path='/admin/films/showtime/:id' Component={Showtime} />
      </Switch>
    </Router>
  );
}

export default App;
