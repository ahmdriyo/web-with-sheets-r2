"use client";

import React, { useEffect, useState } from "react";
import { AdminLayout } from "@/src/components/ui/AdminLayout";
import { Card } from "@/src/components/ui/Card";

interface UserProfile {
  name: string;
  username: string;
  email: string;
  role: string;
}

const ProfileView = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Get user info from localStorage (set during login)
    const storedName = localStorage.getItem("userName") || "Admin";
    const storedUsername = localStorage.getItem("userUsername") || "admin";

    setProfile({
      name: storedName,
      username: storedUsername,
      email: "admin@showroom.com",
      role: "Administrator",
    });
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <AdminLayout title="Profile" subtitle="View your account information">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Profile</h2>
          <p className="text-zinc-400">Your account information and details</p>
        </div>

        {/* Profile Card */}
        <Card>
          <div className="space-y-8">
            {/* Avatar Section */}
            <div className="flex flex-col items-center text-center pb-8 border-b border-zinc-800">
              <div className="w-24 h-24 rounded-full bg-linear-to-br from-purple-600 to-purple-800 flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-lg shadow-purple-900/30">
                {profile ? getInitials(profile.name) : "A"}
              </div>
              <h3 className="text-2xl font-semibold text-white mb-1">
                {profile?.name || "Loading..."}
              </h3>
              <p className="text-zinc-400">@{profile?.username || "admin"}</p>
              <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full bg-purple-900/30 border border-purple-800/50">
                <span className="text-xs font-medium text-purple-300">
                  {profile?.role || "Administrator"}
                </span>
              </div>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-zinc-500 mb-2">
                  Username
                </label>
                <div className="px-4 py-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                  <p className="text-white">{profile?.username || "-"}</p>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-zinc-500 mb-2">
                  Email Address
                </label>
                <div className="px-4 py-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                  <p className="text-white">{profile?.email || "-"}</p>
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-zinc-500 mb-2">
                  Full Name
                </label>
                <div className="px-4 py-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                  <p className="text-white">{profile?.name || "-"}</p>
                </div>
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-zinc-500 mb-2">
                  Role
                </label>
                <div className="px-4 py-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                  <p className="text-white">{profile?.role || "-"}</p>
                </div>
              </div>
            </div>

            {/* Account Status */}
            <div className="pt-6 border-t border-zinc-800">
              <h4 className="text-sm font-medium text-zinc-400 mb-4">
                Account Status
              </h4>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-sm text-zinc-300">Active</span>
                </div>
                <span className="text-zinc-700">•</span>
                <span className="text-sm text-zinc-500">Last login: Today</span>
              </div>
            </div>

            {/* Info Note */}
            <div className="bg-zinc-800/30 border border-zinc-700/50 rounded-lg p-4">
              <div className="flex gap-3">
                <svg
                  className="w-5 h-5 text-zinc-400 shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <p className="text-sm text-zinc-300 mb-1">
                    Profile is view-only
                  </p>
                  <p className="text-xs text-zinc-500">
                    Contact your system administrator to update account
                    information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default ProfileView;
