import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BCarousel from '../components/BCarousel';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ProductSpad from '../components/Product_spad';
import { fetchSlides } from '../store/slidesSlice';
import { RootState, AppDispatch } from '../store';

const Index: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const slides = useSelector((state: RootState) => state.slides.slideWrap.slides);
    const loading = useSelector((state: RootState) => state.slides.loading || state.categories.loading);

    useEffect(() => {
        dispatch(fetchSlides({}));
    }, [dispatch]);

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
