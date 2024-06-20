// src/components/RecipeDetails.tsx
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import CommentsList from "./CommentsList";
import recipeService, { Recipe } from "../../services/recipeService";
import Like from "./Like";
import FavoriteButton from "./FavoriteButton";


const RecipeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const data = await recipeService.fetchRecipeDetails(parseInt(id, 10));
        setRecipe(data);
      } catch (err) {
        setError("An error occurred while fetching the recipe details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {recipe && (
        <div>
          <h1>{recipe.title}</h1>
          <p>
            <strong>Ingredients:</strong> {recipe.ingredients.join(", ")}
          </p>
          <p>
            <strong>Directions:</strong> {recipe.directions.join(" ")}
          </p>
          {recipe.link && (
            <p>
              <strong>Link:</strong>{" "}
              <a href={recipe.link} target="_blank" rel="noopener noreferrer">
                {recipe.link}
              </a>
            </p>
          )}
          {recipe.source && (
            <p>
              <strong>Source:</strong> {recipe.source}
            </p>
          )}
          <p>
            <strong>NER:</strong> {recipe.ner.join(", ")}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(recipe.createTime).toLocaleString()}
          </p>
          <p>
            <strong>Updated At:</strong>{" "}
            {new Date(recipe.updateTime).toLocaleString()}
          </p>
          <Like recipeId={parseInt(id, 10)} />
        </div>
      )}

      <CommentsList recipeId={parseInt(id, 10)} />
      <FavoriteButton recipeId={parseInt(id, 10)} />
    </div>
  );
};

export default RecipeDetails;
