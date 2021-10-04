import headerLogo from '../images/header-logo.svg'
import { Link, useLocation } from 'react-router-dom'
function Header(props) {
    const location = useLocation()
    return(
        <header className="header">
            <img className="header__logo" src={headerLogo} alt="Логотип" />
            <div className='header__auth'>
                {props.loggedIn ? (
                    <>
                        <p className='header__email header__auth-style'>{props.userEmail}</p>
                        <Link
                            className="header__signout header__auth-style"
                            onClick={props.onSignOut}
                            to="/sign-in">
                            Выйти
                        </Link>
                    </>

                    ) : (
                    <Link
                        className="header__signin header__auth-style"
                        to={`${location.pathname === '/sign-in' ? '/sign-up' : '/sign-in'}`}>
                        {`${location.pathname === '/sign-in' ? 'Регистрация' : 'Войти'}`}
                    </Link>
                )
                }
            </div>
        </header>
    )
}
export default Header