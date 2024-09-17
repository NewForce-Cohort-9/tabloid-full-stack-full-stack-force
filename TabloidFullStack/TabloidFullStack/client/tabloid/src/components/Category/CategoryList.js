import { useState } from "react"
import { GetAllCategories } from "../../Managers/CategoryManager";
import { useEffect } from "react";

export const Category = () => {
    const [categories, setCategories] = useState([]);
    
    const getCategories = () => {
        GetAllCategories().then((data) => setCategories(data))
    }

    useEffect(() => {
        getCategories()
    }, [])

    return(
        <div>
            <div>
                {categories.map((category) => {
                    return (
                    <div>
                        <p>{category.name}</p>
                    </div>
                    )
                })}

            </div>
        </div>
    )
}