import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface Slide {
    id: number;
    title: string;
    thumbnail: string;
    description: string;
    category: number;
    category_name: string;
}

const Category: React.FC = () => {

    const [slides,setSlides] =useState<Slide[]>([]);
    const [loading,setLoading] = useState(true);
    
    const [categoryName, setCategoryName] = useState<string | undefined>();
    const [pageCount, setPageCount] = useState<number>(1);

    const [searchParams] = useSearchParams();
    const categoryId = searchParams.get('category_id');
    const currentPage = parseInt(searchParams.get('current_page') ?? '1');

    const pageSize = 12;

    useEffect(() => {
        // Fetch slides based on categoryId and currentPage
        const parameters = new URLSearchParams();
        if (categoryId) parameters.append("category_id", categoryId);
        if (pageSize !== undefined) parameters.append("pageSize", pageSize.toString());
        if (currentPage !== undefined) parameters.append("page", currentPage.toString());
        
        const queryString = parameters.toString();
        const url = `${import.meta.env.VITE_API_URL}/api/mangas/mangas/${queryString ? '?' + queryString : ''}`;

        fetch(url, {method: 'GET'})
            .then((response) => response.json())
            .then((data) => {          
                setSlides(data.results);
                setPageCount(Math.ceil(data.count / pageSize));
                setLoading(false);
            });

            
        // Fetch category name
        if (categoryId) {
            fetch(`${import.meta.env.VITE_API_URL}/api/mangas/categories/${categoryId}/`)
                .then((response) => response.json())
                .then((data) => {          
                    setCategoryName(data.name);
                });
        }
        else{
            setCategoryName('All Categories');
        }
    }, [categoryId, currentPage]);

    return (
        <>
            {loading && (
                <div id="preloder">
                    <div className="loader"></div>
                </div>
            )}

            <Header/>

            {/* Breadcrumb Begin */}
            <div className="breadcrumb-option">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb__links">
                                <Link to="/"><FontAwesomeIcon icon={faHome} width={15}/> Home</Link>
                                <Link to="/categories">Categories</Link>
                                <span>{categoryName}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Breadcrumb End */}

            {/* Product Section Begin */}
            <section className="product-page spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="product__page__content">
                                <div className="product__page__title">
                                    <div className="row">
                                        <div className="col-lg-8 col-md-8 col-sm-6">
                                            <div className="section-title">
                                                <h4>{categoryName}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    {slides.map((slide) => (
                                        <div className="col-lg-3 col-md-6 col-sm-6" key={slide.id}>
                                            <div className="product__item">
                                                <img
                                                    className="product__item__pic set-bg"
                                                    src={slide.thumbnail}
                                                    alt={slide.title}
                                                />
                                                <div className="product__item__text">
                                                    <ul>
                                                        <li>{slide.category_name}</li> {/* Show category name if available */}
                                                    </ul>
                                                    <h5>
                                                    <Link to={`/mangaDetails/?manga=${slide.id}&category=${slide.category_name}`}>{slide.title}</Link>
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="product__pagination">
                                {Array.from({ length: pageCount }, (_, index) => (
                                    <Link
                                        to={`/categories/?current_page=${index + 1}&category_id=${categoryId}`}
                                        key={index + 1}
                                        className={index + 1 === currentPage ? 'current-page' : ''}
                                    >
                                        {index + 1}
                                    </Link>
                                ))}
                                {pageCount > currentPage && (
                                    <Link
                                        to={`/categories/?current_page=${currentPage + 1}&category_id=${categoryId}`}
                                    >
                                        &gt;
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Category;
