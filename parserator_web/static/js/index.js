/* TODO: Flesh this out to connect the form to the API and render results
   in the #address-results div. */

$(document).ready(function() {
    $("#submit").click(function(e) {
        e.preventDefault();
        $.ajax({
            url: "api/parse/",
            type: "GET",
            contentType: "application/json",
            data: {
                address: $("#address").val()
            },
            success: function(response) {
                // console.log(response);
                displayResponse(response);
            },
            error: function(error) {
                // console.log(error);
                displayError(error);
            }
        });
    });
});

function displayResponse(response) {
    try {
        document.getElementsByClassName("alert alert-danger")[0].style.display = "none";
    }
    finally {
        let results_table = document.getElementById("address-results");
        results_table.style.display = "inline";

        let address_type = document.getElementById("parse-type");
        address_type.textContent = response[1];

        let table_body = document.getElementsByTagName("tbody")[0];
        for (let [tag, part] of Object.entries(response[0])) {
            let new_row = table_body.insertRow();

            let part_cell = new_row.insertCell();
            let part_data = document.createTextNode(part);
            part_cell.appendChild(part_data);

            let tag_cell = new_row.insertCell();
            let tag_data = document.createTextNode(tag);
            tag_cell.appendChild(tag_data);
        }
    }

    // console.log(response);
}

function displayError(error) {
    let card = document.getElementsByClassName("col-12")[0];
    let errorMessage = document.createElement("div");
    errorMessage.className = "alert alert-danger";

    if (error.status == "400") {
        errorMessage.innerHTML = error.status + " " + error.statusText + " - Error parsing address. Please try again with a valid address.";
    }
    else {
        errorMessage.innerHTML = error.status + " " + error.statusText;
    }

    card.appendChild(errorMessage);
}