const eventCode = [
    "Backquote", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Minus", "Equal", "Backspace",
    "Tab", "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight", "Backslash", "Delete",
    "CapsLock", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote", "Enter",
    "ShiftLeft", "Backslash", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash", "ArrowUp", "ShiftRight",
    "ControlLeft", "MetaLeft", "AltLeft", "Space", "AltRight", "MetaLeft", "ControlRight", "ArrowLeft", "ArrowDown", "ArrowRight"
];

const KEYBOARD = {
    elements: {
        main: null,
        textOut: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null
    },

    properties: {
        value: "",
        capsLock: false
    },
    init() {

        // Create main elements
        this.elements.main = document.createElement("div");
        this.elements.textOut = document.createElement("textarea");
        this.elements.keysContainer = document.createElement("div");

        // Setup main elements
        this.elements.main.classList.add("wrapper");
        this.elements.textOut.classList.add("textbox");
        this.elements.textOut.setAttribute('id', 'textbox');
        this.elements.keysContainer.classList.add("keyboard");


        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        // Add to DOM
        this.elements.main.appendChild(this.elements.textOut);
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        document.querySelectorAll(".textbox").forEach(element => {
            this.open(element.value, currentValue => {
                element.value = currentValue;
            });
        });
    },
    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
            'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\', 'DEL',
            'Caps Lock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '\'', 'ENTER',
            'Shift', '\\', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', '&uarr;', 'Shift',
            'Ctrl', 'Win', 'Alt', ' ', 'Alt', 'Win', 'Ctrl', '&larr;', '&darr;', '&rarr;'
        ];

        // Creates HTML for an icon
        const createIconHTML = (icon_name, key_name) => {
            return `<i class="material-icons">${icon_name}</i> ${key_name}`;
        };

        keyLayout.forEach((key,index) => {
            const keyElement = document.createElement("button");

            // Add attributes/classes
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");
            keyElement.setAttribute("data", `${eventCode[index]}`);
            switch (key) {
                case "Backspace":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("keyboard_backspace", key);
                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");
                    });
                    break;

                case "Caps Lock":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("keyboard_capslock", key);
                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
                    });
                    break;

                case "ENTER":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("keyboard_return", key);
                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput"); });
                    break;

                case "&uarr;":
                    keyElement.classList.add("keyboard__key", "keyboard__key--disable");
                    keyElement.innerHTML = createIconHTML("arrow_upward", '');
                    break;

                case "&larr;":
                    keyElement.classList.add("keyboard__key", "keyboard__key--disable");
                    keyElement.innerHTML = createIconHTML("arrow_back", '');
                    break;

                case "&darr;":
                    keyElement.classList.add("keyboard__key", "keyboard__key--disable");
                    keyElement.innerHTML = createIconHTML("arrow_downward", '');
                    break;

                case "&rarr;":
                    keyElement.classList.add("keyboard__key", "keyboard__key--disable");
                    keyElement.innerHTML = createIconHTML("arrow_forward", '');
                    break;
                
                case "Tab":case "DEL":case 'Alt': case 'Win': case 'Ctrl':
                    keyElement.classList.add("keyboard__key", "keyboard__key--disable");
                    keyElement.textContent = key.toLowerCase();
                    break;

                case "Shift":
                    keyElement.classList.add("keyboard__key--large-wide", "keyboard__key--disable");
                    keyElement.textContent = key.toLowerCase();
                    break;

                case " ":
                    keyElement.classList.add("keyboard__key--extra-wide");
                    keyElement.innerHTML = createIconHTML("space_bar", " ");
                    keyElement.addEventListener("click", () => {
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                    });
                    break;

                default:
                    keyElement.textContent = key.toLowerCase();
                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this._triggerEvent("oninput");
                    });
                    break;
            };
            fragment.appendChild(keyElement);
        });
        return fragment;
    },
    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },
    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },
    open(initialValue, oninput) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
    },
    
}

window.addEventListener("DOMContentLoaded", function() {
    KEYBOARD.init();
});

// keyboard typing in textarea
document.onkeypress=function(event){
    const elementKey=event.key;
    document.querySelectorAll('.keyboard .keyboard__key').forEach(function(element) {
        element.classList.remove('keyboard__key--press');
    });
    const elementCode = document.querySelector(`.keyboard .keyboard__key[data="${event.code}"]`);
    elementCode.classList.add('keyboard__key--press');
    setTimeout(function () {
        elementCode.classList.remove('keyboard__key--press');
    }, 200);   
    // KEYBOARD.properties.value+=elementKey;

    const outTextBox = document.getElementById('textbox');
    KEYBOARD.properties.value+=elementKey;
    outTextBox.value=KEYBOARD.properties.value;
}



