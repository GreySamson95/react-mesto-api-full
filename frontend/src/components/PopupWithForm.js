import React from 'react'

function PopupWithForm({name, isOpen, onClose, title, children, buttonCaption, onSubmit}) {
    return (
        <div className={`popup popup_${name} ${isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={onClose}></button>
                <h2 className="popup__header">{title}</h2>
                <form className="popup__input-form" name={name} onSubmit={onSubmit} noValidate>
                    {children}
                    <button className="popup__submit-button" type="submit" aria-label={buttonCaption}>{buttonCaption}</button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm