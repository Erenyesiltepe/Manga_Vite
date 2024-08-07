import React from 'react';

type Slide = {
    id: number;
    title: string;
    thumbnail: string;
    description: string;
    category: string | number;
};

type HeroCarouselProps = {
    slides: Slide[];
    heading: string;
};

const ProductSpad: React.FC<HeroCarouselProps> = ({ slides = [], heading }) => {
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
                                {Array.isArray(slides) && slides.length > 0 ? (
                                    slides.map((slide) => (
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
                                                        <a href="#">{slide.title}</a>
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No slides available</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductSpad;
