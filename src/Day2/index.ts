import { readFileSync } from "fs";

const mappingChoiceToScore = {
  X: 1,
  Y: 2,
  Z: 3,
};

const mappingOutcomeToScore = {
  "A-X": 3,
  "A-Y": 6,
  "A-Z": 0,
  "B-X": 0,
  "B-Y": 3,
  "B-Z": 6,
  "C-X": 6,
  "C-Y": 0,
  "C-Z": 3,
};
const mappingWhatToPlay = {
  "A-X": "S",
  "A-Y": "R",
  "A-Z": "P",
  "B-X": "R",
  "B-Y": "P",
  "B-Z": "S",
  "C-X": "P",
  "C-Y": "S",
  "C-Z": "R",
};
const mappingOutcomeToScore2 = {
  X: 0,
  Y: 3,
  Z: 6,
};

const mappingChoiceToScore2 = {
  R: 1,
  P: 2,
  S: 3,
};

const computeRoundScore1 = (round: string[]) => {
  const scoreWithChoice = mappingChoiceToScore[round[1]];
  const scoreWithOutcome = mappingOutcomeToScore[round.join("-")];
  return scoreWithChoice + scoreWithOutcome;
};

const computeRoundScore2 = (round: string[]) => {
  const scoreWithChoice = mappingChoiceToScore2[mappingWhatToPlay[round.join("-")]];
  const scoreWithOutcome = mappingOutcomeToScore2[round[1]];

  return scoreWithChoice + scoreWithOutcome;
};

export const day2 = () => {
  const input = readFileSync("./src/Day2/input.txt", "utf8");
  const rounds = input.split("\n").map((round) => round.split(" "));
  rounds.pop();
  const score = rounds.reduce((sum, round) => {
    return sum + computeRoundScore2(round);
  }, 0);

  console.log(score);
};
