// let keyboardCode = [],
//     keyboardKey = [];
// document.onkeypress = function(event) {
//     keyboardCode.push(event.code);
//     keyboardKey.push(event.key);
//     console.log(keyboardCode);
//     console.log(keyboardKey);
// }


const keyboardCode = [
    ["Backquote", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Minus", "Equal", "Backspace"],
    ["Tab", "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight", "Backslash", "Delete"],
    ["CapsLock", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote", "Enter"],
    ["ShiftLeft", "Backslash", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash", "ArrowUp", "ShiftRight"],
    ["ControlLeft", "MetaLeft", "AltLeft", "Space", "AltRight", "MetaLeft", "ControlRight", "ArrowLeft", "ArrowDown", "ArrowRight"]
];

const keyboardEn = [
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
    ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\', 'DEL'],
    ['Caps Lock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '\'', 'ENTER'],
    ['Shift', '\\', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', '&uarr;', 'Shift'],
    ['Ctrl', 'Win', 'Alt', ' ', 'Alt', 'Win', 'Ctrl', '&larr;', '&darr;', '&rarr;']
];
const keyboardRu = [
    ['Ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
    ['Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '\\', 'DEL'],
    ['Caps Lock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'ENTER'],
    ['Shift', '\\', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', '.', '&uarr;', 'Shift'],
    ['Ctrl', 'Win', 'Alt', ' ', 'Alt', 'Win', 'Ctrl', '&larr;', '&darr;', '&rarr;']
];

const KEYBOARD = {
    elements: {
        main: null,
        textOut: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: "",
        capsLock: false,
        shift: false,
        alt: false
    },

    init() {
        console.log('start keyboard');

        // Create main elements
        this.elements.main = document.createElement("div");
        this.elements.textOut = document.createElement("textarea");
        this.elements.keysContainer = document.createElement("div");

        // Setup main elements
        this.elements.main.classList.add("wrapper");
        this.elements.textOut.classList.add("textbox");
        this.elements.keysContainer.classList.add("keyboard");


        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        // Add to DOM
        this.elements.main.appendChild(this.elements.textOut);
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

    },
    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "Backspace",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
            "Caps Lock", "a", "s", "d", "f", "g", "h", "j", "k", "l", "ENTER", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
            " "
        ];

        // Creates HTML for an icon
        const createIconHTML = (icon_name, key_name) => {
            return `<i class="material-icons">${icon_name}</i> ${key_name}`;
        };

        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            // Add attributes/classes
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");

            switch (key) {
                case "Backspace":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("keyboard_backspace", key);
                    break;

                case "Caps Lock":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.innerHTML = createIconHTML("keyboard_capslock", key);

                    break;

                case "ENTER":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("keyboard_return", key);

                    break;

                case " ":
                    keyElement.classList.add("keyboard__key--extra-wide");
                    keyElement.innerHTML = createIconHTML("space_bar", " ");


                    break;

                    // case "done":
                    //     keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
                    //     keyElement.innerHTML = createTextHTML("check_circle");
                    //
                    //     break;

                default:
                    keyElement.textContent = key.toLowerCase();
                    break;
            };
            fragment.appendChild(keyElement);
        });

        return fragment;
    },

}

window.addEventListener("DOMContentLoaded", function() {
    KEYBOARD.init();
});