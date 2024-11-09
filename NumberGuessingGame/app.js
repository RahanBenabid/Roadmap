const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function game(maxTries, mode) {
  const number = Math.floor(Math.random() * 99) + 1;
  let guess = -1;
  let tries = 0;

  console.log(`
    Welcome to the Number Guessing Game!
    You picked ${mode} mode.
    I'm thinking of a number between 1 and 100.
    You have ${maxTries} chances to guess the correct number.
    `);

  const askForGuess = () => {
    if (tries === maxTries) {
      console.log("Game Over!");
      rl.close();
      return;
    }

    rl.question("Enter your guess: ", (input) => {
      const parsedGuess = parseInt(input);

      if (!isNaN(parsedGuess)) {
        if (parsedGuess === number) {
          console.log("You guessed Right! You Win!");
          rl.close();
        } else {
          console.log(parsedGuess > number ? "Smaller!" : "Bigger!");
          tries++;
          if (tries < maxTries) askForGuess();
        }
      } else {
        console.log("Please enter a valid number.");
        askForGuess();
      }
    });
  };

  askForGuess();
}

function main() {
  console.log(`
    Please select the difficulty level:
    1. Easy (10 chances)
    2. Medium (5 chances)
    3. Hard (3 chances)
    `);

  rl.question("What difficulty do you want?\n", (name) => {
    switch (name) {
      case "1":
        game(10, "easy");
        break;
      case "2":
        game(5, "medium");
        break;
      case "3":
        game(3, "hard");
        break;
      default:
        console.log("Invalid input. Please enter 1, 2, or 3.");
        main();
    }
  });
}

main();
