"use client";

import React from 'react';
import { Badge, Tag, Switch, Statistic, Table, Tooltip  } from 'antd';
import { useState, useEffect } from 'react';
import type { TableProps } from 'antd';
import { Pie } from '@ant-design/plots';

import Swal from 'sweetalert2';
import { Color } from 'antd/es/color-picker';
import { FontColorsOutlined } from '@ant-design/icons';

export default function AddTransactionPage() {

    const [transactionType, setType] = useState('income');
    const [todayDate, setTodayDate] = useState('');
    const [currentTime, setCurrentTime] = useState('');
    const [accountCategory, setAccountCategory] = useState("");
    const [accountSubCategory, setAccountSubCategory] = useState("")
    const [incomeSource, setIncomeSource] = useState("") 
    const [expenseUsage, setExpenseUsage] = useState("") 
    const [hobbyCategory, setHobbyCategory] = useState("")

    const subCategories = {
        e_wallet: [
            { value: "tng", label: "Touch 'n Go" },
            { value: "shopeepay", label: "Shopee Pay" },
        ],
        cash: [
            { value: "notes", label: "Notes" },
            { value: "coins", label: "Coins" },
        ],
        card: [
            { value: "past", label: "Past" },
            { value: "present", label: "Present" },
            { value: "savings", label: "Savings" },
            { value: "bliss", label: "Bliss" },
        ]
    };

    const [amount, setAmount] = useState("");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/\D/g, ""); // remove non-digits
        setAmount(rawValue);
    };
    const displayValue = amount ? (parseInt(amount) / 100).toFixed(2) : "";

    const past = Number((Number(displayValue) * 0.3).toFixed(2));
    const present = Number((Number(displayValue) * 0.4).toFixed(2));
    const savings = Number((Number(displayValue) * 0.2).toFixed(2));
    const bliss = Number((Number(displayValue) * 0.1).toFixed(2));

    const grandTotal = Number((past + present + savings + bliss).toFixed(2));
    
    const ewalletPie = {
        data: [
            { type: 'Shoppee Pay', value: 7.00 },
            { type: 'Touch N Go', value: 5.00 },
        ],
        angleField: 'value',
        colorField: 'type',
        innerRadius: 0.6,
        label: {
            text: 'type',
            style: {
                fontWeight: 'bold',
            },
        },
        legend: false,
        annotations: [
            {
                type: 'text',
                style: {
                    text: 'E\nWallet',
                    x: '50%',
                    y: '50%',
                    textAlign: 'center',
                    fontSize: 30,
                    fontStyle: 'bold',
                    fill: 'white'
                },
            },
        ],
    }

    const cashPie = {
        data: [
            { type: 'Cash', value: 3.15 },
            { type: 'Coins', value: 50.50 },
        ],
        angleField: 'value',
        colorField: 'type',
        innerRadius: 0.6,
        label: {
            text: 'type',
            style: {
                fontWeight: 'bold',
            },
        },
        legend: false,
        annotations: [
            {
                type: 'text',
                style: {
                    text: 'Cash',
                    x: '50%',
                    y: '50%',
                    textAlign: 'center',
                    fontSize: 30,
                    fontStyle: 'bold',
                    fill: 'white'
                },
            },
        ],
    }

    const cardPie = {
        data: [
            { type: 'Past', value: 830.90 },
            { type: 'Present', value: 1107.86 },
            { type: 'Savings', value: 553.93 },
            { type: 'Bliss', value: 276.97 },
        ],
        angleField: 'value',
        colorField: 'type',
        innerRadius: 0.6,
        label: {
            text: 'type',
            style: {
                fontWeight: 'bold',
            },
        },
        legend: false,
        annotations: [
            {
                type: 'text',
                style: {
                    text: 'Card',
                    x: '50%',
                    y: '50%',
                    textAlign: 'center',
                    fontSize: 30,
                    fontStyle: 'bold',
                    fill: 'white'
                },
            },
        ],
    }

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();

            const yyyy = now.getFullYear();
            const mm = String(now.getMonth() + 1).padStart(2, '0');
            const dd = String(now.getDate()).padStart(2, '0');
            setTodayDate(`${yyyy}-${mm}-${dd}`);

            const hh = String(now.getHours()).padStart(2, '0');
            const min = String(now.getMinutes()).padStart(2, '0');
            setCurrentTime(`${hh}:${min}`);
        };

        updateDateTime(); // initial call
        const interval = setInterval(updateDateTime, 1000 * 60); // update every minute

        return () => clearInterval(interval);
    }, []);

    const  submitExpense = async () => {
        Swal.fire({
            icon: 'success',
            title: 'Successfully added'
        })
    }

    return (
        <div>
            <h3 className='text-secondary mb-3'>Add Transactions (Income/Expense)</h3>

            <div className='border-bottom mb-3'></div>

            <div className="row d-flex justift-content-between mb-4">
                <div className="col-4">
                    <div className="card" style={{background: 'blue'}}>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-3 d-flex align-items-center justify-content-center">
                                    <i className="bi bi-wallet text-white fs-1"></i>
                                </div>
                                <div className="col-9">
                                    <h5 className="large fw-bold text-white">E-Wallet</h5>
                                    <h5 className="text-white small">MYR 10.00</h5>
                                </div>
                            </div>
                            <div className='d-flex justify-content-center' style={{height: '300px'}}>
                                <Pie className={'d-flex justify-content-center'} {...ewalletPie} />
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="card bg-success">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-3 d-flex align-items-center justify-content-center">
                                    <i className="bi bi-cash text-white fs-1"></i>
                                </div>
                                <div className="col-9">
                                    <h5 className="large fw-bold text-white">CASH</h5>
                                    <h5 className="text-white small">MYR 3.90</h5>
                                </div>
                            </div>
                            <div className='d-flex justify-content-center' style={{height: '300px'}}>
                                <Pie className={'d-flex justify-content-center'} {...cashPie} />
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="card bg-danger">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-3 d-flex align-items-center justify-content-center">
                                    <i className="bi bi-credit-card text-white fs-1"></i>
                                </div>
                                <div className="col-9">
                                    <h5 className="large fw-bold text-white">CARD</h5>
                                    <h5 className="text-white small">MYR 2769.65</h5>
                                </div>
                            </div>
                            <div className='d-flex align-items-center justify-content-center' style={{height: '300px'}}>
                                <Pie className={'d-flex justify-content-center'} {...cardPie} />
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>

            <div className='row mb-5'>
                <div className='d-flex align-items-center justify-content-end'>
                    <h5 className='fw-bold text-success p-0 m-0 me-2'>TOTAL: </h5>
                    <h5 className='p-0 m-0 text-success'>MYR 2783.55</h5>
                </div>
                
            </div>

            <div className='card mb-4'>
                <div className='card-header d-flex align-items-center justify-content-between'>
                    <h5 className='m-0 p-0 py-2'>Add {transactionType === 'income' ? 'Incomes' : 'Expenses'}</h5>

                    <div className="btn-group" role="group">
                        <button type="button" className={`btn ${transactionType === 'income' ? 'btn-success' : 'btn-outline-secondary'}`} onClick={() => setType('income')}>
                            Income
                        </button>
                        <button type="button" className={`btn ${transactionType === 'expense' ? 'btn-danger' : 'btn-outline-secondary'}`} onClick={() => setType('expense')}>
                            Expense
                        </button>
                    </div>
                </div>
                <div className='card-body'>
                    <div className='row mb-4'>
                        <div className='col-6 d-flex align-items-center'>
                            <span className='form-label m-0 p-0 me-2'>Date</span>
                            <input type='date' className='form-control' value={todayDate} disabled></input>
                        </div>

                        <div className='col-6 d-flex align-items-center'>
                            <label className='form-label m-0 p-0 me-2'>Time</label>
                            <input type='time' className='form-control' value={currentTime} disabled></input>
                        </div>
                    </div>
                    <div className='row mb-5'>
                        <div className='col d-flex align-items-center'>
                            <label className='form-label me-2'>Description</label>
                            <textarea className='form-control' placeholder={transactionType === 'income' ? 'Enter incomes description...' : 'Enter expenses description...'}></textarea>
                        </div>
                    </div>

                    <h5 className='text-secondary mb-3'>{transactionType === 'income' ? 'Incomes Details' : 'Expenses Detail'}</h5>

                    {transactionType === 'income' && (
                        <div className='row mb-5'>
                            <div className='d-flex align-items-center mb-4'>
                                <div className='col-2'>
                                    <label className=''>Amount</label>
                                </div>
                                <div className='col-10'>
                                    <div className='input-group'>
                                        <span className='input-group-text'>MYR</span>
                                        <input className='form-control' type='number' step="0.01" value={displayValue} placeholder='Enter amount' onChange={handleChange}></input>
                                    </div>
                                </div>
                            </div>
                            <div className='d-flex align-items-center mb-4'>
                                <div className='col-2'>
                                    <label className='form-label p-0 m-0 me-2'>Category</label>
                                </div>
                                <div className='col-10'>
                                    <select className='form-select' value={accountCategory} onChange={(e) => setAccountCategory(e.target.value)}>
                                        <option value="" disabled hidden>Select category</option>
                                        <option value="e_wallet">E-Wallet</option>
                                        <option value="cash">Cash</option>
                                        <option value="card">Card</option>
                                    </select>
                                </div>
                            </div>
                            <div className='d-flex align-items-center mb-4'>
                                <div className='col-2'>
                                    <label className='form-label p-0 m-0 me-2'>Sub-category</label>
                                </div>
                                <div className='col-10'>
                                    <select className='form-select' value={accountSubCategory} onChange={(e) => setAccountSubCategory(e.target.value)} disabled={!accountCategory}>
                                        <option value="" disabled hidden>Select sub-category</option>
                                        {subCategories[accountCategory as "e_wallet" | "cash" | "card"]?.map(item => (
                                            <option key={item.value} value={item.value}>
                                                {item.label}
                                            </option>
                                        ))}
                                        <option value="moneyDivision">Money Division</option>
                                    </select>

                                </div>
                            </div>
                            {accountSubCategory === 'moneyDivision' && (
                                <div className='d-flex align-items-center mb-4'>
                                    <div className='col-2'></div>
                                    <div className='col-10'>
                                        <div className='d-flex align-items-center my-4'>
                                            <Table 
                                                className='w-100 border rounded'
                                                pagination={false}
                                                columns={
                                                    [
                                                        {
                                                            title: 'Division Type',
                                                            dataIndex: 'divisionType',
                                                            key: 'divisionType',
                                                        },
                                                        {
                                                            title: 'Division Percentage',
                                                            dataIndex: 'divisionPercentage',
                                                            key: 'divisionPercentage',
                                                        },
                                                        {
                                                            title: 'Total Division',
                                                            dataIndex: 'totalDivision',
                                                            key: 'totalDivision',
                                                        },
                                                    ]
                                                }
                                                dataSource={
                                                    [
                                                        {
                                                            key: '1',
                                                            divisionType: 'Past',
                                                            divisionPercentage: '30%',
                                                            totalDivision: past.toFixed(2),
                                                        },
                                                        {
                                                            key: '2',
                                                            divisionType: 'Present',
                                                            divisionPercentage: '40%',
                                                            totalDivision: present.toFixed(2),
                                                        },
                                                        {
                                                            key: '3',
                                                            divisionType: 'Savings',
                                                            divisionPercentage: '20%',
                                                            totalDivision: savings.toFixed(2),
                                                        },
                                                        {
                                                            key: '4',
                                                            divisionType: 'Bliss',
                                                            divisionPercentage: '10%',
                                                            totalDivision: bliss.toFixed(2),
                                                        },
                                                        {
                                                            key: '5',
                                                            divisionType: <strong className='fw-bold text-uppercase'>Total</strong>,
                                                            divisionPercentage: '',
                                                            totalDivision: <span className='text-primary fw-bold'>{'MYR ' + grandTotal.toFixed(2)}</span>
                                                        },
                                                    ]
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {accountCategory === 'card' && (
                                <div>
                                    <div className='d-flex align-items-center mb-4'>
                                        <div className='col-2'>
                                            <label className='form-label p-0 m-0 me-2'>Card</label>
                                        </div>
                                        <div className='col-10'>
                                            <select className='form-select'>
                                                <option value="" disabled hidden>Select card</option>
                                                <option value="e_wallet">RHB</option>
                                                <option value="cash">Maybank</option>
                                                <option value="card">CIMB</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        
                                    </div>
                                </div>
                                
                            )}

                            <div className='d-flex align-items-center mb-4'>
                                <div className='col-2'>
                                    <label className='form-label p-0 m-0 me-2'>Source</label>
                                </div>
                                <div className='col-10'>
                                    <select className='form-select' value={incomeSource} onChange={(e) => setIncomeSource(e.target.value)} disabled={!accountCategory}>
                                        <option value="" disabled hidden>Select source</option>
                                        <option value="salary">Salary</option>
                                        <option value="allowance_gift">Allowance / Gift</option>
                                        <option value="paybank_reimbursement">Payback / Reimbursement</option>
                                        <option value="kwsp">KWSP</option>
                                        <option value="transfer">Transfer</option>
                                        <option value="bank_profit">Bank Profit</option>
                                        <option value="borrow">Borrow</option>
                                        <option value="refund">Refund</option>
                                        <option value="tally">Tally</option>
                                        <option value="othersIncome">Others</option>
                                    </select>

                                </div>
                            </div>
                        </div>
                    )}

                    {transactionType === 'expense' && (
                        <div className='row mb-5'>
                            <div className='d-flex align-items-center mb-4'>
                                <div className='col-2'>
                                    <label className=''>Amount</label>
                                </div>
                                <div className='col-10'>
                                    <div className='input-group'>
                                        <span className='input-group-text'>MYR</span>
                                        <input className='form-control' type='number' step="0.01" value={displayValue} placeholder='Enter amount' onChange={handleChange}></input>
                                    </div>
                                </div>
                            </div>
                            <div className='d-flex align-items-center mb-4'>
                                <div className='col-2'>
                                    <label className='form-label p-0 m-0 me-2'>Category</label>
                                </div>
                                <div className='col-10'>
                                    <select className='form-select' value={accountCategory} onChange={(e) => setAccountCategory(e.target.value)}>
                                        <option value="" disabled hidden>Select category</option>
                                        <option value="e_wallet">E-Wallet</option>
                                        <option value="cash">Cash</option>
                                        <option value="card">Card</option>
                                    </select>
                                </div>
                            </div>
                            {accountCategory === 'card' && (
                                <div className='d-flex align-items-center mb-4'>
                                    <div className='col-2'>
                                        <label className='form-label p-0 m-0 me-2'>Card</label>
                                    </div>
                                    <div className='col-10'>
                                        <select className='form-select'>
                                            <option value="" disabled hidden>Select card</option>
                                            <option value="e_wallet">RHB</option>
                                            <option value="cash">Maybank</option>
                                            <option value="card">CIMB</option>
                                        </select>
                                    </div>
                                </div>
                            )}
                            <div className='d-flex align-items-center mb-4'>
                                <div className='col-2'>
                                    <label className='form-label p-0 m-0 me-2'>Sub-category</label>
                                </div>
                                <div className='col-10'>
                                    <select className='form-select' value={accountSubCategory} onChange={(e) => setAccountSubCategory(e.target.value)} disabled={!accountCategory}>
                                        <option value="" disabled hidden>Select sub-category</option>
                                        {subCategories[accountCategory as "e_wallet" | "cash" | "card"]?.map(item => (
                                            <option key={item.value} value={item.value}>
                                                {item.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className='d-flex align-items-center mb-4'>
                                <div className='col-2'>
                                    <label className='form-label p-0 m-0 me-2'>Usage</label>
                                </div>
                                <div className='col-10'>
                                    <select className='form-select' value={expenseUsage} onChange={(e) => setExpenseUsage(e.target.value)} disabled={!accountCategory}>
                                        
                                        <option value="" disabled hidden>Select expense usage</option>

                                        <optgroup label="Living">
                                            <option value="food">Food & Drinks</option>
                                            <option value="groceries">Groceries</option>
                                            <option value="health">Health</option>
                                            <option value="household">Household</option>
                                            <option value="personalcare">Personal Care</option>
                                        </optgroup>

                                        <optgroup label="Commitments">
                                            <option value="carCommitments">Car</option>
                                            <option value="houseCommitments">House</option>
                                            <option value="utilitiesCommitments">Utilities</option>
                                            <option value="installment">Installment</option>
                                            <option value="transport">Transportation</option>
                                            <option value="subscriptionCommitments">Subscription</option>
                                        </optgroup>

                                        <optgroup label="Personal">
                                            <option value="entertainmentPersonal">Entertainment</option>
                                            <option value="shoppingPersonal">Shopping</option> 
                                            <option value="travelPersonal">Travel</option>
                                            <option value="giftsPersonal">Gifts</option>
                                            <option value="hobbyPersonal">Hobby</option>
                                        </optgroup>

                                        <optgroup label='Financial'>
                                            <option value="investment">Investment</option>
                                            <option value="charity">Charity</option>
                                            <option value="movement">Move Money</option>
                                        </optgroup>

                                        <option value="others">Others</option>
                                    </select>
                                </div>
                            </div>
                            {expenseUsage === 'hobbyPersonal' && (
                                <div className='d-flex align-items-center mb-4'>
                                    <div className='col-2'>
                                        <label className='form-label p-0 m-0 me-2'>Hobby Category</label>
                                    </div>
                                    <div className='col-10'>
                                        <select className='form-select' value={hobbyCategory} onChange={(e) => setHobbyCategory(e.target.value)} disabled={!accountCategory}>
                                            <option value="">Select Hobby Category</option>
                                            <option value="gunpla">Gunpla</option>
                                            <option value="music">Music</option>
                                            <option value="climbing">Climbing</option>
                                            <option value="decoration">Decoration</option>
                                            <option value="technology">Technology</option>
                                        </select>
                                    </div>
                                </div>
                            )}
                            
                        </div>
                    )}

                    <div className='d-flex align-items-center justify-content-end mb-4'>
                        <button className='btn btn-primary' onClick={() => submitExpense()}>Submit {transactionType}</button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
    
}