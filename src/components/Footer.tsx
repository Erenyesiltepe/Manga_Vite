import logo from "./images/logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

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
                            <a href="./index.html"><img src={logo} alt="Logo"/></a>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="footer__nav">
                            <ul>
                                <li className="active"><a href="./index.html">Homepage</a></li>
                                <li><a href="./categories.html">Categories</a></li>
                                <li><a href="./blog.html">Our Blog</a></li>
                                <li><a href="#">Contacts</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
