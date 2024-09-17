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
            <Button onClick={handleSave}>Create</Button>
          </fieldset>
          <fieldset>
            <Link to={"/categories"}>
              <Button>Cancel</Button>
            </Link>
          </fieldset>
        </label>
      </form>
    </div>
  );
};
