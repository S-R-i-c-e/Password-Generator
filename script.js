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
/* assign the characters set arrays to an object for reference */
const characters = {
  special_characters: specialCharacters,
  numeric_characters: numericCharacters,
  lower_case_characters: lowerCasedCharacters,
  upper_case_characters: upperCasedCharacters
};
/* validatePasswordLength: given input NaN or a number, returns a boolean
  indicating if the input is an integer that meets the stated range */
function validatePasswordLength(unvalidatedLength) {
  const minimunLength = 10;
  const maximumLength = 64;
  return (Number.isInteger(unvalidatedLength)
    && unvalidatedLength >= minimunLength
    && unvalidatedLength <= maximumLength);
}
/* getPasswordLength: using window.prompt, returns the input integer
  if it meets the validation conditions, otherwise alerts the user and returns undefined */
function getPasswordLength() {
  let inputLength = Number(window.prompt("enter the password length (10-64 characters)"));
  if (validatePasswordLength(inputLength)) {
    return inputLength;
  } else {
    window.alert("enter a number between 10 and 64 please");
  }
}
/* setOption: returns boolean according to user response to window.confirm for a given
  character set name - uses options key names as string substitutes for prompting - a fudge really but using string
  keys originally for options object seemed to prevent adding the validation method to options */
function setOption(optionName) {
  return window.confirm("use " + optionName + "?");
}
/* getPasswordOptions: creates and sets the options object to record user input according to
  character sets wanted. If the user options are valid, returns those options, else
  returns undefined */
function getPasswordOptions() {

  const options = {                 // create object to hold user character set choices
    special_characters: false,      // character sets choices set false by default,.. 
    numeric_characters: false,      // but probably should have been left undefined..
    lower_case_characters: false,   // and set (as in defined) below
    upper_case_characters: false,
    optionsValid: function () {     // at least one set of the characters sets must be chosen for
                                    // the options choice to be valid
      return this.special_characters
        || this.numeric_characters
        || this.upper_case_characters
        || this.lower_case_characters
    }
  };

  for (choice in options) {
    if (!(typeof (options[choice]) === "function")) { // enumerate the character sets but not the method
      options[choice] = setOption(choice);            // and set the choices true or false
    }
  }

  if (options.optionsValid()) {         // return options if at least one is true
    return options;
  } else {
    window.alert("choose at least one type of character please"); // otherwise alert and undefined
  }
}
// Function for getting a random element from an array
function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
/* createPasswordCharacterSet: given the options object, returns an array of
  characters that includes each character array chosen by the user */
function createCharacterSet(setChoices) {   // set meaning mathematical set, not define
  let chosenCharacterSet = [];              // initialize password character choice array
  for (choice in setChoices) {
    if (setChoices[choice]) {            // boolean reflecting user choices
      chosenCharacterSet = chosenCharacterSet.concat(characters[choice]);  // characters object is the four char sets
    }
  }
  chosenCharacterSet.pop(); // for reason uknown, the code was adding an undefined
  // element to the end of the characterSet array - pop() to fix
  // the array was fine inside the for-loop - the transition out of the block adds undefined
  return chosenCharacterSet;
}
/* create a set of characters chosen from those sets chosen, add a single
  character from that set until the password is the correct length */
function createPassword(passLength, passChoices) {
  let characterSet = createCharacterSet(passChoices);
  let password = "";                              // initialize the password
  for (i = 1; i <= passLength; i++) {             // add passLength number of..
    password += getRandom(characterSet);          // randomly chosen characters
  }
  return password;
}
/* generatePassword: get password length, then character set options,
  if both are valid create and return the password, otherwise undefined*/
function generatePassword() {
  let passwordLength = getPasswordLength();
  if (passwordLength) {                           // passwordLength undefined==false if invalid
    let characterSetChoices = getPasswordOptions();
    if (characterSetChoices) {                    // characterSetChoices undefined==false if invalid
      return createPassword(passwordLength, characterSetChoices);
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