import { useContext } from 'react';
import classNames from 'classnames/bind';

import style from './Footer.module.scss';
import { LanguageContext, dataLanguage } from '@/components/MultipleLanguage';

const cx = classNames.bind(style);

const Footer = () => {
    const { language } = useContext(LanguageContext);

    return (
        <footer className={cx('wrapper')}>
            <a href="https://help.netflix.com/contactus" className={cx('questions')}>
                {dataLanguage[language].footer.title}
            </a>
            <div className={cx('wrapper-list')}>
                <ul className={cx('footer-list')}>
                    {dataLanguage[language].footer.column1.map((item, index) => (
                        <li className={cx('footer-item')} key={index}>
                            <a href={item.link} className={cx('link')}>
                                {item.title}
                            </a>
                        </li>
                    ))}
                </ul>
                <ul className={cx('footer-list')}>
                    {dataLanguage[language].footer.column2.map((item, index) => (
                        <li className={cx('footer-item')} key={index}>
                            <a href={item.link} className={cx('link')}>
                                {item.title}
                            </a>
                        </li>
                    ))}
                </ul>
                <ul className={cx('footer-list')}>
                    {dataLanguage[language].footer.column3.map((item, index) => (
                        <li className={cx('footer-item')} key={index}>
                            <a href={item.link} className={cx('link')}>
                                {item.title}
                            </a>
                        </li>
                    ))}
                </ul>
                <ul className={cx('footer-list')}>
                    {dataLanguage[language].footer.column4.map((item, index) => (
                        <li className={cx('footer-item')} key={index}>
                            <a href={item.link} className={cx('link')}>
                                {item.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <span className={cx('text')}>Netflix VietNam</span>
        </footer>
    );
};

export default Footer;
