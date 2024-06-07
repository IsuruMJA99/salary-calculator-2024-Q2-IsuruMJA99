import React, { useContext } from 'react';
import { SalaryContext } from '../contexts/SalaryContext';
import { calculateNetSalary as calcNetSalary } from '../utils/salaryCalculations';

const SalarySummary = () => {
  const { state } = useContext(SalaryContext);
  const { basicSalary } = state;

  const {
    totalEarnings,
  } = calcNetSalary(state);

  return (
    <div>
      <p><strong>Basic Salary:</strong> {basicSalary}</p>
      <p><strong>Total Earnings:</strong> {totalEarnings}</p>
    </div>
  );
};

export default SalarySummary;
