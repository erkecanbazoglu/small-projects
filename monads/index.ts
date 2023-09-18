// TODO: Remove before working on this file
// It is to disable block level shadowing on variables
// @ts-nocheck

// // General example for understanding monads

// Define an interface (type) for the Monad
// Any is the value that will be wrapped, it can be any type such as number of string
// If you want to use a specific unknown type, you can use generics <T>
interface MonadInterface {
  value: any;
}

// Define a wrapper function
// Wrapper function takes the same type as the MonadInterface "value"
// In this case it is any, but it can be a specific type such as number or string
// Wrapper function always returns the MonadInterface, because it act as entering point of the monad
// We take the the same type of the "value", and return the MonadInterface
const wrapValue = (x: any): MonadInterface => ({ value: x });

// Define a run function
// Run function takes the MonadInterface and a transform function
// If the initial value is not a type MonadInterface, we need to wrap it with "wrapValue" function
// Then we pass the MonadsInterface value that comes from the "wrapValue" function and a transform function
// The transform function also returns a MonadInterface, therefore we can say that
// "runWrapped" function takes a MonadInterface as an input and returns a MonadInterface as an output
// However, it enables the transform function make computation taking any type of value as input
// Monads are all about wrapping and unwrapping values and taking extra computation from the transform function
// That's why they take the value do some logic and return the MonadInterface again
// Optionally we can chain the runWrapped function with other runWrapped functions
const runWrapped = (
  input: MonadInterface,
  transform: (_: any) => MonadInterface
): MonadInterface => {
  const output = transform(input.value);
  console.log("Output: ", output);
  return {
    value: output.value,
  };
};

// Define a transform function
// Transform function takes the same type as the MonadInterface "value"
// It returns the MonadInterface, because it act as the output of the monad
const double = (x: number): MonadInterface => ({ value: x * 2 });

// We can define a function that performs series of computations and combine them
// In this case, we do all of them with monads step by step
const getFourTimesMyAge = (age: number): number => {
  const myAgeWrapped = wrapValue(age);
  const myAgeDouble = runWrapped(myAgeWrapped, double);
  const myAgeDoubleAgain = runWrapped(myAgeDouble, double);
  return myAgeDoubleAgain.value;
};

const myAge = 26;
const myAgeFourTimes = getFourTimesMyAge(myAge);
console.log("My age four times: ", myAgeFourTimes);
