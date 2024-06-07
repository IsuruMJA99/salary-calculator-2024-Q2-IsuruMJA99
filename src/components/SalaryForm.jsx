import React, { useState, useContext } from 'react';
import { SalaryContext } from '../contexts/SalaryContext';
import { Button, Modal, Form } from 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/all.min.css';
import img1 from './Icon color.png'

const SalaryForm = () => {
  const { state, dispatch } = useContext(SalaryContext);
  const { earnings, deductions } = state;
  const [basicSalary, setBasicSalary] = useState('');
  const [showEarningModal, setShowEarningModal] = useState(false);
  const [showDeductionModal, setShowDeductionModal] = useState(false);
  const [earningName, setEarningName] = useState('');
  const [earningAmount, setEarningAmount] = useState('');
  const [epfApplicable, setEpfApplicable] = useState(false);
  const [deductionName, setDeductionName] = useState('');
  const [deductionAmount, setDeductionAmount] = useState('');
  const [editingEarningIndex, setEditingEarningIndex] = useState(null);
  const [editingDeductionIndex, setEditingDeductionIndex] = useState(null);

  const handleSalaryChange = (e) => {
    setBasicSalary(e.target.value);
    dispatch({ type: 'UPDATE_BASIC_SALARY', payload: parseFloat(e.target.value) || 0 });
  };

  const handleShowEarningModal = () => setShowEarningModal(true);
  const handleCloseEarningModal = () => {
    setShowEarningModal(false);
    setEarningName('');
    setEarningAmount('');
    setEpfApplicable(false);
    setEditingEarningIndex(null);
  };

  const handleShowDeductionModal = () => setShowDeductionModal(true);
  const handleCloseDeductionModal = () => {
    setShowDeductionModal(false);
    setDeductionName('');
    setDeductionAmount('');
    setEditingDeductionIndex(null);
  };

  const handleAddEarning = () => {
    const newEarning = { name: earningName, amount: parseFloat(earningAmount) || 0, epf: epfApplicable };
    if (editingEarningIndex !== null) {
      dispatch({ type: 'UPDATE_EARNING', payload: { index: editingEarningIndex, earning: newEarning } });
    } else {
      dispatch({ type: 'ADD_EARNING', payload: newEarning });
    }
    handleCloseEarningModal();
  };

  const handleAddDeduction = () => {
    const newDeduction = { name: deductionName, amount: parseFloat(deductionAmount) || 0 };
    if (editingDeductionIndex !== null) {
      dispatch({ type: 'UPDATE_DEDUCTION', payload: { index: editingDeductionIndex, deduction: newDeduction } });
    } else {
      dispatch({ type: 'ADD_DEDUCTION', payload: newDeduction });
    }
    handleCloseDeductionModal();
  };

  const handleEditEarning = (index) => {
    setEarningName(earnings[index].name);
    setEarningAmount(earnings[index].amount);
    setEpfApplicable(earnings[index].epf);
    setEditingEarningIndex(index);
    handleShowEarningModal();
  };

  const handleEditDeduction = (index) => {
    setDeductionName(deductions[index].name);
    setDeductionAmount(deductions[index].amount);
    setEditingDeductionIndex(index);
    handleShowDeductionModal();
  };

  const handleDeleteEarning = (index) => {
    dispatch({ type: 'DELETE_EARNING', payload: index });
  };

  const handleDeleteDeduction = (index) => {
    dispatch({ type: 'DELETE_DEDUCTION', payload: index });
  };

  const handleReset = () => {
    dispatch({ type: 'RESET' });
    setBasicSalary('');
  };

  const formatNumber = (number) => number.toFixed(2);

  return (
    <div>
        <div className='d-flex justify-content-between'>
        <h5 className="card-title">Calculate Salary</h5>
        <span  style={{ color: 'blue' }} onClick={handleReset}>
                <img src={img1} alt="Reset" style={{ width: '21px', height: '18px' }} /> Reset
            </span>
        </div>
      <div className="mb-3">

        <label htmlFor="basicSalary" className="form-label">Basic Salary</label>
        
        <input type="number" className="form-control" id="basicSalary" value={basicSalary} onChange={handleSalaryChange} />
      </div>
      <div className="mb-3">
        <h5>Earnings</h5>
        <p>Allowance, Fixed Allowance, Bonus and etc.</p>
        <ul className="">
          {earnings.map((earning, index) => (
            <li key={index} className="list-group-item d-flex justify-content-left align-items-center">
            {earning.name}: {formatNumber(earning.amount)} {earning.epf ? <i className='fas fa-check' style={{ fontSize: '18px', color: 'blue',marginLeft: '20px' }}></i> :""}
            {earning.epf && " (EPF/ETF)"}
            <span>
                <Button variant="link" onClick={() => handleEditEarning(index)}>
                    <i className='fas fa-pen' style={{ fontSize: '16px', color: 'black' }}></i>
                </Button>
                <Button variant="link" onClick={() => handleDeleteEarning(index)}>
                    <i className="fas fa-times" style={{ fontSize: '12px', color: 'black' }}></i>
                </Button>
            </span>
        </li>
          ))}
        </ul>
        <Button variant="link" onClick={handleShowEarningModal} className="mt-3">+ Add New Allowance</Button>
      </div>

      <div className="mb-3">
        <h5>Deductions</h5>
        <p>Salary, Advances, Loan Deducations and all</p>
        <ul className=" ">
          {deductions.map((deduction, index) => (
            <li key={index} className="list-group-item d-flex justify-content-left align-items-center">
              {deduction.name}: {formatNumber(deduction.amount)}
              <span>
                <Button variant="link" onClick={() => handleEditDeduction(index)}>
                     <i className='fas fa-pen' style={{ fontSize: '16px', color: 'black' }}></i></Button>
                <Button variant="link" onClick={() => handleDeleteDeduction(index)}>
                    <i className="fas fa-times" style={{ fontSize: '12px', color: 'black' }}></i></Button>
              </span>
            </li>
          ))}
        </ul>
        <Button variant="link" onClick={handleShowDeductionModal} className="mt-3">+ Add New Deduction</Button>
      </div>

      

      <Modal show={showEarningModal} onHide={handleCloseEarningModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editingEarningIndex !== null ? 'Edit Allowance' : 'Add New Allowance'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="earningName">
              <Form.Label style={{ color: 'blue',  }}>Earnings Name</Form.Label>
              <Form.Control type="text" value={earningName} placeholder="Eg : Travel" onChange={(e) => setEarningName(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="earningAmount">
              <Form.Label style={{ color: 'blue',marginTop: '20px' }}>Amount</Form.Label>
              <Form.Control type="number" value={earningAmount} placeholder="Eg : 10,000" onChange={(e) => setEarningAmount(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="epfApplicable" style={{marginTop: '20px' }}>
              <Form.Check type="checkbox" label="EPF/ETF " checked={epfApplicable} onChange={(e) => setEpfApplicable(e.target.checked)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-none" onClick={handleCloseEarningModal} style={{ color: 'blue' }}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddEarning}>
            {editingEarningIndex !== null ? 'Update' : 'Add'}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeductionModal} onHide={handleCloseDeductionModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editingDeductionIndex !== null ? 'Edit Deduction' : 'Add New Deduction'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="deductionName">
              <Form.Label style={{ color: 'blue' }}>Deduction Name</Form.Label>
              <Form.Control type="text" value={deductionName} placeholder="Eg : Travel" onChange={(e) => setDeductionName(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="deductionAmount">
              <Form.Label style={{ color: 'blue',marginTop: '20px' }}>Deduction Amount</Form.Label>
              <Form.Control type="number" value={deductionAmount} placeholder="Eg : 5,000" onChange={(e) => setDeductionAmount(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-none" onClick={handleCloseDeductionModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddDeduction}>
            {editingDeductionIndex !== null ? 'Update' : 'Add'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SalaryForm;
