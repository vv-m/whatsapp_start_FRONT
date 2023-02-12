// Валидация на заполненность всех полей для регистрации,
// в keys передаем ключи полец, которые должны присутствовать в форме

function IsInputsNotEmpty(values, keys) {
  let result = true
    for (let i = 0; i < keys.length; i++){
      if (!(values[keys[i]]) || values[keys[i]] === '') {
        result = false
      }
    }
  return result
}

export default IsInputsNotEmpty;
