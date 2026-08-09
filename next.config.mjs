/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tree-shake barrel imports so pages only ship the icons/animation helpers
  // they actually use. This is a build-time bundling change only — it cannot
  // alter what any page renders or how it animates.
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "date-fns"],
  },
};

export default nextConfig;
