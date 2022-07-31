const withPlugins = require('next-compose-plugins')
const { i18n } = require('./next-i18next.config')
const hash = require('string-hash')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n,
  images: {
    domains: ['picsum.photos']
  },
  webpack(config, options) {
    config.module.rules.push({
        test: /\.svg$/,
        issuer: /\.[jt]sx?$/,
        oneOf: [
          {
            dependency: { not: ['url'] }, // exclude new URL calls
            use: ({ resource }) => ([
              {
                loader: '@svgr/webpack',
                options: {
                  svgoConfig: {
                    plugins: [
                      {
                        name: 'removeViewBox',
                        active: false
                      },
                      {
                        name: 'cleanupIDs',
                        params: {
                          prefix: `svg-${hash(resource + ' ' + Math.random() * Number.MAX_SAFE_INTEGER)}`
                        }
                      }
                    ]
                  }
                }
              },
              'new-url-loader'
            ])
          },
          {
            type: 'asset/resource' // emit a separate file
          }
        ]
      },
      {
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          outputPath: 'static/',
          name: '[name].[ext]'
        }
      })
    
    config.module.parser.javascript.url = 'relative'
    
    return config
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  }
}

module.exports = nextConfig//withPlugins([], nextConfig)
