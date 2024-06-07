import React, { useContext } from 'react';
import { SalaryContext } from '../contexts/SalaryContext';
import { calculateNetSalary as calcNetSalary } from '../utils/salaryCalculations';

const SalarySummary = () => {
  const { state } = useContext(SalaryContext);
  const { basicSalary, earnings, deductions } = state;

  const {
    totalEarnings,
    totalDeductions,
    grossEarnings,
    employeeEPF,
    employerEPF,
    employerETF,
    APIT,
    netSalary,
    costToCompany
  } = calcNetSalary(state);

  const formatNumber = (number) => number.toFixed(2);

  return (
    <>
    <h5 className="card-title mb-4">Youre salary</h5>
    <div className='d-flex justify-content-between'>
    <div>
      <p><strong>Basic Salary:</strong></p>
      <p><strong>Total Earnings:</strong></p>
      <p><strong>Gross Earnings:</strong> </p>
      <p><strong>Total Deductions:</strong> </p>
      <p><strong>Employee EPF (8%):</strong> </p>
      <p ><strong>APIT:</strong> </p>

      <p className='mb-4 mt-4'><strong>Net Salary:</strong> </p>

      <p><strong>Employer EPF (12%):</strong> </p>
      <p className='mb-4'><strong>Employer ETF (3%):</strong> </p>
      
      
      <p><strong>Cost to Company:</strong> </p>
    </div>

    <div className='justify-contend-end'>
        <p>{formatNumber (basicSalary) }</p>
        <p>{formatNumber  (totalEarnings)}</p>
        <p>{formatNumber (grossEarnings)}</p>
        <p>{formatNumber (totalDeductions)}</p>
        <p>{formatNumber (employeeEPF)}</p>
        <p>{formatNumber (APIT)}</p>
        <p className='mb-4 mt-4'>{formatNumber (netSalary)}</p>
        <p>{formatNumber (employerEPF)}</p>
        <p>{formatNumber (employerETF)}</p>
        <p>{formatNumber (costToCompany)}</p>
       
    </div>
    </div>
    </>
  );
};

export default SalarySummary;
