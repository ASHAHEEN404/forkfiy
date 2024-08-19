import View from './view';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addHandlerBtn(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkUp() {
    const currPage = this._data.page;
    const numofPages = Math.ceil(
      this._data.result.length / this._data.resultsPerPage
    );

    console.log(currPage, numofPages);

    // 1 ) => First Page , There's Other Results
    if (currPage === 1 && numofPages > 1) {
      return `
    <button data-goto =${
      currPage + 1
    } class="btn--inline pagination__btn--next">
      <span>Page ${currPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
    `;
    }
    // 2 ) => on the middle , there's pages back and next
    if (currPage < numofPages) {
      return `
      <button data-goto ="${
        currPage - 1
      }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currPage - 1}</span>
          </button>
          <button data-goto ="${
            currPage + 1
          }" class="btn--inline pagination__btn--next">
            <span>Page ${currPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
      `;
    }
    // 3 ) => On the last page
    if (currPage === numofPages && numofPages > 1) {
      return `
      <button data-goto ="${
        currPage - 1
      }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currPage - 1}</span>
          </button>
      `;
    }
    // 4 ) => First Page , no other pages
    return '';
  }
}
export default new PaginationView();
