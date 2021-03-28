import React, { useState } from 'react'
import PopupWithForm from './PopupWithForm'


function AddPlacePopup(props) {
    const [name, setName] = useState('')
    const [link, setLink] = useState('')


  function handleNameChange(e) {
    setName(e.target.value)
  }

  function handleLinkChange(e) {
    setLink(e.target.value)
  }

  function handleAddPlaceSubmit(e) {
    e.preventDefault()
    props.onAddPlace({
      name,
      link
    })
    setName('')
    setLink('')
  }

  return (
    <PopupWithForm
      name="add-photo"
      title="Новое место"
      buttonCaption='Cохранить'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleAddPlaceSubmit}>
    <label className="popup__field">
      <input type="text" placeholder="Название" className="popup__input popup__input_name" name="name" minLength="1" maxLength="30" id="caption-input" onChange={handleNameChange} value={name} required></input>
      <span className="popup__input-error" id="caption-input-error"></span>
    </label>
    <label className="popup__field">
      <input type="url" placeholder="Ссылка на картинку" className="popup__input popup__input_link" name="link" id="link-input-pic" onChange={handleLinkChange} value={link} required></input>
      <span className="popup__input-error" id="link-input-error"></span>
    </label>
  </PopupWithForm>
  );
}
export default AddPlacePopup
