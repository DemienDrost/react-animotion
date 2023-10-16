import { ReactNode, useEffect, useRef } from "react";
import style from "./StickyContainer.module.scss";

interface StickyContainerProps {
  children: ReactNode;
  height: string;
  percentageScrolledCallback?: (value: number) => void;
}

const StickyContainer = ({
  children,
  height,
  percentageScrolledCallback,
}: StickyContainerProps) => {
  const stickyContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculatePercentageScrolled = () => {
      if (!percentageScrolledCallback || !stickyContainerRef.current) return;

      const container = stickyContainerRef.current;
      const scrollTop = window.pageYOffset;
      const windowHeight = window.innerHeight;

      const containerTop = container.offsetTop;
      const containerHeight = container.offsetHeight;

        const percentageScrolled =
            (scrollTop - containerTop) / (containerHeight - windowHeight);

      percentageScrolledCallback(percentageScrolled);
    };

    window.addEventListener("scroll", calculatePercentageScrolled);

    return () => {
      window.removeEventListener("scroll", calculatePercentageScrolled);
    };
  }, [percentageScrolledCallback]);

  return (
    <div
      ref={stickyContainerRef}
      className={style.stickyContainer}
      style={{ height }}
    >
      {children}
    </div>
  );
};

export default StickyContainer;