class Accordion extends HTMLElement {
  constructor() {
    super();
  }
	connectedCallback() {
    let shadowRoot = this.attachShadow({mode: 'open'});

    shadowRoot.innerHTML = `
      <div class="accordion__container">
        <slot></slot>
      </div>
    `;   
  }
}

class AccordionItem extends HTMLElement {
  constructor() {
    super();
  }
  toggleDrawer() {
    console.log('toggle!!!')
  }
  connectedCallback() {
    let shadowRoot = this.attachShadow({mode: 'open'});

    shadowRoot.innerHTML = `
      <style>
         .panel {
          padding: 0 18px;
          background-color: white;
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.2s ease-out;
        }
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
      </style>
      <button class="accordion">${this.getAttribute('title')}</button>
      <div class="panel">
        <p>${this.getAttribute('content')}</p>
      </div>
    `;
    this.$button = this.shadowRoot.querySelector('button.accordion');
    
    this.$button.addEventListener('click', (e) => {
      let panel = this.$button.nextElementSibling;
      this.$button.classList.toggle("active");
      if (panel.style.maxHeight){
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      } 
    });

  }
}

window.customElements.define('wc-accordion-item', AccordionItem);
window.customElements.define('wc-accordion', Accordion);

