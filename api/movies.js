// Import your data using CommonJS require
const data = require('../server/data.json');

module.exports = function handler(req, res)
{
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    // Handle OPTIONS request
    if (req.method === 'OPTIONS')
    {
        res.status(200).end();
        return;
    }

    // Handle GET request
    if (req.method === 'GET')
    {
        res.status(200).json(data.movies);
        return;
    }

    // Handle unsupported methods
    res.status(405).json({ message: 'Method not allowed' });
}; 