export const calculateNetSalary = ({ basicSalary, earnings, deductions }) => {
    let totalEarnings = basicSalary + earnings.reduce((sum, earning) => sum + earning.amount, 0);
    let totalDeductions = deductions.reduce((sum, deduction) => sum + deduction.amount, 0);
    
  
    return {
      totalEarnings,
      totalDeductions,
    };
  };
  