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
  
  // Check for the correct password
  const password = prompt("Enter the password:");
  if (password === "1234") {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const database = firebase.database();
    

    
    const searchForm = document.getElementById("searchForm");
    const updateForm = document.getElementById("updateForm");
    const phoneInput = document.getElementById("phone");
    const ordernoInput = document.getElementById("orderno");
    const nameInput = document.getElementById("name");
    const addressInput = document.getElementById("address");
    const depoamtInput = document.getElementById("depoamt");
    const recdamtInput = document.getElementById("recdamt");
    const rentamtInput = document.getElementById("rentamt");
    const orderDateInput = document.getElementById("orderDate");
    const recivedorderDateInput = document.getElementById("recivedorderDate");
    const orderItemList = document.getElementById("orderItemList"); // Added for displaying items
    
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const phoneNumber = phoneInput.value;
      const orderno = ordernoInput.value;
  
      const ordersRef = database.ref("orders");
      ordersRef
        .orderByChild("phone")
        .equalTo(phoneNumber)
        .once("value")
        .then((snapshot) => {
          if (snapshot.exists()) {
            let orderId = null;
            snapshot.forEach((childSnapshot) => {
              const orderData = childSnapshot.val();
              if (orderData.orderno === orderno) {
                orderId = childSnapshot.key;
                nameInput.value = orderData.name;
                addressInput.value = orderData.address;
                phoneInput.value = orderData.phone;
                depoamtInput.value = orderData.depoamt;
                recdamtInput.value = orderData.recdamt;
                rentamtInput.value = orderData.rentamt;
                orderDateInput.value = orderData.orderDate;
                recivedorderDateInput.value = orderData.recivedorderDate;
                
                // Clear existing list items
                orderItemList.innerHTML = "";
                
                // Assuming "selectedItems" is an array of items in the order data
                const selectedItems = orderData.selectedItems || [];
                
                // Create list items for each item in the order
                selectedItems.forEach((item) => {
                  const listItem = document.createElement("li");
                  listItem.textContent = `${item.foodName} (${item.quantity})`;
                  orderItemList.appendChild(listItem);
                });
  
                updateForm.style.display = "block";
              }
            });
  
            if (!orderId) {
              alert("Order not found for the given order number.");
            }
          } else {
            alert("Order not found for the given mobile number.");
          }
        })
        .catch((error) => {
          console.error("Error searching for order:", error);
        });
    });
  
    // ... Rest of your code ...
  
  } else {
    alert("Invalid password! Please try again.");
  }
  