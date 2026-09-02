import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Root AGENTS.md is the single source of agent rules; stop Next from generating per-app copies.
  agentRules: false,
};

export default nextConfig;
