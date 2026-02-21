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
              <div className="h-10 w-48 bg-gray-700 rounded-full"></div>
            </div>
            {/* Title skeleton */}
            <div className="space-y-3">
              <div className="h-12 md:h-16 bg-gray-700 rounded-lg mx-auto max-w-2xl"></div>
              <div className="h-12 md:h-16 bg-gray-700 rounded-lg mx-auto max-w-xl"></div>
            </div>
            {/* Description skeleton */}
            <div className="space-y-2 max-w-3xl mx-auto">
              <div className="h-6 bg-gray-700 rounded-lg"></div>
              <div className="h-6 bg-gray-700 rounded-lg"></div>
              <div className="h-6 bg-gray-700 rounded-lg w-3/4 mx-auto"></div>
            </div>
            {/* Buttons skeleton */}
            <div className="flex gap-4 justify-center pt-4">
              <div className="h-12 w-40 bg-gray-700 rounded-lg"></div>
              <div className="h-12 w-40 bg-gray-700 rounded-lg"></div>
            </div>
          </div>
        </Container>
      </div>

      {/* Mission & Vision Skeleton */}
      <Section className="bg-white">
        <Container>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission skeleton */}
            <div className="p-8 rounded-2xl bg-gray-100 border border-gray-200">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gray-300 rounded-lg"></div>
                <div className="h-8 bg-gray-300 rounded-lg w-2/3"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded w-4/5"></div>
                </div>
              </div>
            </div>
            {/* Vision skeleton */}
            <div className="p-8 rounded-2xl bg-gray-100 border border-gray-200">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gray-300 rounded-lg"></div>
                <div className="h-8 bg-gray-300 rounded-lg w-2/3"></div>
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
          <div className="text-center mb-12 space-y-4">
            <div className="h-10 bg-gray-700 rounded-lg mx-auto max-w-md"></div>
            <div className="h-6 bg-gray-700 rounded-lg mx-auto max-w-sm"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-gray-700 border border-gray-600"
              >
                <div className="w-16 h-16 bg-gray-600 rounded-lg mx-auto mb-3"></div>
                <div className="h-10 bg-gray-600 rounded-lg mb-2"></div>
                <div className="h-4 bg-gray-600 rounded-lg w-3/4 mx-auto"></div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
};
