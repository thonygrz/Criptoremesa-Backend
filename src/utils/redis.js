import redis from 'redis';

const client = redis.createClient({
    host: '127.0.0.1',
    port: 6379,
    password: '/r/Ik+eWEBKg38uTAKOKhtqFPPuxJG/1/trbkPi1attciTtbopSonLNIthkIxUJjDNJApc9jpNnctmsJ',
    db: 1,
    read_timeout: 60,
});

client.on('error', function(error){
    console.log(error);
})

module.exports = client;