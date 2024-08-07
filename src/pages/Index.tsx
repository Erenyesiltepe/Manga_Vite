import { useEffect, useState } from 'react';
import BCarousel from '../components/BCarousel';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ProductSpad from '../components/Product_spad';

interface Props {
    // Define your component's props here
}

type Slide = {
    id: number;
    title: string;
    thumbnail: string;
    description: string;
    category: string | number;
};

type Category = { id: number; name: string };

function getCategories(): Promise<Category[]> {
    const headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)"
    };

    return fetch(`${import.meta.env.VITE_API_URL}/api/mangas/categories/`, {
        method: "GET",
        headers: headersList
    }).then(async response => {
        const resp = await response.json();
        return resp.results;
    });
}

function getSlides(): Promise<Slide[]> {
    const headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)"
    };

    return fetch(`${import.meta.env.VITE_API_URL}/api/mangas/mangas/`, {
        method: "GET",
        headers: headersList
    }).then(async response => {
        return await response.json();
    });
}

const Index: React.FC<Props> = () => {
    const [slides, setSlides] = useState<Slide[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loaderEnabled, setLoaderEnabled] = useState(true);

    useEffect(() => {
        Promise.all([getCategories(), getSlides()]).then(([categoriesData, slidesData]) => {
            setCategories(categoriesData);
            setSlides(slidesData);
            setLoaderEnabled(false);
        });
    }, []);

    return (
        <div style={{ height: "100%", width: "100%", alignItems: "center", justifyContent: "center" }}>
            {loaderEnabled && (
                <div id="preloder">
                    <div className="loader"></div>
                </div>
            )}
            <Header categories={categories} />
            <BCarousel slides={slides.slice(0, 5)} />
            <ProductSpad slides={slides} heading="Trending"/>
            <Footer />
        </div>
    );
};

export default Index;
