/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    // Will be available on both server and client
    backend: process.env.BACKEND_URL    
  }
}

module.exports = nextConfig
