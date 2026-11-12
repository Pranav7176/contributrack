import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import Landing from './pages/Landing'; import Auth from './pages/Auth'; import Layout from './components/Layout'; import Dashboard from './pages/Dashboard'; import Projects from './pages/Projects'; import Tasks from './pages/Tasks'; import Contributions from './pages/Contributions'; import Portfolio from './pages/Portfolio'; import './style.css'; import './resilience.css';
function Guard({ children }) { const { user, loading } = useAuth(); return loading ? <div className="splash">ContribuTrack</div> : user ? children : <Navigate to="/login" replace/>; }
function RoutedApp() { const location = useLocation(); return <ErrorBoundary resetKey={location.pathname}><Routes><Route path="/" element={<Landing/>}/><Route path="/login" element={<Auth/>}/><Route path="/register" element={<Auth register/>}/><Route element={<Guard><Layout/></Guard>}><Route path="/dashboard" element={<Dashboard/>}/><Route path="/projects" element={<Projects/>}/><Route path="/tasks" element={<Tasks/>}/><Route path="/contributions" element={<Contributions/>}/><Route path="/portfolio" element={<Portfolio/>}/></Route><Route path="*" element={<Navigate to="/" replace/>}/></Routes></ErrorBoundary>; }
function App() { return <AuthProvider><BrowserRouter><RoutedApp/></BrowserRouter></AuthProvider>; }
export default App;
