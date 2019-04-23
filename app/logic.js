class Accordion extends HTMLElement {
  constructor() {
    super();
  }
	connectedCallback() {
    let shadowRoot = this.attachShadow({mode: 'open'});

    shadowRoot.innerHTML = `
      <div class="accordion__container" aria-labelledby="${this.getAttribute('id')}">
        <slot></slot>
      </div>
    `;   
  }
}

class AccordionItem extends HTMLElement {
  constructor() {
    super();
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
          background-color: white;
          color: #444;
          cursor: pointer;
          padding: 18px;
          width: 100%;
          border: none;
          text-align: left;
          outline: none;
          font-size: 15px;
          transition: 0.4s;
          display: flex;
          justify-content: space-between;
        }
        .accordion {
          border-radius: 5px;
          margin-top: 5px;
          border: 3px solid black;
          font-weight: bold;
        }

        .active {
          border: 3px solid black;
          border-radius: 5px;
          margin-top: 5px;
        }
        .accordion:hover {
          cursor: pointer;
        }
        .accordion__minus {
          display: none;
        }
      </style>
      <button class="accordion" aria-expanded="false">
        ${this.getAttribute('title')}
        <span class="accordion__plus">+</span>
        <span class="accordion__minus">-</span>
      </button>
      <div class="panel">
        <p>${this.getAttribute('content')}</p>
      </div>
    `;
    
    this.$button = this.shadowRoot.querySelector('button.accordion');
    
    this.$button.addEventListener('click', (e) => {
      let panel = this.$button.nextElementSibling;
      if (panel.style.maxHeight){
        panel.style.maxHeight = null;
        panel.classList.remove('active');
        this.$button.setAttribute("aria-expanded", "false");
        this.$button.getElementsByClassName('accordion__plus')[0].style.display = 'block';
        this.$button.getElementsByClassName('accordion__minus')[0].style.display = 'none';
      } else {
        this.$button.setAttribute("aria-expanded", "true");
        this.$button.getElementsByClassName('accordion__plus')[0].style.display = 'none';
        this.$button.getElementsByClassName('accordion__minus')[0].style.display = 'block';
        panel.classList.add('active');
        panel.style.maxHeight = panel.scrollHeight + "px";
      } 
    });

  }
}

window.customElements.define('wc-accordion-item', AccordionItem);
window.customElements.define('wc-accordion', Accordion);

