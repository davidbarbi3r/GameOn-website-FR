// topnav open/close on click responsive
let x = document.getElementById("myTopnav");

const editNav = () => {
  if (x.className === "topnav") {
      x.className += " responsive";
  } else {
      x.className = "topnav";
  }
}

x.addEventListener("click", editNav);

// modal class
class Modal {
  constructor(openElDOM, closeElDOM, outsideModElDOM) {
    //all because there are multiple buttons to open the modal
    this.openElDOM = document.querySelectorAll(openElDOM);

    //no need to querySelectorAll because there is only one button to close the modal
    this.closeElDOM = document.querySelectorAll(closeElDOM);
    this.outsideModElDOM = document.querySelector(outsideModElDOM);

    this.event();
  }

  event() {
    // launch modal event
    this.openElDOM.forEach((element) => {
      element.addEventListener("click", this.launchModal.bind(this));
    });

    // close modal event when X button pushed
    this.closeElDOM.forEach((element) => {
      element.addEventListener("click", this.closeModal.bind(this));
    });
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

const modal = new Modal(".modal-btn", ".close", ".bground");

// form validation
class Form {
  constructor(
    firstNameEl,
    lastNameEl,
    emailEl,
    birthdateEl,
    quantityEl,
    locationEl,
    checkboxEl,
    formEl
  ) {
    this.firstNameEl = document.querySelector(firstNameEl);
    this.lastNameEl = document.querySelector(lastNameEl);
    this.emailEl = document.querySelector(emailEl);
    this.birthdateEl = document.querySelector(birthdateEl);
    this.quantityEl = document.querySelector(quantityEl);
    this.locationEl = document.getElementsByName(locationEl);
    this.checkboxEl = document.querySelector(checkboxEl);
    this.formEl = document.querySelector(formEl);

    this.event();
  }

  // listen to submit event
  event() {
    this.formEl.addEventListener("submit", this.submitForm.bind(this));
  }

  // submit form
  submitForm(e) {
    e.preventDefault();
    console.log(this.formEl.value)

    const checkFirstName = this.checkInput("text", this.firstNameEl);
    const checkLastName = this.checkInput("text", this.lastNameEl);
    const checkEmail = this.checkInput("email", this.emailEl);
    const checkDate = this.checkInput("date", this.birthdateEl);
    const checkQuantity = this.checkInput("number", this.quantityEl);
    const checkLocation = this.checkInput("location", this.locationEl);
    const checkConditions = this.checkInput("checkbox", this.checkboxEl);

    // if all inputs are valid submit form
    if (
      checkFirstName &&
      checkLastName &&
      checkEmail &&
      checkQuantity &&
      checkDate &&
      checkConditions &&
      checkLocation
    ) {
      this.formEl.innerHTML =
        `
        <div class="success">
          <p>Merci pour votre inscription</p>
          <button class="btn-submit" onclick="modal.closeModal()">Fermer</button>
        </div>
        `
    }
  }

  checkInput(type, querySelector) {
    //text input validation
    if (type === "text") {
      // if first name or last name is empty display error message
      if (querySelector.value.trim() === "") {
        this.#setErrorFor(querySelector, "Ce champ est requis");
        return false;
      }

      // if first name or last name is less than 2 characters display error message
      else if (querySelector.value.trim().length < 2) {
        this.#setErrorFor(
          querySelector,
          "Ce champ doit comporter au moins 2 caractères"
        );
        return false;
      } else if (!isNaN(querySelector.value)) {
        this.#setErrorFor(querySelector, "Ce champ doit comporter du texte");
        return false;
      }
      // else success
      else {
        this.#setSuccessFor(querySelector);
        return true;
      }

      // email input validation
    } else if (type === "email") {
      // if email is empty display error message
      if (querySelector.value.trim() === "") {
        this.#setErrorFor(querySelector, "L'Email doit être renseigné");
        return false;
      }

      // if email is not valid display error message
      else if (!utils.isEmail(querySelector.value.trim())) {
        this.#setErrorFor(querySelector, "L'Email renseigné n'est pas valide");
        return false;
      }
      // else success
      else {
        this.#setSuccessFor(querySelector);
        return true;
      }

      // participations number input validation
    } else if (type === "number") {
      // if participations is empty display error message
      if (querySelector.value.trim() === "") {
        this.#setErrorFor(
          querySelector,
          "Il faut renseigner son nombre de participations"
        );
        return false;
      }

      //if participations is not a number display error message
      else if (isNaN(querySelector.value)) {
        this.#setErrorFor(
          querySelector,
          "Le nombre de participations doit être un nombre"
        );
        return false;
      }

      //if participations is less than 0 or more than 99 display error message
      else if (querySelector.value < 0 || querySelector.value > 99) {
        this.#setErrorFor(
          querySelector,
          "Le nombre de participations doit être compris entre 0 et 99"
        );
        return false;
      }
      // else success
      else {
        this.#setSuccessFor(querySelector);
        return true;
      }

      // location input validation
    } else if (type === "location") {
      let checked = false;

      //iterate over all location radio buttons
      for (let i = 0; i < querySelector.length; i++) {
        // if one of the radio buttons is checked return true
        if (querySelector[i].checked) {
          checked = true;
        }
      }

      // if no radio button is checked display error message
      if (checked === false) {
        this.#setErrorFor("location", "Vous devez choisir une ville");
        return false;

        // else success
      } else {
        this.#setSuccessFor("location");
        return true;
      }
    }

    // validation for general conditions checkbox
    else if (type === "checkbox") {
      if (querySelector.checked === false) {
        this.#setErrorFor(
          querySelector,
          "Vous devez accepter les conditions d'utilisation"
        );
        return false;
      } else {
        this.#setSuccessFor(querySelector);
        return true;
      }
    } 

    // validation for date input
    else if (type === "date") {
      // if date is empty display error message
      if (querySelector.value.trim() === "") {
        this.#setErrorFor(querySelector, "La date de naissance doit être renseignée");
        return false;
      }

      // if date is not valid display error message
      else if (!utils.isDateFormat(querySelector.value.trim())) {
        this.#setErrorFor(querySelector, "La date de naissance renseignée n'est pas valide");
        return false;
      }

      // if date is future display error message
      else if (utils.isDateFuture(querySelector.value.trim())) {
        this.#setErrorFor(querySelector, "La date de naissance renseignée ne peut pas être future");
        return false;
      }

      // else success
      else {
        this.#setSuccessFor(querySelector);
        return true;
      }
    }
  }

  #setErrorFor(inputEl, message) {
    // display data-error message
    if (inputEl === "location") {
      document
        .getElementById("location-radio")
        .setAttribute("data-error", message);
      document
        .getElementById("location-radio")
        .setAttribute("data-error-visible", true);
    } else {
      inputEl.parentElement.setAttribute("data-error", message);
      inputEl.parentElement.setAttribute("data-error-visible", true);
    }
  }

  #setSuccessFor(inputEl) {
    // remove data-error message
    if (inputEl === "location") {
      document.getElementById("location-radio").removeAttribute("data-error");
      document
        .getElementById("location-radio")
        .setAttribute("data-error-visible", false);
    } else {
      inputEl.parentElement.removeAttribute("data-error");
      inputEl.parentElement.setAttribute("data-error-visible", false);
    }
  }
}

const utils = {

  // check if email is valid
  isEmail(email) {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  },

  // check if date is in the correct format
  isDateFormat(date) {
    return /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/.test(date);
  },

  // check if date is in the past
  isDateFuture(date) {
    let dateArray = date.split("-");
    console.log(dateArray);
    let dateObject = new Date(dateArray[0], dateArray[1], dateArray[2]);
    let today = new Date();
    if (dateObject > today) {
      return true;
    }
    return false;
  },
};

const form = new Form(
  "#first",
  "#last",
  "#email",
  "#birthdate",
  "#quantity",
  "location",
  "#checkbox1",
  "#reserve"
);


document.getElementById(
  "copyrights"
).innerHTML = `Copyright 2012 - ${new Date().getFullYear()}, GameOn Inc.`;
