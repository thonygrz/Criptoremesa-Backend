import redis from 'redis';

const client = redis.createClient({
    host: '172.31.60.8',
    port: 6389,
    password: '/r/Ik+eWEBKg38uTAKOKhtqFPPuxJG/1/trbkPi1attciTtbopSonLNIthkIxUJjDNJApc9jpNnctmsJ',
    db: 1,
    read_timeout: 60,
});

client.on('error', function(error){
    console.log(error);
})

module.exports = client;