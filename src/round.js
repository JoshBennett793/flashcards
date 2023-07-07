function initRoundController(deck) {
  return {
    deck,
    currentCard: deck[0],
    turns: 0,
    incorrectGuesses: [],
  };
}

function evaluateGuess(guess, correctAnswer) {
  if (guess === correctAnswer) {
    return 'correct!';
  }
  return 'incorrect!';
}

function takeTurn(guess, round) {
  const outcome = evaluateGuess(guess, round.currentCard.correctAnswer);
  if (outcome === 'incorrect!') {
    round.incorrectGuesses.push([round.currentCard.id, guess]);
  }
  round.turns++;
  round.currentCard = round.deck[round.turns];

  return outcome;
}

function calculatePercentCorrect(round) {
  const numberCorrect = round.turns - round.incorrectGuesses.length;
  return Math.round((numberCorrect / round.turns) * 100);
}

function displayReportCard(round) {
  const report = round.incorrectGuesses.reduce((acc, guess) => {
    const [idx, incorrectGuess] = guess;
    const card = round.deck.find(card => card.id === idx);

    acc[card.question] = acc[card.question] || {};
    acc[card.question].youGuessed = incorrectGuess;
    acc[card.question].correctAnswer = card.correctAnswer;

    return acc;
  }, {});

  Object.keys(report).forEach(key => {
    console.log(key);
    console.log('You guessed: ', report[key].youGuessed);
    console.log('Correct answer: ', report[key].correctAnswer);
    console.log('* =================================== *');
  });
}

function endRound(round) {
  const percentCorrect = calculatePercentCorrect(round);

  console.log('* =================================== *');
  console.log(
    `** Round Over! ** You answered ${percentCorrect}% of the questions correctly!`,
  );
  console.log('* =================================== *');

  displayReportCard(round);
}

module.exports = {
  initRoundController,
  evaluateGuess,
  takeTurn,
  calculatePercentCorrect,
  endRound,
};
