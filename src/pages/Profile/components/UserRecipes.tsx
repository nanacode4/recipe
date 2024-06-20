// src/components/UserRecipes.tsx
import React from 'react';
import { useHistory } from 'react-router-dom';
import recipeService, { Recipe } from '../../../services/recipeService';


interface UserRecipesProps {
  recipes: Recipe[];
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
}

const UserRecipes: React.FC<UserRecipesProps> = ({ recipes, setRecipes }) => {
  const history = useHistory();
  const [error, setError] = React.useState<string | null>(null);

  const handleViewDetails = (id: number) => {
    history.push(`/recipes/${id}`);
  };

  const handleDelete = async (id: number) => {
    try {
      await recipeService.deleteRecipe(id);
      setRecipes(recipes.filter(recipe => recipe.id !== id));
    } catch (error) {
      console.error('Error deleting recipe:', error);
      setError('Error deleting recipe');
    }
  };

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}
      <h2>Your Recipes</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id} className="d-flex justify-content-between align-items-center mb-2">
            <span>{recipe.title}</span>
            <div>
              <button className="btn btn-secondary btn-sm me-2" onClick={() => handleViewDetails(recipe.id)}>View Details</button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(recipe.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserRecipes;
