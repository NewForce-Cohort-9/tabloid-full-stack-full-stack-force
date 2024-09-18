import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { deleteCategory, getCategoryById } from "../../Managers/CategoryManager";

export const CategoryDelete = () => {
 const [category, setCategory] = useState({});

 const {id} = useParams();
 const navigate = useNavigate();

 useEffect(() => {
    getCategoryById(id).then(setCategory);
 },[]);

 const handleDelete = () => {
    deleteCategory(id).then(navigate("/categories"))
 }

 if(!category) {
    return null;
 }


    return (
        <div className="container-sm pt-5">
            Are you sure you want to delete:
            <p><b>{category.name}</b>?</p>

            <button
            onClick={() => handleDelete()}
              type="submit"
              className="btn mt-4 btn-danger mx-1 text-white w-100"
            >
              Delete
            </button>
            <button
              onClick={() => navigate("/categories")}
              className="btn mt-4 btn-outline-primary mx-1 text-primary w-100"
            >
              Cancel
            </button>

        </div>
    )
}