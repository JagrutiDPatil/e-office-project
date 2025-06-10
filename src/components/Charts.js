// import React from 'react';
// import {
//   BarChart as ReBarChart,  // Renamed import
//   PieChart as RePieChart,   // Renamed import
//   Bar,
//   Pie,
//   Cell,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer
// } from 'recharts';

// // Custom Bar Chart Component
// export const AppBarChart = ({ data }) => {
//   return (
//     <ResponsiveContainer width="100%" height={300}>
//       <ReBarChart data={data}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="name" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Bar dataKey="value" fill="#4a148c" />
//       </ReBarChart>
//     </ResponsiveContainer>
//   );
// };

// // Custom Pie Chart Component
// export const AppPieChart = ({ data }) => {
//   return (
//     <ResponsiveContainer width="100%" height={300}>
//       <RePieChart>
//         <Pie
//           data={data}
//           cx="50%"
//           cy="50%"
//           labelLine={false}
//           outerRadius={80}
//           fill="#8884d8"
//           dataKey="value"
//           label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//         >
//           {data.map((entry, index) => (
//             <Cell key={`cell-${index}`} fill={entry.color || '#8884d8'} />
//           ))}
//         </Pie>
//         <Tooltip />
//       </RePieChart>
//     </ResponsiveContainer>
//   );
// };

import React from 'react';
import {
  BarChart as ReBarChart,
  PieChart as RePieChart,
  Bar,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export const AppBarChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={250}>
    <ReBarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#4a148c" />
    </ReBarChart>
  </ResponsiveContainer>
);

export const AppPieChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={250}>
    <RePieChart>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        outerRadius={80}
        dataKey="value"
        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color || '#8884d8'} />
        ))}
      </Pie>
      <Tooltip />
    </RePieChart>
  </ResponsiveContainer>
);