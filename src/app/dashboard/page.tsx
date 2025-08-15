'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Zap, 
  Battery, 
  TrendingUp, 
  Activity, 
  Sun, 
  Home,
  ArrowUpRight,
  ArrowDownLeft,
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import StatsCard from '@/components/dashboard/StatsCard';
import EnergyChart from '@/components/dashboard/EnergyChart';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { isAuthenticated } from '@/lib/auth';
import { devicesAPI, energyRecordsAPI } from '@/lib/api';
import { Device, EnergyRecord } from '@/types';
import { formatEnergy, formatPower, getStatusBadgeColor } from '@/lib/utils';

const DashboardPage: React.FC = () => {
  const router = useRouter();
  const [devices, setDevices] = useState<Device[]>([]);
  const [energyRecords, setEnergyRecords] = useState<EnergyRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const [devicesData, recordsData] = await Promise.all([
          devicesAPI.getAll(),
          energyRecordsAPI.getAll({ limit: 50 }),
        ]);
        
        setDevices(devicesData);
        setEnergyRecords(recordsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router]);

  // Calculate stats from energy records
  const todayRecords = energyRecords.filter(record => {
    const recordDate = new Date(record.timestamp);
    const today = new Date();
    return recordDate.toDateString() === today.toDateString();
  });

  const totalProduced = todayRecords.reduce((sum, record) => sum + (record.energy_produced || 0), 0);
  const totalConsumed = todayRecords.reduce((sum, record) => sum + (record.energy_consumed || 0), 0);
  const totalImported = todayRecords.reduce((sum, record) => sum + (record.grid_import || 0), 0);
  const totalExported = todayRecords.reduce((sum, record) => sum + (record.grid_export || 0), 0);
  const avgEfficiency = todayRecords.length > 0 
    ? todayRecords.reduce((sum, record) => sum + (record.efficiency || 0), 0) / todayRecords.length
    : 0;

  // Prepare chart data
  const chartData = energyRecords
    .slice(-24)
    .map(record => ({
      time: new Date(record.timestamp).toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      produced: record.energy_produced || 0,
      consumed: record.energy_consumed || 0,
      imported: record.grid_import || 0,
      exported: record.grid_export || 0,
    }));

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Activity className="w-4 h-4" />
            <span>Real-time monitoring</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Energy Produced Today"
            value={totalProduced}
            unit="kWh"
            icon={<Sun className="w-6 h-6" />}
            trend="up"
            trendValue={12.5}
          />
          <StatsCard
            title="Energy Consumed Today"
            value={totalConsumed}
            unit="kWh"
            icon={<Home className="w-6 h-6" />}
            trend="down"
            trendValue={8.3}
          />
          <StatsCard
            title="Grid Import Today"
            value={totalImported}
            unit="kWh"
            icon={<ArrowDownLeft className="w-6 h-6" />}
            trend="down"
            trendValue={15.2}
          />
          <StatsCard
            title="Grid Export Today"
            value={totalExported}
            unit="kWh"
            icon={<ArrowUpRight className="w-6 h-6" />}
            trend="up"
            trendValue={23.1}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Energy Chart */}
          <div className="lg:col-span-2">
            <EnergyChart
              data={chartData}
              title="Last 24 Hours Energy Flow"
              height={400}
            />
          </div>

          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Average Efficiency</span>
                <span className="text-lg font-bold text-gray-900">
                  {avgEfficiency.toFixed(1)}%
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Active Devices</span>
                <span className="text-lg font-bold text-gray-900">
                  {devices.filter(d => d.is_active).length}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Total Capacity</span>
                <span className="text-lg font-bold text-gray-900">
                  {devices.reduce((sum, d) => sum + (d.capacity || 0), 0).toFixed(1)} kW
                </span>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Recent Alerts</h4>
                <div className="space-y-2">
                  {energyRecords
                    .filter(record => record.status && record.status !== 'normal')
                    .slice(0, 3)
                    .map(record => (
                      <div key={record.id} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          Device {record.device_id}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          getStatusBadgeColor(record.status || 'normal')
                        }`}>
                          {record.status}
                        </span>
                      </div>
                    ))}
                  {energyRecords.filter(r => r.status && r.status !== 'normal').length === 0 && (
                    <p className="text-sm text-gray-500 italic">No alerts</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Device Status Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {devices.slice(0, 6).map(device => (
            <Card key={device.id}>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-900">{device.name}</h4>
                  <div className="flex items-center space-x-2">
                    {device.device_type === 'solar_panel' && <Sun className="w-5 h-5 text-yellow-500" />}
                    {device.device_type === 'battery' && <Battery className="w-5 h-5 text-green-500" />}
                    {device.device_type === 'inverter' && <Zap className="w-5 h-5 text-blue-500" />}
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      device.is_active 
                        ? 'bg-success-100 text-success-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {device.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Type</span>
                    <span className="text-sm font-medium text-gray-900 capitalize">
                      {device.device_type.replace('_', ' ')}
                    </span>
                  </div>
                  {device.capacity && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Capacity</span>
                      <span className="text-sm font-medium text-gray-900">
                        {formatPower(device.capacity)}
                      </span>
                    </div>
                  )}
                  {device.efficiency && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Efficiency</span>
                      <span className="text-sm font-medium text-gray-900">
                        {device.efficiency.toFixed(1)}%
                      </span>
                    </div>
                  )}
                  {device.location && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Location</span>
                      <span className="text-sm font-medium text-gray-900">
                        {device.location}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;