import logo from './images/logo.png'; // Adjust the path accordingly
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Header: React.FC = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/mangas/categories/`)
            .then((response) => response.json())
            .then((data) => {
                setCategories(data.results);
            })
    }, []);

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
