import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import { BsChatLeftText, BsFillShareFill } from 'react-icons/bs';

import style from './Watch.module.scss';
import Separate from '@/components/Separate';
import MovieList from '@/components/MovieList';
import * as movieService from '@/services/movies';
import { LoadingContext } from '@/contexts/loading/LoadingContext';

const cx = classNames.bind(style);

const Watch = () => {
    const [suggesteds, setSuggesteds] = useState([]);
    const location = useLocation();
    const movie = location.state;
    const { setLoading } = useContext(LoadingContext);
    useEffect(() => {
        try {
            const getMovieSuggesteds = async () => {
                setLoading(true);
                const type = movie.type;
                const genre = movie.genre.toString();
                const id = movie._id;

                const res = await movieService.getSuggest(type, genre, id);
                setSuggesteds(res);
                setLoading(false);
            };
            getMovieSuggesteds();
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }, [movie, setLoading]);

    return (
        <div className={cx('watch')}>
            <div className={cx('wrapper-video')}>
                <iframe src={movie.video} frameBorder="0" title={movie.title}></iframe>
            </div>
            <div className={cx('wrapper-info')}>
                <div className={cx('left')}>
                    <img className={cx('image-title')} src={movie.imageTitle} alt="img title" />
                    <h1 className={cx('title')}>{movie.title}</h1>
                    <div className={cx('detail')}>
                        <span className={cx('wrapper-year')}>
                            <span className={cx('year', 'one-side')}>{movie.year}</span>
                            <Separate height={14} width={1} />
                        </span>
                        <span className={cx('wrapper-limit')}>
                            <span className={cx('limit', 'two-side')}>{movie.limit}+</span>
                            <Separate height={14} width={1} />
                        </span>
                        <span className={cx('duration')}>{movie.duration}</span>
                    </div>
                    <p className={cx('description', 'three-line')}>{movie.description}</p>
                </div>
                <div className={cx('right')}>
                    <div className={cx('action-icon')}>
                        <div className={cx('comment-icon')}>
                            <BsChatLeftText />
                            Comment
                        </div>
                        <div className={cx('share-icon')}>
                            <BsFillShareFill />
                            Share
                        </div>
                    </div>
                    <div className={cx('actor')}>
                        <label>Actor: </label>
                        <span>{movie.starring.join(', ')}</span>
                    </div>
                    <div className={cx('genre')}>
                        <label>Genre: </label>
                        <span>{movie.genre.join(', ')}</span>
                    </div>
                </div>
            </div>
            <div className={cx('wrapper-suggesteds')}>
                <h1>Suggest for you</h1>
                {suggesteds.length && <MovieList infoList={suggesteds} />}
            </div>
            <div className={cx('wrapper-comment')}>
                <h4 className={cx('label')}>Comment</h4>
                <div className={cx('wrapper-input')}>
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToSSs5QsGJBJVdoqltB52gdyPjaDao3xDmwA&usqp=CAU"
                        alt=""
                        className={cx('img')}
                    />
                    <textarea type="text" placeholder="Add comment..." />
                </div>
                <ul className={cx('comment-list')}>
                    <li className={cx('comment-item')}>
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToSSs5QsGJBJVdoqltB52gdyPjaDao3xDmwA&usqp=CAU"
                            alt="linhchi"
                            className={cx('img')}
                        />
                        <div className={cx('user')}>
                            <h4>Linh Chi</h4>
                            <p>Good movie</p>
                        </div>
                        <div className={cx('time')}>
                            <span>monday</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Watch;
