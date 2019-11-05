function makeContact(obj) {
  return `
    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
      <div class="card contact">
        <div class="card-header">
          <h5>${obj.fullName()}</h5>
        </div>
        <div class="card-body">
          <div class="card-text">
            <p class="number">${obj.phoneNumber}</p>
            <p class="email">${obj.email}</p>
            <p class="address">${obj.address}</p>
            <p>ID: <span class="idSpan">${obj.id}</span></p>
          </div>
        </div>
        <div class="card-footer">
          <button value="${obj.id}" class="delete btn btn-info">DELETE</button>
          <button value="${obj.id}" class="update btn btn-info">UPDATE</button>
        </div>
      </div>
    </div>
  `
}

function makeForm(obj) {
  return `
    <div class="card-header">
      <h5>${obj.fullName()}</h5>
    </div>
    <div class="card-body">
      <input class="first" type="text" placeholder="${obj.firstName}">
      <input class="last" type="text" placeholder="${obj.lastName}">
      <input class="phone" type="text" placeholder="${obj.phoneNumber}">
      <input class="emailUpdate" type="text" placeholder="${obj.email}">
      <input class="addressUpdate" type="text" placeholder="${obj.address}">
    </div>
    <div class="card-footer">
      <button class="submitUpdate btn btn-info">SUBMIT UPDATE</button>
    </div>
  `
}
