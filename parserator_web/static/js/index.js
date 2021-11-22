/* TODO: Flesh this out to connect the form to the API and render results
   in the #address-results div. */

'use strict'
$(document).ready(function () {
  $("#submit").click(function (e) {
    e.preventDefault()
    $.ajax({
      url: "api/parse/",
      type: "GET",
      contentType: "application/json",
      data: {
        address: $("#address").val()
      },
      success: function (response) {
        // console.log(response);
        displayResponse(response)
      },
      error: function (error) {
        // console.log(error);
        displayError(error)
      }
    })
  })
})

function displayResponse (response) {
  // remove error alert if present
  try {
    document.querySelector(".alert-danger").style.display = "none"
  }
  // add parsed address data to table
  finally {
    var results_table = document.getElementById("address-results")
    results_table.style.display = "inline"

    var address_type = document.getElementById("parse-type")
    address_type.textContent = response[1]

    var table_body = document.getElementsByTagName("tbody")[0]
    Object.entries(response[0]).forEach(function (entry) {
      var tag = entry[0]
      var part = entry[1]
      var new_row = table_body.insertRow()

      var part_cell = new_row.insertCell()
      var part_data = document.createTextNode(part)
      part_cell.appendChild(part_data)

      var tag_cell = new_row.insertCell()
      var tag_data = document.createTextNode(tag)
      tag_cell.appendChild(tag_data)
    })
  }

  // console.log(response);
}

// display error alert message
function displayError (error) {
  try {
    document.getElementById("address-results").style.display = "none"
  }
  finally {
    var card = document.getElementsByClassName("col-12")[0]
    var errorMessage = document.createElement("div")
    errorMessage.className = "alert alert-danger"

    if (error.status == "400") {
      errorMessage.innerHTML = error.status + " " + error.statusText + " - Error parsing address. Please try again with a valid address."
    }
    else {
      errorMessage.innerHTML = error.status + " " + error.statusText
    }

    card.appendChild(errorMessage)
  }
}