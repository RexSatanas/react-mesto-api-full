import React from 'react'
import { Link } from 'react-router-dom'
function Registration(props){
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    function handleSubmit(evt) {
        evt.preventDefault()
        props.onRegister(email, password)
    }

    function handleChangeEmail(evt) {
        setEmail(evt.target.value);
    }

    function handleChangePassword(evt) {
        setPassword(evt.target.value);
    }

    return(
        <div className='auth'>
            <h1 className='auth__title'>Регистрация</h1>
            <form className='auth__form' onSubmit={handleSubmit}>
                <input
                    className="auth__input"
                    id="reg-email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    minLength="2"
                    required
                    onChange={handleChangeEmail}
                    value={email}
                />
                <input
                    className="auth__input"
                    id="reg-password"
                    name="password"
                    type="password"
                    placeholder="Пароль"
                    minLength="6"
                    required
                    onChange={handleChangePassword}
                    value={password}
                />
                <button className='auth__button-submit' type="submit">Зарегистрироваться</button>
                <Link className='auth__question' to="/sign-in">Уже зарегистрированы? Войти</Link>
            </form>
        </div>
    )
}
export default Registration