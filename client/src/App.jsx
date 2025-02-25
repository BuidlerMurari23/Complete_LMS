
import { Route, Routes } from 'react-router-dom'
import './App.css'

import HomePage from './Pages/HomePage'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Contact from './Pages/Contact'
import About from './Pages/About'
import NotRequiredAuth from './Components/Auth/NotRequiredAuth'
import NotFound from './Pages/NotFound'
import Denied from './Pages/Denied'
import ForgotPassword from './Pages/Password/ForgotPassword'
import ResetPassword from './Pages/Password/ResetPassword'
import ChangePassword from './Pages/Password/ChangePassword'
import Profile from './Pages/User/Profile'
import RequiredAuth from './Components/Auth/RequiredAuth'
import EditProfile from './Pages/User/EditProfile'
import CourseList from './Pages/Course/CourseList'
import CreateCourse from './Pages/Course/CreateCourse'
import CourseDescription from './Pages/Course/CourseDescription'
import Checkout from './Pages/Payment/Checkout'
import CheckoutFail from './Pages/Payment/CheckoutFail'
import CheckoutSuccess from './Pages/Payment/CheckoutSuccess'
import AddLecture from './Pages/Dashboard/AddLecture'
import DisplayLectures from './Pages/Dashboard/DisplayLectures'
import AdminDashboard from './Pages/Dashboard/AdminDashboard'


function App() {
 return(
  <Routes>
    <Route path='/' element={<HomePage />} />
    <Route path='/contact' element={<Contact />} />
    <Route path='/about' element={<About />} />

    <Route path='/course' element={<CourseList />} />
    <Route path='/create' element={<CreateCourse />} />
    <Route path='/description' element={<CourseDescription />} />

    <Route path='/checkout' element={<Checkout />} />
    <Route path='/fail' element={<CheckoutFail />} />
    <Route path='/success' element={<CheckoutSuccess />} />

    <Route path='/addle' element={<AddLecture />} />
    <Route path='/dis' element={<DisplayLectures />} />
    <Route path='/das' element={<AdminDashboard />} />

    <Route path='/forgotPassword' element={<ForgotPassword />} />
    <Route path='/resetPassword/:resetToken' element={<ResetPassword />} />
    <Route path='/changePassword' element={<ChangePassword />} />

    
    <Route element={<NotRequiredAuth />}>
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
    </Route>

    <Route element={<RequiredAuth allowedRoles={["USER", "ADMIN", "SUPERADMIN"]} />}>
      <Route path='/user/profile' element={<Profile />} />
      <Route path='/changePassword' element={<ChangePassword />} />
      <Route path='/user/editprofile' element={<EditProfile />} />
    </Route>

    <Route path='/denied' element={<Denied />} />
    <Route path='*' element={<NotFound />} />

  </Routes>
 )
}

export default App
