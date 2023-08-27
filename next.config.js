/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    domains:["raw.githubusercontent.com"]
  },
  experimental:{
    serverActions:true,
    appDir:true,
    serverComponentsExternalPackages:["mongoose"]
  },
    webPack(config){
      config.experiments = {
        ...config.experiments, 
        topLevelAwait:true
      }
      return config
    }
}

module.exports = nextConfig
