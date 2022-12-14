import './App.css';
import {Routes, Route} from 'react-router-dom'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import EditProfile from './pages/EditProfile/EditProfile';
import Forgot from './pages/ForgotPassword/Forgot';
import KomentarHomeDetail from './components/KomentarHomeDetail';
import VerificationPage from './components/verification';
//redux
import {connect} from 'react-redux'
import {userKeepLogin, checkStorage } from './redux/actions/userAct'
// import { getPostData } from './redux/actions/postAct';
import { Component } from 'react';


class App extends Component {
  // cek apakah sudah login apa belum
  componentDidMount() {
    const userLocalStorage = localStorage.getItem("UserDataAllice")
    // console.log(userLocalStorage);

    // pengkondisian jika tersimpan di local = true, maka jalankan keep login
    if(userLocalStorage != undefined){
      const userData = JSON.parse(userLocalStorage)
      // console.log(userData);
      this.props.userKeepLogin(userData)
      // this.props.getPostData(userData.id)
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
          <Route path='/' element={<Login/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/komentarhomedetail/:id' element={<KomentarHomeDetail/>}/>
          <Route path='/signUp' element={<SignUp/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/profile/:id' element={<Profile/>}/>
          <Route path="/editprofile" element={<EditProfile/>}/>
          <Route path="/forgot-password" element={<Forgot/>}/>
          <Route path="/authentication/:token" element={<VerificationPage/>}/>
          <Route path="/authentication" element={<VerificationPage/>}/>
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
  checkStorage ,
  // getPostData
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
