// Валидация login Минимальные требования к логину: 5 символов на латинице

const passwordValidator = require("password-validator");
const schema_login = new passwordValidator();

//Минимальная длинна логина
const min_len_login = 5

//Максимальная длинна логина
const max_len_login = 100

schema_login
    .is().min(min_len_login)
    .is().max(max_len_login)

const IsLoginValid = (login) => schema_login.validate(login)

export default IsLoginValid