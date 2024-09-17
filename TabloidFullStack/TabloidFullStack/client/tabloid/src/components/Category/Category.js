import { TrashcanDelete } from "../Icons";

export default function Category({ category }) {
  return (
    <>
      <td>{category.name}</td>
      <td>
        <a class="btn btn-outline-danger mx-1" title="View">
          <TrashcanDelete color="#b91c1c" size={20} />
        </a>
      </td>
    </>
  );
}
