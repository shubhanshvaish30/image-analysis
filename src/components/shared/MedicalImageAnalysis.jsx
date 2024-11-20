import React, { useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import Logo from "./ai-medicine-outline-icon-simple-600nw-2523986339-removebg-preview.png"

const ImageAnalysis = () => {
  const [results, setResults] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [image, setImage] = useState(null);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    console.log(file);
    
    if (file) {
      setImage(URL.createObjectURL(file)); // Show image preview
      setIsUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post("http://localhost:5000/api/analyze", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setResults(response.data); // Set the analysis results
        setIsUploading(false);
      } catch (error) {
        console.error("Error analyzing image:", error);
        setIsUploading(false);
      }
    }
  };

  const resetAnalysis = () => {
    setResults(null);
    setImage(null);
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Add Project Name and Description
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("AI Medical Image Analysis", 10, 10); // Top left corner
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("A powerful AI solution for medical image analysis", 10, 18); // Thin description below name

    // Add Logo (just an example, replace with actual image URL or Base64)
    const logo = Logo;
    doc.addImage(logo, "PNG", 180, 10, 20, 20); // Top right corner

    // Draw the line below project name and description
    doc.setLineWidth(0.5);
    doc.line(10, 25, 200, 25); // Horizontal line

    // Add Patient Information (left-aligned)
    doc.setFontSize(12);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 10, 35);
    doc.text(`Patient Name: ${results?.patientName || "N/A"}`, 10, 42);
    doc.text(`Patient ID: ${results?.patientId || "N/A"}`, 10, 49);
    doc.text(`Address: ${results?.address || "N/A"}`, 10, 56);
    doc.text(`Contact No: ${results?.contactNo || "N/A"}`, 10, 63);

    // Add Medical Information (continued below)
    doc.text("Symptoms:", 10, 73);
    doc.text(`${results?.symptoms || "N/A"}`, 10, 80);
    doc.text("Medical Knowledge:", 10, 90);
    doc.text(`${results?.medicalKnowledge || "N/A"}`, 10, 100);
    doc.text("Clinical Findings:", 10, 110);
    doc.text(`${results?.clinicalFindings || "N/A"}`, 10, 120);
    doc.text("Recommendations:", 10, 130);
    doc.text(`${results?.recommendations || "N/A"}`, 10, 140);

    // Add Background Logo (light faded version)
    doc.addImage(logo, "PNG", 10, 150, 50, 50, undefined, "NONE"); // Light background logo

    // Add a thin line at the bottom
    doc.setLineWidth(0.5);
    doc.line(10, 280, 200, 280);

    // Add footer with project name
    doc.text("Report created by AI Medical Image Analysis", 10, 290);
    doc.text("Please contact us for any further information.", 10, 295);

    // Save the PDF
    doc.save("image_analysis_report.pdf");
  };

  const formatReport = (report) => {
    if (!report) return "";
    return report
      .replace(/\*\*([^\*]+)\*\*/g, "<b>$1</b>") // Convert **text** to <b>text</b> for bold headers
      .replace(/\n/g, "<br>"); // Replace line breaks with HTML <br>
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="relative min-h-screen flex flex-col items-center justify-center text-center px-4">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1602526195894-79d7a09a4794?q=80&w=1920&auto=format&fit=crop')`,
          }}
        ></div>

        <div className="relative z-10 flex flex-col items-center gap-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-wide drop-shadow-lg">
            AI-Powered Image Analysis
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-3xl leading-relaxed">
            Upload your medical scans, and let our AI analyze them with cutting-edge precision. Get instant insights for faster, reliable diagnostics.
          </p>

          {/* Upload section or image preview */}
          {!image && !results && (
            <div className="mt-8">
              <label className="flex flex-col items-center gap-4 p-6 border border-gray-700 bg-black/60 rounded-lg cursor-pointer hover:bg-black/80 transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-16 h-16 text-indigo-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5v-6m0 0v-6m0 6H8.25m3.75 0h3.75"
                  />
                </svg>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleUpload}
                />
                <span className="text-lg font-medium text-gray-300">Click to Upload</span>
              </label>
            </div>
          )}

          {/* Image preview after uploading */}
          {image && !results && (
            <div className="mt-8 w-full max-w-3xl bg-gray-800 p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-2xl font-bold mb-4 text-indigo-400">Uploaded Image Preview</h2>
              <img
                src={image}
                alt="Uploaded Preview"
                className="max-w-full h-auto object-contain rounded-lg"
              />
            </div>
          )}

          {/* Loading spinner while analyzing the image */}
          {isUploading && (
            <div className="mt-8">
              <div className="w-12 h-12 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-indigo-400">Analyzing your image...</p>
            </div>
          )}

          {/* Display the analysis results */}
          {results && (
            <div className="mt-8 bg-black/60 p-8 rounded-lg shadow-lg max-w-3xl text-left">
              <h2 className="text-2xl font-bold mb-4 text-indigo-400">Analysis Results</h2>
              <div
                className="text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: formatReport(results.report) }}
              ></div>
              <div className="mt-6 flex gap-4">
                <button
                  onClick={resetAnalysis}
                  className="px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-transform transform hover:scale-105"
                >
                  Analyze Another Scan
                </button>
                <button
                  onClick={generatePDF} // Generate PDF when clicked
                  className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-transform transform hover:scale-105"
                >
                  Download PDF Report
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageAnalysis;
