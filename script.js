let totalScore = JSON.parse(localStorage.getItem("totalScore")) ?? 0;
let attempt = JSON.parse(localStorage.getItem("attempt")) ?? 0;

const handleClick = (event) => {
  event.stopPropagation();
  event.preventDefault();

  roundScore = 0;

  const diceRolls = [];
  const count = {};

  for (let i = 1; i <= 5; i++) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceRolls.push(dice);
  }
  console.log(diceRolls);
  console.log(`count`);

  for (let i = 0; i < diceRolls.length; i++) {
    count[diceRolls[i]] = count[diceRolls[i]] ? count[diceRolls[i]] + 1 : 1;
  }

  for (let dice in count) {
    let times = count[dice];
    if (dice == 1 && times == 3) {
      roundScore += 1000;
    } else if (dice == 1 && times < 3) {
      roundScore += times * 100;
    } else if (dice == 1 && times <= 5) {
      roundScore += times * 100 + 700;
    } else if (dice == 5 && times < 3) {
      roundScore += times * 50;
    } else if (dice == 5 && times <= 5) {
      roundScore += times * 50 + 350;
    } else if (dice != 1 && times >= 3) {
      roundScore += dice * 100;
    }
  }

  let result = document.getElementsByClassName("dice");

  for (let i = 0; i < result.length; i++) {
    result[i].src = `./images/dice-${diceRolls[i]}.png`;
  }

  console.log(roundScore);

  let roundResult = document.getElementsByTagName("h2")[0];
  roundResult.innerHTML = `ROUND SCORE: ${roundScore} - ATTEMPT: ${
    attempt + 1
  }`;

  totalScore += roundScore;
  console.log(`TOTAL SCORE ${totalScore}`);

  let totalResult = document.getElementsByTagName("h1")[0];
  totalResult.innerHTML = `TOTAL SCORE: ${totalScore}`;

  const rollButton = document.getElementById("roll-dice");
  const newGame = document.getElementById("new-game");

  if (totalScore >= 5000) {
    rollButton.classList.add("hidden");
    newGame.classList.remove("hidden");

    let congrats = document.getElementsByTagName("h3")[0];
    congrats.innerHTML = `CONGRATULATIONS! 🏆`;
    congrats.style.color = "#FAA94D";

    totalResult.innerHTML = `FINAL SCORE: ${totalScore}`;
    totalResult.style.color = "#82c91e";

    roundResult.innerHTML = `ROUND SCORE: ${roundScore} - ATTEMPTS [${
      attempt + 1
    }]`;
    roundResult.style.color = "#ffec99";
  }
};

document.getElementById("roll-dice").addEventListener("click", (event) => {
  handleClick(event);

  localStorage.setItem("totalScore", JSON.stringify(totalScore));
  localStorage.setItem("attempt", JSON.stringify(attempt));
  attempt++;
  console.log(attempt);
});

document.getElementById("new-game").addEventListener("click", (event) => {
  localStorage.clear();
  window.location.reload();
});

window.onbeforeunload = () => {
  localStorage.clear();
};
