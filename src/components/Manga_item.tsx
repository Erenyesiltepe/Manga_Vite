import React from 'react';
//import 'src/css/style.css';

interface ProductItemProps {
    imageUrl: string;
    episode: number;
    commentCount: number;
    viewCount: number;
    status: string;
    category: string;
    title: string;
}

const ProductItem: React.FC<ProductItemProps> = ({ imageUrl, episode, category, title }) => {
    return (
        <div className="col-lg-4 col-md-6 col-sm-6">
            <div className="product__item">
                <div className="product__item__pic set-bg" data-setbg={imageUrl}>
                    <div className="ep">{episode} / {episode}</div>
                    {/* <div className="comment"><i className="fa fa-comments"></i> {commentCount}</div> */}
                    {/* <div className="view"><i className="fa fa-eye"></i> {viewCount}</div> */}
                </div>
                <div className="product__item__text">
                    <ul>
                        {/* <li>{status}</li> */}
                        <li>{category}</li>
                    </ul>
                    <h5><a href="#">{title}</a></h5>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;