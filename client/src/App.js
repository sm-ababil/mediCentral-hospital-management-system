import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
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
import DoctorProfile from './pages/DoctorProfile';
import ScheduleAppointment from './pages/ScheduleAppointment';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/features/userSlice';
import axios from 'axios';

function App() {
  const {loading} = useSelector(state => state.alerts);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Get user data from API or token and set it in Redux
      const getUserData = async () => {
        try {
          const response = await axios.post('/api/user/getUserData', 
            {}, 
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
          if (response.data.success) {
            dispatch(setUser(response.data.data));
          }
        } catch (error) {
          console.log(error);
        }
      };
      getUserData();
    }
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        {loading ? (<Spinner />) :
        (<Routes>
          <Route path='/' element={<PublicRoute><HomePage /></PublicRoute>} />
          <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
          <Route path='/register' element={<PublicRoute><Register /></PublicRoute>} />
          <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path='/departments' element={<Departments />} />
          <Route path='/find-doctor' element={<FindDoctor />} />
          <Route path="/doctor-profile/:id" element={<DoctorProfile />} />
          <Route 
            path="/schedule-appointment/:id" 
            element={
                <ProtectedRoute>
                    <ScheduleAppointment />
                </ProtectedRoute>
            } 
          />
        </Routes>)
        }
      </BrowserRouter>
    </>
  );
};

export default App;
