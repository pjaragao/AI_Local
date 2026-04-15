import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminPrompts from './pages/admin/Prompts';
import UserDashboard from './pages/user/Dashboard';
import UserPreferences from './pages/user/Preferences';
import Sidebar from './components/Sidebar';

function App() {
  const [session, setSession] = React.useState<any>(null);

  // Aqui entraria a verificação de sessão do Supabase real
  const isAdmin = true; // Simulação para o esqueleto

  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-slate-950">
        <Sidebar />
        <main className="flex-1 p-8">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={isAdmin ? <AdminDashboard /> : <Navigate to="/login" />} />
            <Route path="/admin/prompts" element={isAdmin ? <AdminPrompts /> : <Navigate to="/login" />} />
            <Route path="/portal" element={<UserDashboard />} />
            <Route path="/portal/preferences" element={<UserPreferences />} />
            <Route path="/" element={<Navigate to="/portal" />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
