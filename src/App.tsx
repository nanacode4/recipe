import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import { HomePage } from "./pages/HomePage/HomePage";
import { Footer } from "./pages/NavbarAndFooter/Footer";
import NewRecipe from "./pages/NewRecipe/NewRecipe";
import Navbar from "./pages/NavbarAndFooter/Navbar";
import Register from "./pages/Login/components/Register";
import RequestPasswordReset from "./pages/Login/components/RequestPasswordReset";
import ResetPassword from "./pages/Login/components/ResetPassword";
import Profile from "./pages/Profile/Profile";
import RecipeDetails from "./pages/RecipePage/RecipeDetails";
import SearchRecipes from "./pages/SearchRecipes/SearchRecipes";
import Login from "./pages/Login/Login";

export const App = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="flex-grow-1">
        <Switch>
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
          <Route path="/home">
            <HomePage />
          </Route>
          <Route path="/search">
            <SearchRecipes />
          </Route>
          <Route path="/publish">
            <NewRecipe />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/recipes/:id" component={RecipeDetails} />
          <Route path="/request-password-reset">
            <RequestPasswordReset />
          </Route>
          <Route path="/reset-password">
            <ResetPassword />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  );
};
