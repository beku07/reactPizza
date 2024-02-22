import React, { useState } from "react";

function Categories({ value, onClickategory }) {

  // console.log(value);
  // const [activeIndex, setActiveIndex] = useState(0);
  const categoryArr = ['Все', 'Мясные','Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

  // const onClickCategory = (index) => {
  //   setActiveIndex(index)
  // }

    return (
      <div className="categories">
        <ul>
           {
            categoryArr.map((categoryName, index) => (
            <li key={index} onClick={() => onClickategory(index)} className={value === index ? 'active' : ''}>{categoryName}</li>))}
        </ul>
      </div>
    );  
  }

  export default Categories;