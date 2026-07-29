import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./Pages/Login";
import Register from "./Pages/Register";


import CreateTask from "./Pages/createTask";
import MyTasks from "./Pages/MyTasks";
import AIAssistant from "./Pages/AiAssistant";

import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <Routes>

      {/* Public Routes */}

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}

      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
       

        <Route path="/" element={<MyTasks />} />

        <Route path="/create-task" element={<CreateTask />} />

        <Route path="/ai" element={<AIAssistant />} />
      </Route>

      {/* Unknown Routes */}

      <Route path="*" element={<Navigate to="/login" replace />} />

    </Routes>
  );
}

export default App;