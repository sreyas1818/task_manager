import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ViewTask from "./pages/ViewTask";
import CreateTask from "./pages/CreateTask";
import EditTask from "./pages/EditTask";

function App() {

  return (

    <BrowserRouter>

      <Routes>
      <Route path="/login" element={<Login />} />

        <Route path="/" element={<Dashboard />} />

        <Route path="/task/:id" element={<ViewTask />} />

        <Route path="/create" element={<CreateTask />} />

        <Route path="/edit/:id" element={<EditTask />} />
      </Routes>

    </BrowserRouter>

  );

}

export default App;