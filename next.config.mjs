/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Let devices on the local network (e.g. your phone) load dev assets
  allowedDevOrigins: ['192.168.1.253', '192.168.1.*'],
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  images: {
    unoptimized: true,
  },
}

export default nextConfig
