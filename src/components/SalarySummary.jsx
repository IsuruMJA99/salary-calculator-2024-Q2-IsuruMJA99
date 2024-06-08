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
    <labe className="card-title ">Youre salary</labe>
    <div >
    
      <div className= 'd-flex justify-content-between mt-4'>
        <p className="form-label">Items</p>
        <p className="form-label">Amount</p>
      </div>
      <p className= 'd-flex justify-content-between'><spam className='form-normal-text'>Basic Salary</spam>{formatNumber (basicSalary) }</p>
      <p  className= 'd-flex justify-content-between'><span className='form-normal-text'>Total Earnings</span>{formatNumber  (totalEarnings)}</p>
      <p  className= 'd-flex justify-content-between'><span className='form-normal-text'>Gross Earnings</span> {formatNumber (grossEarnings)}</p>
      <p  className= 'd-flex justify-content-between'><span className='form-normal-text'>Total Deductions</span> {formatNumber (totalDeductions)}</p>
      <p  className= 'd-flex justify-content-between'><span className='form-normal-text'>Employee EPF (8%)</span>{formatNumber (employeeEPF)} </p>
      <p  className= 'd-flex justify-content-between' ><span className='form-normal-text'>APIT</span>{formatNumber (APIT)} </p>

      <p className='d-flex justify-content-between mb-4 mt-4 '
          style={{
           border: '2px solid rgba(224, 224, 224, 1)',
           padding: '10px',
            borderRadius: '5px',
    }}><strong>Net Salary(Take Home)</strong><strong> {formatNumber (netSalary)}</strong> </p>

      <p className="form-label ">Contribution from the Employeer</p>
      <p  className= 'd-flex justify-content-between'><span className='form-normal-text'>Employer EPF (12%)</span>{formatNumber (employerEPF)} </p>
      <p className='d-flex justify-content-between mb-4'><span className='form-normal-text'>Employer ETF (3%)</span>{formatNumber (employerETF)} </p>
      
      
      <p  className= 'd-flex justify-content-between'><span className='form-normal-text'>CTC (Cost to Company)</span> {formatNumber (costToCompany)}</p>
    

    
    </div>
    </>
  );
};

export default SalarySummary;
