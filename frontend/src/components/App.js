/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Route, Switch, useHistory, Redirect, withRouter } from 'react-router-dom'
import '../index.css'
import Api from '../utils/api.js';
import PopupWithForm from './PopupWithForm'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import ImagePopup from './ImagePopup'
import Header from './Header'
import Footer from './Footer'
import Main from './Main'
import Login from './Login.js'
import Register from './Register.js'
import InfoTooltip from './InfoTooltip'
import ProtectedRoute from './ProtectedRoute.js'

import * as auth from '../utils/auth.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import defaultAvatar from '../images/Jak.jpg';

function App() {
  const history = useHistory()
  const [currentUser, setCurrentUser] = useState({name: 'Жак-Ив Кусто', about: 'Исследователь', avatar: defaultAvatar });
  const [selectedCard, setSelectedCard] = useState({})
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false)
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false)
  const [cards, getCards] = useState([])
  const [status, setStatus] = useState(false)
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState('')

  // const getToken = () => localStorage.getItem('token')
  const token = localStorage.getItem('token')

  const api = new Api({
    baseUrl: 'https://back.greysamson.students.nomoredomains.icu',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
   if (loggedIn) {
    api.getInitialData()
        .then(([userData, cardData]) => {
          setCurrentUser(userData)
            getCards(cardData)
        })
        .catch((err) => {
            console.log(err)
        })
      }
    }, [loggedIn])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id)
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c)
        getCards(newCards)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleCardDelete(card) {
    api.deletePhoto(card._id)
      .then(() => {
        const newCards = cards.filter((c) => { return c._id !== card._id })
        getCards(newCards)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }


  function handleSelectedCard(card) {
    setSelectedCard(card)
    setIsImagePopupOpen(true)
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsConfirmPopupOpen(false)
    setIsImagePopupOpen(false)
    setSelectedCard({})
    setIsInfoTooltipOpen(false)
  }

  function handleUpdateUser(paramInf) {
    api.setUserInfo(paramInf)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleUpdateAvatar(avatar) {
    api.setUserAvatar(avatar)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleAddPlace(newPhoto) {
    api.postPhoto(newPhoto)
      .then((newCard) => {
        getCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
  }
  function handleLogin(data) {
    const {email, password} = data;
    auth.authorization(email, password)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          localStorage.setItem('token', res.token);
          setEmail(email);
          history.push("/");
        }
      })
      .catch((err) => {console.log(err)})
  }

  function handleLogout() {
    setLoggedIn(false)
    setEmail(email)
    localStorage.removeItem('jwt')
    history.push('/signin')
  }

  function handleRegister(email, password) {
    auth.register(email, password)
      .then((res) => {
        if (res) {
          setIsInfoTooltipOpen(true)
          setStatus(true)
          history.push('/signin')
        }
    })
    .catch((error) => {
      console.log(error)
      setIsInfoTooltipOpen(true)
      setStatus(false)
    })

  }

  function handleTokenCheck() {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      auth.checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true)
            history.push("/")
            setEmail(res.email)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  useEffect(() => {
    handleTokenCheck()
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header email={email} loggedOut={handleLogout} loggedIn={loggedIn}/>
      <Switch>
      <ProtectedRoute exact path="/"
        loggedIn={loggedIn}
        component={Main}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleSelectedCard}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete} cards={cards} />
      <Route path="/signin">
        <Login handleLogin={handleLogin} setEmail={setEmail}/>
      </Route>
      <Route path="/signup">
        <Register handleRegister={handleRegister} />
      </Route>
      <Route>
        {loggedIn ? <Redirect to='/' /> : <Redirect to='/signin' />}
      </Route>
      </Switch>
      <Footer />
      <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          name={'profile'}/>
      <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          name={'avatar'}/>
      <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
          name={'card'}/>
      <InfoTooltip
          status={status}
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups} />
      <PopupWithForm
          name="popup_confirm"
          title="Вы уверены?"
          buttonCaption='Да'
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups} />
      <ImagePopup
          onClose={closeAllPopups}
          card={selectedCard}
          isOpen={isImagePopupOpen} />
    </CurrentUserContext.Provider>
  )

}

export default withRouter(App)
