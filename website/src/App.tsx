import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/home";
import DocsPage from "./pages/docs";
import DemoPage from "./pages/demo";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="docs" element={<DocsPage />} />
        <Route path="demo" element={<DemoPage />} />
      </Route>
    )
  )

  return <RouterProvider router={router}/>;
}

export default App;
