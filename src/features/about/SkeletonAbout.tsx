import { Container, Section } from "@/src/components/ui";
import React from "react";

export const SkeletonAbout = () => {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      {/* Hero Skeleton */}
      <div className="relative min-h-[70vh] flex items-center overflow-hidden bg-gray-800">
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            {/* Badge skeleton */}
            <div className="flex justify-center">
              <div className="h-8 md:h-10 w-32 md:w-48 bg-gray-700 rounded-full"></div>
            </div>
            {/* Title skeleton */}
            <div className="space-y-3 min-w-75 md:min-w-2xl">
              <div className="h-10 md:h-12 lg:h-16 bg-gray-700 rounded-lg mx-auto w-full max-w-2xl"></div>
              <div className="h-10 md:h-12 lg:h-16 bg-gray-700 rounded-lg mx-auto w-4/5 max-w-xl"></div>
            </div>
            {/* Description skeleton */}
            <div className="space-y-2 max-w-3xl mx-auto px-4">
              <div className="h-4 md:h-6 bg-gray-700 rounded-lg"></div>
              <div className="h-4 md:h-6 bg-gray-700 rounded-lg"></div>
              <div className="h-4 md:h-6 bg-gray-700 rounded-lg w-3/4 mx-auto"></div>
            </div>
            {/* Buttons skeleton */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4 px-4">
              <div className="h-10 md:h-12 w-full sm:w-40 bg-gray-700 rounded-lg"></div>
              <div className="h-10 md:h-12 w-full sm:w-40 bg-gray-700 rounded-lg"></div>
            </div>
          </div>
        </Container>
      </div>

      {/* Mission & Vision Skeleton */}
      <Section className="bg-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
            {/* Mission skeleton */}
            <div className="p-4 md:p-8 rounded-2xl bg-gray-100 border border-gray-200">
              <div className="space-y-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-300 rounded-lg"></div>
                <div className="h-6 md:h-8 bg-gray-300 rounded-lg w-2/3"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded w-4/5"></div>
                </div>
              </div>
            </div>
            {/* Vision skeleton */}
            <div className="p-4 md:p-8 rounded-2xl bg-gray-100 border border-gray-200">
              <div className="space-y-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-300 rounded-lg"></div>
                <div className="h-6 md:h-8 bg-gray-300 rounded-lg w-2/3"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded w-4/5"></div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Statistics Skeleton */}
      <Section className="bg-gray-800">
        <Container>
          <div className="text-center mb-8 md:mb-12 space-y-4 px-4">
            <div className="h-8 md:h-10 bg-gray-700 rounded-lg mx-auto max-w-md"></div>
            <div className="h-4 md:h-6 bg-gray-700 rounded-lg mx-auto max-w-sm"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="text-center p-4 md:p-6 rounded-xl bg-gray-700 border border-gray-600"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-600 rounded-lg mx-auto mb-3"></div>
                <div className="h-8 md:h-10 bg-gray-600 rounded-lg mb-2"></div>
                <div className="h-4 bg-gray-600 rounded-lg w-3/4 mx-auto"></div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
};
