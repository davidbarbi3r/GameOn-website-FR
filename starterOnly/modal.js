function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// modal class
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

// form validation
class Form {
  constructor(firstNameEl, lastNameEl, emailEl, birthdateEl, quantityEl, locationEl, checkboxEl, formEl) {
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

    const checkFirstName = this.checkInput("text", this.firstNameEl);
    const checkLastName = this.checkInput("text", this.lastNameEl);
    const checkEmail = this.checkInput("email", this.emailEl);
    const checkQuantity = this.checkInput("number", this.quantityEl);
    const checkLocation = this.checkInput("location", this.locationEl);
    const checkConditions = this.checkInput("checkbox", this.checkboxEl);


    // if all inputs are valid submit form
    if (checkFirstName && checkLastName && checkEmail && checkQuantity && checkConditions && checkLocation) {
      
      this.formEl.innerHTML = "<p>✅ Votre inscription à l'évènement a bien été prise en compte !</p>"
      
      setTimeout(() => {
        this.formEl.submit();
      }, 2000)
    }
  }

  checkInput(type, querySelector) {

    //text input validation
    if (type === "text") {

      // if first name or last name is empty display error message
      if (querySelector.value.trim() === "") {
        this._setErrorFor(querySelector, "Ce champ est requis");
        return false;
      } 

      // if first name or last name is less than 2 characters display error message
      else if (querySelector.value.trim().length < 2) {
        this._setErrorFor(querySelector, "Ce champ doit comporter au moins 2 caractères");
        return false;
      }

      else if (!isNaN(querySelector.value)) {
        this._setErrorFor(querySelector, "Ce champ doit comporter du texte");
        return false;
      }
      // else success
      else {
        this._setSuccessFor(querySelector);
        return true;
      }

    // email input validation
    } else if (type === "email") {

      // if email is empty display error message
      if (querySelector.value.trim() === "") {
        this._setErrorFor(querySelector, "L'Email doit être renseigné");
        return false;
      } 

      // if email is not valid display error message
      else if (!utils.isEmail(querySelector.value.trim())) {
        this._setErrorFor(querySelector, "L'Email renseigné n'est pas valide");
        return false;
      }
      // else success
      else {
        this._setSuccessFor(querySelector);
        return true;
      }

    // participations number input validation
    } else if (type === "number") {

      // if participations is empty display error message
      if (querySelector.value.trim() === "") {
        this._setErrorFor(querySelector, "Il faut renseigner son nombre de participations");
        return false;
      } 
      
      //if participations is not a number display error message
      else if (isNaN(querySelector.value)) {
        this._setErrorFor(querySelector, "Le nombre de participations doit être un nombre");
        return false;
      } 
      
      //if participations is less than 0 or more than 99 display error message
      else if (querySelector.value < 0 || querySelector.value > 99) {
        this._setErrorFor(querySelector, "Le nombre de participations doit être compris entre 0 et 99");
        return false;
      }
      // else success 
      else {
        this._setSuccessFor(querySelector);
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
        this._setErrorFor("location", "Vous devez choisir une ville");
        return false;

      // else success
      } else {
        this._setSuccessFor("location");
        return true;
      }
    } 
    
    
    
    // validation for general conditions checkbox
    else if (type === "checkbox") {
      if (querySelector.checked === false) {
        this._setErrorFor(querySelector, "Vous devez accepter les conditions d'utilisation");
        return false;
      } else {
        this._setSuccessFor(querySelector);
        return true;
      }
    }
  }


  _setErrorFor(inputEl, message) {
    // display data-error message
    if (inputEl === "location") {
      document.getElementById("location-radio").setAttribute("data-error", message);
      document.getElementById("location-radio").setAttribute("data-error-visible", true);
    } else {
      inputEl.parentElement.setAttribute("data-error", message);
      inputEl.parentElement.setAttribute("data-error-visible", true);
    }
  }

  _setSuccessFor(inputEl) {
      // remove data-error message
    if (inputEl === "location") {
      document.getElementById("location-radio").removeAttribute("data-error");
      document.getElementById("location-radio").setAttribute("data-error-visible", false);
    } else {
      inputEl.parentElement.removeAttribute("data-error");
      inputEl.parentElement.setAttribute("data-error-visible", false);
    }
  }
}

const utils = {
  
  isEmail(email) {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  },
}

const form = new Form("#first", "#last", "#email", "#birthdate", "#quantity", "location", "#checkbox1", "#reserve");
