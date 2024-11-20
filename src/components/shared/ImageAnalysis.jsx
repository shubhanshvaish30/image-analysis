import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // For conditional class merging if needed.

const ImageAnalysisPage = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 min-h-screen flex items-center justify-center p-8">
      <div className="max-w-4xl mx-auto w-full">
        <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Header Section */}
          <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
            <CardTitle className="text-3xl font-bold text-center">
              The Importance of Image Analysis
            </CardTitle>
            <p className="text-center text-sm mt-2">
              Understanding the world through images has revolutionized industries and science.
            </p>
          </CardHeader>

          {/* Content Section */}
          <CardContent className="p-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-700">What is Image Analysis?</h2>
              <p className="text-gray-600">
                Image analysis is the process of extracting meaningful information from images
                through computational techniques. It plays a critical role in fields such as healthcare,
                security, artificial intelligence, and environmental monitoring.
              </p>

              <h2 className="text-xl font-semibold text-gray-700">Why is it Important?</h2>
              <ul className="list-disc pl-6 text-gray-600">
                <li>
                  <strong>Healthcare:</strong> Enables early disease detection through medical imaging.
                </li>
                <li>
                  <strong>Security:</strong> Facilitates facial recognition and object detection in surveillance systems.
                </li>
                <li>
                  <strong>Artificial Intelligence:</strong> Powers applications like self-driving cars and automated inspections.
                </li>
                <li>
                  <strong>Environmental Impact:</strong> Helps monitor climate change and wildlife populations.
                </li>
              </ul>

              <h2 className="text-xl font-semibold text-gray-700">Applications of Image Analysis</h2>
              <p className="text-gray-600">
                From detecting cancer cells in medical scans to enabling augmented reality (AR) in gaming, image analysis
                is transforming the way we interact with and interpret the world around us.
              </p>
            </div>
          </CardContent>

          {/* Footer Section */}
          <CardFooter className="p-6 flex justify-between bg-gray-100">
            <Button
              variant="default"
              className="bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Learn More
            </Button>
            <Button variant="outline" className="hover:bg-gray-200">
              Contact Us
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ImageAnalysisPage;
