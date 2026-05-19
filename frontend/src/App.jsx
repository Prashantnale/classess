import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AdminLogin from "./pages/admin/auth/AdminLogin";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import AdminRegister from "./pages/admin/auth/AdminRegister";
import Home from "./pages/website/Home";
import PublicRoute from "./components/PublicRoutes";
import PrivateRoute from "./components/PrivateRoutes";

// Product Pages
import ProductIndex from "./pages/admin/product/Index";
import ProductCreate from "./pages/admin/product/Create";
import ProductEdit from "./pages/admin/product/Edit";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* website Public */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <Home />
              </PublicRoute>
            }
          />

          {/* admin Public */}
          <Route
            path="/admin/login"
            element={
              <PublicRoute>
                <AdminLogin />
              </PublicRoute>
            }
          />

          <Route
            path="/admin/register"
            element={
              <PublicRoute>
                <AdminRegister />
              </PublicRoute>
            }
          />

          {/* Private - Dashboard Layout with nested routes */}
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            {/* /admin/product → Product List */}
            <Route path="product" element={<ProductIndex />} />

            {/* /admin/product/create → Add Product */}
            <Route path="product/create" element={<ProductCreate />} />

            {/* /admin/product/edit/:id → Edit Product */}
            <Route path="product/edit/:id" element={<ProductEdit />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
