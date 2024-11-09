const https = require("https");

function display(username, events) {
  if (Array.isArray(events) && events.length > 0) {
    events.forEach((event) => {
      if (event.type === "PushEvent") {
        console.log(
          `- ${username} made ${event.payload.size} commit(s) to ${event.repo.name}`,
        );
      } else if (event.type === "WatchEvent") {
        console.log(`- Starred ${event.repo.name}`);
      } else if (event.type === "IssuesEvent") {
        console.log(`- New issue oppened in ${event.repo.name}`);
      }
    });
  }
}

function fetchUser(username) {
  const url = `https://api.github.com/users/${username}/events`;
  https
    .get(url, { headers: { "User-Agent": "Node.js" } }, (res) => {
      let data = "";
      res.on("data", (d) => {
        data += d;
      });

      res.on("end", () => {
        events = JSON.parse(data);
        display(username, events);
      });
    })
    .on("error", (e) => {
      console.error("Error fetching data", e.message);
    });
}

function printHelp() {
  console.log(`
    GitHub User Activity CLI:
        Usage:
          - Fetch recent activity: node index.js <GitHub username>

        Commands:
          - help : Display help information
          - <GitHub username> : Fetch recent activity of the specified GitHub user

        Example:
          node index.js octocat
    `);
}

function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command || command === "help") {
    printHelp();
    return;
  }

  const username = command;
  fetchUser(username);
}

main();
