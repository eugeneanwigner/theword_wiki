import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Level405 web piece (static file public/level405/index.html) is the home page.
  // The wiki lives under /history.
  async rewrites() {
    return {
      beforeFiles: [
        { source: '/', destination: '/level405/index.html' },
        { source: '/level405', destination: '/level405/index.html' },
      ],
      afterFiles: [],
      fallback: [],
    }
  },
}

export default nextConfig
