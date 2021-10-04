import success from '../images/sucess.png'
import fail from '../images/fail.png'


function InfoTooltip(props) {
    return (
        <div className={`popup popup_type_auth ${props.isOpen ? "popup_opened" : ""}`}>
            <div className="popup__container popup__container_auth">
                <img
                    className="popup__auth-img"
                    src={props.isRegistration ? success : fail}
                    alt="Результат регистрации"
                />
                <h3 className="popup__title popup__title_auth">{props.isRegistration ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h3>
                <button
                    className="popup__close-btn"
                    type="button"
                    aria-label="Закрыть"
                    onClick={props.onClose}
                />
            </div>
        </div>
    )
}

export default InfoTooltip