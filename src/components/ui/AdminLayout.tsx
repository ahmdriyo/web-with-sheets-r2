"use client";

import React from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  title,
  subtitle,
  action,
}) => {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Sidebar />
      <div className="ml-64">
        <TopBar title={title} subtitle={subtitle} action={action} />
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
};
