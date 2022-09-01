import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom'
import Login from './pages/login/Login'
import SignUp from './pages/SignUp/SignUp'

function App() {
  return (
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/SignUp' element={<SignUp/>}/>
    </Routes>
  );
}

export default App;
