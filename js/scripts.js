
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
function Contact(firstName, lastName, phoneNumber) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

Contact.prototype.update = function(obj) {
  if (obj.firstName) this.firstName = obj.firstName;
  if (obj.lastName) this.lastName = obj.lastName;
  if (obj.phoneNumber) this.phoneNumber = obj.phoneNumber;
  return true;
}

var addressBook = new AddressBook();
var contact = new Contact("Ada", "Lovelace", "503-555-0100");
var contact2 = new Contact("Grace", "Hopper", "503-555-0199");
var contact3 = new Contact("Ada", "Lovelace", "503-555-0100");
var contact4 = new Contact("Grace", "Hopper", "503-555-0199");
addressBook.addContact(contact);
addressBook.addContact(contact2);
addressBook.addContact(contact3);
addressBook.addContact(contact4);


function storeContact(firstName, lastName, phoneNumber) {
  var contact = new Contact(firstName, lastName, phoneNumber);
  addressBook.addContact(contact);
}







$(document).ready(function() {

  function refresh() {

    $('.contacts').text("")
    addressBook.contacts.forEach(function(contact) {
      if (contact) {
        $(".contacts").append(makeContact(contact));
      }
    })

    $('.delete').click(function(event) {
      var thisID = parseInt($(event.target).parents('.contact').find(".idSpan").text());
      addressBook.deleteContact(thisID);
      refresh();
    });

    $('.update').click(function(event) {
      var thisID = parseInt($(event.target).parents('.contact').find(".idSpan").text());
      thisContact = addressBook.findContact(thisID);
      var thisCard = $(event.target).parents('.contact');
      thisCard.text('');
      thisCard.append(makeForm(thisContact));

      $('.submitUpdate').click(function(event) {
        let updateObject = {
          firstName: $('.first').val(),
          lastName: $('.last').val(),
          phoneNumber: $('.number').val()
        };
        thisContact.update(updateObject);
        refresh();
      });

    });
  }

  $('#contactForm').submit(function(event){
    event.preventDefault();
    let tempFirstName = $('#firstName').val();
    let tempLastName = $('#lastName').val();
    let tempPhoneNumber = $('#phone').val();
    storeContact(tempFirstName, tempLastName, tempPhoneNumber);
    refresh();
  });


  refresh();

});
