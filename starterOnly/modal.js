function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

class Modal {
  constructor(openElDOM, closeElDOM, outsideModElDOM) {
    this.openElDOM = document.querySelector(openElDOM);
    this.closeElDOM = document.querySelector(closeElDOM);
    this.outsideModElDOM = document.querySelector(outsideModElDOM);

    this.event();
  }

  event() {
    // launch modal event
    this.openElDOM.addEventListener("click", this.launchModal.bind(this));

    // close modal event when X button pushed
    this.closeElDOM.addEventListener("click", this.closeModal.bind(this));
  }

  // launch modal form
  launchModal() {
    this.outsideModElDOM.style.display = "block";
  }

  // Close modal form
  closeModal() {
    this.outsideModElDOM.style.display = "none";
  }
}

const modal = new Modal(".modal-btn", ".close", ".bground", ".modal-body");
