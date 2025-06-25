/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
  // Note: experimental.esmExternals removed for Turbopack compatibility
}

module.exports = nextConfig