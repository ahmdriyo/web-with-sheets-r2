import React from "react";
import { Button } from "./Button";
import { Container } from "./Container";

const CarNotfound = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white flex items-center justify-center">
      <Container>
        <div className="max-w-md mx-auto text-center py-12">
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Car Not Found
          </h2>

          {/* Description */}
          <p className="text-lg text-gray-600 mb-8">
            The car you&#39;re looking for doesn&#39;t exist or may have been
            removed.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" onClick={() => window.history.back()}>
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Go Back
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => (window.location.href = "/cars")}
            >
              Browse All Cars
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CarNotfound;
