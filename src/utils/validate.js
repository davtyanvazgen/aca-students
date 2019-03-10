import validator from "validator";
// export default function validation(name, surname, email, phone, knowledge) {
//   const validator = require("validator");
//   const nameErrors = validator.isAlpha(name.value);
//   !nameErrors
//     ? setNameValidationError("Have to be letters")
//     : setNameValidationError("");
//   const surNameErrors = validator.isAlpha(surname.value);
//   !surNameErrors
//     ? setSurNameValidationErrors("Have to be letters")
//     : setSurNameValidationErrors("");
//   const emailErrors = validator.isEmail(email.value);
//   !emailErrors
//     ? setEmailValidationErrors("Wrong email")
//     : setEmailValidationErrors("");
//   const phoneErrors =
//     validator.isInt(phone.value) &&
//     validator.isLength(phone.value, { min: 8, max: 13 });
//   !phoneErrors
//     ? setPhoneValidationErrors("Wrong number")
//     : setPhoneValidationErrors("");

//   let knowledgeErrors;
//   if (knowledge === "--choose--" || knowledge.trim() === "") {
//     setKnowledgeValidationErrors("choose your level ");
//     knowledgeErrors = false;
//   } else {
//     setKnowledgeValidationErrors("");
//     knowledgeErrors = true;
//   }

//   if (
//     nameErrors &&
//     surNameErrors &&
//     emailErrors &&
//     phoneErrors &&
//     knowledgeErrors
//   ) {
//     return true;
//   }

//   return false;
// }

// const validator = require("validator");

export function validateName(name) {
  return validator.isAlpha(name);
}

// export function validateEmail(email) {
//   return validator.isEmail(email);
// }

export function validateSurName(surname) {
  return validator.isAlpha(surname);
}

// export function validatePhone(phone) {
//   return (
//     validator.isInt(phone.value) &&
//     validator.isLength(phone.value, { min: 8, max: 13 })
//   );
// }
