// src/components/PopularRecipes.tsx

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import recipeService, { Recipe } from "../../../services/recipeService";

const PopularRecipes: React.FC = () => {
    const history = useHistory();
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPopularRecipes = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.log("No token found");
                    setError("No token found");
                    setLoading(false);
                    return;
                }

                console.log("Token:", token); // 验证token在控制台中
                const data = await recipeService.fetchPopularRecipes();

                console.log("Response data:", data); // 记录响应数据

                setRecipes(data.records);
                console.log("Recipes set successfully");
            } catch (err: any) {
                setError(err.message || "An error occurred while fetching the popular recipes");
            } finally {
                setLoading(false);
            }
        };

        fetchPopularRecipes();
    }, [history]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Popular Recipes</h1>
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
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PopularRecipes;
