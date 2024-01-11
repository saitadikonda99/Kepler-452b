import { Routes, Route } from 'react-router-dom'
import useAuth from './hooks/UseAuth'


// imports start here 
import Layout from './components/auth/Layout'
import Home from './pages/home/Home'
import Login from './pages/auth/Login/Login'
import RequireAuth from './components/auth/RequireAuth'
import PersistLogin from './components/auth/PersistLogin'


// admin imports


function App() {

  return (
     <div className="App">
        <Routes>
            <Route path="/" element={<Layout />}>
                {/* require Student authentication */}
                <Route element={<PersistLogin/>}>    
                    {/* require Admin authentication */}
                    <Route element={<RequireAuth allowedRoles={['Admin']}/>}>

                    </Route>
                    {/* require no authentication */}
                    <Route path='/' element={<Home />}/>
                    <Route path="/auth/login" element={<Login />} />
                </Route>
            </Route>
        </Routes>
     </div>
  )
}

export default App