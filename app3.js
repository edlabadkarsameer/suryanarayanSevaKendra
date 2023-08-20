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
  // Your existing Firebase configuration and other code ...

document.addEventListener("DOMContentLoaded", () => {
    // Get the current date and set it in the "orderDate" input field
    const orderDateInput = document.getElementById("orderDate");
    const currentDate = new Date().toISOString().split("T")[0];
    orderDateInput.value = currentDate;
  
    // Your existing event listeners and functions ...
  });
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();

  const orderForm = document.getElementById("orderForm");
  
  orderForm.addEventListener("submit", (e) => {
    e.preventDefault();
  
    // Verify password (1234)
    const password = document.getElementById("password").value;
    if (password !== "1234") {
      alert("Invalid password! Please enter the correct password.");
      return;
    }
  
    // Get user details from the form
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;
    const orderDate = document.getElementById("orderDate").value;
    const recivedorderDate = document.getElementById("recivedorderDate").value;
    const rentamt = document.getElementById("rentamt").value;
    const depoamt = document.getElementById("depoamt").value;
    const recdamt = document.getElementById("recdamt").value;

    // Get selected food items and their quantities
    const selectedItems = [];
    const foodItems = document.querySelectorAll('input[name="food"]:checked');
    foodItems.forEach((item) => {
      const foodName = item.value;
      const quantity = parseInt(document.getElementById(`${foodName}Qty`).value);
      selectedItems.push({ foodName, quantity });
    });
 
  
      // Save order details to Firebase
      saveOrderToFirebase(name, address, phone, selectedItems, orderDate, recivedorderDate, rentamt, depoamt, recdamt, );
    });
    
    function saveOrderToFirebase(name, address, phone, selectedItems, orderDate, recivedorderDate, rentamt, depoamt, recdamt,) {
      // Generate a unique ID for each order (you may use any ID generation logic)
      const orderId = database.ref().child("orders").push().key;
    
      // Create an object to hold order details
      const orderData = {
        name,
        address,
        phone,
        selectedItems,
        orderDate, 
        recivedorderDate, 
        rentamt, 
        depoamt, 
        recdamt,    
      };
    
      // Save the order to Firebase
      database.ref(`orders/${orderId}`).set(orderData)
        .then(() => {
          alert("Order placed successfully!");
          orderForm.reset();
        })
        .catch((error) => {
          console.error("Error saving order:", error);
        });
    }
  