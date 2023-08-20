// Initialize Firebase with your project configuration
// You should replace this config with your own Firebase config
// You can find the config details in your Firebase project settings
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
  
  // Get a reference to the database service
  const database = firebase.database();
// Reference to the Firebase database
const ordersRef = database.ref("orders");

// Fetch data and display in the table
// ... Your existing code .
// Fetch data and display in the table
document.getElementById("fetchDataBtn").addEventListener("click", () => {
    const password = prompt("Enter the password:");
    if (password === "1234") {
      ordersRef.once("value", (snapshot) => {
        const tableBody = document.getElementById("tableBody"); // Correctly reference tbody element
        tableBody.innerHTML = ""; // Clear existing data
        snapshot.forEach((orderSnapshot) => {
          const orderData = orderSnapshot.val();
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${orderData.name}</td>
            <td>${orderData.address}</td>
            <td>${orderData.phone}</td>
            <td>${formatFoodItems(orderData.selectedItems)}</td>
            <td>${orderData.orderDate}</td>
            <td>${orderData.recivedorderDate}</td>
            <td>${orderData.rentamt}</td>
            <td>${orderData.depoamt}</td>
            <td>${orderData.recdamt}</td>


          `;
          tableBody.appendChild(row);
        });
      });
    } else {
      alert("Invalid password! Please try again.");
    }
  });
  
  // ... Your other existing code ...
  

// Download data as Excel
document.getElementById("downloadDataBtn").addEventListener("click", () => {
  const password = prompt("Enter the password:");
  if (password === "1234") {
    ordersRef.once("value", (snapshot) => {
      const data = [["Name", "Address", "Phone", "Food Items","Order Date", "Received Date", "Rent Amount", "Deposit Amount", "Received Amount"]];
      snapshot.forEach((orderSnapshot) => {
        const orderData = orderSnapshot.val();
        const foodItems = formatFoodItems(orderData.selectedItems);
        data.push([orderData.name, orderData.address, orderData.phone, foodItems,orderData.orderDate,orderData.recivedorderDate,orderData.rentamt,orderData.depoamt,orderData.recdamt]);
      });
      exportToExcel(data);
    });
  } else {
    alert("Invalid password! Please try again.");
  }
});

// Function to format the food items as a comma-separated string
function formatFoodItems(selectedItems) {
  return selectedItems.map(item => `${item.foodName} (${item.quantity})`).join(", ");
}

// Function to export data to Excel
function exportToExcel(data) {
  const csvContent = data.map(row => row.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "order_data.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
