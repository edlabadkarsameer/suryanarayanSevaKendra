const firebaseConfig = {
    // Your Firebase configuration
    apiKey: "AIzaSyBpRlMlSHx5yqk4TYwvhD45kIlTwXyoayI",
authDomain: "suryanarayanraosevakendra.firebaseapp.com",
databaseURL: "https://suryanarayanraosevakendra-default-rtdb.firebaseio.com",
projectId: "suryanarayanraosevakendra",
storageBucket: "suryanarayanraosevakendra.appspot.com",
messagingSenderId: "350849877887",
appId: "1:350849877887:web:75c62830a17e04378abc4a"
};
const password = prompt("Enter the password:");
  if (password === "1234") {
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

const searchForm = document.getElementById("searchForm");
const updateForm = document.getElementById("updateForm");
const phoneInput = document.getElementById("phone");
const nameInput = document.getElementById("name");
const addressInput = document.getElementById("address");
const depoamtInput = document.getElementById("depoamt");
const recdamtInput = document.getElementById("recdamt");
const rentamtInput = document.getElementById("rentamt");
const orderDateInput = document.getElementById("orderDate");
const recivedorderDateInput = document.getElementById("recivedorderDate");


searchForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get the mobile number entered by the user
    const phoneNumber = phoneInput.value;

    // Perform a Firebase query to find the order with the matching mobile number
    const ordersRef = database.ref("orders");
    ordersRef
        .orderByChild("phone")
        .equalTo(phoneNumber)
        .once("value")
        .then((snapshot) => {
            if (snapshot.exists()) {
                // Data found for the provided mobile number
                const orderData = snapshot.val();
                // Assuming there's only one order associated with this mobile number
                const orderId = Object.keys(orderData)[0];
                
                // Populate the form fields with the retrieved data
                nameInput.value = orderData[orderId].name;
                addressInput.value = orderData[orderId].address;
                phoneInput.value = orderData[orderId].phone;
                depoamtInput.value = orderData[orderId].depoamt;
                recdamtInput.value = orderData[orderId].recdamt;
                rentamtInput.value = orderData[orderId].rentamt;
                orderDateInput.value = orderData[orderId].orderDate;
                recivedorderDateInput.value = orderData[orderId].recivedorderDate;
                // Populate other fields

                // Display the update form
                updateForm.style.display = "block";
            } else {
                alert("Order not found for the given mobile number.");
            }
        })
        .catch((error) => {
            console.error("Error searching for order:", error);
        });
});

updateForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get updated data from the form
    const updatedName = nameInput.value;
    const updatedaddress = addressInput.value;
    const updateddepoamt = depoamtInput.value;
    const updatedrecdamt = recdamtInput.value;
    const updatedrentamt = rentamtInput.value;
    const updatedorderDate = orderDateInput.value;
    const updatedrecivedorderDate = recivedorderDateInput.value;
    // Get other updated data from input fields
    
    // Get the order ID based on the mobile number (phone)
    const phoneNumber = phoneInput.value;
    const ordersRef = database.ref("orders");
    ordersRef
        .orderByChild("phone")
        .equalTo(phoneNumber)
        .once("value")
        .then((snapshot) => {
            if (snapshot.exists()) {
                // Assuming there's only one order associated with this mobile number
                const orderId = Object.keys(snapshot.val())[0];
                
                // Update the data in Firebase
                const orderRef = ordersRef.child(orderId);
                orderRef.update({
                    name: updatedName,
                    address: updatedaddress,
                    depoamt: updateddepoamt,
                    recdamt: updatedrecdamt,
                    rentamt: updatedrentamt,
                    orderDate: updatedorderDate,
                    recivedorderDate: updatedrecivedorderDate,
                    // Update other fields here
                })
                .then(() => {
                    alert("Order details updated successfully!");
                    // Clear the form and hide it
                    updateForm.reset();
                    updateForm.style.display = "none";
                })
                .catch((error) => {
                    console.error("Error updating order details:", error);
                });
            } else {
                alert("Order not found for the given mobile number.");
            }
        })
        .catch((error) => {
            console.error("Error searching for order:", error);
        });
});
  }
  else{
    alert("Invalid password! Please try again.");
  }
