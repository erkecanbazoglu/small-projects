// TODO: Remove before working on this file
// It is to disable block level shadowing on variables
// @ts-nocheck

// Constants
const users = {
  1: { name: "John", age: 25 },
  2: { name: "Lenny", age: 51 },
};

const userPets = {
  John: "English Bulldog",
  Lenny: "French Bulldog",
};

const userPetNicknames = {
  "English Bulldog": "Bulldozer",
  "French Bulldog": "Frenchie",
};

// Interfaces
interface User {
  name: string;
  age: number;
}

interface Option<T> {
  value: T | null | undefined;
}

// Wrapper function
function some<T>(x: T): Option<T> {
  return {
    value: x,
  };
}

// Run function
function runWrapped<T, U>(
  input: Option<T>,
  transform: (_: T) => Option<U>
): Option<U> {
  if (input.value === null || input.value === undefined) {
    return {
      value: undefined,
    };
  }

  const result = transform(input.value);
  // // In order to debug the results
  // console.log("result: ", result);

  if (result.value === null || result.value === undefined) {
    console.log(`Error in ${transform.name} with input: ${input.value}.`);
  }

  return result;
}

const getCurrentUser = (x: number): Option<User> => ({
  value: users[x],
});

const getPet = (user: User): Option<string> => ({
  value: userPets[user.name],
});
const getPetNickname = (petName: string): Option<string> => ({
  value: userPetNicknames[petName],
});

// Runner function
const runner = () => {
  const wrappedValue = some(3);
  const user = runWrapped(wrappedValue, getCurrentUser);
  const userPet = runWrapped(user, getPet);
  const userPetNickname = runWrapped(userPet, getPetNickname);
  return userPetNickname.value;
};

const response = runner();
console.log("Result: ", response);
