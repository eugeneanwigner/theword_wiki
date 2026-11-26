import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Level405 web piece (static file in public/level405/index.html) -> /level405
  async rewrites() {
    return [
      { source: '/level405', destination: '/level405/index.html' },
    ]
  },
}

export default nextConfig
