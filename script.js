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
        capsLock: false
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
                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
                    });
                    break;

                case "ENTER":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("keyboard_return", key);

                    break;
                case "&uarr;":
                    keyElement.classList.add("keyboard__key");
                    keyElement.innerHTML = createIconHTML("arrow_upward", '');

                    break;
                case "&larr;":
                    keyElement.classList.add("keyboard__key");
                    keyElement.innerHTML = createIconHTML("arrow_back", '');

                    break;
                case "&darr;":
                    keyElement.classList.add("keyboard__key");
                    keyElement.innerHTML = createIconHTML("arrow_downward", '');

                    break;
                case "&rarr;":
                    keyElement.classList.add("keyboard__key");
                    keyElement.innerHTML = createIconHTML("arrow_forward", '');

                    break;
                case "Shift":
                    keyElement.classList.add("keyboard__key--large-wide");
                    keyElement.textContent = key.toLowerCase();
                    break;
                case " ":
                    keyElement.classList.add("keyboard__key--extra-wide");
                    keyElement.innerHTML = createIconHTML("space_bar", " ");
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