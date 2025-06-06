/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.v0.dev',
        port: '',
        pathname: '/**',
      },
    ],
    unoptimized: true,
  },
  webpack: (config, { isServer, webpack }) => {
    // Handle Node.js specific modules for client-side
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: 'crypto-browserify',
        stream: 'stream-browserify',
        path: 'path-browserify',
        zlib: 'browserify-zlib',
        http: 'stream-http',
        https: 'https-browserify',
        os: 'os-browserify/browser',
        buffer: 'buffer',
        constants: 'constants-browserify',
      };
      
      // Add buffer polyfill
      config.plugins.push(
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
          process: 'process/browser',
        })
      );
    }
    
    return config;
  },
  experimental: {
    serverComponentsExternalPackages: ['@azure/msal-node']
  }
};

export default nextConfig;
