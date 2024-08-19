import View from './view';
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  _parentEl = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! Please try again ;)';
  _message = '';

  _generateMarkUp() {
    return this._data.map(this._generateMarkupResults).join('');
  }

  _generateMarkupResults(result) {
    const id = window.location.hash.slice(1);
    console.log(id, result.id);

    return `
  <li class="preview">
  <a class="preview__link ${
    result.id === id ? 'preview__link--active' : ''
  } " href="#${result.id}">
    <figure class="preview__fig">
      <img src="${result.image}" alt="${result.title}" />
    </figure>
    <div class="preview__data">
      <h4 class="preview__title">${result.title}</h4>
      <p class="preview__publisher">${result.publisher}</p>
      <div class="preview__user-generated ${result.key ? '' : 'hidden'}  ">
        <svg>
          <use href="${icons}#icon-user"></use>
        </svg>
      </div>
    </div>
  </a>
</li>
`;
  }
}

export default new ResultsView();
