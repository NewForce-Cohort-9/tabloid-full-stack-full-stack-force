import { useState } from "react";
import { Link, useInRouterContext, useNavigate } from "react-router-dom";
import { Button, Input } from "reactstrap";
import { addCategory } from "../../Managers/CategoryManager";
import TagPageHeader from "../Tags/TagPageHeader";

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
    <>
      <TagPageHeader title="Create new category" />
      <div className="container pt-5">
        <div className="container d-flex align-items-center justify-content-center flex-column">
          <form>
            <h1 className="p-4">Enter a new category name</h1>
            <Input
              onChange={(event) => {
                const categoryCopy = { ...category };
                categoryCopy.Name = event.target.value;
                setCategory(categoryCopy);
              }}
            />

            <button
              type="submit"
              className="btn mt-4 btn-primary mx-1 text-white w-100"
              onClick={handleSave}
            >
              Save
            </button>
            <Link to={"/categories"}>
              <a className="btn mt-4 btn-outline-primary mx-1 text-primary w-100">
                Cancel
              </a>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};
