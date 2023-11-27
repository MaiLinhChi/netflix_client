import { useState, useRef, useContext } from 'react';
import classNames from 'classnames/bind';
import { AiOutlineRight, AiOutlinePlus } from 'react-icons/ai';

import style from './Register.module.scss';
import Input from '@/components/Input';
import Button from '@/components/Button';
import images from '@/assets/images';
import videos from '@/assets/videos';
import { dataLanguage, LanguageContext } from '@/components/MultipleLanguage';
import { register } from '@/authContext/apiCalls';
import { AuthContext } from '@/authContext/AuthContext';
import { LoadingContext } from '@/contexts/LoadingContext';

const cx = classNames.bind(style);

const Register = () => {
    const [email, setEmail] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const { language } = useContext(LanguageContext);
    const { dispatch } = useContext(AuthContext);
    const { setLoading } = useContext(LoadingContext);

    const emailRef = useRef();
    const nameRef = useRef();
    const passwordRef = useRef();

    // Register
    const handleStart = () => {
        setEmail(emailRef.current.value);
    };

    const handleFinish = async (e) => {
        e.preventDefault();
        const name = nameRef.current.value;
        const password = passwordRef.current.value;
        register({ name, email, password }, dispatch, setLoading);
    };

    // Drop menu
    const handleClick = (index) => {
        if (index === isOpen) {
            return setIsOpen(false);
        }
        setIsOpen(index);
    };

    return (
        <div className={cx('register')}>
            <div className={cx('banner')}>
                <div className={cx('wrapper-image')}>
                    <img src={images.backgroundBanner} alt="background-header" />
                    <div className={cx('gradient')}></div>
                </div>
                <div className={cx('wrapper-text')}>
                    <h1 className={cx('title')}>{dataLanguage[language].header.title}</h1>
                    <h2 className={cx('subtitle')}>{dataLanguage[language].header.subtitle}</h2>
                    <p className={cx('form-title')}>{dataLanguage[language].header.formText}</p>
                    {!email ? (
                        <div className={cx('wrapper-form1')}>
                            <Input
                                type="email"
                                label={dataLanguage[language].header.placeholderEmail}
                                placeholder=" "
                                ref={emailRef}
                                large
                                onKeyUp={(e) => {
                                    if (e.keyCode === 13) {
                                        handleStart();
                                    }
                                }}
                            />
                            <Button
                                primary
                                large
                                rightIcon={<AiOutlineRight />}
                                onClick={handleStart}
                                className={cx('custom-btn')}
                            >
                                {dataLanguage[language].header.btnRegister}
                            </Button>
                        </div>
                    ) : (
                        <form className={cx('wrapper-form2')}>
                            <Input
                                label={dataLanguage[language].header.placeholderName}
                                placeholder=" "
                                ref={nameRef}
                                className={cx('custom-input')}
                                gray
                            />
                            <Input
                                type="password"
                                label={dataLanguage[language].header.placeholderPassword}
                                placeholder=" "
                                ref={passwordRef}
                                className={cx('custom-input')}
                                gray
                            />
                            <Button primary onClick={handleFinish}>
                                {dataLanguage[language].header.btnStart}
                            </Button>
                        </form>
                    )}
                </div>
            </div>
            <div className={cx('container')}>
                <div className={cx('wrapper-content')}>
                    <div className={cx('left')}>
                        <h1 className={cx('title')}>{dataLanguage[language].body[0].title}</h1>
                        <h2 className={cx('subtitle')}>{dataLanguage[language].body[0].subtitle}</h2>
                    </div>
                    <div className={cx('right', 'video-intro')}>
                        <img src={images.tivi} alt="banner" />
                        <div className={cx('wrapper-video')}>
                            <video autoPlay={true} playsInline="" muted loop>
                                <source src={videos.introduce} />
                            </video>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('container')}>
                <div className={cx('wrapper-content', 'reverse')}>
                    <div className={cx('left')}>
                        <h1 className={cx('title')}>{dataLanguage[language].body[1].title}</h1>
                        <h2 className={cx('subtitle')}>{dataLanguage[language].body[1].subtitle}</h2>
                    </div>
                    <div className={cx('right')}>
                        <img className={cx('image')} alt="mobile" src={images.mobile} />
                        <div className={cx('info')}>
                            <img className={cx('poster')} alt="Poster Stranger" src={images.strangerPoster} />
                            <div className={cx('wrapper-text')}>
                                <div className={cx('name')}>{dataLanguage[language].body[1].titleAnimation}</div>
                                <div className={cx('download-text')}>
                                    {dataLanguage[language].body[1].subtitleAnimation}
                                </div>
                            </div>
                            <img src={images.animation} alt="animation" className={cx('image-animation')} />
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx('container')}>
                <div className={cx('wrapper-content')}>
                    <div className={cx('left')}>
                        <h1 className={cx('title')}>{dataLanguage[language].body[2].title}</h1>
                        <h2 className={cx('subtitle')}>{dataLanguage[language].body[1].subtitle}</h2>
                    </div>
                </div>
            </div>

            <div className={cx('container')}>
                <div className={cx('wrapper-content', 'reverse')}>
                    <div className={cx('left')}>
                        <h1 className={cx('title')}>{dataLanguage[language].body[3].title}</h1>
                        <h2 className={cx('subtitle')}>{dataLanguage[language].body[3].subtitle}</h2>
                    </div>
                    <div className={cx('right')}>
                        <img src={images.kid} alt="kid" className={cx('image')} />
                    </div>
                </div>
            </div>

            <div className={cx('container')}>
                <div className={cx('wrapper-content')}>
                    <div className={cx('left')}>
                        <h1 className={cx('title')}>{dataLanguage[language].body[4].title}</h1>
                        <h2 className={cx('subtitle')}>{dataLanguage[language].body[4].subtitle}</h2>
                        <a href="https://play.google.com/store/apps/details?id=com.netflix.mediaclient">
                            {dataLanguage[language].body[4].btn}
                            <AiOutlineRight />
                        </a>
                    </div>
                    <div className={cx('right')}>
                        <img src={images.phoneApp} className={cx('image')} alt="phone app" />
                    </div>
                </div>
            </div>

            <div className={cx('container')}>
                <div className={cx('wrapper-question')}>
                    <h1 className={cx('title-faq')}>{dataLanguage[language].dataFaq.title}</h1>
                    <ul className={cx('faq-list')}>
                        {dataLanguage[language].dataFaq.data.map((item, index) => (
                            <li
                                className={cx('faq-item', {
                                    open: isOpen === index,
                                })}
                                key={index}
                            >
                                <button className={cx('faq-question')} onClick={() => handleClick(index)}>
                                    {item.question}
                                    <AiOutlinePlus className={cx('icon-faq')} />
                                </button>
                                <div className={cx('faq-answer')}>
                                    <p>{item.answer}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Register;
