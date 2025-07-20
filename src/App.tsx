import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Toaster } from 'sonner';

import Login from './pages/Login';
import TaskManager from './pages/TaskManager';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<TaskManager />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>

        <Toaster position="top-right" richColors />
      </div>
    </Router>
  );
}

export default App;
