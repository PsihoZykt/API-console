const validate = (values: {
  login: string,
  sublogin: string,
  password: string,
}) => {
  interface Errors {
    login?: string;
    sublogin?: string;
    password?: string;
  }

  const errors: Errors = {}
  if (!values.login) {
    errors.login = 'Required'
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.login) &&
    !/^[A-Z0-9._]+$/i.test(values.login)
  ) {
    errors.login = 'Invalid login'
  }

  if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.sublogin) &&
    !/^[A-Z0-9._]+$/i.test(values.sublogin)
  ) {
    errors.sublogin = 'Invalid sublogin'
  }
  if (!/^[A-Z0-9 ]+$/i.test(values.password)) {
    errors.password = 'Invalid password'
  }

  return errors
}
export default validate
