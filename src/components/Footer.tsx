import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Footer = () => {
    interface Settings {
        id: number;
        title: string;
        logo: string;
        favicon: string;
        // Add other properties as needed
    }
    
    const [settings, setSettings] = useState<Settings>({
        id: 0,
        title: "",
        logo: "",
        favicon: ""
    });

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/settings/`)
            .then((response) => response.json())
            .then((data) => {
                setSettings(data);
                console.log(data)
            })
    }, []);

    return (
        <footer className="footer">
            <div className="page-up">
                <a href="#" id="scrollToTopButton"><FontAwesomeIcon icon={faChevronUp} width={25}/></a>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="footer__logo">
                            <Link to="/"><img src={settings.logo} width={50} alt="Logo"/></Link>
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
