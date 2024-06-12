export const REGEX_PHONE_NUMBER: RegExp = /(03[2-9]|05[6-9]|07[06-9]|08[1-5]|086|088|09[0-9])+([0-9]{7})\b/
export const REGEX_SPECIAL_CHARACTER: RegExp = /^[a-zA-Z0-9_]*$/
export const REGEX_EMAIL: RegExp =
  /(?=.*^[0-9a-zA-Z_@.]+$)(?=.*^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$).*/
export const REGEX_ONLY_TEXT_NUMBER: RegExp = /[^0-9a-z-A-Z]/g
export const REGEX_ONLY_NUMBER: RegExp = /[^0-9]/g
export const REGEX_ONLY_NUMBER_TEXT_DOTS: RegExp = /[^0-9.a-z-A-Z%]/g
export const REGEX_ONLY_NUMBER_WITHOUT_FIRST_ZERO: RegExp = /^(?!0)\d+$/
export const REGEX_REMOVE_TRIM: RegExp = /^\s+|\s+$/g
