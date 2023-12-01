import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { AiFillCaretRight, AiOutlinePlus, AiOutlineLike, AiOutlineDislike, AiOutlineDownCircle } from 'react-icons/ai';
import { BsVolumeUpFill, BsVolumeMute } from 'react-icons/bs';

import style from './HoverVideo.module.scss';
import BoxShadow from '../BoxShadow';
import Separate from '../Separate';
import config from '@/config';

const cx = classNames.bind(style);

const HoverVideo = ({ children, movie }) => {
    const [sound, setSound] = useState(false);
    const videoRef = useRef();

    const handleSound = () => {
        setSound(!sound);
    };

    const handleShow = () => {
        videoRef.current.play();
    };

    const handleHide = () => {
        videoRef.current.load();
    };

    return (
        <Tippy
            delay={[800, 0]}
            offset={[0, -270]}
            interactive
            onShow={handleShow}
            onHide={handleHide}
            render={(attrs) => (
                <div className={cx('wrapper')} tabIndex="-1" {...attrs}>
                    <BoxShadow>
                        <div className={cx('wrapper-video')}>
                            <video src={movie.trailer} muted={!sound} ref={videoRef}></video>
                            <div className={cx('icon-mute')} onClick={handleSound}>
                                {sound ? <BsVolumeUpFill /> : <BsVolumeMute />}
                            </div>
                        </div>
                        <div className={cx('wrapper-info')}>
                            <div className={cx('wrapper-icon')}>
                                <div className={cx('left')}>
                                    <Link to={config.routes.watch} state={movie}>
                                        <AiFillCaretRight className={cx('icon')} />
                                    </Link>
                                    <AiOutlinePlus className={cx('icon')} />
                                    <AiOutlineLike className={cx('icon')} />
                                    <AiOutlineDislike className={cx('icon')} />
                                </div>
                                <div className={cx('right')}>
                                    <AiOutlineDownCircle />
                                </div>
                            </div>
                            <h1 className={cx('title')}>{movie.title}</h1>
                            <div className={cx('detail')}>
                                <span className={cx('wrapper-year')}>
                                    <span className={cx('one-side')}>{movie.year}</span>
                                    <Separate height={14} width={1} />
                                </span>
                                <span className={cx('wrapper-limit')}>
                                    <span className={cx('two-side')}>{movie.limit}+</span>
                                    <Separate height={14} width={1} />
                                </span>
                                <span className={cx('wrapper-duration')}>
                                    <span className={cx('two-side')}>{movie.duration}</span>
                                    <Separate height={14} width={1} />
                                </span>
                                <span className={cx('wrapper-country')}>
                                    <span className={cx('country')}>{movie.country}</span>
                                </span>
                            </div>
                            <span className={cx('genre')}>{movie.genre && movie.genre.join(', ')}</span>
                        </div>
                    </BoxShadow>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
};

export default HoverVideo;
