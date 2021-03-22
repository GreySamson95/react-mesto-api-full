import Card from './Card.js'
import React, { useContext } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'

function Main( {onEditAvatar, onEditProfile, onAddPlace, cards, onCardClick, onCardLike, onCardDelete} ) {
    const currentUser = useContext(CurrentUserContext)

    return (
        <>
            <section className="profile">
                <div className="profile__edit-profile">
                    <img className="profile__avatar" src={currentUser.avatar} alt="Аватар"></img>
                    <button className="profile__edit" type="button" aria-label="Редактировать"
                        onClick={onEditAvatar}></button>
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button className="profile__edit-button" type="button" aria-label="Редактировать" onClick={onEditProfile}></button>
                    <p className="profile__self">{currentUser.about}</p>
                </div>
                <button className="profile__add-button" type="button" aria-label="Добавить" onClick={onAddPlace}></button>
            </section>
            <section className="elements">
                {cards.map((card) => {
                    return (
                        <Card
                          key={card._id}
                          card={card}
                          onCardClick={onCardClick}
                          onCardLike={onCardLike}
                          onCardDelete={onCardDelete}/>
                    )
                })}
            </section>
        </>

    )
}

export default Main
