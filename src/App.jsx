import {Navigate ,BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {lazy, Suspense} from 'react'
import * as ROUTES from './constants/routes'
import useAuthListener from './hooks/use-auth-listener'
import UserContext from './context/user'

const Login = lazy(() => import ('./pages/login.jsx'))
const Signup = lazy(() => import ('./pages/signup.jsx'))
const NotFound = lazy(() => import ('./pages/notFound.jsx'))
const Dashboard = lazy(() => import ('./pages/dashboard.jsx'))
const Profile = lazy(() => import('./pages/profile'));

import './styles/tailwind.css'
//Using react-route-dom to navigate the different pages
function App() {
  const { user } = useAuthListener()
  return (
    <UserContext.Provider value={{ user}}>
      <Router>
        <Suspense fallback={<p>Loading ... </p>}>
          <Routes>
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.SIGN_UP} element={<Signup />} />
            <Route path={ROUTES.PROFILE} element={<Profile />} />
            <Route path={ROUTES.DASHBOARD} element={user ? <Dashboard user={user}/> : <Navigate to={ROUTES.LOGIN} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </UserContext.Provider>
  )
}

export default App
