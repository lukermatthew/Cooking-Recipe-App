import { projectFireStore } from "../../firebase/config";
import RecipeList from "../../components/RecipeList/RecipeList";
import { useEffect, useState } from "react";
import "./home.css";

const HomePage = () => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  // fetch all recipe
  useEffect(() => {
    setIsPending(true);

    const unsubscribe = projectFireStore.collection("recipes").onSnapshot(
      (snapshot) => {
        if (snapshot) {
          let results = [];
          snapshot.docs.forEach((doc) => {
            // console.log(doc.data());
            results.push({
              id: doc.id,
              ...doc.data(),
            });
          });

          setData(results);
          setIsPending(false);
        } else {
          setError("No recipes to load");
          setIsPending(false);
        }
      },
      (error) => {
        setError(error.message);
        setIsPending(false);
      }
    );

    // cleanup subscribe
    return () => unsubscribe();
  }, []);

  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading ...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
};

export default HomePage;
