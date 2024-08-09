import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSlides } from '../store/slidesSlice';
import { RootState, AppDispatch } from '../store';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Category: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    //const [slides,setSlide] =useState(useSelector((state: RootState) => state.slides.slideWrap.slides));
    const slides = useSelector((state: RootState) => state.slides.slideWrap.slides)
    const count = useSelector((state: RootState) => state.slides.slideWrap.count);
    const loading = useSelector((state: RootState) => state.slides.loading || state.categories.loading);
    
    const [categoryName, setCategoryName] = useState<string | undefined>();
    const [pageCount, setPageCount] = useState<number>(1);

    const [searchParams] = useSearchParams();
    const categoryId = searchParams.get('category_id');
    const currentPage = parseInt(searchParams.get('current_page') ?? '1');

    const pageSize = 12;

    // const sortSlides = (slides: Slide[], sortOrder: number) => {
    //     const newSlides= slides.sort((a, b) => {
    //         const titleA = a.title.toLowerCase();
    //         const titleB = b.title.toLowerCase();
    //         if (sortOrder === 1) {
    //             return titleA.localeCompare(titleB); // Ascending
    //         } else {
    //             return titleB.localeCompare(titleA); // Descending
    //         }
    //     });
    //     setSlide([...newSlides])
    // };


    // const [selectedOption, setSelectedOption] = useState(1);

    // // Handler function to update the selected option
    // const handleChange = (event:any) => {
    //     const value = parseInt(event.target.value);
    //     setSelectedOption(value);
    //     sortSlides(slides, value);
    // };
    useEffect(() => {
        // Fetch slides based on categoryId and currentPage
        if(categoryId){
            dispatch(fetchSlides({ categoryId, pageSize, page: currentPage }))
            console.log(categoryId)
        }
        else{
            dispatch(fetchSlides({ pageSize, page: currentPage }))
        }    
            
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
    }, [categoryId, currentPage, dispatch]);

    useEffect(() => {
        // Update page count based on the count of slides
        setPageCount(Math.ceil(count / pageSize));
    }, [count]);

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
                                                        <a href="#">{slide.title}</a>
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
