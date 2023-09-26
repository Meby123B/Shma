 const loading = {
    element: document.querySelector('.search > .loading'),
    show: () => loading.element.classList.remove('hide'),
    hide: () => loading.element.classList.add('hide')
}
export default loading