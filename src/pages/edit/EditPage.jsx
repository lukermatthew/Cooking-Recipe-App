import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { projectFireStore } from "../../firebase/config";
import "./edit.css";

export default function Edit() {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const ingredientInput = useRef(null);

  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  // const { postData, data } = useFetch("http://localhost:3000/recipes", "POST");
  const navigate = useNavigate();

  const { id } = useParams();

  //fetch single data by id
  useEffect(() => {
    setIsPending(true);
    const unsubscribe = projectFireStore
      .collection("recipes")
      .doc(id)
      .onSnapshot((doc) => {
        // console.log(doc);
        if (doc.exists) {
          setIsPending(false);
          //   setRecipe(doc.data());
          let recipe = doc.data();
          setTitle(recipe.title);
          setMethod(recipe.method);
          setCookingTime(recipe.cookingTime);
          setIngredients(recipe.ingredients);
        } else {
          setIsPending(false);
          setError("Could not find that recipe");
        }
      });

    return () => unsubscribe();
  }, [id]);

  // Add multiple ingredients
  const handleAdd = (e) => {
    e.preventDefault();
    const ing = newIngredient.trim();

    if (ing && !ingredients.includes(ing)) {
      setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
    }
    setNewIngredient("");
    ingredientInput.current.focus();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const doc = {
      title,
      ingredients,
      method,
      cookingTime,
    };

    try {
      await projectFireStore.collection("recipes").doc(id).update(doc);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="create">
      <h2 className="page-title">Edit Recipe</h2>
      <form onSubmit={handleUpdate}>
        <label>
          <span>Recipe title:</span>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>

        <label>
          <span>Recipe Ingredients:</span>
          <div className="ingredients">
            <input
              type="text"
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientInput}
            />
            <button onClick={handleAdd} className="btn">
              add
            </button>
          </div>
        </label>
        <p>
          Current ingredients:{" "}
          {ingredients.map((i) => (
            <em key={i}>{i}, </em>
          ))}
        </p>

        <label>
          <span>Recipe Method:</span>
          <textarea
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>

        <label>
          <span>Cooking time (minutes):</span>
          <input
            type="number"
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>

        <button className="btn">submit</button>
      </form>
    </div>
  );
}
