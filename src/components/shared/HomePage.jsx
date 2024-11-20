import React, { useEffect, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [typewriterText, setTypewriterText] = useState("");
  const fullText = "Welcome to AI Imaging Hub";

  useEffect(() => {
    let i = 0; // Start at the first character
    setTypewriterText(""); // Reset text on component mount
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypewriterText(fullText.slice(0, i + 1)); // Ensure correct substring
        i++;
      } else {
        clearInterval(typingInterval); // Stop once the text is fully typed
      }
    }, 100);

    return () => clearInterval(typingInterval); // Cleanup interval
  }, []); // Dependency array ensures it runs on mount

  return (
    <div className="min-h-screen text-white">
      {/* Hero Section */}
      <div
        className="relative min-h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1581595220921-eec2071e5159?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        }}
      >
        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
        {/* Animated Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-wide">
            {typewriterText}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-xl">
            Revolutionizing medical imaging with AI-powered diagnostics.
          </p>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl">
            Our platform empowers doctors with instant, accurate analysis of CT scans, MRIs, and X-rays, enhancing the diagnostic process and providing faster, more reliable results.
          </p>
        </div>

        {/* Curtain Sliding Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent animate-slide-in"></div>

        {/* Buttons Section Below Text */}
        <div className="absolute bottom-16 w-full flex justify-center gap-6">
          
            <Link to="/imageAnalysis"
              className="relative bg-transparent border border-white px-6 py-3 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300"
            >
              Upload Scans
            </Link>
            <Link to="/allReports" className="relative bg-transparent border border-white px-6 py-3 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300">
              My Reports
            </Link>
            <Link
              className="relative bg-transparent border border-white px-6 py-3 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300"
            >
              About
            </Link>
        </div>
      </div>

      {/* How Our System Works Section */}
      <div className="bg-gray-800 py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gradient">
            How Our System Works
          </h2>

          {/* Step 1: Upload Scans */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12 animate-fade-in-up">
            <div className="text-left">
              <h3 className="text-2xl font-semibold mb-4 hover:text-indigo-400 transition-all duration-300">
                1. Upload Your Scans
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Simply upload your medical images, such as CT scans, MRIs, or X-rays, to our secure platform. The process is fast, easy, and ensures your data is protected.
              </p>
            </div>
            <div className="flex justify-center transform hover:scale-105 transition-all duration-300">
              <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/doctor-examining-patient-chest-x-ray-and-diagnosing-infection-in-respiratory-system-illustration-download-svg-png-gif-file-formats--lungs-organ-body-anatomy-business-pack-illustrations-6743625.png"
                alt="Upload Scans"
                className="w-full max-w-sm rounded-lg hover:rotate-2"
              />
            </div>
          </div>

          {/* Step 2: AI Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12 animate-fade-in-up">
            <div className="order-2 md:order-1 flex justify-center transform hover:scale-105 transition-all duration-300">
              <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/medical-report-analysis-illustration-download-in-svg-png-gif-file-formats--patient-review-health-data-clinical-assessment-healthcare-pack-illustrations-10462816.png?f=webp"
                alt="AI Analysis"
                className="w-full max-w-sm rounded-lg hover:rotate-2"
              />
            </div>
            <div className="order-1 md:order-2 text-left">
              <h3 className="text-2xl font-semibold mb-4 hover:text-indigo-400 transition-all duration-300">
                2. AI-Powered Analysis
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Our advanced AI models analyze your scans to detect anomalies, highlight areas of concern, and generate detailed insights that aid in diagnosis.
              </p>
            </div>
          </div>

          {/* Step 3: Generate Report */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center animate-fade-in-up">
            <div className="text-left">
              <h3 className="text-2xl font-semibold mb-4 hover:text-indigo-400 transition-all duration-300">
                3. Receive Your Report
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Within moments, receive a comprehensive, easy-to-understand diagnostic report that you can share with your doctor for further guidance.
              </p>
            </div>
            <div className="flex justify-center transform hover:scale-105 transition-all duration-300">
              <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/medical-check-up-illustration-download-in-svg-png-gif-file-formats--hospital-checkup-person-at-pack-healthcare-illustrations-5639401.png?f=webp"
                alt="Generate Report"
                className="w-full max-w-sm rounded-lg hover:rotate-2"
              />
            </div>
          </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center animate-fade-in-up">
                <div className="flex justify-center transform hover:scale-105 transition-all duration-300">
                    <img
                    src="https://cdni.iconscout.com/illustration/premium/thumb/doctor-prescription-illustration-download-in-svg-png-gif-file-formats--list-medicine-advice-healthcare-medical-pack-illustrations-3826805.png?f=webp"
                    alt="Prescription"
                    className="w-full max-w-sm rounded-lg hover:rotate-2"
                    />
                </div>
                <div className="text-left">
                    <h3 className="text-2xl font-semibold mb-4 hover:text-indigo-400 transition-all duration-300">
                    4. Receive Your Prescription
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                    Based on the results of your AI-powered analysis, our system generates a prescription or recommendation, which can be reviewed by your doctor for further treatment.
                    </p>
                </div>
            </div>
        </div>
    </div>

      {/* About Section */}
      <div className="bg-gray-900 py-16 px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">How Our Project Helps in the Medical Field</h2>
          <p className="text-gray-300 leading-relaxed">
            In the fast-paced world of healthcare, timely and accurate diagnostics can make a life-saving difference. Our platform leverages advanced artificial intelligence to analyze CT scans instantly. By reducing delays in diagnostic processes, we empower doctors to make faster, more informed decisions, ensuring patients receive critical care when it matters most. 
            <br /><br />
            Beyond speed, our system enhances accuracy, minimizing human errors in interpretation. It supports overburdened healthcare systems by acting as a reliable second opinion, especially in remote areas where access to specialists is limited. With a commitment to data security and confidentiality, our project is designed to bring cutting-edge AI solutions to the forefront of modern medicine, ultimately improving patient outcomes and saving lives.
          </p>
          <div className="mt-8">
            <img
              src="https://source.unsplash.com/featured/?technology,healthcare"
              alt="AI Medical Advancements"
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
