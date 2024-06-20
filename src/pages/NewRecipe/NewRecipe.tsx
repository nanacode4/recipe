// src/components/NewRecipe.tsx
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import recipeService from "../../services/recipeService";

const NewRecipe: React.FC = () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [directions, setDirections] = useState("");
  const [link, setLink] = useState("");
  const [source, setSource] = useState("Choose Source");
  const [ner, setNer] = useState("");
  const [displaySuccess, setDisplaySuccess] = useState(false);
  const [displayWarning, setDisplayWarning] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    if (!token) {
      setIsLoggedIn(false);
      setDisplayWarning(true);
      return;
    }
  }, []);

  const handleSubmit = async () => {
    if (
      !title ||
      !ingredients ||
      !directions ||
      !link ||
      source === "Choose Source" ||
      !ner
    ) {
      setDisplayWarning(true);
      return;
    }

    const recipe = {
      title,
      ingredients: ingredients
        .split(",")
        .map((ingredient) => ingredient.trim()),
      directions: directions.split(",").map((direction) => direction.trim()),
      link,
      source,
      ner: ner.split(",").map((tag) => tag.trim()),
    };

    console.log("Submitting recipe:", recipe);

    try {
      const response = await recipeService.publishRecipe(recipe);
      setDisplaySuccess(true);
      setDisplayWarning(false);
      console.log("Recipe published successfully:", response);
    } catch (error) {
      console.error("Error publishing recipe:", error);
      setDisplayWarning(true);
    }
  };

  const sourceField = (source: string) => {
    setSource(source);
  };

  if (!isLoggedIn) {
    return (
      <div className="alert alert-warning" role="alert">
        Users need to be logged in to add a new recipe.
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">
      {displaySuccess && (
        <div className="alert alert-success" role="alert">
          Recipe added successfully
        </div>
      )}
      {displayWarning && (
        <div className="alert alert-danger" role="alert">
          All fields must be filled out or user needs to be logged in
        </div>
      )}
      <div className="card">
        <div className="card-header">Add a new Recipe</div>
        <div className="card-body">
          <form method="POST">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  required
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </div>
              <div className="col-md-9 mb-3">
                <label className="form-label">
                  {" "}
                  Ingredients (comma separated){" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="ingredients"
                  required
                  onChange={(e) => setIngredients(e.target.value)}
                  value={ingredients}
                />
              </div>
              <div className="col-md-9 mb-3">
                <label className="form-label">
                  {" "}
                  Directions (comma separated){" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="directions"
                  required
                  onChange={(e) => setDirections(e.target.value)}
                  value={directions}
                />
              </div>
              <div className="col-md-8 mb-3">
                <label className="form-label"> Link </label>
                <input
                  type="text"
                  className="form-control"
                  name="link"
                  required
                  onChange={(e) => setLink(e.target.value)}
                  value={link}
                />
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label"> Source</label>
                <button
                  className="form-control btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {source}
                </button>
                <ul
                  id="addNewBookId"
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <a
                      onClick={() => sourceField("Family Recipe")}
                      className="dropdown-item"
                    >
                      Family Recipe
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => sourceField("Mom's Recipe")}
                      className="dropdown-item"
                    >
                      Mom's Recipe
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => sourceField("Quick Recipe")}
                      className="dropdown-item"
                    >
                      Quick Recipe
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => sourceField("Gathered")}
                      className="dropdown-item"
                    >
                      Gathered
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-12 mb-3">
              <label className="form-label">Ner (comma separated)</label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows={3}
                onChange={(e) => setNer(e.target.value)}
                value={ner}
              ></textarea>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-secondary mt-3"
                onClick={handleSubmit}
              >
                Add Recipe
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewRecipe;
