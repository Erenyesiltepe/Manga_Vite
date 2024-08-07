
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from "./pages/NoPage";
import Index from "./pages/Index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />}>
          <Route index element={<Index />} />
          {/* <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} /> */}
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
