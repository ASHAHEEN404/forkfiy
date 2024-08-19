import icons from 'url:../../img/icons.svg'; // FOR adding icons from dist file
import View from './view';

class AddRecipeView extends View {
  _parentEl = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _openBtn = document.querySelector('.nav__btn--add-recipe');
  _closeBtn = document.querySelector('.btn--close-modal');
  _uploadBtn = document.querySelector('.upload__btn');
  _message = 'The recipe is sucessfully uploaded , Enjoy Chef. 👨‍🍳';

  constructor() {
    super();
    this._addNewRecipeHandler();
    this._closeRecipeWindowHandler();
  }

  _toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addNewRecipeHandler() {
    this._openBtn.addEventListener('click', this._toggleWindow.bind(this));
  }

  _closeRecipeWindowHandler() {
    this._overlay.addEventListener('click', this._toggleWindow.bind(this));
    this._closeBtn.addEventListener('click', this._toggleWindow.bind(this));
  }

  uploadRecipeHandler(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      console.log(data);
      handler(data);
    });
  }
}

export default new AddRecipeView();
