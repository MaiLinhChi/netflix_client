import classNames from 'classnames/bind';

import Footer from '../components/Footer';
import style from './NotHeaderLayout.module.scss';

const cx = classNames.bind(style);

const LoginLayout = ({ children }) => {
    return (
        <div className={cx('wrapper')}>
            {children}
            <Footer />
        </div>
    );
};

export default LoginLayout;
