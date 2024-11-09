func game(maxTries: Int, mode: String) {
  let number: Int = Int.random(in: 1..<100)
  let guess: Int = -1
  var tries: Int = 0

  print(number)
  print(
    """
    Welcome to the Number Guessing Game!
    You picked \(mode) mode.
    I'm thinking of a number between 1 and 100.
    You have \(tries) chances to guess the correct number.
    """
  )
  while guess != number {
    if tries == maxTries {
      print("Game Over!")
      return
    }
    if let input = readLine() {
      if let guess = Int(input) {
        if guess == number {
          print("You guessed Right! You Win!")
          return
        } else if guess > number {
          print("Smaller!")
        } else {
          print("Bigger!")
        }
        tries += 1
      }
    }

  }

}

func main() {
  print("What difficulty do you want?")
  var name: String? = nil

  while name == nil || name!.isEmpty {
    print(
      """
      Please select the difficulty level:
      1. Easy (10 chances)
      2. Medium (5 chances)
      3. Hard (3 chances)\n
      """
    )
    name = readLine()
  }

  switch name {
  case "1":
    game(maxTries: 10, mode: "easy")
  case "2":
    game(maxTries: 5, mode: "normal")
  case "3":
    game(maxTries: 3, mode: "hard")
  default:
    main()
  }
}

main()
