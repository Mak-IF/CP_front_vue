const ERROR_CODES = {
    USER_NOT_FOUND: 'Такого пользователя не существует',
    //Invalid credentials    // !ToDo тут заполнить ошибками с апи
    auth: 'Необходимо войти в систему'
}

function error(code) {
    return ERROR_CODES[code] ? ERROR_CODES[code] : 'Неизвестная ошибка';
}

export default error;