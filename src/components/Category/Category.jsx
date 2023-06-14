import React, { useRef, useState, useEffect } from "react";
import "./Category.css";

import hamburguesasBg from "/images/categories/Hamburguesas.png"
import postreBg from "/images/categories/Postres.png"
import companionBg from "/images/categories/para_picar.png"



function Category({ categories }) {
  const categoriesRef = useRef(null);
  const [originalPosition, setOriginalPosition] = useState(0);

  const handleClick = (category) => {
    const categoryElement = document.getElementById(category.toLowerCase());
    const categoryOffsetTop = categoryElement.offsetTop;
    const headerHeight = 120;
    const offset = categoryOffsetTop - headerHeight;
    window.scrollTo({ top: offset, behavior: "smooth" });
  };

  useEffect(() => {
    const categoriesElement = categoriesRef.current;
    const categoriesOffsetTop = categoriesElement.offsetTop;
    setOriginalPosition(categoriesOffsetTop);

    const handleScroll = () => {

      const scrollTop = window.pageY || document.documentElement.scrollTop;
      if (scrollTop > categoriesOffsetTop) {
        categoriesElement.classList.add("fixed");
      } else {
        categoriesElement.classList.remove("fixed");
      }
      if (scrollTop >= originalPosition && scrollTop < categoriesOffsetTop) {
        categoriesElement.classList.remove("fixed");
        setOriginalPosition(scrollTop);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [originalPosition]);

  const backgroundImageMap = {

    hamburguesas: hamburguesasBg,

    postres: postreBg,

    companion: companionBg,

  };

  return (
    <div className="categories-container" ref={categoriesRef}>
      {categories.slice(0, categories.length - 2).map((category) => (
        <div key={category} className="category-container">
          <button className="category-img-btn" onClick={() => handleClick(category)}>
            <div className="category-img" style={{ backgroundImage: `url(${backgroundImageMap[category]})` }}></div>
          </button>
          <div className="category-label">{category === "companion" ? "PARA PICAR" : category.toUpperCase()}</div>
        </div>
      ))}
    </div>
  );
}

export default Category;
