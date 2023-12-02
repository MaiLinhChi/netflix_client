import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { AiFillCaretRight } from 'react-icons/ai';

import style from './MovieItem.module.scss';
import * as movieService from '@/services/movies';
import HoverVideo from '../HoverVideo';
import config from '@/config';
import Separate from '../Separate';
import { LoadingContext } from '@/contexts/loading/LoadingContext';

const cx = classNames.bind(style);

const MovieItem = ({ item }) => {
    const [movie, setMovie] = useState({});
    const { setLoading } = useContext(LoadingContext);
    useEffect(() => {
        if (typeof item === 'object') {
            setMovie(item);
            return;
        }
        const getMovie = async () => {
            try {
                setLoading(true);
                const res = await movieService.getById(item);
                setMovie(res);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        getMovie();
    }, [item, setLoading]);

    return (
        <li className={cx('movie-item')}>
            {typeof item === 'object' ? (
                <>
                    <Link to={config.routes.watch} state={movie} className={cx('link-movie')}>
                        <img src={movie.imageSmall} alt={movie.title} className={cx('image')} />
                        <div className={cx('play-icon')}>
                            <AiFillCaretRight />
                        </div>
                    </Link>
                    <h3 className={cx('title')}>{movie.title}</h3>
                    <div className={cx('detail')}>
                        <span className={cx('wrapper-country')}>
                            <span className={cx('country', 'one-side')}>{movie.country}</span>
                            <Separate width={1} height={14} />
                        </span>
                        <span className={cx('wrapper-duration')}>
                            <span className={cx('duration')}>{movie.duration}</span>
                        </span>
                    </div>
                    <p className={cx('description', 'three-line')}>{movie.description}</p>
                </>
            ) : (
                <HoverVideo movie={movie}>
                    <Link to={config.routes.watch} state={movie} className={cx('link-movie')}>
                        <img src={movie.imageSmall} alt={movie.title} className={cx('image')} />
                    </Link>
                </HoverVideo>
            )}
        </li>
    );
};

export default MovieItem;
