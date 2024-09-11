import React from 'react';
import { Link } from 'react-router-dom';

type Slide = {
    id: number;
    title: string;
    thumbnail: string;
    description: string;
    category: number;
    category_name: string;
};

type HeroCarouselProps = {
    slides: Slide[];
    heading: string;
};

const ProductSpad: React.FC<HeroCarouselProps> = ({ slides, heading }) => {
    return (
        <section className="product spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="trending__product">
                            <div className="row">
                                <div className="col-lg-8 col-md-8 col-sm-8">
                                    <div className="section-title">
                                        <h4>{heading}</h4>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4">
                                    <div className="btn__all">
                                        <a href="#" className="primary-btn">
                                            View All <span className="arrow_right"></span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                {slides.map((slide) => {
                                    return (
                                        <div className="col-lg-4 col-md-6 col-sm-6" key={slide.id}>
                                            <div className="product__item">
                                                <img
                                                    className="product__item__pic set-bg"
                                                    src={slide.thumbnail}
                                                    alt={slide.title}
                                                />
                                                <div className="product__item__text">
                                                    <ul>
                                                        <li>{slide.category}</li>
                                                    </ul>
                                                    <h5>
                                                    <Link to={`/mangaDetails/?manga=${slide.id}&category=${slide.category_name}`}>{slide.title}</Link>
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductSpad;
