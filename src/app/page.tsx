"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import IncidentPlayer from "../components/IncidentPlayer";
import IncidentList, { Incident } from "../components/IncidentList";

export default function Home() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/incidents?resolved=false")
      .then((res) => res.json())
      .then((data) => {
        setIncidents(data);
        setLoading(false);
      });
  }, []);

  const handleResolve = async (id: number) => {
    setIncidents((prev) => prev.filter((i) => i.id !== id));
    await fetch(`/api/incidents/${id}/resolve`, { method: "PATCH" });
  };

  // Main incident is the first one, others for the strip
  const mainIncident = incidents[0];
  const otherThumbnails = incidents.slice(1, 3).map((i) => i.thumbnailUrl);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-6xl mx-auto py-8 flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          {mainIncident ? (
            <IncidentPlayer
              mainThumbnail={mainIncident.thumbnailUrl}
              otherThumbnails={otherThumbnails}
            />
          ) : (
            <div className="w-full aspect-video bg-gray-300 rounded-lg flex items-center justify-center text-gray-500">
              No incident selected
            </div>
          )}
        </div>
        <div className="w-full md:w-[400px]">
          <h2 className="text-lg font-bold mb-4">Incident List</h2>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <IncidentList incidents={incidents} onResolve={handleResolve} />
          )}
        </div>
      </div>
    </div>
  );
}
