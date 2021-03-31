import React from 'react'

function ImagePopup({ card, onClose, isOpen }) {
    return (
        <div className={`popup ${isOpen && 'popup_opened'}`}>
            <div className="popup__container popup__container_image">
                <img className="popup__photo" src={card.link} alt={card.name}></img>
                <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={onClose}></button>
                <h2 className="popup__header popup__header_location_bottom">{card.name}</h2>
            </div>
        </div>
    )
}

export default ImagePopup