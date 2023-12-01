import style from './Separate.module.scss';

const Separate = ({ width = 1, height = 1, color = '#a3a3a3' }) => {
    return <div className={style.separate} style={{ width: width, height: height, color: color }}></div>;
};

export default Separate;
