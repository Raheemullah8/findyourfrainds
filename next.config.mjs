/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {hostname:"media.istockphoto.com"},
            {hostname:"images.unsplash.com"},
            {hostname:"example.com"},
            {hostname:"images.pexels.com"},
            {hostname:"lh3.googleusercontent.com"},
        ]

    }
};

export default nextConfig;
