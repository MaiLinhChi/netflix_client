import { useState, useContext, useRef } from 'react';
import classNames from 'classnames/bind';
import { AiOutlineSearch, AiOutlineBell, AiOutlineGlobal, AiFillCaretDown } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import TippyHeadless from '@tippyjs/react/headless';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import style from './Navbar.module.scss';
import { logout } from '@/authContext/AuthActions';
import { AuthContext } from '@/authContext/AuthContext';
import BoxShadow from '@/components/BoxShadow';
import Search from '../Search';
import { Logo, LogoMobile } from '@/components/Icon/Icon';
import Button from '@/components/Button';
import config from '@/config';
import { LanguageContext, dataLanguage } from '@/components/MultipleLanguage';

const cx = classNames.bind(style);

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [show, setShow] = useState(false);
    const searchRef = useRef();
    const { dispatch } = useContext(AuthContext);
    const { user } = useContext(AuthContext);
    const { language, setLanguage } = useContext(LanguageContext);

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);

        // clear up function
        return () => (window.onscroll = null);
    };

    const handleChangeLanguage = (e) => {
        setLanguage(e.target.value);
    };

    const handleToggleSearch = (e) => {
        e.stopPropagation();
        setShow(!show);
    };

    window.onclick = () => {
        setShow(false);
    };

    return (
        <div
            className={cx('navbar', {
                scrolled: isScrolled,
            })}
        >
            <div className={cx('left')}>
                <Link to={config.routes.home}>
                    <Logo className={cx('logo')} />
                    <LogoMobile className={cx('logo-mobile')} />
                </Link>
                {user && (
                    <>
                        <Link to="/movies" className={cx('item-user')}>
                            <span>Movies</span>
                        </Link>
                        <Link to="/series" className={cx('item-user')}>
                            <span>Series</span>
                        </Link>
                        <span className={cx('item-user')}>My List</span>
                    </>
                )}
            </div>
            <div className={cx('right')}>
                {user ? (
                    <>
                        <span className={cx('search-icon')}>
                            {!show && (
                                <Tippy content="Click to search for favorite content">
                                    <span onClick={handleToggleSearch} ref={searchRef}>
                                        <AiOutlineSearch />
                                    </span>
                                </Tippy>
                            )}
                            {show && <Search />}
                        </span>

                        <AiOutlineBell className={cx('icon-noti')} />
                        <TippyHeadless
                            interactive
                            placement="bottom-start"
                            render={(attrs) => (
                                <BoxShadow>
                                    <div className={cx('options')} tabIndex="-1" {...attrs}>
                                        <span>Account</span>
                                        <span>Helper center</span>
                                        <span>Settings</span>
                                        <span onClick={() => dispatch(logout())}>Log out</span>
                                    </div>
                                </BoxShadow>
                            )}
                        >
                            <img src={user.profilePicture} className={cx('avatar')} alt={user.userName} />
                        </TippyHeadless>
                    </>
                ) : (
                    <>
                        <div className={cx('wrapper-language')}>
                            <AiOutlineGlobal className={cx('icon-global')} />
                            <select
                                name="language-select"
                                className={cx('language-select')}
                                onChange={handleChangeLanguage}
                            >
                                <option value="en">English</option>
                                <option value="vn">Tiếng Việt</option>
                            </select>
                            <AiFillCaretDown className={cx('icon-dropdow')} />
                        </div>
                        <Button primary small to={config.routes.login} font="Netflix Sans" className={cx('custom-btn')}>
                            {dataLanguage[language].header.btnLogin}
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;
