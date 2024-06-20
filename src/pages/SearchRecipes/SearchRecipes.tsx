// src/components/SearchRecipes.tsx
import React, { useState } from "react";
import recipeService, { Recipe } from "../../services/recipeService";

const SearchRecipes: React.FC = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    
      const data = await recipeService.searchRecipes(keyword);

      if (data.records) {
        setRecipes(data.records);
      } else {
        setError("Error fetching recipes");
      }
    
  };

  return (
    <div className="container">
      <div className="justify-content-md-center mt-5">
        <h1 className="text-center">Search Recipes</h1>
        <div className="d-flex">
          <input
            className="form-control me-2"
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Enter keywords"
          />
          <button className="btn btn-secondary" onClick={handleSearch}>
            Search
          </button>
        </div>
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <h2>{recipe.title}</h2>
              <p>
                <strong>Ingredients:</strong> {recipe.ingredients.join(", ")}
              </p>
              <p>
                <strong>Directions:</strong> {recipe.directions.join(" ")}
              </p>
              {recipe.link && (
                <p>
                  <strong>Link:</strong>{" "}
                  <a
                    href={recipe.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
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
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchRecipes;
