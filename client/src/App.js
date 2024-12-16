import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Departments from './pages/Departments';
import FindDoctor from './pages/FindDoctor';
import { useSelector } from 'react-redux';  
import Spinner from './components/Spinner';

function App() {
  const {loading} = useSelector(state => state.alert);
  return (
    <>
      <BrowserRouter>
        {loading ? (<Spinner />) :
        (<Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/departments' element={<Departments />} />
          <Route path='/find-doctor' element={<FindDoctor />} />
        </Routes>)
        }
      </BrowserRouter>
    </>
  );
};

export default App;
