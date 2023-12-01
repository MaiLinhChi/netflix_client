import { useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import style from './Login.module.scss';
import { Logo } from '@/components/Icon';
import config from '@/config';
import images from '@/assets/images';
import Input from '@/components/Input';
import { AuthContext } from '@/authContext/AuthContext';
import { login } from '@/authContext/apiCalls';
import { LoadingContext } from '@/contexts/LoadingContext';

const cx = classNames.bind(style);

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { dispatch } = useContext(AuthContext);
    const { setLoading } = useContext(LoadingContext);

    const handleLogin = (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        login({ email, password }, dispatch, setLoading);
    };

    return (
        <div className={cx('login')}>
            <div className={cx('header')}>
                <Link to={config.routes.home}>
                    <Logo className={cx('logo')} />
                </Link>
            </div>
            <div className={cx('wrapper-form')}>
                <img src={images.backgroundBanner} alt="background" className={cx('image')} />
                <div className={cx('gradient')}></div>
                <form action="" className={cx('form')}>
                    <h1 className={cx('title')}>Sign In</h1>
                    <div className="formGroup">
                        <Input
                            gray
                            label="Email or phone number"
                            placeholder=" "
                            type="email"
                            ref={emailRef}
                            className={cx('custom-input')}
                        />
                        <Input gray label="Password" type="password" placeholder=" " ref={passwordRef} />
                    </div>
                    <button onClick={handleLogin} className={cx('btn-login')}>
                        Sign In
                    </button>
                    <div className={cx('wrapper-remember')}>
                        <div className={cx('checkbox')}>
                            <input type="checkbox" />
                            <span>Remember me</span>
                        </div>
                        <a href="https://www.netflix.com/vn-en/LoginHelp">Need help ?</a>
                    </div>
                    <div className={cx('sigup')}>
                        <span>New to Netflix?</span>
                        <a href="https://www.netflix.com/vn-en/">Sign up now.</a>
                    </div>
                    <small className={cx('title-last')}>
                        This page is protected by Google reCAPTCHA to ensure {`you're`} not a bot.{' '}
                        <span>Learn more</span>.
                    </small>
                </form>
            </div>
        </div>
    );
};

export default Login;
