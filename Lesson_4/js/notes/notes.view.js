var NotesView = (function () {

    var moduleName = 'notes';
    var S = {
        list: document.querySelector('[data-module="notes"] .notes__list'),
        addBtn: document.querySelector('[data-module="notes"] .new-note__btn'),
        newNote: document.querySelector('[data-module="notes"] .new-note__input'),
    }
    var template = {
        item: '<div class="notes__item"><b>{{id}}</b> {{text}} <button>X</button></div>'
    }

    return {
        render: function (rendererName, data) {
            var renderers = {
                notes: function () {
                    var view = '';
                    for (var i = 0; i < data.length; i++) {
                        var t = template.item;
                        t = t.replace('{{text}}', data[i].text);
                        t = t.replace('{{id}}', data[i].id);
                        view += t;
                    }
                    S.list.innerHTML = view;
                }
            }
            if (!renderers[rendererName]) {
                console.warn('Такого метода нет ' + rendererName);
                return;
            }
            renderers[rendererName]();
        },
        listen: function (eventName, cb) {
            var events = {
                addingNote: function () {
                    S.addBtn.addEventListener('click', function () {
                        var noteText = S.newNote.value;
                        if (noteText) {
                            cb(noteText);
                            S.newNote.value = '';
                            return;
                        }
                        alert('Введите текст заметки');
                    })
                }
            }
            if (!events[eventName]) {
                console.warn('Такого события нет ' + eventName);
                return;
            }
            events[eventName]();
        }
    }
}())