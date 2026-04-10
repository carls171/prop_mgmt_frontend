import React, { useEffect, useState } from 'react';
import { propertyService } from '@/services/api';
import { Property } from '@/types';
import PropertyCard from '../components/PropertyCard';
import { Loader2, Search, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function PropertyList() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await propertyService.getAll();
      setProperties(response.data);
      setError(null);
    } catch (err: any) {
      console.error('Failed to fetch properties:', err);
      const message = err.response?.data?.message || err.message || 'Could not load properties.';
      setError(`${message}. Please check if the API is running and CORS is enabled.`);
    } finally {
      setLoading(false);
    }
  };

  const filteredProperties = properties.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Properties</h1>
          <p className="text-slate-500">Manage your rental portfolio and track performance.</p>
        </div>
        <Button render={<Link to="/properties/new" />} className="bg-slate-900 text-white hover:bg-slate-800">
          <Plus className="mr-2 h-4 w-4" /> Add Property
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          placeholder="Search properties by name, address, or city..."
          className="bg-white pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {error ? (
        <div className="rounded-xl bg-red-50 p-8 text-center text-red-600">
          {error}
        </div>
      ) : filteredProperties.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-slate-200 p-12 text-center">
          <p className="text-lg font-medium text-slate-500">No properties found</p>
          <p className="text-sm text-slate-400">Try adjusting your search or add a new property.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.property_id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}
