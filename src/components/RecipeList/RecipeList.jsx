import { projectFireStore } from "../../firebase/config";
import { Link, useNavigate } from "react-router-dom";
import "./recipe.css";
import DeleteIcon from "../../assets/delete.svg";
import EditIcon from "../../assets/edit.svg";

const RecipeList = ({ recipes }) => {
  const navigate = useNavigate();

  if (recipes.length === 0) {
    return <div className="error">No Recipes Found</div>;
  }
  // delete data by id
  const handleDelete = (id) => {
    projectFireStore.collection("recipes").doc(id).delete();
  };
  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="card">
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make.</p>
          <div>{recipe.method.substring(0, 100)}</div>

          <Link to={`/recipes/${recipe.id}`}>Cook Now</Link>
          <img
            className="delete"
            style={{ cursor: "pointer" }}
            src={DeleteIcon}
            alt="delete-icon"
            onClick={() => handleDelete(recipe.id)}
          />

          <img
            className="edit"
            style={{ cursor: "pointer" }}
            src={EditIcon}
            alt="edit-icon"
            onClick={() => handleEdit(recipe.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
