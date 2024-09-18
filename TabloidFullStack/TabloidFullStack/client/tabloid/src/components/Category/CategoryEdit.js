import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCategoryById, updateCategory } from "../../Managers/CategoryManager";
import { Input } from "reactstrap";
import TagPageHeader from "../Tags/TagPageHeader";

export const EditCategory = () => {
    const [category, setCategory] = useState({});
    const {id} = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        getCategoryById(id).then((data) => {
            setCategory(data)
        })
    }, [])

    const handleSave = (event) => {
        event.preventDefault()
        const editedCategory = {
            name: category.name,
            id: category.id
        }
        updateCategory(editedCategory).then(() => {
            navigate("/categories")
        })
    }
    return(
        <>
        <TagPageHeader title="Edit Category" />
      <div className="container pt-5">
        <div className="container d-flex align-items-center justify-content-center flex-column">
          <form>
            <h1 className="p-4">Rename category: </h1>
            <Input
            placeholder={category.name}
              onChange={(event) => {
                const categoryCopy = { ...category };
                categoryCopy.name = event.target.value;
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
    )
}