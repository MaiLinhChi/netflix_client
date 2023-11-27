import classNames from 'classnames/bind';

import style from './BoxShadow.module.scss';

const cx = classNames.bind(style);

const BoxShadow = ({ children }) => {
    return <div className={cx('box-shadow')}>{children}</div>;
};

export default BoxShadow;
