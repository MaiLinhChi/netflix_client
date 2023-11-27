import { useState, useRef } from 'react';
import classNames from 'classnames/bind';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';

import style from './MovieList.module.scss';
import MovieItem from '../MovieItem';

const cx = classNames.bind(style);

const MovieList = ({ infoList }) => {
    const [numberClick, setNumberClick] = useState(0);
    const listRef = useRef();

    const title = infoList.title;
    const list = infoList.idMovies ? infoList.idMovies : infoList;
    const numberMovie = list.length;

    const handleClick = (direction) => {
        // trả về khoảng cách x so với màng hình (ở cách listRef có padding-left là 56 nên trả về 56)
        const distance = listRef.current.getBoundingClientRect().x - 56;
        const times = list.length - 6;

        if (direction === 'left' && numberClick > 0) {
            setNumberClick(numberClick - 1);
            listRef.current.style.left = `${302 + distance}px`;
        } else if (direction === 'right' && times > numberClick) {
            setNumberClick(numberClick + 1);
            listRef.current.style.left = `${-302 + distance}px`;
        }
    };

    return (
        <div className={cx('movie-list')}>
            {infoList.title && <div className={cx('title-list')}>{title}</div>}
            <div className={cx('wrapper-list')}>
                {numberClick > 0 && (
                    <div
                        className={cx('icon', 'left')}
                        onClick={() => {
                            handleClick('left');
                        }}
                    >
                        <AiFillCaretLeft />
                    </div>
                )}
                <ul className={cx('list')} ref={listRef}>
                    {list.map((item, index) => (
                        <MovieItem item={item} key={index} />
                    ))}
                </ul>
                {numberMovie - 6 > numberClick && (
                    <div
                        className={cx('icon', 'right')}
                        onClick={() => {
                            handleClick('right');
                        }}
                    >
                        <AiFillCaretRight />
                    </div>
                )}
            </div>
        </div>
    );
};

export default MovieList;
