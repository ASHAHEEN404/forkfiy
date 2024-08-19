import * as model from './model.js';
import recipeView from './views/recipeView.js';
import resultsView from './views/resultsView.js';
import searchView from './views/searchView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import 'core-js';
import 'regenerator-runtime/runtime';
import addRecipeView from './views/addRecipeView.js';
import { TIMEOUT_NEWRECIPE } from './config.js';

// const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

if (module.hot) {
  module.hot.accept();
}
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    // Updating The DOM With new Bookmarks and Selected recipe in Active
    resultsView.update(model.getSearchResultsPage());
    bookmarkView.update(model.state.bookmarks);

    // 1) Load Recipe
    await model.loadRecipe(id);
    // 2) render Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // get the query
    const query = searchView.getQuery();
    if (!query) return;
    resultsView.renderSpinner();
    // load the results
    await model.loadSearchResults(query);
    // render the results PER PAGE
    resultsView.render(model.getSearchResultsPage());

    paginationView.render(model.state.search);
  } catch (err) {
    resultsView.renderError();
    console.error(err);
  }
};

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  model.updateServings(newServings);

  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // update the view recipe
  recipeView.update(model.state.recipe);
  // render the bookmakrs
  model.restoreBookmarks();
  bookmarkView.render(model.state.bookmarks);
};

const controlBookmark = function () {
  model.restoreBookmarks();
  bookmarkView.render(model.state.bookmarks);
};

const controlUploadRecipe = async function (newRecipe) {
  try {
    // set a spinner
    addRecipeView.renderSpinner();
    // upload new recipe
    await model.uploadRecipe(newRecipe);
    // render the recipe in recipe view
    recipeView.render(model.state.recipe);
    // add sucessRender on valid inputs
    addRecipeView.sucessRender();
    // Rerender bookmark
    bookmarkView.render(model.state.bookmarks);
    // update the recipe id link
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    // Close The form Modal
    setTimeout(function () {
      addRecipeView._toggleWindow();
    }, TIMEOUT_NEWRECIPE * 1000);
  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarkView.addHandlerRender(controlBookmark);
  recipeView.addHandlerRecipe(controlRecipes);
  recipeView.updateServingsHandler(controlServings);
  recipeView.addHandlerBookmarked(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerBtn(controlPagination);
  addRecipeView.uploadRecipeHandler(controlUploadRecipe);
};
init();
