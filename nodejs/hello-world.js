const LEGAL_AGE = 18;

const birthYear = parseInt(process.argv[2]);
const username = process.argv[3];

if (!birthYear) {
  console.error("Usage: hello-world.js <year> <name>");
  return;
}

if (!username) {
  console.error("Usage: hello-world.js <year> <name>");
  return;
}

const currentYear = new Date().getFullYear();

const age = currentYear - birthYear;

if (age < LEGAL_AGE) {
  console.log(`Hola, ${username}. Tienes ${age} años y eres menor de edad.`);
} else {
  console.log(`Hola, ${username}. Tienes ${age} años y eres mayor de edad.`);
}
