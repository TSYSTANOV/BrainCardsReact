import { useState } from "react";
import { fetchDeleteCategory } from "./service/api";
import { NavLink } from "react-router-dom";
function SingleCategory({ id, length, title }) {
  const [deleteItem, setDeleteItem] = useState(false);
  function deleteCategory() {
    setDeleteItem(true);
    fetchDeleteCategory(id);
  }
  return (
    <>
      {!deleteItem && (
        <li className="category__item" data-id={id}>
          <NavLink to={id}>
            <button className="category__card">
              <span className="category__title">{title}</span>
              <span className="category__pairs">{length} пар</span>
            </button>
          </NavLink>
          <NavLink to={`edit/${id}`}>
            <button
              className="category__btn category__edit"
              aria-label="редактировать"
            ></button>
          </NavLink>
          <button
            className="category__btn category__del"
            aria-label="удалить"
            onClick={deleteCategory}
          ></button>
        </li>
      )}
    </>
  );
}
export { SingleCategory };
