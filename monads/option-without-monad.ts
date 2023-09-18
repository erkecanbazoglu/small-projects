// TODO: Remove before working on this file
// It is to disable block level shadowing on variables
// @ts-nocheck

// The purpose of this example is to show how we check for null or undefined values in chain operations
// If don't check for null or undefined values on every step, the next logic will be performed unncesarily
interface User {
  name: string;
  age: number;
}

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

const getCurrentUser = (id: number): User | undefined => users[id];

const getPet = (user: User): string | undefined => userPets[user.name];

const getPetNickname = (petName: string): string | undefined =>
  userPetNicknames[petName];

// Runner function
const runner = () => {
  const user = getCurrentUser(3);

  // Check 1
  if (!user) {
    console.log("User not found");
    return;
  }

  const userPet = getPet(user);

  // Check 2
  if (!userPet) {
    console.log("Pet not found");
    return;
  }

  const response = getPetNickname(userPet);

  console.log("Result: ", response);
};

runner();
