import React from 'react'
import succes from '../images/ok.png'
import problem from '../images/problem.png'
import closeImage from '../images/cross45.svg'

function InfoTooltip(props) {
    return (
        <>
        <section className={`popup ${props.isOpen ? "popup_opened" : " "}`} id='info-tooltip' >
            <div className="popup__status-container">
                <img className="popup__status-image" src={props.status ? succes : problem} alt={props.status ? 'Успешно' : 'Ошибка'}/>
                <h2 className="popup__status-title">{props.status ? 'Вы успешно зарегистрировались!' : `Что-то пошло не так!
                Попробуйте ещё раз.`}</h2>
                <button className="popup__tooltip-close-button" type="reset" onClick={props.onClose}>
                    <img src={closeImage} className="popup__close-image" alt="Закрыть" />
                </button>
            </div>
        </section>
        </>
    )
}

export default InfoTooltip
