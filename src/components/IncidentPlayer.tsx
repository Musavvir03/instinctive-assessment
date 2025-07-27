import React from 'react';

interface IncidentPlayerProps {
  mainThumbnail: string;
  otherThumbnails: string[];
}

export default function IncidentPlayer({ mainThumbnail, otherThumbnails }: IncidentPlayerProps) {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full aspect-video bg-black rounded-lg overflow-hidden mb-4 flex items-center justify-center">
        <img src={mainThumbnail} alt="Main Incident" className="object-cover w-full h-full" />
      </div>
      <div className="flex gap-2">
        {otherThumbnails.map((thumb, idx) => (
          <img
            key={idx}
            src={thumb}
            alt={`Camera thumbnail ${idx + 1}`}
            className="w-20 h-12 object-cover rounded border"
          />
        ))}
      </div>
    </div>
  );
} 