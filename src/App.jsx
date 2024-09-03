import SearchPage from "./components/SearchPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FoodItem from "./components/FoodItem";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/:id" element={<FoodItem />} />
      </Routes>
    </BrowserRouter>
  );
}
