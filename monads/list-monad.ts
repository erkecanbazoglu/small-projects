// // TODO: Remove before working on this file
// // It is to disable block level shadowing on variables
// @ts-nocheck

// This is an example of list monad with flatMap

// Actual type: string[]
// Monad type: List ({ value: string[] })

interface List {
  value: string[];
}

const wrapValue = (x: string[]): List => ({ value: x });

const runWrapped = (input: List, transform: (_: string[]) => List): List => {
  const output = transform(input.value);
  return {
    value: output.value,
  };
};

const flipACoin = (doors: string[]): List => {
  const flippedDoors = doors.flatMap((door) => [
    `${door} heads`,
    `${door} tails`,
  ]);

  return wrapValue(flippedDoors);
};

const chooseFromFruits = (doors: string[]): List => {
  const doorsWithFruit = doors.flatMap((door) => [
    `${door} apple`,
    `${door} orange`,
    `${door} banana`,
  ]);

  return wrapValue(doorsWithFruit);
};

const doors = ["red", "blue", "green"];

const wrappedDoors = wrapValue(doors);

const doorsFlipped = runWrapped(wrappedDoors, flipACoin);

const doorsWithFruit = runWrapped(doorsFlipped, chooseFromFruits);

console.log(doorsWithFruit.value);
