import { faAngleRight, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface MangaDetails {
    id: number;
    title: string;
    category: string;
    category_name: string;
    thumbnail: string;
    description: string;
}

interface MangaEpisode {
    id: number;
    chapter_number: number;
    title: string;
}

const MangaDetails = () => {
    const [searchParams] = useSearchParams();
    const manga = searchParams.get('manga');
    const navigate = useNavigate();
    
    // Redirect to categories page if no manga is selected
    useEffect(() => {
        if (!manga) {
            navigate('/categories');
        }
    }, [manga, navigate]);

    const [mangaDetails, setMangaDetails] = useState<MangaDetails | undefined>(undefined);
    const [mangaEpisodes, setMangaEpisodes] = useState<MangaEpisode[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch manga details
    useEffect(() => {
        if (manga) {
            fetch(`${import.meta.env.VITE_API_URL}/api/mangas/mangas/${manga}/`)
                .then((response) => response.json())
                .then((data) => {
                    setMangaDetails(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                    setLoading(false);
                });
        }
    }, [manga]);

    // Fetch manga episodes based on mangaDetails.id
    useEffect(() => {
        if (mangaDetails?.id) {
            setLoading(true);
            fetch(`${import.meta.env.VITE_API_URL}/api/mangas/episodes/${mangaDetails.id}`)
                .then((response) => response.json())
                .then((data) => {
                    setMangaEpisodes(data.results);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                    setLoading(false);
                });
        }
    }, [mangaDetails?.id]);

    return (
        <>
            {loading && (
                <div id="preloder">
                    <div className="loader"></div>
                </div>
            )}
            <Header />

            {/* Breadcrumb Begin */}
            <div className="breadcrumb-option">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb__links">
                                <Link to="/"><FontAwesomeIcon icon={faHome} width={15} /> Home</Link>
                                <Link to="/categories">Categories</Link>
                                {mangaDetails && (
                                    <>
                                        <Link to={`/categories/?category=${mangaDetails.category}`}>
                                            {mangaDetails.category_name}
                                        </Link>
                                        <span>{mangaDetails.title}</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Breadcrumb End */}

            {/* Manga Details Section Begin */}
            <section className="anime-details spad">
                <div className="container">
                    <div className="anime__details__content">
                        <div className="row">
                            {/* Manga Thumbnail */}
                            <div className="col-lg-3">
                                <div className="anime__details__pic" style={{ width: "100%" }}>
                                    {mangaDetails?.thumbnail && (
                                        <img
                                            className="anime__details__img"
                                            src={mangaDetails.thumbnail}
                                            alt={mangaDetails.title}
                                            style={{ objectFit: 'cover', width: '100%', height: '100%', objectPosition: 'top' }}
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Manga Info */}
                            <div className="col-lg-6">
                                <div className="anime__details__text">
                                    {mangaDetails && (
                                        <>
                                            <div className="anime__details__title">
                                                <h3>{mangaDetails.title}</h3>
                                            </div>
                                            <p>{mangaDetails.description}</p>
                                            <div className="anime__details__widget">
                                                <ul>
                                                    <li><span>Genre:</span> {mangaDetails.category_name}</li>
                                                </ul>
                                            </div>
                                            <div className="anime__details__btn">
                                                <Link to={`/mangaRead/?manga=${mangaDetails.id}`} className="watch-btn">
                                                    <span>
                                                        Read Now
                                                        <FontAwesomeIcon icon={faAngleRight} width={15} />
                                                    </span>
                                                </Link>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Manga Episodes List */}
                            <div
                                className="col-lg-3 scroll-box"
                                style={{
                                    maxHeight: '100%',
                                    overflowY: 'scroll',
                                    border: '1px solid white',
                                    borderRadius: '5px',
                                    color: 'white',
                                }}
                            >
                                {mangaEpisodes.length > 0 ? (
                                    mangaEpisodes.map((episode: MangaEpisode) => (
                                        <Link
                                            to={`/mangaRead/?manga=${mangaDetails?.id}&episode=${episode.id}`}
                                            key={episode.id}
                                            style={{
                                                color: 'white',
                                                backgroundColor: episode.id % 2 === 0 ? 'red' : 'grey',
                                                display: 'block',
                                                padding: '10px',
                                                transition: 'transform 0.2s',
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                        >
                                            Chapter {episode.chapter_number}: {episode.title}
                                        </Link>
                                    ))
                                ) : (
                                    <div className="anime__details__episodes__item">
                                        <span>Currently no episodes released</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Manga Details Section End */}
            <Footer />
        </>
    );
};

export default MangaDetails;
