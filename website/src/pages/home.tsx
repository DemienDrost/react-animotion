import Markdown from "react-markdown";
import readme from "../assets/website_readme.md";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(readme)
      .then((res) => res.text())
      .then((text) => setContent(text));
  }, []);

  return (
    <div className="container">
      <Markdown children={content} />
    </div>
  );
};

export default HomePage;
