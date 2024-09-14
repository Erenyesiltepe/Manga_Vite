
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";


const Page = ({ url }: { url: string }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '10px' }}>
        <TransformWrapper>
      <TransformComponent>
        <img src={url} alt="test" />
      </TransformComponent>
    </TransformWrapper>
    </div>
    
  );
};

const EpisodeRead = () => {
    interface Page {
        image: string;
    }

    const [pages, setPages] = useState<Page[]>([]);
    const [searchParams] = useSearchParams();
    //const mangaId = searchParams.get('manga');
    const episodeId = searchParams.get('episode');
    
    useEffect(() => { 
        fetch(`${import.meta.env.VITE_API_URL}/api/mangas/pages/${episodeId}`)
            .then((response) => response.json())
            .then((data) => {
                setPages(data.results);
                console.log(data.results);
            });
     }, []);
    
    return (
        <div>
            <Header/>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', overflowY: 'auto', maxHeight: '90vh',maxWidth:'50vw',padding:'20px', margin:'50px auto', }}>
                {pages.map((page, index) => (
                    <Page key={index} url={page.image} />
                ))}
            </div>
            <Footer/>
        </div>
    );
};

export default EpisodeRead;