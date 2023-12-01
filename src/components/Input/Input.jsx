import { forwardRef } from 'react';
import classNames from 'classnames/bind';

import style from './Input.module.scss';

const cx = classNames.bind(style);

const Input = (
    { label, placeholder, onChange, width, height, className, large, gray, white, borderRadius, ...passProps },
    ref,
) => {
    const classes = cx('wrapper', {
        [className]: className,
        borderRadius,
        large,
        gray,
        white,
    });
    return (
        <div className={classes}>
            <input
                style={{ borderRadius }}
                placeholder={placeholder}
                onChange={onChange}
                width={width}
                height={height}
                ref={ref}
                {...passProps}
            />
            <label>{label}</label>
        </div>
    );
};

export default forwardRef(Input);
