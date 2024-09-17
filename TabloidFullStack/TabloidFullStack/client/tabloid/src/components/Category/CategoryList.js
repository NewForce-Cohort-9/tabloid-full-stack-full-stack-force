import { useState } from "react";
import { GetAllCategories } from "../../Managers/CategoryManager";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

export const Category = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = () => {
    GetAllCategories().then((data) => setCategories(data));
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <Link to={"create"}>
        <Button>Create Category</Button>
      </Link>
      <div>
        {categories.map((category) => {
          return (
            <div>
              <p>{category.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
