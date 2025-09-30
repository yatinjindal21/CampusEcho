import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // ❌ no BrowserRouter here!
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NewsSection from './pages/NewsSection';
import PostNews from './pages/PostNews';
import PostReferral from './pages/PostReferral';
import AdminPanel from './pages/AdminPanel';
import { AuthContext } from './context/AuthContext';
import PostAcademicNews from './pages/PostAcademicNews';
import PostPlacementNews from './pages/PostPlacementNews';
import PostSocietyNews from './pages/PostSocietyNews';
import PostAlumniNews from './pages/PostAlumniNews';
import SearchAlumni from './pages/SearchAlumni';
import MyReferrals from './pages/MyReferrals';
import MyReferralStatus from './pages/MyReferralStatus';
import NewsDetail from './pages/NewsDetail';
import Navbar from './components/Navbar';


const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    if (!user) return <Navigate to="/login" />;
    return children;
};


export default function App() {
    const { user } = useContext(AuthContext);

    return (
        <>
            <Navbar />
            <div className="pt-16">
                <Routes>
                    <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Home />} />
                    <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
                    <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="/news/:category" element={<ProtectedRoute><NewsSection /></ProtectedRoute>} />
                    <Route path="/post-news" element={<ProtectedRoute><PostNews /></ProtectedRoute>} />
                    <Route path="/post-referral" element={<ProtectedRoute><PostReferral /></ProtectedRoute>} />
                    <Route path="/admin-panel" element={
                        <ProtectedRoute>
                            {user?.role === 'admin' ? <AdminPanel /> : <Navigate to="/dashboard" />}
                        </ProtectedRoute>
                    } />
                    <Route path="/post-news-academic" element={
                        <ProtectedRoute>
                            {user?.role === 'admin' ? <PostAcademicNews /> : <Navigate to="/dashboard" />}
                        </ProtectedRoute>
                    } />
                    <Route path="/post-news-placement" element={
                        <ProtectedRoute>
                            {user?.role === 'admin' ? <PostPlacementNews /> : <Navigate to="/dashboard" />}
                        </ProtectedRoute>
                    } />
                    <Route path="/post-society-news" element={
                        <ProtectedRoute>
                            {user?.role === 'society_head' ? <PostSocietyNews /> : <Navigate to="/dashboard" />}
                        </ProtectedRoute>
                    } />
                    <Route path="/post-alumni-news" element={
                        <ProtectedRoute>
                            {user?.role === 'alumni' ? <PostAlumniNews /> : <Navigate to="/dashboard" />}
                        </ProtectedRoute>
                    } />

                    <Route path="/search-alumni" element={
                        <ProtectedRoute>
                            {user?.role === 'student' ? <SearchAlumni /> : <Navigate to="/dashboard" />}
                        </ProtectedRoute>
                    } />

                    <Route path="/my-referrals" element={
                        <ProtectedRoute>
                            {user?.role === 'alumni' ? <MyReferrals /> : <Navigate to="/dashboard" />}
                        </ProtectedRoute>
                    } />

                    <Route path="/referral-status" element={
                        <ProtectedRoute>
                            {user?.role === 'student' ? <MyReferralStatus /> : <Navigate to="/dashboard" />}
                        </ProtectedRoute>
                    } />

                    <Route path="/news-detail/:id" element={
                        <ProtectedRoute>
                            <NewsDetail />
                        </ProtectedRoute>
                    } />

                </Routes>
            </div>
        </>

    );
}
