import { BrowserRouter, Routes, Route } from "react-router-dom";

import { HomePage } from "./HomePage";
import { GalleryPage } from "./Gallery";
import { AboutPage } from "./About";
import { ProjectsPage } from "./ProjectsPage";
import { ConceptsPage } from "./Gallery/Concepts/ConceptsPage";
import { FoodCoffeePage } from "./Gallery/FoodCoffeePage";
import { PerceptionPage } from "./Gallery/PerceptionPage";

function App() {
  return (
    <BrowserRouter>
      <div className="h-full w-full">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/gallery">
            <Route index element={<GalleryPage />} />
            <Route path="concepts" element={<ConceptsPage />} />
            <Route path="food-coffee" element={<FoodCoffeePage />} />
            <Route path="perception" element={<PerceptionPage />} />
          </Route>
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
