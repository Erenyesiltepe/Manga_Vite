import logo from './images/logo.png'; // Adjust the path accordingly
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';

type Category = { id: number; name: string };
type CategoriesProps = {
    categories: Category[];
};

const Header: React.FC<CategoriesProps> = ({ categories }) => {
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
                                        <a href="./categories.html">
                                            Categories <span className="arrow_carrot-down"></span>
                                        </a>
                                        <ul className="dropdown">
                                            {categories.map((category) => (
                                                <li key={category.id}>
                                                    <a href={`./category/${category.id}`}>{category.name}</a>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#">Contacts</a>
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
