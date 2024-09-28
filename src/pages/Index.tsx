import { useEffect, useState } from 'react';
import BCarousel from '../components/BCarousel';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ProductSpad from '../components/Product_spad';

const Index: React.FC = () => {
    const [slides, setSlides] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {   
        const url = `${import.meta.env.VITE_API_URL}/api/mangas/mangas/?limit=10`;
        fetch(url, {method: 'GET'})
            .then((response) => response.json())
            .then((data) => {          
                setSlides(data.results);
                setLoading(false);
            });
        
    }, []);

    return (
        <div style={{ height: "100%", width: "100%", alignItems: "center", justifyContent: "center" }}>
            {loading && (
                <div id="preloder">
                    <div className="loader"></div>
                </div>
            )}
            <Header/>
            <BCarousel slides={slides.slice(0, 5)} />
            <ProductSpad slides={slides} heading="Trending"/>
            <Footer />
        </div>
    );
};

export default Index;
