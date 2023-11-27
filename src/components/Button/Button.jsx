import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import style from './Button.module.scss';

const cx = classNames.bind(style);

const Button = ({
    primary = false,
    white = false,
    gray = false,
    small = false,
    large = false,
    radius = false,
    to,
    href,
    onClick,
    leftIcon,
    rightIcon,
    className,
    children,
    ...passProps
}) => {
    let Component = 'button';

    const props = {
        onClick,
        ...passProps,
    };

    const classes = cx('wrapper', {
        [className]: className,
        primary,
        white,
        gray,
        small,
        large,
        radius,
    });

    if (to) {
        Component = Link;
        props.to = to;
    } else if (href) {
        Component = 'a';
        props.href = href;
    }

    return (
        <Component className={classes} {...props}>
            {leftIcon && <span className={cx('left-icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('right-icon')}>{rightIcon}</span>}
        </Component>
    );
};

Button.propTypes = {
    to: PropTypes.string,
};

export default Button;
