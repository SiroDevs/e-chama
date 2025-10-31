import {withSentryConfig} from '@sentry/nextjs';
module.exports = {
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default withSentryConfig(undefined, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options
  org: "futuristicken",
  project: "echama",
  silent: !process.env.CI,
  widenClientFileUpload: true,
  disableLogger: true,
  automaticVercelMonitors: true,
});