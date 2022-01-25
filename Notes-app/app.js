const getE = (element) => document.querySelector(element);

const notesEl = getE('.notes');
const editBtn = getE('.edit');
const deleteBtn = getE('.delete');

const main = notesEl.querySelector('.main');
const textArea = notesEl.querySelector('textarea');

editBtn.addEventListener('click', () => {

    main.classList.toggle('hidden');
    textArea.classList.toggle('hidden');
});

textArea.addEventListener("input", (e) => {
    const { value } = e.target;

    main.innerHTML = marked.parse(value);
});