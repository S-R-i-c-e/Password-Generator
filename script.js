// Array of special characters to be included in password
const specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.'
];

// Array of numeric characters to be included in password
const numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
const lowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

// Array of uppercase characters to be included in password
const upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

/* assign the character set arrays to an object for reference */
const characters = {
  "special Characters": specialCharacters,
  "numeric Characters": numericCharacters,
  "lower Cased Characters": lowerCasedCharacters,
  "upper Cased Characters": upperCasedCharacters
}

/* validateLength: given input NaN or a number, returns a boolean
  indicating if the input is an integer that meets the stated range */
function validateLength(unvalidatedLength) {
  const minimunLength = 10;
  const maximumLength = 64;
  return (Number.isInteger(unvalidatedLength)
    && unvalidatedLength >= minimunLength
    && unvalidatedLength <= maximumLength);
}

/* getPasswordLength: using window.prompt, returns the input integer
  if it meets the validation conditions, otherwise alerts the user and returns undefined */
function getPasswordLength() {
  let inputLength = Number(window.prompt("length"));
  if (validateLength(inputLength)) {
    return inputLength;
  } else {
    window.alert("enter a number between 10 and 64 please");
  }
}

/* setOption: returns boolean according to user response to window.confirm for a given
  character set name */
function setOption(optionName) {
  return window.confirm("use " + optionName + "?");
}

/* validateOptions: logic returns true if at least one character set is chosen, otherwise
  returns false
  [TODO] this would sit better as a method of options but i could not make that work */
function validateOptions(unvalidatedOptions) {
  return unvalidatedOptions["special Characters"]
    || unvalidatedOptions["numeric Characters"]
    || unvalidatedOptions["lower Cased Characters"]
    || unvalidatedOptions["upper Cased Characters"]
}
/* getPasswordOptions: creates and sets the options object to record user input according to
  character sets wanted. If the user options are valid, returns those options, else
  returns undefined */
function getPasswordOptions() {

  const options = {                  // create object to hold user character set choices
    "special Characters": false,
    "numeric Characters": false,
    "lower Cased Characters": false,
    "upper Cased Characters": false,
  };

  for (choice in options) {               // enumerate the character sets
    options[choice] = setOption(choice);  // and set the choices true or false
  }

  if (validateOptions(options)) {         // return options if at least one is true
    return options;
  } else {
    window.alert("choose at least one type of character please"); // otherwise alert and undefined
  }
}


// Function for getting a random element from an array
function getRandom(arr) {

}

/* createPasswordCharacterSet: given the options object, returns an array of
  characters that includes each character array chosen by the user */
function createCharacterSet(setChoices) {
  let characterSet = [];                                       // initialize return data
  for (choice in setChoices) {
    if (setChoices[choice]) {
      characterSet = characterSet.concat(characters[choice]);
    }
  }
  return characterSet;
}

/* generatePassword: get password length, then character set options,
  but dropping out if either length or options are invalid; if valid
  create and return the password */
function generatePassword() {
  let passwordLength = getPasswordLength();
  if (passwordLength) {
    let characterSetChoices = getPasswordOptions();
    if (characterSetChoices) {
      let characterSet = createCharacterSet(characterSetChoices);
      return [passwordLength, characterSet];
    }
  }
}


// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector('#password');

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);