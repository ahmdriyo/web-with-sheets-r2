import React from "react";
import { Section } from "./Section";
import { Container } from "./Container";

export const CarSkeleton = () => {
  return (
    <div className="min-h-screen bg-background">
      <Section className="py-8 md:py-12">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery Skeleton */}
            <div className="space-y-4">
              {/* Main Image Skeleton */}
              <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-muted animate-pulse" />

              {/* Thumbnail Gallery Skeleton */}
              <div className="grid grid-cols-4 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="aspect-square overflow-hidden rounded-lg bg-muted animate-pulse"
                  />
                ))}
              </div>
            </div>

            {/* Car Details Skeleton */}
            <div className="space-y-8">
              {/* Price Skeleton */}
              <div>
                <div className="h-12 w-48 bg-muted rounded-lg animate-pulse mb-2" />
                <div className="h-6 w-24 bg-muted rounded-full animate-pulse" />
              </div>

              {/* Title Skeleton */}
              <div>
                <div className="h-10 w-3/4 bg-muted rounded-lg animate-pulse mb-2" />
                <div className="h-6 w-1/2 bg-muted rounded-lg animate-pulse" />
              </div>

              {/* Key Specs Grid Skeleton */}
              <div className="grid grid-cols-2 gap-4 p-6 bg-card rounded-xl">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i}>
                    <div className="h-4 w-16 bg-muted rounded animate-pulse mb-2" />
                    <div className="h-5 w-24 bg-muted rounded animate-pulse" />
                  </div>
                ))}
              </div>

              {/* Description Skeleton */}
              <div>
                <div className="h-8 w-40 bg-muted rounded-lg animate-pulse mb-4" />
                <div className="space-y-2">
                  <div className="h-4 w-full bg-muted rounded animate-pulse" />
                  <div className="h-4 w-full bg-muted rounded animate-pulse" />
                  <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
                </div>
              </div>

              {/* CTA Button Skeleton */}
              <div className="h-12 w-full bg-muted rounded-lg animate-pulse" />
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};
