import { useState, useEffect, useContext } from 'react';
import classNames from 'classnames/bind';

import style from './Home.module.scss';
import Banner from '@/components/Banner';
import MovieList from '@/components/MovieList';
import * as listService from '@/services/lists';
import { LoadingContext } from '@/contexts/loading/LoadingContext';

const cx = classNames.bind(style);

const Home = ({ type }) => {
    const [lists, setLists] = useState([]);
    const [genre, setGenre] = useState(null);
    const { setLoading } = useContext(LoadingContext);
    useEffect(() => {
        const getRandomLists = async () => {
            try {
                setLoading(true);
                const res = await listService.getLists(type, genre);
                setLists(res);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        getRandomLists();
    }, [type, genre, setLoading]);

    return (
        <div className={cx('home')}>
            <Banner type={type} setGenre={setGenre} />
            <div className={cx('wrapper-lists')}>
                {lists.length && lists.map((list, index) => <MovieList infoList={list} key={index} />)}
            </div>
        </div>
    );
};

export default Home;
