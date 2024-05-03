import { useEffect, useState } from "react";
import {
  fetchCards,
  fetchCreateCategory,
  fetchEditCategory,
} from "./service/api";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Spinner } from "./Spinner";

function Edit() {
  const categoryId = useParams();
  const [isLoading, setIsloading] = useState(true);
  const navigate = useNavigate();
  const [pairs, setPairs] = useState([]);
  const [titleCategory, setTitleCategory] = useState("Создать новую категорию");

  function addRow() {
    let newParamId = uuidv4();
    setPairs([...pairs, [newParamId, "", ""]]);
  }
  function deleterRow(someParam) {
    setPairs(
      pairs.filter((pair) => {
        if (pair[0] !== someParam) {
          return true;
        }
      })
    );
  }
  async function editCategory(catID) {
    const checkEmptyCells = pairs.some((pair) => {
      if (pair[1].length === 0 || pair[2].length === 0) {
        return true;
      }
    });

    if (
      checkEmptyCells ||
      checkEmptyCells === undefined ||
      pairs.length === 0
    ) {
      console.log("Empty Cells in Table");
    } else {
      const updatePairs = pairs.map((item) => {
        return [item[1], item[2]];
      });

      await fetchEditCategory(catID.categoryID, {
        title: titleCategory,
        pairs: updatePairs,
      });
      navigate("/", { relative: "path" });
    }
  }
  function updatePairsInfoFirst(id, text) {
    setPairs(
      pairs.map((item) => {
        if (item[0] === id) {
          item[1] = text;
          return item;
        }
        return item;
      })
    );
  }
  function updatePairsInfoSecond(id, text) {
    setPairs(
      pairs.map((item) => {
        if (item[0] === id) {
          item[2] = text;
          return item;
        }
        return item;
      })
    );
  }
  async function saveCategory() {
    const checkEmptyCells = pairs.some((pair) => {
      if (pair[1].length === 0 || pair[2].length === 0) {
        return true;
      }
    });

    if (
      checkEmptyCells ||
      checkEmptyCells === undefined ||
      pairs.length === 0
    ) {
      console.log("Empty Cells in Table");
    } else {
      const updatePairs = pairs.map((item) => {
        return [item[1], item[2]];
      });
      await fetchCreateCategory({ title: titleCategory, pairs: updatePairs });
      navigate("/", { relative: "path" });
    }
  }
  useEffect(() => {
    if (categoryId.categoryID) {
      async function getData() {
        const data = await fetchCards(categoryId.categoryID);
        setTitleCategory(data.title);
        const updatedData = data.pairs.map((pair) => {
          let newParamId = uuidv4();
          return [newParamId, pair[0], pair[1]];
        });
        setPairs(updatedData);
        setIsloading(false);
      }
      getData();
    } else {
      setIsloading(false);
    }
  }, [categoryId]);

  return (
    <section className="edit section-offset">
      <div className="container edit__container">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <h2 className="edit__title" title={titleCategory}>
              <input
                value={titleCategory}
                onInput={(e) => {
                  setTitleCategory(e.target.value);
                }}
              />
            </h2>
            <table className="edit__table table">
              <thead>
                <tr>
                  <th className="table__cell">main</th>
                  <th className="table__cell">second</th>
                  <th className="table__cell"></th>
                </tr>
              </thead>
              <tbody>
                {pairs.map((pair) => {
                  return (
                    <tr key={pair[0]}>
                      <td className="table__cell table__cell_one">
                        <input
                          type="text"
                          value={pair[1]}
                          onChange={(e) => {
                            updatePairsInfoFirst(pair[0], e.target.value);
                          }}
                        />
                      </td>
                      <td className="table__cell table__cell_two">
                        <input
                          type="text"
                          value={pair[2]}
                          onChange={(e) => {
                            updatePairsInfoSecond(pair[0], e.target.value);
                          }}
                        />
                      </td>
                      <td className="table__cell">
                        <button
                          className="table__del"
                          onClick={() => {
                            deleterRow(pair[0]);
                          }}
                        >
                          x
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="edit__btn-wrapper">
              <button className="edit__btn edit__add-row" onClick={addRow}>
                Добавить пару
              </button>
              {categoryId ? (
                <button
                  className="edit__btn edit__save"
                  onClick={() => {
                    editCategory(categoryId);
                  }}
                >
                  Редактировать категорию
                </button>
              ) : (
                <button className="edit__btn edit__save" onClick={saveCategory}>
                  Сохранить категорию
                </button>
              )}

              <NavLink to="/">
                <button className="edit__btn edit__cancel">Отмена</button>
              </NavLink>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
export { Edit };
