import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'
import Home from './pages/Home/Home';
import MyNavBar from './components/MyNavbar';
//redux
import {connect} from 'react-redux'
import {userKeepLogin, checkStorage } from './redux/actions/userAct'
import { Component } from 'react';


class App extends Component {
  // cek apakah sudah login apa belum
  componentDidMount() {
    const userLocalStorage = localStorage.getItem("UserDataAllice")
    // console.log(userLocalStorage);

    // pengkondisian jika tersimpan di local = true, maka jalankan keep login
    if(userLocalStorage){
      const userData = JSON.parse(userLocalStorage)
      this.props.userKeepLogin(userData)
      // console.log(userData);
    } else {
      // ketika data nya null ini kunci agar masuk ke renderan
      this.props.checkStorage()
    }
  }

  render() {
    // pengkondisian
    if (this.props.userGlobal.storageIsChecked) {
      return (
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/SignUp' element={<SignUp/>}/>
        </Routes>
      );
    }

    return (
      <div>
        Loading...
      </div>
    )
  }
}

//manngil global state
const mapStateToProps = (state) => {
  return {
    userGlobal : state.userReducer
  }
}

//manngil action object
const mapDispatchToProps = {
  userKeepLogin,
  checkStorage 
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
