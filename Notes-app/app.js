const addBtn = document.getElementById('add');

const notes = JSON.parse(localStorage.getItem('notes'));



addBtn.addEventListener('click', () => {
    addNewNote();

});

const addNewNote = (text = '') => {
        const getE = (element) => note.querySelector(element);
        const note = document.createElement('div');
        note.classList.add('note');

        note.innerHTML = String.raw `
        <div class = "notes">
            <div class = "tools">
                <button class="edit"><i class = "fas fa-edit"></i></button>
                <button class="delete"> <i class = "fas fa-trash-alt"></i></button>
            </div>
            <div class="main"></div>
            <textarea class="hidden"></textarea>
       </div>
    
            `;

        const editBtn = getE('.edit');
        const deleteBtn = getE('.delete');

        const main = note.querySelector('.main');
        const textArea = note.querySelector('textarea');

        textArea.value = text;
        main.innerHTML = marked.parse(text);

        editBtn.addEventListener('click', () => {

            main.classList.toggle('hidden');
            textArea.classList.toggle('hidden');
        });

        deleteBtn.addEventListener('click', () => {
            note.remove();

            updateLS();

        });

        textArea.addEventListener("input", (e) => {
            const { value } = e.target;

            main.innerHTML = marked.parse(value);

            updateLS();
        });

        document.body.appendChild(note);
    }
    // Adding to Local storage
const updateLS = () => {
    const noteText = document.querySelectorAll('textarea');
    const notes = [];

    noteText.forEach(note => notes.push(note.value));
    localStorage.setItem('notes', JSON.stringify(notes));
}
if (notes) {
    notes.forEach(note => {
        addNewNote(note);
    });
}