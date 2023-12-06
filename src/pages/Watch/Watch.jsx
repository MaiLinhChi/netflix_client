import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { BsChatLeftText, BsFillShareFill } from 'react-icons/bs';
import moment from 'moment';

import style from './Watch.module.scss';
import Separate from '@/components/Separate';
import MovieList from '@/components/MovieList';
import * as movieService from '@/services/movies';
import * as commentService from '@/services/comments';
import { LoadingContext } from '@/contexts/loading/LoadingContext';
import { AuthContext } from '@/contexts/auth/AuthContext';
import { useParams } from 'react-router-dom';
import Button from '@/components/Button';

const cx = classNames.bind(style);

const Watch = () => {
    const [suggesteds, setSuggesteds] = useState([]);
    const [comments, setComments] = useState([]);
    const [commentString, setCommentString] = useState([]);
    const [movie, setMovie] = useState({});
    const refComment = useRef();
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const { setLoading } = useContext(LoadingContext);

    const getCommentOfMovie = useCallback(async () => {
        const commentsRes = await commentService.getCommentOfMovie({ movieId: id });
        setComments(commentsRes);
    }, [id]);

    const PostComment = async () => {
        try {
            const comment = refComment.current.value.trim();
            if (!comment) return;
            setCommentString(comment);
            // post comment
            setLoading(true);
            await commentService.storeComment({
                comment,
                userId: user._id,
                movieId: movie._id,
            });
            await getCommentOfMovie();
            setCommentString('');
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const movieById = await movieService.getById(id);
                const type = movieById.type;
                const genre = movieById.genre?.toString();
                const movieSuggest = await movieService.getSuggest(type, genre, id);
                await getCommentOfMovie();
                setMovie(movieById);
                setSuggesteds(movieSuggest);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        })();
    }, [setLoading, id, getCommentOfMovie]);

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
                        <span>{movie?.starring?.join(', ')}</span>
                    </div>
                    <div className={cx('genre')}>
                        <label>Genre: </label>
                        <span>{movie?.genre?.join(', ')}</span>
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
                    <img src={user.profilePicture} alt="" className={cx('img')} />
                    <textarea
                        type="text"
                        placeholder="Add comment..."
                        ref={refComment}
                        value={commentString}
                        onChange={(e) => setCommentString(e.target.value)}
                    />
                    <Button radius small white onClick={PostComment}>
                        Post
                    </Button>
                </div>
                <ul className={cx('comment-list')}>
                    {comments.map((item, index) => (
                        <li className={cx('comment-item')} key={index}>
                            <img src={item.userId.profilePicture} alt="avatar" className={cx('img')} />
                            <div className={cx('user')}>
                                <h4>{item.userId.name}</h4>
                                <p style={{ marginTop: 6 }}>{item.comment}</p>
                            </div>
                            <div className={cx('time')}>
                                <span>{moment(item.createdAt).format('dddd, MMMM Do YYYY, h:mm:ss a').toString()}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Watch;
