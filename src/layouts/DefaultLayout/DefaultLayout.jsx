import classNames from 'classnames/bind';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import style from './DefaultLayout.module.scss';

const cx = classNames.bind(style);

const DefaultLayout = ({ children }) => {
    return (
        <div className={cx('wrapper')}>
            <Navbar />
            <div className={cx('container')}>{children}</div>
            <Footer />
        </div>
    );
};

export default DefaultLayout;
