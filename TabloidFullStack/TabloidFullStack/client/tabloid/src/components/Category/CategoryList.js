import { useState } from "react";
import { GetAllCategories } from "../../Managers/CategoryManager";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { TrashcanDelete } from "../Icons";

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
        <a class="btn btn-outline-primary mx-1 text-primary" title="Edit">
          Create Category
        </a>
      </Link>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {categories &&
            categories.length > 0 &&
            categories.map((category) => {
              return (
                <tr>
                  <>
                    <td>{category.Name}</td>
                    {/* <TrashcanDelete color="#b91c1c" size={20} /> */}
                  </>
                </tr>
              );
            })}
        </tbody>
      </table>
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
