import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import logo from "../../manga_logo.jpeg"

const Footer = () => {

    return (
        <footer className="footer">
            <div className="page-up">
                <a href="#" id="scrollToTopButton"><FontAwesomeIcon icon={faChevronUp} width={25}/></a>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="footer__logo">
                            <Link to="/"><img src={logo} width={50} alt="Logo"/></Link>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="footer__nav">
                            <ul>
                                <li><Link to="/">Homepage</Link></li>
                                <li><Link to="/categories">Categories</Link></li>
                                <li><Link to="/contacts">Contacts</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
