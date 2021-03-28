import React, { useContext, useState, useEffect } from 'react'
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  function handleNameChange(e) {
    setName(e.target.value)
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    props.onUpdateUser({
      name,
      about: description,
    })
    setName('')
    setDescription('')
  }

  useEffect(() => {
    setName(currentUser.name)
    setDescription(currentUser.about)
  }, [currentUser])

  return (
    <PopupWithForm name="edit-profile" title="Редактировать профиль" buttonCaption='Cохранить' isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <label className="popup__field">
        <input value={name || ''} type="text" placeholder="Имя" className="popup__input popup__input_name" name="name" minLength="2" maxLength="40" id="name-input" onChange={handleNameChange} required></input>
        <span className="popup__input-error" id="name-input-error"></span>
      </label>
      <label className="popup__field">
        <input value={description || ''}  type="text" placeholder="О себе" className="popup__input popup__input_about" name="about" minLength="2" maxLength="200" id="about-input" onChange={handleDescriptionChange} required></input>
        <span className="popup__input-error" id="about-input-error"></span>
      </label>
    </PopupWithForm>
  )
}
export default EditProfilePopup
