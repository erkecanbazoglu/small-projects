// This is an example of monads with logging
// It performs a series of calculations of a number input
// Adding logs to the calculations in each step so that the logs are accumulated
// Later the logs can be used for debugging purposes

interface NumberWithLogs {
  result: number;
  logs: string[];
}

function wrapWithLogs(x: number): NumberWithLogs {
  return {
    result: x,
    logs: [],
  };
}

function runWithLogs(
  input: NumberWithLogs,
  transform: (_: number) => NumberWithLogs
): NumberWithLogs {
  const output = transform(input.result);
  return {
    result: output.result,
    logs: input.logs.concat(output.logs),
  };
}

function square(x: number): NumberWithLogs {
  return {
    result: x * x,
    logs: [`Squred ${x} to get ${x * x}.`],
  };
}

function addOne(x: number): NumberWithLogs {
  return {
    result: x + 1,
    logs: [`Added one to ${x} to get ${x + 1}.`],
  };
}

// Run the functions in sequence
// const response = addOne(square(wrapWithLogs(2)));

const wrappedValue = wrapWithLogs(2);
const squaredValue = runWithLogs(wrappedValue, square);
const res = runWithLogs(squaredValue, addOne);

console.log("Result: ", res.result); // 5
console.log("Logs: ", res.logs);
