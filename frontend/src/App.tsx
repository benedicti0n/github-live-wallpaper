// App.tsx
import { Routes, Route } from "react-router-dom";
import { useSession } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import Homepage from "./components/Homepage";
import Dashboard from "./components/Dashboard/Dashboard";
import CreateWallaper from "./components/Create/CreateWallaper";

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
  return (
    <div className="w-full min-h-screen flex justify-center bg-[#e8e8e8] relative">
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