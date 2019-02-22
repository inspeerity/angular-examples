const { join, resolve } = require("path");
const getBaseKarmaConfig = require("../../karma.conf");
const ports = require("./pact-ports");

module.exports = function(config) {
  const baseConfig = getBaseKarmaConfig();
  config.set({
    ...baseConfig,
    frameworks: [...baseConfig.frameworks, "pact"],
    plugins: [...baseConfig.plugins, require("@pact-foundation/karma-pact")],
    coverageIstanbulReporter: {
      ...baseConfig.coverageIstanbulReporter,
      dir: join(__dirname, "../../coverage/lcov-report/libs/pact-services")
    },
    proxies: {
      "/api/subscription": `http://127.0.0.1:${ports.subscription}/subscription`
    },
    port: 9877,
    spec: 2,
    logLevel: "DEBUG",
    log: resolve(process.cwd(), "logs", "pact.log"),
    pact: [
      {
        port: ports.subscription,
        consumer: "inspeerity",
        provider: "inspeerity-core-subscription",
        dir: resolve(process.cwd(), "pacts")
      }
    ]
  });
};
