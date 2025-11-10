import React, { useState, useEffect, useMemo } from 'react';
import RouteTable from './RouteTable';
import { Route } from '../../../core/domain/Route';
import { RouteService } from '../../../core/application/RouteService';
import { ComplianceService } from '../../../core/application/ComplianceService';
import { TransactionService } from '../../../core/application/TransactionService';
import { AxiosApiClient } from '../../infrastructure/api/AxiosApiClient';

const Dashboard: React.FC = () => {
  // Initialize services inside the component to avoid hook issues
  const apiClient = useMemo(() => new AxiosApiClient(), []);
  const routeService = useMemo(() => new RouteService(apiClient), [apiClient]);
  const complianceService = useMemo(() => new ComplianceService(apiClient), [apiClient]);
  const transactionService = useMemo(() => new TransactionService(apiClient, apiClient), [apiClient]);

  const [routes, setRoutes] = useState<Route[]>([]);
  const [cb, setCb] = useState<number | null>(null);
  const [selectedRouteId, setSelectedRouteId] = useState<string>('');
  const [formData, setFormData] = useState({
    vesselId: '',
    startPort: '',
    endPort: '',
    fuelUsed: '',
    distance: '',
    bankingVesselId: '',
    amount: '',
    type: 'credit' as 'credit' | 'debit',
    poolingFrom: '',
    poolingTo: '',
    cbAmount: '',
  });

  useEffect(() => {
    loadRoutes();
  }, []);

  const loadRoutes = async () => {
    try {
      const data = await routeService.getAllRoutes();
      setRoutes(data);
    } catch (error) {
      console.error('Failed to load routes:', error);
    }
  };

  const handleCreateRoute = async () => {
    try {
      const route = await routeService.createRoute({
        vesselId: formData.vesselId,
        startPort: formData.startPort,
        endPort: formData.endPort,
        fuelUsed: parseFloat(formData.fuelUsed),
        distance: parseFloat(formData.distance),
      });
      setRoutes([...routes, route]);
      setFormData({ ...formData, vesselId: '', startPort: '', endPort: '', fuelUsed: '', distance: '' });
    } catch (error) {
      console.error('Failed to create route:', error);
    }
  };

  const handleCalculateCB = async () => {
    if (selectedRouteId) {
      try {
        const calculatedCb = await complianceService.calculateCompliance(selectedRouteId);
        setCb(calculatedCb);
      } catch (error) {
        console.error('Failed to calculate CB:', error);
      }
    }
  };

  const handleProcessTransaction = async () => {
    try {
      await transactionService.processTransaction(
        formData.bankingVesselId,
        parseFloat(formData.amount),
        formData.type
      );
      alert('Transaction processed');
    } catch (error) {
      console.error('Failed to process transaction:', error);
    }
  };

  const handleCreatePooling = async () => {
    try {
      await transactionService.createPooling(
        formData.poolingFrom,
        formData.poolingTo,
        parseFloat(formData.cbAmount)
      );
      alert('Pooling created');
    } catch (error) {
      console.error('Failed to create pooling:', error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">FuelEU Maritime Dashboard</h1>

      {/* CB Meter */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Compliance Balance</h2>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-green-500 h-4 rounded-full"
            style={{ width: `${cb ? cb * 100 : 0}%` }}
          ></div>
        </div>
        <p>{cb ? `${(cb * 100).toFixed(1)}% Compliant` : 'Select a route to calculate'}</p>
        <select
          value={selectedRouteId}
          onChange={(e) => setSelectedRouteId(e.target.value)}
          className="mt-2 p-2 border"
        >
          <option value="">Select Route</option>
          {routes.map((route) => (
            <option key={route.id} value={route.id}>
              {route.startPort} to {route.endPort}
            </option>
          ))}
        </select>
        <button onClick={handleCalculateCB} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">
          Calculate CB
        </button>
      </div>

      {/* Routes */}
      <RouteTable routes={routes} onDelete={async (id) => {
        try {
          await routeService.deleteRoute(id);
          loadRoutes();
        } catch (error) {
          console.error('Failed to delete route:', error);
        }
      }} />

      {/* Create Route Form */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Create Route</h2>
        <input
          type="text"
          placeholder="Vessel ID"
          value={formData.vesselId}
          onChange={(e) => setFormData({ ...formData, vesselId: e.target.value })}
          className="p-2 border mr-2"
        />
        <input
          type="text"
          placeholder="Start Port"
          value={formData.startPort}
          onChange={(e) => setFormData({ ...formData, startPort: e.target.value })}
          className="p-2 border mr-2"
        />
        <input
          type="text"
          placeholder="End Port"
          value={formData.endPort}
          onChange={(e) => setFormData({ ...formData, endPort: e.target.value })}
          className="p-2 border mr-2"
        />
        <input
          type="number"
          placeholder="Fuel Used"
          value={formData.fuelUsed}
          onChange={(e) => setFormData({ ...formData, fuelUsed: e.target.value })}
          className="p-2 border mr-2"
        />
        <input
          type="number"
          placeholder="Distance"
          value={formData.distance}
          onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
          className="p-2 border mr-2"
        />
        <button onClick={handleCreateRoute} className="px-4 py-2 bg-green-500 text-white rounded">
          Create
        </button>
      </div>

      {/* Banking Form */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Process Banking Transaction</h2>
        <input
          type="text"
          placeholder="Vessel ID"
          value={formData.bankingVesselId}
          onChange={(e) => setFormData({ ...formData, bankingVesselId: e.target.value })}
          className="p-2 border mr-2"
        />
        <input
          type="number"
          placeholder="Amount"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          className="p-2 border mr-2"
        />
        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value as 'credit' | 'debit' })}
          className="p-2 border mr-2"
        >
          <option value="credit">Credit</option>
          <option value="debit">Debit</option>
        </select>
        <button onClick={handleProcessTransaction} className="px-4 py-2 bg-purple-500 text-white rounded">
          Process
        </button>
      </div>

      {/* Pooling Form */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Create Pooling</h2>
        <input
          type="text"
          placeholder="From Vessel ID"
          value={formData.poolingFrom}
          onChange={(e) => setFormData({ ...formData, poolingFrom: e.target.value })}
          className="p-2 border mr-2"
        />
        <input
          type="text"
          placeholder="To Vessel ID"
          value={formData.poolingTo}
          onChange={(e) => setFormData({ ...formData, poolingTo: e.target.value })}
          className="p-2 border mr-2"
        />
        <input
          type="number"
          placeholder="CB Amount"
          value={formData.cbAmount}
          onChange={(e) => setFormData({ ...formData, cbAmount: e.target.value })}
          className="p-2 border mr-2"
        />
        <button onClick={handleCreatePooling} className="px-4 py-2 bg-orange-500 text-white rounded">
          Create
        </button>
      </div>
    </div>
  );
};

export default Dashboard;