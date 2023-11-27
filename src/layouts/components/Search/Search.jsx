import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineSearch, AiOutlineLoading3Quarters, AiOutlineCloseCircle, AiFillCaretRight } from 'react-icons/ai';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import style from './Search.module.scss';
import * as movieService from '@/services/movies';
import useDebounce from '@/hooks/useDebounce';
import BoxShadow from '@/components/BoxShadow';
import config from '@/config';

const cx = classNames.bind(style);

const Search = () => {
    const [valueSearch, setValueSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [listMovie, setListMovie] = useState([]);
    const inputRef = useRef();
    const clearRef = useRef();

    const debounceValue = useDebounce(valueSearch, 800);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    useEffect(() => {
        if (debounceValue === '') {
            setListMovie([]);
            return;
        }
        const getMovieByTitle = async () => {
            setLoading(true);
            const res = await movieService.getByTitle(debounceValue);
            setListMovie(res);
            setLoading(false);
        };

        getMovieByTitle();
    }, [debounceValue]);

    const handlePropagation = (e) => {
        e.stopPropagation();
    };

    const handleChange = (e) => {
        if (e.target.value[0] !== ' ') {
            setValueSearch(e.target.value);
        }
    };

    const handleClear = () => {
        setValueSearch('');
        setListMovie([]);
        inputRef.current.focus();
    };

    return (
        <div className="wrapper">
            <Tippy
                interactive
                visible={listMovie.length}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <BoxShadow>
                            <ul className={cx('result-list')}>
                                {listMovie.map((item, index) => (
                                    <li className={cx('result-item')} key={index}>
                                        <Link to={config.routes.watch} className={cx('link')} state={item}>
                                            <img src={item.imageSmall} className={cx('image-movie')} alt={item.title} />
                                            <h3 className={cx('title')}>{item.title}</h3>
                                            <div className={cx('icon')}>
                                                <AiFillCaretRight />
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </BoxShadow>
                    </div>
                )}
            >
                <div className={cx('search')}>
                    <input
                        className={cx('input')}
                        type="text"
                        ref={inputRef}
                        onClick={handlePropagation}
                        placeholder="Enter name movie..."
                        value={valueSearch}
                        onChange={handleChange}
                    />
                    {loading && <AiOutlineLoading3Quarters className={cx('loading')} />}
                    {valueSearch && !loading && (
                        <button
                            className={cx('btn-close')}
                            ref={clearRef}
                            onClick={(e) => {
                                handlePropagation(e);
                                handleClear();
                            }}
                        >
                            <AiOutlineCloseCircle />
                        </button>
                    )}
                    <button className={cx('btn-search')}>
                        <AiOutlineSearch />
                    </button>
                </div>
            </Tippy>
        </div>
    );
};

export default Search;
