"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { ReactNode, useState } from "react";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
          },
        },
      }),
  );

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "var(--card)",
              color: "var(--foreground)",
              border: "1px solid var(--border)",
            },
            success: {
              duration: 3000,
              style: {
                background: "#10b981",
                color: "#ffffff",
                border: "none",
              },
            },
            error: {
              duration: 4000,
              style: {
                background: "#ef4444",
                color: "#ffffff",
                border: "none",
              },
            },
          }}
        />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
