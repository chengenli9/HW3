// Name: Chengen Li

// click eventlistener for order button
$("#order-button").click(() => {
    checkForText(); 
    updateOrderForm();
    displayOrderDetails();
});

// checks if there is text in the text area
function checkForText() {
    const textArea = document.getElementById("notes");
    const notes = textArea.value.toLowerCase();

    // check if text area contains the word vegan
    if (notes.includes("vegan")) {
        alert("WARNING: ALL CHEESECAKES CONTAIN DAIRY");
    }
}

// updates the form after order is placed
function updateOrderForm() {
    $(".order-txt").text("Orders for"); 

    $(".order-message").css("display", "flex"); // appear
    $(".order-summary").css("display", "inline-block"); // appear
    $("#notes, .toppings-container, #order-button, .order-info").css("display", "none"); // disappear

    $(".notes-title").text("Order Summary: "); // change the notes title to a order summary text
}

// displays the user's order 
function displayOrderDetails() {
    // gets value of each selected option
    const selectedTopping = $("input[name='option']:checked").val();
    const selectedQuanity = $("#quantity").val();
    const notes = $("#notes").val();

    // display the text
    $("#toppingsDisplay").text(`Toppings: ${selectedTopping}`);
    $("#quantityDisplay").text(`Quantity of toppings: ${selectedQuanity}`);
    $("#notesDisplay").text(`Notes: ${notes}`);
}

// checks the month button
$(document).ready(() => {
    // toggle content showing when hovering over the button
    $(".dropdown").hover(
        () => $(".dropdown-content").show(), // Show dropdown when hovering
        () => $(".dropdown-content").hide() // Hide dropdown when mouse leaves
    );

    // when clicking on one of the items
    $(".dropdown-item").click((event) => { 
        const selectedMonth = $(event.target).text(); // Get selected text
        $(".dropbtn").text(selectedMonth); // Update button text
        //console.log(selectedMonth);
        $(".dropdown-content").hide(); // Hide dropdown after selection

        // Send the POST request to the server with the selected month
        $.post("/orders", { month: selectedMonth }, (response) => {
            updateOrders(response); // Update the page with the response
        }).fail(() => {
            alert("Error fetching orders. Please try again.");
        });
    });
});

// Function to update the webpage with the order details
function updateOrders(response) {
    const orderList = $("#orderList");
    orderList.empty(); // Clear previous entries

    if (response.error) {
        orderList.append("<li>" + response.error + "</li>");
    } else if (response.orders.length === 0) {
        orderList.append("<li>No orders found for this month.</li>");
    } else {
        response.orders.forEach(order => {
            orderList.append(`<li>${order.quantity} ${order.topping}</li>`);
        });
    }
}
