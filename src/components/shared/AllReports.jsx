import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

const AllReports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get("http://localhost:5000/reports");
        const data = await response.data;
        console.log(data);
        
        setReports(data.reports); // Assuming data is an array of filenames
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };
    fetchReports();
  }, []);

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      {/* Header Section */}
      <div className="relative min-h-[30vh] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-wide">
            All Reports
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-xl">
            Browse and manage all your medical reports in one place.
          </p>
        </div>
      </div>

      {/* Reports List Section */}
      <div className="py-16 px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gradient mb-12">
            Your Medical Reports
          </h2>

          {/* Report Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {Array.isArray(reports) && reports.length === 0 ? (
              <p className="text-center text-gray-300 col-span-full">
                No reports found. Please upload your medical scans.
              </p>
            ) : (
              Array.isArray(reports) &&
              reports.map((report, index) => (
                <div
                  key={index}
                  className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold text-indigo-400 mb-4 hover:text-indigo-500 transition-all duration-300">
                      {report}
                    </h3>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Footer Section (optional) */}
      <div className="bg-gray-800 py-8">
        <div className="text-center text-gray-400">
          <p>&copy; 2024 AI Imaging Hub. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default AllReports;
