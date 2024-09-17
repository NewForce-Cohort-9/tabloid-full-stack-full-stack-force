import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { getCategoryById } from "../../Managers/CategoryManager";

export const CategoryDelete = () => {
 const [category, setCategory] = useState({});

 const {id} = useParams();

 useEffect(() => {
    getCategoryById(id).then(setCategory);
 },[]);

 if(!category) {
    return null;
 }

    return (
        <div>
            Are you sure you want to delete?
            <div>{category.name}</div>
        </div>
    )
}