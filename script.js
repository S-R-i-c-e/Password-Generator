// Array of special characters to be included in password
var specialCharacters = [
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
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
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
var upperCasedCharacters = [
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
characters = {
  "special Characters" : specialCharacters,
  "numeric Characters" : numericCharacters,
  "lower Cased Characters" : lowerCasedCharacters,
  "upper Cased Characters" : upperCasedCharacters
}

/* validateLength: given input NaN or a number, returns a boolean
  indicating if the input is an integer that meets tthe stated range */
function validateLength(unvalidatedLength) {
  const minimunLength = 10;
  const maximumLength = 64;
  return (Number.isInteger(unvalidatedLength) 
        && unvalidatedLength>=minimunLength
        && unvalidatedLength<=maximumLength);
}

/* getPasswordLengh: using the window prompt, returns the input integer
  if it meets the validation conditions, else alerts the user and returns undefined */
function getPasswordLength() {
  let inputLength = Number(window.prompt("length"));
  if (validateLength(inputLength)) {
    return inputLength;
  } else {
    window.alert("enter a number between 10 and 64 please");
  }
}

/* setOption: returns boolean according to user response to window.confirm */
function setOption(optionName) {
  return window.confirm("use "+optionName+"?");
}

/* getPasswordOptions: creates and sets the options object to record user input according to
  character sets wanted. If the user options are valid, returns those options, else
  returns undefined */
function getPasswordOptions() {
  const options = {"special Characters" : false,
                    "numeric Characters" : false,
                    "lower Cased Characters" : false,
                    "upper Cased Characters" : false};
  for (choice in options) {
    options[choice] = setOption(choice);
  }

  return options;

  // if (validateOptions(options)) {
  //   return options;
  // } else {
  //   window.alert("choose at least one type of character please");
  // }
}


// Function for getting a random element from an array
function getRandom(arr) {

}

function createCharacterSet(setChoices) {
  console.log(setChoices);
  let characterSet = [];
  for (choice in setChoices) {
    if (setChoices[choice]) {
      characterSet = characterSet.concat(characters[choice]);
    }
  }
  console.log(characterSet);
  return characterSet;
}

// Function to generate password with user input
function generatePassword() {
  let passwordLength = getPasswordLength();
  let characterSetChoices = getPasswordOptions();
  let characterSet = createCharacterSet(characterSetChoices);
  return [passwordLength, characterSet];
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