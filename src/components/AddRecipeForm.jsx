"use client";

import React, { useState } from "react";

const AddRecipeForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    cuisine: "",
    difficulty: 1,
    cookingTime: "",
    servings: "",
    ingredients: [""],
    instructions: [""],
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], ""]
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="add-recipe-form">
      <h2>Add New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Recipe Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Category</label>
            <select
              value={formData.category}
              onChange={(e) => handleInputChange("category", e.target.value)}
              required
            >
              <option value="">Select Category</option>
              <option value="Appetizer">Appetizer</option>
              <option value="Main Course">Main Course</option>
              <option value="Dessert">Dessert</option>
              <option value="Side Dish">Side Dish</option>
              <option value="Soup">Soup</option>
              <option value="Salad">Salad</option>
            </select>
          </div>

          <div className="form-group">
            <label>Cuisine</label>
            <select
              value={formData.cuisine}
              onChange={(e) => handleInputChange("cuisine", e.target.value)}
              required
            >
              <option value="">Select Cuisine</option>
              <option value="Italian">Italian</option>
              <option value="Chinese">Chinese</option>
              <option value="Japanese">Japanese</option>
              <option value="Mexican">Mexican</option>
              <option value="Indian">Indian</option>
              <option value="Mediterranean">Mediterranean</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Difficulty</label>
            <select
              value={formData.difficulty}
              onChange={(e) => handleInputChange("difficulty", parseInt(e.target.value))}
            >
              <option value={1}>★ Easy</option>
              <option value={2}>★★ Medium</option>
              <option value={3}>★★★ Hard</option>
              <option value={4}>★★★★ Expert</option>
            </select>
          </div>

          <div className="form-group">
            <label>Cooking Time (minutes)</label>
            <input
              type="number"
              value={formData.cookingTime}
              onChange={(e) => handleInputChange("cookingTime", e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Servings</label>
            <input
              type="number"
              value={formData.servings}
              onChange={(e) => handleInputChange("servings", e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Ingredients</label>
          {formData.ingredients.map((ingredient, index) => (
            <div key={index} className="array-item">
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleArrayChange("ingredients", index, e.target.value)}
                placeholder="Enter ingredient"
                required
              />
              <button
                type="button"
                onClick={() => removeArrayItem("ingredients", index)}
                disabled={formData.ingredients.length === 1}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem("ingredients")}
            className="add-item-btn"
          >
            + Add Ingredient
          </button>
        </div>

        <div className="form-group">
          <label>Instructions</label>
          {formData.instructions.map((instruction, index) => (
            <div key={index} className="array-item">
              <textarea
                value={instruction}
                onChange={(e) => handleArrayChange("instructions", index, e.target.value)}
                placeholder="Enter instruction step"
                required
                rows="3"
              />
              <button
                type="button"
                onClick={() => removeArrayItem("instructions", index)}
                disabled={formData.instructions.length === 1}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem("instructions")}
            className="add-item-btn"
          >
            + Add Step
          </button>
        </div>

        <div className="form-actions">
          <button type="button" onClick={onCancel} className="button--cancel">
            Cancel
          </button>
          <button type="submit" className="button--confirm">
            Add Recipe
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRecipeForm;
