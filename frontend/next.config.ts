const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uhugvwdetrwvhhrsyvoz.supabase.co",
        pathname: "/storage/v1/object/public/exec-images/**",
      },
    ],
  },
};

export default nextConfig;