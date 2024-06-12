import * as yup from 'yup'
import {
  REGEX_EMAIL,
  REGEX_ONLY_NUMBER,
  REGEX_ONLY_TEXT_NUMBER,
  REGEX_PHONE_NUMBER,
  REGEX_SPECIAL_CHARACTER
} from '~/constants/regex'

export const validateEmailRegister = {
  email: yup.lazy(value => {
    if (value) {
      return yup.string().matches(REGEX_EMAIL, 'Địa chỉ email không hợp lệ')
    }
    return yup.string().nullable().notRequired()
  })
}
