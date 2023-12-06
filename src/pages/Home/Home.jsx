import { useState, useEffect, useContext } from 'react';
import classNames from 'classnames/bind';

import style from './Home.module.scss';
import Banner from '@/components/Banner';
import MovieList from '@/components/MovieList';
import * as listService from '@/services/lists';
import * as movieService from '@/services/movies';
import { LoadingContext } from '@/contexts/loading/LoadingContext';

const cx = classNames.bind(style);

const Home = ({ type }) => {
    const [lists, setLists] = useState([]);
    const [movieRandom, setMovieRandom] = useState([]);
    const [genre, setGenre] = useState(null);
    const { setLoading } = useContext(LoadingContext);
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const listResponse = await listService.getLists(type, genre);
                const movieResponse = await movieService.getRandom(type);
                setLists(listResponse);
                setMovieRandom(movieResponse);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        })();
    }, [type, genre, setLoading]);

    return (
        <div className={cx('home')}>
            <Banner type={type} setGenre={setGenre} movie={movieRandom} />
            <div className={cx('wrapper-lists')}>
                {lists.length && lists.map((list, index) => <MovieList infoList={list} key={index} />)}
            </div>
        </div>
    );
};

export default Home;
