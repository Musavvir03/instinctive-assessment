import React, { useState } from 'react';

export interface Incident {
  id: number;
  type: string;
  camera: { name: string; location: string };
  tsStart: string;
  tsEnd: string;
  thumbnailUrl: string;
  resolved: boolean;
}

interface IncidentListProps {
  incidents: Incident[];
  onResolve: (id: number) => Promise<void>;
}

const typeColors: Record<string, string> = {
  'Unauthorised Access': 'bg-red-500',
  'Gun Threat': 'bg-yellow-500',
  'Face Recognised': 'bg-blue-500',
};

export default function IncidentList({ incidents, onResolve }: IncidentListProps) {
  const [fading, setFading] = useState<number | null>(null);

  const handleResolve = async (id: number) => {
    setFading(id);
    await onResolve(id);
    setFading(null);
  };

  return (
    <div className="space-y-4 w-full">
      {incidents.map((incident) => (
        <div
          key={incident.id}
          className={`flex items-center gap-4 p-3 bg-white rounded shadow transition-opacity duration-500 ${fading === incident.id ? 'opacity-30' : ''}`}
        >
          <img src={incident.thumbnailUrl} alt="thumb" className="w-16 h-16 object-cover rounded" />
          <div className="flex flex-col flex-1">
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${typeColors[incident.type] || 'bg-gray-400'}`}></span>
              <span className="font-semibold">{incident.type}</span>
            </div>
            <span className="text-xs text-gray-500">{incident.camera.location}</span>
            <span className="text-xs text-gray-400">
              {new Date(incident.tsStart).toLocaleTimeString()} - {new Date(incident.tsEnd).toLocaleTimeString()}
            </span>
          </div>
          {!incident.resolved && (
            <button
              className="ml-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
              onClick={() => handleResolve(incident.id)}
              disabled={fading === incident.id}
            >
              Resolve
            </button>
          )}
        </div>
      ))}
    </div>
  );
} 