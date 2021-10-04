class Api {
    constructor({url, headers}) {
        this._url = url;
        this._headers = headers;
    }

    _getResponseData = (res) => {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`ERROR: ${res.status}`)
    }

    getUser(token) {
        return fetch(`${this._url}/users/me`, {
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            })
            .then(this._getResponseData)

    }

    getCards(token) {
        return fetch(`${this._url}/cards`, {
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        })
            .then(this._getResponseData)
    }

    updateUserInfo(data, token) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                name: data.name,
                about: data.status
            })
        })
            .then(this._getResponseData)
    }

    saveNewCard(data, token) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(this._getResponseData)
    }

    newAvatar(data, token ) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then(this._getResponseData)
    }

    deleteCard(cardId, token) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        })
            .then(this._getResponseData)
    }


    likeCard(cardId, token) {
        return fetch(`${this._url}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        })
            .then(this._getResponseData)
    }


    likeCardCancel(cardId, token) {
        return fetch(`${this._url}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        })
            .then(this._getResponseData)
    }

    changeLikeCardStatus(cardId, isLiked, token) {
        if (!isLiked) {
            return this.likeCardCancel(cardId, token)
        } else {
            return this.likeCard(cardId, token)
        }
    }
}

    const api = new Api({
    //url: 'http://localhost:3000',
    url: 'https://api.mestodm.students.nomoredomains.monster',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});
export default api