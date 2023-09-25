const webpack = require('webpack');
const path = require('path');
const CracoLessPlugin = require('craco-less');
const { GitRevisionPlugin } = require('git-revision-webpack-plugin');

const gitRevisionPlugin = new GitRevisionPlugin();

const COMMIT_HASH = JSON.stringify((gitRevisionPlugin.commithash() || '').slice(0, 8));

module.exports = {
    typescript: {
        enableTypeChecking: false,
    },
    webpack: {
        configure: (webpackConfig, { env, paths }) => {
            webpackConfig.resolve.fallback = {
                https: require.resolve('https-browserify'),
                crypto: require.resolve('crypto-browserify'),
                os: require.resolve('os-browserify'),
                http: require.resolve('stream-http'),
                url: require.resolve('url'),
                stream: require.resolve('stream-browserify'),
                assert: require.resolve('assert'),
                buffer: require.resolve('buffer'),
            };
            return webpackConfig;
        },
        alias: {
            'bn.js': path.resolve(process.cwd(), 'node_modules', 'bn.js'),
        },
        plugins: [
            new webpack.ProvidePlugin({
                process: 'process/browser',
            }),
            new webpack.ProvidePlugin({
                Buffer: ['buffer', 'Buffer'],
            }),
            new webpack.DefinePlugin({ COMMIT_HASH }),
        ],
    },
    plugins: [{ plugin: CracoLessPlugin }],
    jest: {
        configure: {
            globals: { COMMIT_HASH: '', TradingView: { widget: null } },
        },
    },
};
