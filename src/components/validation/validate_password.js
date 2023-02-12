// Валидация password Минимальные требования к паролю:
// 8 символов на латинице, одна заглавная, одна строчная буква, 2 цифры

const passwordValidator = require('password-validator');
const schema_password = new passwordValidator();

// Минимальное кол-во символов
const MIN_LEN_PASSWORD = 8

// Максимальное кол-во символов
const MAX_LEN_PASSWORD = 100

// Минимальное кол-во цифр
const QTY_DIGITS = 2

schema_password
    .is().min(MIN_LEN_PASSWORD)
    .is().max(MAX_LEN_PASSWORD)
    .has().uppercase()          // Must have uppercase letters
    .has().lowercase()          // Must have lowercase letters
    .has().digits(QTY_DIGITS)   // Must have at least 2 digits

const IsPasswordValid = (password) => schema_password.validate(password)

export default IsPasswordValid