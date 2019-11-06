const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: []
  },

  eventHandlers: {
    oninput: null
  },

  properties: {
    value: "",
    language: "",
    capsLock: false
  },

  init() {
    this.properties.language = window.localStorage.getItem("lang") || "en";
    this.elements.main = document.createElement("div");
    this.elements.keysContainer = document.createElement("div");

    this.elements.main.classList.add("keyboard");
    this.elements.keysContainer.classList.add("keyboard--keys");
    this.elements.keysContainer.appendChild(this._createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard--key")

    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    document.querySelectorAll(".keyboard-input").forEach(element => {
      this.open(element.value, currentValue => {
        element.value = currentValue;
      });
    });

    for (let i = 0; i < keyLayout.length; i += 1) {
      const b = document.querySelectorAll("button")[i];
      b.setAttribute("data-code", eventCode[i]);
    }
  },

  destroy() {
    this.elements.main.remove();
  },

  _createKeys() {
    const fragment = document.createDocumentFragment();
    if (this.properties.language === "en") {
      keyLayout = [
        "~", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
        "tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "del",
        "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter",
        "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?", "up", "shift",
        "ctrl", "alt", "space", "alt", "left", "down", "right", "ctrl"
      ];
    }
    if (this.properties.language === "ru") {
      keyLayout = [
        "~", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
        "tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "del",
        "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "л", "д", "э", "enter",
        "shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "up", "shift",
        "ctrl", "alt", "space", "alt", "left", "down", "right", "ctrl"
      ];
    }
    eventCode = [
      "Backquote", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Minus", "Equal", "Backspace",
      "Tab", "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight", "Delete",
      "CapsLock", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote", "Enter",
      "ShiftLeft", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash", "ArrowUp", "ShiftRight",
      "ControlLeft", "AltLeft", "Space", "AltRight", "ArrowLeft", "ArrowDown", "ArrowRight", "ControlRight"
    ];

    const createIconHTML = (icon_name) => {
      return `<i class="material-icons">${icon_name}</i>`;
    };

    keyLayout.forEach(key => {
      const keyElement = document.createElement("button");

      keyElement.classList.add("keyboard--key");

      switch (key) {
        case "backspace":
          keyElement.classList.add("keyboard--key_wide");
          keyElement.innerHTML = createIconHTML("backspace");

          keyElement.addEventListener("click", () => {
            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
            this._triggerEvent("oninput");
          });

          break;

        case "caps":
          keyElement.classList.add("keyboard--key_wide")
          keyElement.innerHTML = createIconHTML("keyboard_capslock");

          keyElement.addEventListener("click", () => {
            this._toggleCapsLock();
          });

          break;

        case "enter":
          keyElement.classList.add("keyboard--key_wide")
          keyElement.innerHTML = createIconHTML("keyboard_return");

          keyElement.addEventListener("click", () => {
            this.properties.value += "\n";
            this._triggerEvent("oninput");
          });

          break;

        case "tab":
          keyElement.classList.add("keyboard--key_wide")
          keyElement.innerHTML = createIconHTML("keyboard_tab");

          keyElement.addEventListener("click", () => {
            this.properties.value += "    ";
            this._triggerEvent("oninput");
          });

          break;

        case "shift":
          keyElement.textContent = key.toLowerCase();
          keyElement.classList.add("keyboard--key_wide")

          keyElement.addEventListener("click", () => {

          });

          break;

        case "up":
          keyElement.innerHTML = createIconHTML("keyboard_arrow_up");

          keyElement.addEventListener("click", () => {
            this.properties.value += "▲";
            this._triggerEvent("oninput");
          });

          break;

        case "down":
          keyElement.innerHTML = createIconHTML("keyboard_arrow_down");

          keyElement.addEventListener("click", () => {
            this.properties.value += "▼";
            this._triggerEvent("oninput");
          });

          break;

        case "left":
          keyElement.innerHTML = createIconHTML("keyboard_arrow_left");

          keyElement.addEventListener("click", () => {
            this.properties.value += "◄";
            this._triggerEvent("oninput");
          });

          break;

        case "right":
          keyElement.innerHTML = createIconHTML("keyboard_arrow_right");

          keyElement.addEventListener("click", () => {
            this.properties.value += "►";
            this._triggerEvent("oninput");
          });

          break;

        case "space":
          keyElement.classList.add("keyboard--key_space");
          keyElement.innerHTML = createIconHTML("space_bar");

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
      }

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
  }
};

window.addEventListener("DOMContentLoaded", () => {
  const textArea = document.createElement("textarea");
  textArea.className = "keyboard-input";
  textArea.autofocus = true;
  document.body.append(textArea);

  Keyboard.init();
});

document.addEventListener("keydown", (event) => {
  document.querySelector("button[data-code=" + event.code + "]").classList.add("active");

  if (event.key === "Shift" && event.altKey) {
    localStorage.lang = localStorage.lang === "ru" ? localStorage.lang = "en" : localStorage.lang = "ru";

    Keyboard.destroy();
    Keyboard.init();
  }
});

document.addEventListener("keyup", (event) => {
  document.querySelector("button[data-code=" + event.code + "]").classList.remove("active");
});
