import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Departments from './pages/Departments';
import FindDoctor from './pages/FindDoctor';
import { useSelector } from 'react-redux';  
import Spinner from './components/Spinner';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import UserProfile from './pages/UserProfile';
import DoctorProfile from './pages/DoctorProfile';
import OtBed from './pages/OtBed';
import AdminBed from './pages/adminbed';
import DoctorLogin from './pages/DoctorLogin';
import DoctorRegister from './pages/DoctorRegister';
import DoctorRoute from './components/DoctorRoute';
import AdminRoute from './components/AdminRoute';
import AdminDashboard from './pages/AdminDashboard';
import DoctorDashboard from './pages/DoctorDashboard';


function App() {
  const {loading} = useSelector(state => state.alerts);
  return (
    <>
      <BrowserRouter>
        {loading ? (<Spinner />) :
        (<Routes>
          <Route path='/' element={<PublicRoute><HomePage /></PublicRoute>} />
          <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
          <Route path='/register' element={<PublicRoute><Register /></PublicRoute>} />
          <Route path='/doctor-register' element={<AdminRoute><DoctorRegister /></AdminRoute>} />
          <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path='/admin-dashboard' element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path='/doctor-dashboard' element={<DoctorRoute><DoctorDashboard /></DoctorRoute>} />
          <Route path='/departments' element={<Departments />} />
          <Route path='/find-doctor' element={<FindDoctor />} />
          <Route path='/user-profile' element={<UserProfile />} />
          <Route path="/doctor-profile/:id" element={<DoctorProfile />} />
          <Route path='/ot-bed' element={<OtBed />} />
          <Route path='/admin-bed' element={<AdminBed />} />
          <Route path='/login-doctor' element={<PublicRoute><DoctorLogin /></PublicRoute>} />
        </Routes>)
        }
      </BrowserRouter>
    </>
  );
};

export default App;