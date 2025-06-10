// import { Routes, Route } from 'react-router-dom';
// import Login from './pages/Login';
// import Dashboard from './pages/Dashboard';
// import Documents from './pages/Documents';
// import Tasks from './pages/Tasks';
// import Calendar from './pages/Calendar';
// import PrivateRoute from './components/PrivateRoute';
// import DocumentDetail from './pages/DocumentDetail';
// import NewDocument from './pages/NewDocument';

// export default function AppRoutes() {
//   return (
//     <Routes>
//       <Route path="/login" element={<Login />} />
//       <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
//       <Route path="/documents" element={<PrivateRoute><Documents /></PrivateRoute>} />
//       <Route path="/tasks" element={<PrivateRoute><Tasks /></PrivateRoute>} />
//       <Route path="/calendar" element={<PrivateRoute><Calendar /></PrivateRoute>} />
//       <Route path="/documents/new" element={<PrivateRoute><NewDocument /></PrivateRoute>} />
//      <Route path="/documents/:id" element={<PrivateRoute><DocumentDetail /></PrivateRoute>} />
//     </Routes>
//   );
// }

import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Documents from './pages/Documents';
import Tasks from './pages/Tasks';
import Calendar from './pages/Calendar';
import Login from './pages/Login';
import NewDocument from './pages/NewDocument';
import DocumentDetail from './pages/DocumentDetail';
import PrivateRoute from './components/PrivateRoute';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Routes wrapped in Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="documents" element={<Documents />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="/documents/new" element={<PrivateRoute><NewDocument /></PrivateRoute>} />
    <Route path="/documents/:id" element={<PrivateRoute><DocumentDetail /></PrivateRoute>} />
        {/* Add more routes inside layout as needed */}
      </Route>
    </Routes>
  );
}
