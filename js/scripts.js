
// AddressBook Logic
function AddressBook() {
  this.contacts = [],
  this.currentId = 0
}

AddressBook.prototype.addContact = function(contact) {
  if (!contact.id) {
    contact.id = this.assignId();
    this.contacts.push(contact);
  } else {
    this.contacts.forEach(function(cntct) {
      if (cntct.id === contact.id) {
        contact.id = this.assignId();
      }
    });
    this.contacts.push(contact);
  }
  return null;
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (var i=0; i < this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id === id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (var i=0; i < this.contacts.length; i++) {
    if (this.contacts[i]) {
      if(this.contacts[i].id === id) {
        delete this.contacts[i];
      }
    }
  };
  return false;
}


// Contacts Logic
function Contact(firstName, lastName, phoneNumber, email, address) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.email = email;
  this.address = address;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

Contact.prototype.update = function(obj) {
  if (obj.firstName) this.firstName = obj.firstName;
  if (obj.lastName) this.lastName = obj.lastName;
  if (obj.phoneNumber) this.phoneNumber = obj.phoneNumber;
  if (obj.email) this.email = obj.email;
  if (obj.address) this.address = obj.address;
  return true;
}

var addressBook = new AddressBook();
var contact = new Contact("Ada", "Lovelace", "503-555-0100", "adalovelace@gmail.com", "1234 se stark st");
var contact2 = new Contact("Grace", "Hopper", "503-555-0199", "gracehopper@gmail.com", "4321 se stark st");
var contact3 = new Contact("Ada", "Lovelace", "503-555-0100", "adaaaaaaalove@gmail.com", "240 ne killingsworth st");
var contact4 = new Contact("Grace", "Hopper", "503-555-0199", "gracieyo@gmail.com", "420 ne killingsworth st");
addressBook.addContact(contact);
addressBook.addContact(contact2);
addressBook.addContact(contact3);
addressBook.addContact(contact4);


function storeContact(firstName, lastName, phoneNumber, email, address) {
  var contact = new Contact(firstName, lastName, phoneNumber, email, address);
  addressBook.addContact(contact);
}







$(document).ready(function() {

  function refresh() {
    $('.contacts').text("")
    var result = "";
    addressBook.contacts.forEach(function(contact) {
      if (contact) {
        result += makeContact(contact);
      }
    })
    $(".contacts").append(result);
  }

  $('.contacts').on("click", ".delete", function(){
    var thisID = parseInt(this.value);
    addressBook.deleteContact(thisID);
    refresh();
  })

  $('.contacts').on("click", ".update", function(){
    var thisID = parseInt(this.value);
    var thisContact = addressBook.findContact(thisID);
    var thisCard = $(this).parents('.contact');
    thisCard.text('');
    var thisForm = makeForm(thisContact);
    thisCard.append(thisForm);

    $('.submitUpdate').click(function() {
      var updateObject = {
        firstName: $('.first').val(),
        lastName: $('.last').val(),
        phoneNumber: $('.phone').val(),
        email: $('.emailUpdate').val(),
        address: $('.addressUpdate').val()
      };
      thisContact.update(updateObject);
      refresh();
    });
  });

  $('#contactForm').submit(function(event){
    event.preventDefault();
    var tempFirstName = $('#firstName').val();
    var tempLastName = $('#lastName').val();
    var tempPhoneNumber = $('#phone').val();
    var tempEmail = $('#email').val();
    var tempAddress = $('#address').val();
    storeContact(tempFirstName, tempLastName, tempPhoneNumber, tempEmail, tempAddress);
    refresh();
  });


  refresh();

});
