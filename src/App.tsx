import {
  Route,
  Routes,
} from "react-router";

import Header from "./components/layout/Header";

import HomePage from "./pages/HomePage";
import LearnPage from "./pages/LearnPage";
import BuildPage from "./pages/BuildPage";
import LearningPathPage from "./pages/LearningPathPage";

export default function App() {
  return (
    <div className="app">
      <Header />

      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/learn"
          element={<LearnPage />}
        />

        <Route
          path="/learn/:pathId"
          element={<LearningPathPage />}
        />

        <Route
          path="/build"
          element={<BuildPage />}
        />
      </Routes>
    </div>
  );
}