// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBpRlMlSHx5yqk4TYwvhD45kIlTwXyoayI",
    authDomain: "suryanarayanraosevakendra.firebaseapp.com",
    databaseURL: "https://suryanarayanraosevakendra-default-rtdb.firebaseio.com",
    projectId: "suryanarayanraosevakendra",
    storageBucket: "suryanarayanraosevakendra.appspot.com",
    messagingSenderId: "350849877887",
    appId: "1:350849877887:web:75c62830a17e04378abc4a"
  };

  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  
  document.addEventListener("DOMContentLoaded", () => {
    // Function to prompt user for phone number and password
    function promptPhoneNumberAndPassword() {
      const phoneNumber = prompt("Please enter your phone number:");
      if (!phoneNumber) return; // If the user cancels, exit the function
  
      const password = prompt("Please enter the password:");
      if (!password) return; // If the user cancels, exit the function
  
      // Check the hardcoded password
      if (password !== "1234") {
        alert("Incorrect password! Please enter the correct password.");
        return;
      }
  
      // Now that we have the phone number and password, fetch the data and proceed
      fetchOrderData(phoneNumber);
    }
  
    // Function to fetch order data based on phone number
    function fetchOrderData(phoneNumber) {
      // Fetch order details from Firebase based on the provided phone number
      database.ref("orders").orderByChild("phone").equalTo(phoneNumber).once("value")
        .then((snapshot) => {
          const orderData = snapshot.val();
  
          // Check if the order exists with the provided phone number
          if (!orderData) {
            alert("Order not found with the provided phone number.");
            return;
          }
  
          // Assuming there is only one order per phone number, fetch the first order found
          const orderId = Object.keys(orderData)[0];
          const order = orderData[orderId];
  
          // Proceed to show the order details and update the form
          showOrderDetails(order);
        })
        .catch((error) => {
          console.error("Error fetching order details:", error);
          alert("Error fetching order details. Please try again later.");
        });
    }
  
    // Function to show order details and update the form
    function showOrderDetails(order) {
      document.getElementById("name").value = order.name;
      document.getElementById("address").value = order.address;
      document.getElementById("phone").value = order.phone;
      // Populate other form fields based on the order data
  
      // Enable editing of the form fields
      document.getElementById("name").disabled = false;
      document.getElementById("address").disabled = false;
      // Enable other form fields for editing
  
      // Add a new event listener for the form submission
      const orderForm = document.getElementById("orderForm");
      orderForm.removeEventListener("submit", promptPhoneNumberAndPassword); // Remove the old event listener
      orderForm.addEventListener("submit", (e) => {
        e.preventDefault();
        // Proceed to update the order data in Firebase
        updateOrderInFirebase(order, orderForm);
      });
    }
  
    // Function to update the order data in Firebase
    function updateOrderInFirebase(order, orderForm) {
      // Get updated user details and selected items from the form
      const updatedName = document.getElementById("name").value;
      const updatedAddress = document.getElementById("address").value;
      // Get other updated form fields...
  
      // Update the selected items (similar to the existing code)
      // ...
  
      // Update the order details in Firebase
      const orderId = Object.keys(order)[0];
      const updatedOrderData = {
        name: updatedName,
        address: updatedAddress,
        // Add other updated fields...
      };
  
      // Save the updated order data to Firebase
      database.ref(`orders/${orderId}`).update(updatedOrderData)
        .then(() => {
          alert("Order updated successfully!");
          orderForm.reset();
          // Disable editing of the form fields again
          document.getElementById("name").disabled = true;
          document.getElementById("address").disabled = true;
          // Disable other form fields again
        })
        .catch((error) => {
          console.error("Error updating order:", error);
        });
    }
  
    // Initial prompt for phone number and password
    promptPhoneNumberAndPassword();
  });
  