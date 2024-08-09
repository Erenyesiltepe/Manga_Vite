import logo from './images/logo.png'; // Adjust the path accordingly
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';

import { useEffect } from 'react';
import { fetchCategories } from '../store/categoriesSlice';
import { RootState, AppDispatch } from '../store';
import { useSelector, useDispatch } from 'react-redux';

const Header: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const categories = useSelector((state: RootState) => state.categories.categories);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    return (
        <header className="header">
            <div className="container">
                <div className="row">
                    <div className="col-lg-2">
                        <div className="header__logo">
                            <Link to="/">
                                <img src={logo} alt="Logo" />
                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="header__nav">
                            <nav className="header__menu mobile-menu">
                                <ul>
                                    <li className="active">
                                        <Link to="/">HomePage</Link>
                                    </li>
                                    <li>
                                        <Link to="/categories">
                                            Categories <span className="arrow_carrot-down"></span>
                                        </Link>
                                        <ul className="dropdown">
                                            {categories.map((category) => (
                                                <li key={category.id}>
                                                    <Link to={`/categories/?category_id=${category.id}`}>{category.name}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                    <li>
                                        <Link to="/contacts">Contacts</Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    {/* <div className="col-lg-2">
                        <div className="header__right">
                            <a href="#" className="search-switch" style={{ width: '20px', height: '20px' }}>
                                <FontAwesomeIcon icon={faSearch} />
                            </a>
                            <a href="./login.html" style={{ width: '20px', height: '20px' }}>
                                <FontAwesomeIcon icon={faUser} />
                            </a>
                        </div>
                    </div> */}
                </div>
                <div id="mobile-menu-wrap"></div>
            </div>
        </header>
    );
};

export default Header;
