import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import ForgotPassword from "./pages/ForgotPassword";
import DefaultLayout from "./layouts/DefaultLayout";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Profile";
import { ErrorProvider } from "./contexts/errorContext";
import AddRequests from "./pages/Request/AddRequests";
import { SearchProvider } from "./contexts/SearchContext";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <ErrorProvider>
          <AuthProvider>
            <SearchProvider>
              <Routes>
                <Route element={<DefaultLayout />} path="/">
                  <Route path="/" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/add-requests"
                    element={
                      <ProtectedRoute>
                        <AddRequests />
                      </ProtectedRoute>
                    }
                  />
                </Route>
                <Route path="/*" element={<NotFound />} />
              </Routes>
            </SearchProvider>
          </AuthProvider>
        </ErrorProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
