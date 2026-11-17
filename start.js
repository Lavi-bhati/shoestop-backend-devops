
const dns = require('dns');

// Use public DNS servers
dns.setServers(['8.8.8.8', '1.1.1.1']);

// Start the backend only after configuring DNS
require('./server');
