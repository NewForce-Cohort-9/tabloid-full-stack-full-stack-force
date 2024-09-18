import { useState } from "react";
import { GetAllCategories } from "../../Managers/CategoryManager";
import { useEffect } from "react";
import { TrashcanDelete } from "../Icons";
import { Link } from "react-router-dom";

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
      <header class="masthead bg-primary text-white text-center">
        <div class="container d-flex align-items-center flex-column">
          <div class="divider-custom divider-light">
            <div class="divider-custom-line"></div>
            <div class="divider-custom-line"></div>
          </div>
          <h2 class="pre-wrap font-weight-light mb-0">Categories</h2>
        </div>
      </header>

      <div class="container pt-5">
        <div className="container d-flex align-items-center justify-content-between w-full">
          <h1>All Categories</h1>
          <Link to={"create"}>
            <a class="btn btn-outline-primary mx-1 text-primary" title="Edit">
              Create New Category
            </a>
          </Link>
        </div>

        <table class="table table-striped">
          <tbody>
            {categories.map((category) => {
              return (
                <tr>
                  <td>{category.name}</td>
                  <td>
                    <Link to={`delete/${category.id}`}>
                    <a class="btn btn-outline-danger mx-1" title="View">
                      <TrashcanDelete color="#b91c1c" size={20} />
                    </a>
                    
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
