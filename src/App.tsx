import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import SKU from "./pages/SKU";
import Planning from "./pages/Planning";
import Analytics from "./pages/Analytics";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import AuthGuard from "./components/AuthGuard";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="flex h-screen">
          <Sidebar className="w-64 bg-gray-800 text-white h-full" />
          <div className="flex flex-col flex-1 w-full">
            <Header />
            <div className="p-6 flex-1 w-full">
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                
                {/* Protected Routes */}
                <Route path="/" element={<AuthGuard><Dashboard /></AuthGuard>} />
                <Route path="/sku" element={<AuthGuard><SKU /></AuthGuard>} />
                <Route path="/planning" element={<AuthGuard><Planning /></AuthGuard>} />
                <Route path="/analytics" element={<AuthGuard><Analytics /></AuthGuard>} />
              </Routes>
            </div>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
