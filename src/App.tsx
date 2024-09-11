import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from "./pages/NoPage";
import Index from "./pages/Index";
import Category from "./pages/Category";
import Contacts from "./pages/Contacts";
import MangaDetails from "./pages/MangaDetails";  
import EpisodeRead from "./pages/EpisodeRead";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/mangaDetails" element={<MangaDetails />} />
        <Route path="/mangaRead" element={<EpisodeRead />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
