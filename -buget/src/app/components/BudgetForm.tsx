'use client';

import React, { useState } from 'react';
import './BudgetForm.css'; // Import the CSS file

const BudgetForm: React.FC = () => {
  // State for income input and total amount
  const [income, setIncome] = useState('');
  const [totalIncome, setTotalIncome] = useState(0);

  // States for Home (Rent/Mortgage) and Insurance
  const [homeType, setHomeType] = useState<'Rent' | 'Mortgage'>('Rent');
  const [homeAmount, setHomeAmount] = useState('');
  const [insuranceAmount, setInsuranceAmount] = useState('');
  
  // Track breakdown for summary
  const [incomeList, setIncomeList] = useState<number[]>([]);
  const [homeExpense, setHomeExpense] = useState(0);
  const [insuranceExpense, setInsuranceExpense] = useState(0);

  // Handle income form submission
  const handleAddIncome = (e: React.FormEvent) => {
    e.preventDefault();
    const incomeAmount = parseFloat(income);
    if (!isNaN(incomeAmount) && incomeAmount > 0) {
      setTotalIncome((prevTotal) => prevTotal + incomeAmount);
      setIncomeList((prevList) => [...prevList, incomeAmount]); // Add new income
      setIncome(''); // Clear the input field after adding
    }
  };

  // Handle home expense form submission (Rent/Mortgage)
  const handleAddHome = (e: React.FormEvent) => {
    e.preventDefault();
    const homeAmountValue = parseFloat(homeAmount);
    if (!isNaN(homeAmountValue) && homeAmountValue > 0) {
      setTotalIncome((prevTotal) => prevTotal - homeAmountValue);
      setHomeExpense(homeAmountValue);
      setHomeAmount(''); // Clear input after adding
    }
  };

  // Handle insurance form submission
  const handleAddInsurance = (e: React.FormEvent) => {
    e.preventDefault();
    const insuranceAmountValue = parseFloat(insuranceAmount);
    if (!isNaN(insuranceAmountValue) && insuranceAmountValue > 0) {
      setTotalIncome((prevTotal) => prevTotal - insuranceAmountValue);
      setInsuranceExpense(insuranceAmountValue);
      setInsuranceAmount(''); // Clear input after adding
    }
  };

  return (
    <div className="container">
      {/* Income Box - Top Left */}
      <div className="income-box">
        <h2>Add Income</h2>
        <form onSubmit={handleAddIncome} className="flex flex-col gap-4 mt-4">
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            placeholder="Enter income amount"
            className="input-field"
            required
          />
          <button
            type="submit"
            className="add-button"
          >
            Add Income
          </button>
        </form>
      </div>

      {/* Home Expense Box - Under Income */}
      <div className="home-box">
        <h2>Home</h2>
        <div className="flex gap-4 mt-4">
          <select
            value={homeType}
            onChange={(e) => setHomeType(e.target.value as 'Rent' | 'Mortgage')}
            className="select-field"
          >
            <option value="Rent">Rent</option>
            <option value="Mortgage">Mortgage</option>
          </select>
          <input
            type="number"
            value={homeAmount}
            onChange={(e) => setHomeAmount(e.target.value)}
            placeholder="Amount"
            className="input-field"
            required
          />
          <button
            onClick={handleAddHome}
            className="add-button"
          >
            Add Home Expense
          </button>
        </div>
      </div>

      {/* Insurance Box - Under Home */}
      <div className="insurance-box">
        <h2>{homeType === 'Rent' ? 'Renters Insurance' : 'Home Insurance'}</h2>
        <div className="flex gap-4 mt-4">
          <input
            type="number"
            value={insuranceAmount}
            onChange={(e) => setInsuranceAmount(e.target.value)}
            placeholder="Amount"
            className="input-field"
            required
          />
          <button
            onClick={handleAddInsurance}
            className="add-button"
          >
            Add Insurance
          </button>
        </div>
      </div>

      {/* Total Income Display - Bottom Right */}
      <div className="total-income-display">
        <span>Total Income: </span>
        <span>${totalIncome.toFixed(2)}</span>
      </div>

      {/* Budget Summary - Upper Right */}
      <div className="budget-summary">
        <h3>Budget Summary</h3>
        <div>
          <div>
            <strong>Income:</strong> ${incomeList.reduce((acc, cur) => acc + cur, 0).toFixed(2)}
          </div>
          <div>
            <strong>Home:</strong> {homeType} - ${homeExpense.toFixed(2)}
          </div>
          <div>
            <strong>{homeType === 'Rent' ? 'Renters Insurance' : 'Home Insurance'}:</strong> ${insuranceExpense.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetForm;
