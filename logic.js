class Accordion extends HTMLElement {
  constructor() {
    super();
  }
	connectedCallback() {
    let shadowRoot = this.attachShadow({mode: 'open'});

    shadowRoot.innerHTML = `
      <style>
        .accordion {
          background-color: #eee;
          color: #444;
          cursor: pointer;
          padding: 18px;
          width: 100%;
          border: none;
          text-align: left;
          outline: none;
          font-size: 15px;
          transition: 0.4s;
        }

        .active, .accordion:hover {
          background-color: #ccc;
        }

        .panel {
          padding: 0 18px;
          background-color: white;
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.2s ease-out;
        }
      </style>
      <div class="accordion__container">
        <button class="accordion">Section 1</button>
        <div class="panel">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>

        <button class="accordion">Section 2</button>
        <div class="panel">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>

        <button class="accordion">Section 3</button>
        <div class="panel">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>

      </div>
    `;
    this.$buttons = this.shadowRoot.querySelectorAll('button.accordion');
    this.$buttons.forEach((button) => {
      button.addEventListener('click', (e) => {
        button.classList.toggle("active");
        var panel = button.nextElementSibling;
        if (panel.style.maxHeight){
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        } 
      });
    })
  }

  disconnectedCallback() {
    console.log('disconnected!');
  }

  attributeChangedCallback(name, oldVal, newVal) {
    console.log(`Attribute: ${name} changed!`);
  }

  adoptedCallback() {
    console.log('adopted!');
  }
}

window.customElements.define('wc-accordion', Accordion)

