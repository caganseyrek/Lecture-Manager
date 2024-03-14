import { Routes, Route } from 'react-router-dom'

import AuthLayout from './_auth/AuthLayout'
import Login from './_auth/forms/Login'
import Register from './_auth/forms/Register'
import RootLayout from './_root/RootLayout'
import { LectureDetails } from './_root/pages'

import './style.css'

const App = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route element={<AuthLayout />}>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Route>

            {/* Private Routes */}
            <Route element={<RootLayout />}>
                <Route index element={<LectureDetails />} />
            </Route>
        </Routes>
    )
}

export default App