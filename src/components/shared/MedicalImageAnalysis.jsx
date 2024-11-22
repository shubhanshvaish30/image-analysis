import React, { useEffect, useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import Logo from "./ai-medicine-outline-icon-simple-600nw-2523986339-removebg-preview.png"
import { v4 } from "uuid"; 
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";


const ImageAnalysis = () => {
  const [results, setResults] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    console.log(file);
    
    if (file) {
      setImage(URL.createObjectURL(file)); // Show image preview
      setIsUploading(true);

      const formData = new FormData();
      formData.append("file", file);
      await uploadFile(file);
      console.log(image);
      try {
        const response = await axios.post("https://digital-radiologist.onrender.com/api/analyze", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response.data.report);
        
        setResults(response.data); // Set the analysis results
        setIsUploading(false);
        console.log(image)
      } catch (error) {
        console.error("Error analyzing image:", error);
        setIsUploading(false);
      }
    }
  };

  const uploadFile = async (file) => {
    if (!file) return;

    console.log("Uploading file...");
    const imageRef = ref(storage, `${file.name + v4()}`); // Create a unique reference for the file
    await uploadBytes(imageRef, file).then((snapshot) => {
      // Get the download URL after uploading
      getDownloadURL(snapshot.ref).then((url) => {
        setImage(url); // Update the state with the image URL
        setImageURL(url);
        console.log("Image URL after upload:", url); // Log the URL for debugging
      });
    });
  };

  useEffect(() => {
    if (image) {
      console.log("Image URL has been set:", image);
    }
  }, [image]);

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
  
    // Add Analysis Results
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Analysis Report:", 10, 45); // Label for the report
    
    // Function to process the report and handle ** and \n
    const processReport = (report) => {
      if (!report) return [];
      
      // Split by lines (\n)
      const lines = report.split('\n');
      const processedLines = [];
  
      // Process each line to handle ** for bold text
      lines.forEach(line => {
        let processedLine = "";
        let isBold = false;
        
        // Loop through each character to handle ** for bold
        for (let i = 0; i < line.length; i++) {
          if (line[i] === '*' && line[i + 1] === '*') {
            isBold = !isBold; // Toggle bold
            i++; // Skip the next * character
          } else {
            processedLine += line[i];
          }
        }
  
        // Add the processed line with appropriate font styling
        processedLines.push({ text: processedLine, isBold });
      });
  
      return processedLines;
    };
  
    // Get processed report lines
    const formattedReport = processReport(results?.report);
  
    let currentY = 55; // Start Y position for the text
  
    // Add the lines to the PDF
    formattedReport.forEach(lineObj => {
      // Split the line if it's too long and needs to wrap
      const textLines = doc.splitTextToSize(lineObj.text, 180); // 180 is the maximum width for the text
  
      // Loop through the wrapped text and add it to the PDF
      textLines.forEach((textLine, index) => {
        if (lineObj.isBold) {
          doc.setFont("helvetica", "bold");
        } else {
          doc.setFont("helvetica", "normal");
        }
  
        // Add each line of text to the PDF at the current Y position
        doc.text(textLine, 10, currentY);
        currentY += 6; // Move to the next line (adjust as needed for spacing)
      });
    });
  
    // Add Background Logo (light faded version)
    doc.addImage(logo, "PNG", 10, currentY + 20, 50, 50, undefined, "NONE"); // Light background logo
  
    // Add a thin line at the bottom
    doc.setLineWidth(0.5);
    doc.line(10, currentY + 80, 200, currentY + 80);
  
    // Add footer with project name
    doc.text("Report created by AI Medical Image Analysis", 10, currentY + 90);
    doc.text("Please contact us for any further information.", 10, currentY + 95);
  
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
          {image  && (
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
                dangerouslySetInnerHTML={{ __html: formatReport(results.text)}}
              ></div>
              <h2 className="text-2xl font-bold mb-4 text-indigo-400">Formal Report</h2>
              <div
                className="text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: formatReport(results.report)}}
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