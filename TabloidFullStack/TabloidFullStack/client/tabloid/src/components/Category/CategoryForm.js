import { useState } from "react";
import { Link, useInRouterContext, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { addCategory } from "../../Managers/CategoryManager";

export const CategoryForm = () => {
  const [category, setCategory] = useState({});

  const navigate = useNavigate();

  const handleSave = (event) => {
    event.preventDefault();
    const newCategory = {
      Name: category.Name,
    };
    addCategory(newCategory).then((c) => {
      navigate("/categories");
    });
  };

  return (
    <div>
      <form>
        <label>
          <fieldset>
            <label>New Category Name:</label>
            <br></br>
            <input
              type="text"
              placeholder="Category"
              onChange={(event) => {
                const categoryCopy = { ...category };
                categoryCopy.Name = event.target.value;
                setCategory(categoryCopy);
              }}
            ></input>
          </fieldset>
          <fieldset>
            <a class="btn btn-outline-primary mx-1 text-primary" title="Edit" onClick={handleSave}>Create</a>
          </fieldset>
          <fieldset>
            <Link to={"/categories"}>
              <a class="btn btn-outline-primary mx-1 text-primary" title="Edit">Cancel</a>
            </Link>
          </fieldset>
        </label>
      </form>
    </div>
  );
};
