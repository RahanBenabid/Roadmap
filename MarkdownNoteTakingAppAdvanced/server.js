var sharejs = require("share");
var redis = require("redis");  // Import redis client explicitly
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

// Create Redis client explicitly
var client = redis.createClient();

// Add connection event handlers
client.on('connect', function() {
    console.log('Connected to Redis');
});

client.on('error', function(err) {
    console.log('Redis error: ' + err);
});

// Ensure Redis client stays open using async connection handling
async function startRedis() {
    try {
        await client.connect();  // Use async connect method
        console.log('Redis client connected successfully.');
    } catch (err) {
        console.error('Redis connection failed:', err);
        // Exit if Redis cannot connect to avoid running the app in a bad state
        process.exit(1);  // Exit the app if Redis connection fails
    }
}

startRedis();  // Call the async function to connect to Redis

var options = {
    db: { type: 'redis', redis: client }, // Pass the existing Redis client to ShareJS
};

// Attach Express to ShareJS
sharejs.server.attach(app, options);

// Gracefully handle app shutdown
process.on('SIGINT', async () => {
    console.log("Shutting down gracefully...");
    await client.quit();  // Ensure the Redis client is closed before exiting
    process.exit();
});

var port = 3000;
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});