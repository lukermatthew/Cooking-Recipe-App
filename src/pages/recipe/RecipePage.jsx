import { projectFireStore } from "../../firebase/config";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./recipe.css";

const Recipe = () => {
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

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
          setRecipe(doc.data());
        } else {
          setIsPending(false);
          setError("Could not find that recipe");
        }
      });

    return () => unsubscribe();
  }, [id]);

  // const handleUpdate = () => {
  //   projectFireStore.collection("recipes").doc(id).update({
  //     title: "vegie sauce",
  //   });
  // };

  return (
    <div className="recipe">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
          <p className="method">{recipe.method}</p>
        </>
      )}
    </div>
  );
};

export default Recipe;
