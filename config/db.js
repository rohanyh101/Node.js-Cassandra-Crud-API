const cassandra = require('cassandra-driver');

try {
    const client = new cassandra.Client({
        contactPoints: ['localhost'],
        localDataCenter: 'datacenter1',
        keyspace: 'ks_users',
    });

    console.log('connected to cassandra database...');
    module.exports = client;
} catch (error) {
    console.error('Error initializing Cassandra client:', error);
    process.exit(1);
}