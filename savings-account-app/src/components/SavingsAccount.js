import React, { useEffect, useState } from 'react';
import './SavingsAccount.css';

const SavingsAccount = () => {
  const [savingsAccounts, setSavingsAccounts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch('/savings.json')
      .then((response) => response.json())
      .then((data) => setSavingsAccounts(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
   const handleNext = () => {
    if (currentIndex < savingsAccounts.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentAccount = savingsAccounts[currentIndex];

  return (
    <div className="savings-container">
      

      <div className="desktop-view">
      <h1>Savings Accounts</h1>
        <table className="savings-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Interest rate</th>
              <th>Minimum Deposit</th>
              <th>Interest type</th>
            </tr>
          </thead>
          <tbody>
            {savingsAccounts.map((account, index) => (
              <tr key={index}>
                <td>{account.product}</td>
                <td>{account["interest rate"]}%</td>
                <td>£{account["minimum Deposit"]}</td>
                <td>{account["interest type"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {currentAccount && ( <div className="mobile-view">
        <h1>Savings Accounts</h1>
      
        <div className="savings-card">
            <table className='savings-table'>
              <thead >
                <tr>
                  <th>{currentAccount.product}</th>
                </tr>
              </thead>
              <tbody className='mtablebody'>
              <tr>
                
                <td>Interest Rate: {currentAccount["interest rate"]}%</td>
              </tr>
              <tr>
              <td>Minimum deposit: £{currentAccount["minimum Deposit"]}</td>
              </tr>
                <tr>
                <td>Interest type: {currentAccount["interest type"]}</td>
                  </tr>
               
              
              </tbody>
            </table>
         
        </div>
      
        <div className="navigation-buttons">
        <button className='saver-button' onClick={handlePrevious} disabled={currentIndex === 0}>
          &lt; {savingsAccounts[currentIndex - 1]?.product || 'Previous'}
        </button>
        <button className='saver-button' onClick={handleNext} disabled={currentIndex === savingsAccounts.length - 1}>
          {savingsAccounts[currentIndex + 1]?.product || 'Next'} &gt;
        </button>
       </div>
      </div>)}
     

     
    </div>
  );
};

export default SavingsAccount;
