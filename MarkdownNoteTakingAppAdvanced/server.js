var sharejs = require("share");
var redis = require("redis");  // Import Redis client
var express = require("express");

var app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
    res.render("pad");
});

app.get("/(:id)", function (req, res) {
    res.render("pad");
});

// Create and connect Redis client
var client = redis.createClient();

async function startRedis() {
    client.on('error', (err) => {
        console.error('Redis error:', err);
    });

    try {
        await client.connect(); // Connect Redis client
        console.log('Redis client connected successfully.');
    } catch (err) {
        console.error('Failed to connect to Redis:', err);
        process.exit(1); // Exit if connection fails
    }
}

startRedis(); // Initialize Redis connection

// Options for ShareJS with Redis
var options = {
    db: {
        type: 'redis',
        client, // Use the active Redis client
    },
};

// Attach ShareJS to Express
try {
    sharejs.server.attach(app, options);
} catch (err) {
    console.error('Error attaching ShareJS:', err);
    process.exit(1);
}

// Graceful shutdown handling
process.on('SIGINT', async () => {
    console.log('Shutting down gracefully...');
    try {
        await client.quit(); // Close Redis client
        console.log('Redis client disconnected.');
    } catch (err) {
        console.error('Error during Redis shutdown:', err);
    }
    process.exit();
});

var port = 3000;
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});