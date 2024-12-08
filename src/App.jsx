import React, { useState } from "react";

const App = () => {
  const [cashIn, setCashIn] = useState([]);
  const [cashOut, setCashOut] = useState([]);
  const [price, setPrice] = useState("");
  const [transactionType, setTransactionType] = useState("cashIn");
  const [category, setCategory] = useState("");
  const [transactions, setTransactions] = useState([]);

  const cashInCategories = ["Salary", "Investment", "Business", 'Laon'];
  const cashOutCategories = ["Food", "Rent", "Groceries", 'Fuel','Drink','Taxi','Clothes','Shopping','Entertainment','Electrocity']
  const categories = transactionType === "cashIn" ? cashInCategories : cashOutCategories;

  const handleAddTransaction = () => {
    const value = parseFloat(price);
    if (isNaN(value) || value <= 0) {
      alert("Please enter a valid price.");
      return;
    }

    if (!category) {
      alert("Please select a category.");
      return;
    }

    const newTransaction = {
      id: transactions.length + 1,
      type: transactionType,
      price: value,
      category,
      date: new Date().toLocaleString(),
    };

    if (transactionType === "cashIn") {
      setCashIn(cashIn + value);
    } else {
      setCashOut(cashOut + value);
    }

    setTransactions([...transactions, newTransaction]);
    setPrice("");
    setCategory("");
  };

  const balance = cashIn - cashOut;

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-[Poppins]">
     
      <nav className="bg-indigo-700 shadow-lg py-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Expense Management System</h1>
          <div className="flex space-x-6">
            <div className="text-center">
              <p className="text-sm">Cash In</p>
              <p className="text-xl font-semibold">${cashIn}</p>
            </div>
            <div className="text-center">
              <p className="text-sm">Cash Out</p>
              <p className="text-xl font-semibold">${cashOut}</p>
            </div>
            <div className="text-center">
              <p className="text-sm">Balance</p>
              <p className="text-xl font-semibold">${balance}</p>
            </div>
          </div>
        </div>
      </nav>

      
      <div className="mt-8 max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 text-gray-500">
          <h2 className="text-2xl font-bold mb-4">Add a New Transaction</h2>

          <div className="flex flex-col space-y-4">
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter Amount"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            />

            <select
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            >
              <option value="cashIn">Cash In</option>
              <option value="cashOut">Cash Out</option>
            </select>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleAddTransaction}
            className="mt-4 w-full bg-indigo-700 text-white py-3 rounded-md hover:bg-indigo-800 transition"
          >
            Add Transaction
          </button>
        </div>

        
        <div className="mt-8 bg-white rounded-lg shadow-md p-6 text-gray-800">
          <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
          {transactions.length > 0 ? (
            <ul className="space-y-4">
              {transactions.map((transaction) => (
                <li
                  key={transaction.id}
                  className={`p-4 rounded-md shadow-md ${
                    transaction.type === "cashIn" ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  <p className="text-lg font-semibold">
                    {transaction.type === "cashIn" ? "Cash In" : "Cash Out"}: 
                    {transaction.price}
                  </p>
                  <p className="text-sm text-gray-600">Category: {transaction.category}</p>
                  <p className="text-sm text-gray-500">Date: {transaction.date}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No transactions yet.</p>
            
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
