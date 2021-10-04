//export const BASE_URL = 'http://localhost:3000';
export const BASE_URL = 'https://api.mestodm.students.nomoredomains.monster';

function fixRes(res) {
    return res.ok ? res.json() : Promise.reject(`Произошла ошибка: ${res.status}`)
}


export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ password, email })
    })
        .then(res => fixRes(res))
}

export const authorization = (email, password, token) => {
    return fetch(`${BASE_URL}/signin`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ password, email })
    })
        .then(res => fixRes(res))
}

export const getToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    })
        .then(res => fixRes(res))
}