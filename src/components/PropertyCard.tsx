import React from 'react';
import { Property } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, User, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/properties/${property.property_id}`}>
        <Card className="overflow-hidden border-none bg-white shadow-sm transition-shadow hover:shadow-md">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <CardTitle className="text-lg font-semibold">{property.name}</CardTitle>
              <Badge variant="secondary" className="bg-slate-100 text-slate-600">
                {property.property_type}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <MapPin className="h-4 w-4" />
              <span>{property.address}, {property.city}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <User className="h-4 w-4" />
              <span>{property.tenant_name || 'No tenant'}</span>
            </div>
            <div className="pt-2">
              <div className="text-xs font-medium uppercase tracking-wider text-slate-400">Monthly Rent</div>
              <div className="text-2xl font-light text-slate-900">
                ${property.monthly_rent.toLocaleString()}
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

export default PropertyCard;
