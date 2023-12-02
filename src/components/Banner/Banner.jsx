import { useState, useEffect, useContext } from 'react';
import classNames from 'classnames/bind';
import { AiFillCaretRight, AiOutlineInfoCircle } from 'react-icons/ai';

import style from './Banner.module.scss';
import Button from '../Button';
import * as movieService from '@/services/movies';
import Separate from '../Separate';
import { LoadingContext } from '@/contexts/loading/LoadingContext';

const cx = classNames.bind(style);

const Banner = ({ type, setGenre }) => {
    const [movie, setMovie] = useState({});
    const { setLoading } = useContext(LoadingContext);
    useEffect(() => {
        const getRandomContent = async () => {
            try {
                setLoading(true);
                const res = await movieService.getRandom(type);
                setMovie(res);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        getRandomContent();
    }, [type, setLoading]);

    return (
        <div className={cx('banner')}>
            <div className={cx('wrapper-image')}>
                {movie.image && (
                    <div
                        className={cx('image-background')}
                        style={{ backgroundImage: `url(${movie.image})` }}
                        alt={movie.title}
                    ></div>
                )}
                <div className={cx('gradient')}></div>
            </div>
            <div className={cx('info')}>
                <img src={movie.imageTitle} alt={movie.title} className={cx('image-title')} />
                <h1 className={cx('title')}>{movie.title}</h1>
                <div className={cx('more-detail')}>
                    <span className={cx('wrapper-year')}>
                        <span className={cx('one-side')}>{movie.year}</span>
                        <Separate height={14} width={1} />
                    </span>
                    <span className={cx('wrapper-limit')}>
                        <span className={cx('limit', 'two-side')}>{movie.limit}+</span>
                        <Separate height={14} width={1} />
                    </span>
                    <span className={cx('wrapper-duration')}>
                        <span className={cx('duration', 'two-side')}>{movie.duration}</span>
                        <Separate height={14} width={1} />
                    </span>
                    <span className={cx('genre')}>{movie.genre && movie.genre.join(', ')}</span>
                </div>
                <span className={cx('description', 'three-line')}>{movie.description}</span>
                <span className={cx('starring')}>
                    <span>Starring: </span>
                    {movie.starring && movie.starring.join(', ')}
                </span>
                <div className={cx('wrapper-btn')}>
                    <Button white radius to="/watch" state={movie} leftIcon={<AiFillCaretRight />}>
                        Play
                    </Button>
                    <Button gray radius leftIcon={<AiOutlineInfoCircle />}>
                        Info
                    </Button>
                </div>
                {false && (
                    <div className="category">
                        <span>{type === 'movies' ? 'Movies' : 'Series'}</span>
                        <select name="genre" id="genre" onChange={(e) => setGenre(e.target.value)}>
                            <option>Genre</option>
                            <option value="adventure">Adventure</option>
                            <option value="comedy">Comedy</option>
                            <option value="crime">Crime</option>
                            <option value="fantasy">Fantasy</option>
                            <option value="historical">Historical</option>
                            <option value="horror">Horror</option>
                            <option value="romance">Romance</option>
                            <option value="sci-fi">Sci-fi</option>
                            <option value="thriller">Thriller</option>
                            <option value="western">Western</option>
                            <option value="animation">Animation</option>
                            <option value="drama">Drama</option>
                            <option value="documentary">Documentary</option>
                        </select>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Banner;
