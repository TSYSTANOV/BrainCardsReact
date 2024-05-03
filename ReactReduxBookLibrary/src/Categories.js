import { useEffect, useState } from "react";
import { fetchCategories } from "./service/api";
import { Spinner } from "./Spinner";
import { SingleCategory } from "./SingleCategory";
import { NavLink } from "react-router-dom";
function Categories({ title }) {
  const [isLoading, setIsloading] = useState(true);
  const [listCategories, setListcategories] = useState([]);
  useEffect(() => {
    async function getCategories() {
      const data = await fetchCategories();
      setIsloading(false);
      setListcategories(data);
    }
    getCategories();
  }, []);
  return (
    <>
      <h1 className="visually-hidden">Brain Cards</h1>
      <header className="header">
        <div className="container header__container">
          <a className="header__logo-link" href="#">
            <img
              className="header__logo"
              src="img/logo.svg"
              alt="Логотип сервиса Brain Cards"
            />
          </a>
          <h2 className="header__subtitle">{title}</h2>
          <NavLink to="edit">
            <button className="header__btn">Добавить категорию</button>
          </NavLink>
        </div>
      </header>
      <section className="category section-offset">
        <div className="container">
          <ul className="category__list">
            {isLoading && <Spinner />}
            {listCategories.map((category) => {
              return <SingleCategory key={category.id} {...category} />;
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
export { Categories };
