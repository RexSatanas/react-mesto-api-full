import React from 'react'
import { Route, Redirect, useHistory } from 'react-router-dom';
import * as auth from '../utils/auth'
import Header from './Header'
import Login from './Login'
import Registration from './Registration'
import InfoTooltip from './InfoTooltip'
import Main from './Main'
import Footer from './Footer'
import EditAvatarPopup from './EditAvatarPopup'
import EditProfilePopup from './EditProfilePopup'
import AddPlacePopup from './AddPlacePopup'
import PopupWithConfirm from './PopupWithConfirm'
import ImagePopup from './ImagePopup'
import api from '../utils/api'
import {CurrentUserContext} from '../contexts/CurrentUserContext'
import ProtectedRoute from "./ProtectedRoute";
function App() {
    //попапы
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isAddCardPopupOpen, setIsAddCardPopupOpen] = React.useState(false);
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
    //карточки
    const [cards, setCards] = React.useState([]);
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [cardIdToDelete, setCardIdToDelete] = React.useState(null);
    const [currentUser, setCurrentUser] = React.useState({})
    const [isLoading, setIsLoading] = React.useState(false);
    //логин-регистрация
    const [loggedIn, setLoggedIn] = React.useState(false)
    const [userEmail, setUserEmail] = React.useState('')
    const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false)
    const [isSuccessRegistration, setIsSuccessRegistration] = React.useState(false)
    const history = useHistory()

    function checkToken() {
        const token = localStorage.getItem('token')
        if (token) {
            auth.getToken(token)
                .then((data) => {
                    setUserEmail(data.email)
                    setLoggedIn(true)
                })
                .catch(err => {
                    console.log(`Не удалось передать токен. Ошибка: ${err}.`)
                })
        } else {
            console.log('Нет токена')
            return
        }
    }

    React.useEffect(() => {
        checkToken()
    }, [loggedIn])

    React.useEffect(() => {
        if (loggedIn) {
            history.push('/')
        }
    }, [loggedIn, history])

    // React.useEffect(() => {
    //     const token = localStorage.getItem('token')
    //     Promise.all([
    //         api.getUser(token),
    //         api.getCards(token)
    //     ])
    //         .then(([userData, cardsData]) => {
    //             setCurrentUser(userData)
    //             setCards(cardsData)
    //         })
    //         .catch((err) => console.log(err))
    // }, []);

    //Запрос пользователя
    React.useEffect(() => {
        const token = localStorage.getItem('token');
        api.getUser(token)
            .then((userData) => {
                setCurrentUser(userData)
            })
            .catch((err) => console.log(err))

    }, [])

    //запрос карточек
    React.useEffect(() => {
        const token = localStorage.getItem('token');
        api.getCards(token)
            .then((cardsData) => {
                setCards(cardsData)
            })
            .catch((err) => console.log(err))

    }, [])

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true)
    }
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true)
    }
    function handleAddPlaceClick() {
        setIsAddCardPopupOpen(true)
    }
    function handleCardClick(card) {
        setSelectedCard(card);
    }
    function handleUpdateUser(data){
        setIsLoading(true)
        api.updateUserInfo(data, localStorage.token)
            .then(userData => {
                setCurrentUser(userData)
                closeAllPopups()
            })
            .catch((err) => console.log(err))
            .finally(() => setIsLoading(false))
    }
    function handleAddPlaceSubmit(data){
        setIsLoading(true)
        api.saveNewCard(data, localStorage.token)
            .then(newCard => {
                setCards([newCard, ...cards])
                closeAllPopups()
            })
            .catch((err) => console.log(err))
            .finally(() => setIsLoading(false))
    }

    function handleUpdateAvatar(data){
        setIsLoading(true)
        api.newAvatar(data, localStorage.token)
            .then((data) => {
                setCurrentUser(data)
                closeAllPopups()
            })
            .catch((err) => console.log(err))
            .finally(() => setIsLoading(false))
    }

    function handleCardDelete(card){
        setIsConfirmPopupOpen(true)
        setCardIdToDelete(card);
    }

    function handleCardDeleteConfirm(card) {
        setIsLoading(true)
        api.deleteCard(card._id, localStorage.token)
            .then(() => {
                const newCards = cards.filter(item => item !== card)
                setCards(newCards)
                closeAllPopups()
            })
            .catch((err) => console.log(err))
            .finally(() => setIsLoading(false))
    }

    // function handleCardDeleteConfirm(card) {
    //     setIsLoading(true)
    //     api.deleteCard(card._id, localStorage.token)
    //         .then(() => {
    //             setCards((state) => state.filter((c) => c !== card))
    //             closeAllPopups()
    //         })
    //         .catch((err) => console.log(err))
    //         .finally(() => setIsLoading(false))
    // }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked, localStorage.token).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
            .catch((err) => console.log(err))
    }
    
    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false)
        setIsEditProfilePopupOpen(false)
        setIsAddCardPopupOpen(false)
        setIsConfirmPopupOpen(false)
        setIsInfoTooltipPopupOpen(false)
        setSelectedCard(null)
    }

    function handleRegister(email, password) {
        return auth.register(email, password)
            .then(res => {
                localStorage.setItem('token', res.token)
                setIsInfoTooltipPopupOpen(true)
                history.push('/sign-in')
            })
            .catch(() => {
                setIsInfoTooltipPopupOpen(true)
                setIsSuccessRegistration(false)
            })
            .catch(err => {
                console.log(`Не удалось зарегистрироваться. Ошибка: ${err}.`)
            })
    }

    function handleLogin(email, password) {
        return auth.authorization(email, password)
            .then(res => {
                console.log(res)
                localStorage.setItem('token', res.token)
                setLoggedIn(true)
                history.push('/')
            })
            .catch(err => {
                console.log(`Не удалось войти. Ошибка: ${err}.`)

            })
    }


    function handleSignOut() {
        localStorage.removeItem('token')
        setLoggedIn(false)
        setUserEmail('')
        history.push('/sign-in')
    }

    return (
      <CurrentUserContext.Provider value={currentUser}>
          <Header
              userEmail={userEmail}
              loggedIn={loggedIn}
              onSignOut={handleSignOut}
          />
          <ProtectedRoute
              path='/main'
              component={Main}
              loggedIn={loggedIn}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
          />
          <Route path='/sign-up'>
              <Registration onRegister={handleRegister}/>
          </Route>
          <Route path='/sign-in'>
              <Login onLogin={handleLogin}/>
          </Route>
          <Route>
              {loggedIn ? <Redirect to='/main' /> : <Redirect to='sign-in' />}
          </Route>
          <Footer />
          {loggedIn &&
          <>
              <EditAvatarPopup
                  isOpen={isEditAvatarPopupOpen}
                  onClose={closeAllPopups}
                  onUpdateAvatar={handleUpdateAvatar}
              />
              <EditProfilePopup
                  isOpen={isEditProfilePopupOpen}
                  onClose={closeAllPopups}
                  onUpdateUser={handleUpdateUser}
                  isLoading={isLoading}
              />
              <AddPlacePopup
                  isOpen={isAddCardPopupOpen}
                  onClose={closeAllPopups}
                  onAddCard={handleAddPlaceSubmit}
                  isLoading={isLoading}
              />
              <PopupWithConfirm
                  isOpen={isConfirmPopupOpen}
                  onClose={closeAllPopups}
                  onHandleCardDeleteConfirm={handleCardDeleteConfirm}
                  cardId={cardIdToDelete}
                  isLoading={isLoading}
              />
              <ImagePopup
                  card={selectedCard !== null && selectedCard}
                  onClose={closeAllPopups}
              />
          </>
          }
          {
              <InfoTooltip
                  isOpen={isInfoTooltipPopupOpen}
                  onClose={closeAllPopups}
                  isRegistration={isSuccessRegistration}
              />
          }
      </CurrentUserContext.Provider>
  );
}

export default App;
