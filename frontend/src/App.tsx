// App.tsx
import { Routes, Route } from "react-router-dom";
import { useSession } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { NavBar } from "./components/ui/Navbar";
import { DotPattern } from "./components/magicui/dot-pattern";
import Homepage from "./components/Homepage";
import Dashboard from "./components/Dashboard/Dashboard";
import CreateWallaper from "./components/Create/CreateWallaper";

import { Home, User, Briefcase } from 'lucide-react'

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn, isLoaded } = useSession();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};


const App = () => {
  const { isSignedIn } = useSession()

  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    ...(isSignedIn ? [{ name: 'Dashboard', url: '/dashboard', icon: User }] : []),
    { name: 'Download', url: '/Download', icon: Briefcase },
  ]
  return (
    <div className="w-full min-h-screen flex justify-center bg-background relative">
      <NavBar items={navItems} />
      <DotPattern height={32} width={32} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/:platform/create" element={<CreateWallaper />} />
      </Routes>
    </div>
  );
};

export default App;