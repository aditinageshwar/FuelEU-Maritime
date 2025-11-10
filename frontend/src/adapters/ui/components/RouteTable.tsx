import React from 'react';
import { Route } from '../../../core/domain/Route';

interface RouteTableProps {
  routes: Route[];
  onDelete: (id: string) => void;
}

const RouteTable: React.FC<RouteTableProps> = ({ routes, onDelete }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Routes</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Vessel ID</th>
            <th className="border border-gray-300 p-2">Start Port</th>
            <th className="border border-gray-300 p-2">End Port</th>
            <th className="border border-gray-300 p-2">Fuel Used</th>
            <th className="border border-gray-300 p-2">Distance</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {routes.map((route) => (
            <tr key={route.id}>
              <td className="border border-gray-300 p-2">{route.vesselId}</td>
              <td className="border border-gray-300 p-2">{route.startPort}</td>
              <td className="border border-gray-300 p-2">{route.endPort}</td>
              <td className="border border-gray-300 p-2">{route.fuelUsed}</td>
              <td className="border border-gray-300 p-2">{route.distance}</td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => onDelete(route.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RouteTable;