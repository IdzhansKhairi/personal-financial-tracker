"use client"

import './finance-dashboard.css'
import React from 'react';

import { useState } from 'react';

import { LineChartOutlined, BarChartOutlined, AreaChartOutlined, PieChartOutlined } from '@ant-design/icons';
import { Line } from '@ant-design/charts';
import { Pie } from '@ant-design/plots';
import { Column } from '@ant-design/plots';

export default function FinanceDashboardPage() {

    const [transactionTypeView, setTypeView] = useState('overall_overview');

    const year = new Date().getFullYear();
    const monthName = new Date().toLocaleString('default', { month: 'long' });

    // The line below here is for the demo data for viewing graph
    //------------------------------------------------------------------------
    const yearIncomeVSExpense_Data = [
        { month: 'Jan', type: 'Income', value: 1200 },
        { month: 'Jan', type: 'Expenses', value: 800 },

        { month: 'Feb', type: 'Income', value: 1500 },
        { month: 'Feb', type: 'Expenses', value: 900 },

        { month: 'Mar', type: 'Income', value: 1000 },
        { month: 'Mar', type: 'Expenses', value: 567 },

        { month: 'Apr', type: 'Income', value: 300 },
        { month: 'Apr', type: 'Expenses', value: 200 },

        { month: 'May', type: 'Income', value: 5600 },
        { month: 'May', type: 'Expenses', value: 769 },

        { month: 'Jun', type: 'Income', value: 4500 },
        { month: 'Jun', type: 'Expenses', value: 45 },

        { month: 'Jul', type: 'Income', value: 6783 },
        { month: 'Jul', type: 'Expenses', value: 783 },

        { month: 'Aug', type: 'Income', value: 1500 },
        { month: 'Aug', type: 'Expenses', value: 900 },

        { month: 'Sep', type: 'Income', value: 1200 },
        { month: 'Sep', type: 'Expenses', value: 800 },

        { month: 'Oct', type: 'Income', value: 2739 },
        { month: 'Oct', type: 'Expenses', value: 2000 },

        { month: 'Nov', type: 'Income', value: 3890 },
        { month: 'Nov', type: 'Expenses', value: 800 },

        { month: 'Dec', type: 'Income', value: 4500 },
        { month: 'Dec', type: 'Expenses', value: 4100 },
    ]

    const yearIncomeVSExpense_config = {
        data: yearIncomeVSExpense_Data,
        xField: 'month',
        yField: 'value',
        seriesField: 'type',
        colorField: 'type',
        point: {
            shapeField: 'square',
            sizeField: 4,
        },
        interaction: {
            tooltip: {
                marker: false,
            },
        },
        style: {
            lineWidth: 2,
        },
    };

    const monthlyIncomeVSExpense_data = [
        { type: 'income', typeValue:'Income', value: 2769.65},
        { type: 'expense', typeValue:'Expense', value: 2409.73}
    ]

    const monthlyIncomeVSExpense_config = {
        data: monthlyIncomeVSExpense_data,
        angleField: 'value',
        colorField: 'typeValue',
        innerRadius: 0.6,
        label: {
            text: (d: any) => `${d.typeValue}\n ${d.value.toFixed(2)}\n`,
            style: {
                fontWeight: 'bold',
            },
            position: 'spider'
        },
    }

    const savingsTrend_data = [
        { month: 'Jan', value: 386.57},
        { month: 'Feb', value: 869.53},
        { month: 'Mar', value: 1423.46},
        { month: 'Apr', value: 2769.65},
        { month: 'May', value: 3319.58},
        { month: 'Jun', value: 10.77},
        { month: 'Jul', value: 546.77},
        { month: 'Aug', value: 1118.63},
        { month: 'Sep', value: 1672.56},
        { month: 'Oct', value: 2769.65},
        { month: 'Nov', value: 3659.00},
        { month: 'Dec', value: 7.00},
    ]

    const savingsTrend_config = {
        data: savingsTrend_data,
        xField: 'month',
        yField: 'value',
        point: {
            shapeField: 'square',
            sizeField: 4,
        },
        style: {
            lineWidth: 2,
        },
    };

    const categoryIncomeVSExpense_data = [
        { category: 'Touch N Go', type: 'Income', value: 3000.97},
        { category: 'Touch N Go', type:'Expense', value: 3000.97},
        { category: 'Cash', type: 'Income', value: 537.99},
        { category: 'Cash', type:'Expense', value: 537.99},
        { category: 'Card', type: 'Income', value: 75},
        { category: 'Card', type:'Expense', value: 75},
    ]

    const categoryIncomeVSExpense_config = {
        data: categoryIncomeVSExpense_data,
        xField: 'category',
        yField: 'value',
        stack: true,
        colorField: 'type',
    }

    const yearIncome_Data = [
        { month: 'Jan', value: 1200 },
        { month: 'Feb', value: 1500 },
        { month: 'Mar', value: 1000 },
        { month: 'Apr', value: 300 },
        { month: 'May', value: 5600 },
        { month: 'Jun', value: 4500 },
        { month: 'Jul', value: 6783 },
        { month: 'Aug', value: 1500 },
        { month: 'Sep', value: 1200 },
        { month: 'Oct', value: 2739 },
        { month: 'Nov', value: 3890 },
        { month: 'Dec', value: 4500 },    ]

    const yearIncome_config = {
        data: yearIncome_Data,
        xField: 'month',
        yField: 'value',
        point: {
            shapeField: 'square',
            sizeField: 4,
        },
        interaction: {
            tooltip: {
                marker: false,
            },
        },
        style: {
            lineWidth: 2,
        },
    };

    const monthlyIncomeByCategory_data = [
        { type: 'Touch & Go', value: 900},
        { type: 'Cash', value: 500.78},
        { type: 'Card', value: 1409.73},
    ]

    const monthlyIncomeByCategory_config = {
        data: monthlyIncomeByCategory_data,
        angleField: 'value',
        colorField: 'type',
        innerRadius: 0.6,
        label: {
            text: (d: any) => `${d.type}\n${d.value.toFixed(2)}`,
            style: {
                fontWeight: 'bold',
                fill: '#000000'
            },
            position: 'spider'
        },
    }

    const yearExpense_Data = [
        { month: 'Jan', type: 'Expenses', value: 800 },
        { month: 'Feb', type: 'Expenses', value: 900 },
        { month: 'Mar', type: 'Expenses', value: 567 },
        { month: 'Apr', type: 'Expenses', value: 200 },
        { month: 'May', type: 'Expenses', value: 769 },
        { month: 'Jun', type: 'Expenses', value: 45 },
        { month: 'Jul', type: 'Expenses', value: 783 },
        { month: 'Aug', type: 'Expenses', value: 900 },
        { month: 'Sep', type: 'Expenses', value: 800 },
        { month: 'Oct', type: 'Expenses', value: 2000 },
        { month: 'Nov', type: 'Expenses', value: 800 },
        { month: 'Dec', type: 'Expenses', value: 4100 },
    ]

    const yearExpense_config = {
        data: yearExpense_Data,
        xField: 'month',
        yField: 'value',
        point: {
            shapeField: 'square',
            sizeField: 4,
        },
        interaction: {
            tooltip: {
                marker: false,
            },
        },
        style: {
            lineWidth: 2,
        },
    };

    const monthlyExpenseByCategory_data = [
        { type: 'Touch & Go', value: 900},
        { type: 'Cash', value: 500.78},
        { type: 'Card', value: 1409.73},
    ]

    const monthlyExpenseByCategory_config = {
        data: monthlyExpenseByCategory_data,
        angleField: 'value',
        colorField: 'type',
        innerRadius: 0.6,
        label: {
            text: (d: any) => `${d.type}\n ${d.value.toFixed(2)}`,
            style: {
                fontWeight: 'bold',
                fill: '#000000'
            },
            position: 'spider'
        },
    }

    const monthlyHobbyExpenses_data = [
        { type: 'Gunpla', value:  523.99},
        { type: 'Music', value: 300.00},
        { type: 'Climbing', value: 42.00},
        { type: 'Decoration', value: 199.00},
        { type: 'Technology', value: 0.00},
    ]

    const monthlyHobbyExpenses_config = {
        data: monthlyHobbyExpenses_data,
        xField: 'type',
        yField: 'value',
        colorField: 'type',
    }

    const monthlyCategoryExpense_data = [
        { type: 'Living', value: 900},
        { type: 'Commitments', value: 500.78},
        { type: 'Personal', value: 1409.73},
        { type: 'Financial', value: 1409.73},
        { type: 'Others', value: 1409.73},
    ]

    const monthlyCategoryExpense_config = {
        data: monthlyCategoryExpense_data,
        angleField: 'value',
        colorField: 'type',
        innerRadius: 0.6,
        label: {
            text: (d: any) => `${d.type}\n ${d.value.toFixed(2)}`,
            style: {
                fontWeight: 'bold',
                fill: '#000000'
            },
            position: 'spider'
        },
        
    }
    
    //------------------------------------------------------------------------

    return (
        <div>
            <div className='d-flex align-items-center justify-content-between mb-3'>
                <h3 className='text-secondary p-0 m-0'><strong>Finance Dashboard</strong></h3>

                <div className="btn-group" role="group">
                    <button type="button" className={`btn ${transactionTypeView === 'overall_overview' ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => setTypeView('overall_overview')}>
                        Overall Overview
                    </button>
                    <button type="button" className={`btn ${transactionTypeView === 'income_overview' ? 'btn-success' : 'btn-outline-secondary'}`} onClick={() => setTypeView('income_overview')}>
                        Income Overview
                    </button>
                    <button type="button" className={`btn ${transactionTypeView === 'expense_overview' ? 'btn-danger' : 'btn-outline-secondary'}`} onClick={() => setTypeView('expense_overview')}>
                        Expense Overview
                    </button>
                </div>
            </div>

            <div className='border-bottom mb-3'></div>

            <div className='row m-1'>
                <div className='card p-3 px-4 pb-4 bg-secondary'>

                    {/*                 
                    Overall Overview consist of the following:
                        1. Yearly Income VS Expense (Double Line Chart)
                        2. Monthly Income VS Expense (Pie Chart)
                        3. Yearly Savings Trend (Line Chart)
                        4. Monthly Income VS Expense by Category (Stacked Bar Chart)
                     */}
                    {transactionTypeView === 'overall_overview' && (
                        <div>
                            <div className='d-flex align-items-center justify-content-center pb-3'>
                                <h5 className='fw-bold text-white'>Overall Expenditure</h5>
                            </div>

                            <div className='row mb-4'>
                                <div className='col-6'>
                                    <div className='card'>
                                        <div className='card-header'>
                                            <LineChartOutlined className='me-2' />
                                            <label className='fw-bold'>Year {year} Income VS Expenses</label>
                                        </div>
                                        <div className='card-body'>
                                            <div className='d-flex align-items-center justify-content-center' style={{height: '300px'}}>
                                                <Line className={'d-flex justify-content-center'} {...yearIncomeVSExpense_config} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-6'>
                                    <div className='card'>
                                        <div className='card-header'>
                                            <PieChartOutlined  className='me-2' />
                                            <label className='fw-bold'>Income VS Expenses ({monthName} {year})</label>
                                        </div>
                                        <div className='card-body'>
                                            <div className='d-flex align-items-center justify-content-center' style={{height: '300px'}}>
                                                <Pie className={'d-flex justify-content-center'} {...monthlyIncomeVSExpense_config} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-6'>
                                    <div className='card'>
                                        <div className='card-header'>
                                            <LineChartOutlined className='me-2' />
                                            <label className='fw-bold'>Year {year} Savings Trend</label>
                                        </div>
                                        <div className='card-body'>
                                            <div className='d-flex align-items-center justify-content-center' style={{height: '300px'}}>
                                                <Line className={'d-flex justify-content-center'} {...savingsTrend_config} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-6'>
                                    <div className='card'>
                                        <div className='card-header'>
                                            <BarChartOutlined className='me-2' />
                                            <label className='fw-bold'>Income VS Expenses by Category ({monthName} {year})</label>
                                        </div>
                                        <div className='card-body'>
                                            <div className='d-flex align-items-center justify-content-center' style={{height: '300px'}}>
                                                <Column className={'d-flex justify-content-center'} {...categoryIncomeVSExpense_config} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        </div>
                    )}


                    {/*                 
                    Overall Income Overview consist of the following:
                        1. Yearly Income Trend (Line Chart)
                        2. Monthly Income by Category (Pie Chart)
                     */}
                    {transactionTypeView === 'income_overview' && (
                        <div>
                            <div className='d-flex align-items-center justify-content-center pb-3'>
                                <h5 className='fw-bold text-white'>Income Overview</h5>
                            </div>

                            <div className='row mb-4'>
                                <div className='col-6'>
                                    <div className='card'>
                                        <div className='card-header'>
                                            <LineChartOutlined className='me-2' />
                                            <label className='fw-bold'>Year {year} Income Trend</label>
                                        </div>
                                        <div className='card-body'>
                                            <div className='d-flex align-items-center justify-content-center' style={{height: '300px'}}>
                                                <Line className={'d-flex justify-content-center'} {...yearIncome_config} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-6'>
                                    <div className='card'>
                                        <div className='card-header'>
                                            <PieChartOutlined  className='me-2' />
                                            <label className='fw-bold'>Income by Category ({monthName} {year})</label>
                                        </div>
                                        <div className='card-body'>
                                            <div className='d-flex align-items-center justify-content-center' style={{height: '300px'}}>
                                                <Pie className={'d-flex justify-content-center'} {...monthlyIncomeByCategory_config} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/*                 
                    Overall Expense Overview consist of the following:
                        1. Yearly Expense Trend (Line Chart)
                        2. Monthly Expense by Category (Pie Chart)
                        3. Monthly Expense by Usage (Pie Chart)
                        4. Monthly Hobby Expenses (Graph Chart)
                     */}
                    {transactionTypeView === 'expense_overview' && (
                        <div>
                            <div className='d-flex align-items-center justify-content-center pb-3'>
                                <h5 className='fw-bold text-white'>Expense Overview</h5>
                            </div>

                            <div className='row mb-4'>
                                <div className='col-6'>
                                    <div className='card'>
                                        <div className='card-header'>
                                            <LineChartOutlined className='me-2' />
                                            <label className='fw-bold'>Year {year} Expense Trend</label>
                                        </div>
                                        <div className='card-body'>
                                            <div className='d-flex align-items-center justify-content-center' style={{height: '300px'}}>
                                                <Line className={'d-flex justify-content-center'} {...yearExpense_config} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-6'>
                                    <div className='card'>
                                        <div className='card-header'>
                                            <PieChartOutlined  className='me-2' />
                                            <label className='fw-bold'>Financial Category Expenses ({monthName} {year})</label>
                                        </div>
                                        <div className='card-body'>
                                            <div className='d-flex align-items-center justify-content-center' style={{height: '300px'}}>
                                                <Pie className={'d-flex justify-content-center'} {...monthlyExpenseByCategory_config} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-6'>
                                    <div className='card'>
                                        <div className='card-header'>
                                            <BarChartOutlined className='me-2' />
                                            <label className='fw-bold'>Hobby Expenses ({monthName} {year})</label>
                                        </div>
                                        <div className='card-body'>
                                            <div className='d-flex align-items-center justify-content-center' style={{height: '300px'}}>
                                                <Column className={'d-flex justify-content-center'} {...monthlyHobbyExpenses_config} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <div className='card'>
                                        <div className='card-header'>
                                            <PieChartOutlined  className='me-2' />
                                            <label className='fw-bold'>Usage Category Expenses ({monthName} {year})</label>
                                        </div>
                                        <div className='card-body'>
                                            <div className='d-flex align-items-center justify-content-center' style={{height: '300px'}}>
                                                <Pie className={'d-flex justify-content-center'} {...monthlyCategoryExpense_config} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            
                            </div> 
                        </div>
                    )}

                </div>
                
            </div>

            <div className='row'>
                
            </div>
           
        
        </div>
    )
    
}