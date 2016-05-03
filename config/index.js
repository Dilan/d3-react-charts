var convict = require('convict');

var config = convict({
    env: {
        doc: 'Application environment.',
        format: ['production', 'development', 'test'],
        default: 'development',
        env: 'NODE_ENV'
    },
    twitter: {
        CONSUMER_KEY: {
            doc: '',
            format: '*',
            default: '',
            env: 'TWITTER_CONSUMER_KEY'
        },
        CONSUMER_SECRET: {
            doc: '',
            format: '*',
            default: '',
            env: 'TWITTER_CONSUMER_SECRET'
        },
        ACCESS_TOKEN_KEY: {
            doc: '',
            format: '*',
            default: '',
            env: 'TWITTER_ACCESS_TOKEN_KEY'
        },
        ACCESS_TOKEN_SECRET: {
            doc: '',
            format: '*',
            default: '',
            env: 'TWITTER_ACCESS_TOKEN_SECRET'
        }
    },
    app: {
        ip: {
            doc: 'The IP address to bind.',
            format: 'ipaddress',
            default: '127.0.0.1',
            env: 'IP_ADDRESS'
        },
        port: {
            doc: 'The port to bind.',
            format: 'port',
            default: 3100,
            env: 'PORT'
        }
    }
});
// Load environment dependent configuration
config.loadFile('./config/' + config.get('env') + '.json');
// Perform validation
config.validate();

module.exports = config;
