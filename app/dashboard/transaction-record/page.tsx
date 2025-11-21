"use client";

import React from 'react';
import { Badge, Tag, Switch, Statistic, Table, Tooltip, Carousel  } from 'antd';
import { useState, useEffect } from 'react';
import type { TableProps } from 'antd';
import { Pie } from '@ant-design/plots';

import Swal from 'sweetalert2';
import { Color } from 'antd/es/color-picker';
import { FontColorsOutlined } from '@ant-design/icons';

export default function FinancialRecordPage() {

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

    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'name'
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time'
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description'
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount'
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category'
        },
        {
            title: 'Sub-category',
            dataIndex: 'subCategory',
            key: 'subCategory'
        },
        {
            title: 'Card',
            dataIndex: 'card',
            key: 'card'
        },
    ]
    
    const dataSource = [];

    // Helper function to generate random amounts
    function getRandomAmount() {
        const isIncome = Math.random() > 0.5;
        const value = (Math.random() * 500).toFixed(2);
        return {
            amount: isIncome ? `+${value}` : `-${value}`,
            className: isIncome ? 'text-success' : 'text-danger'
        };
    }

    // Categories and sub-categories sample
    const categories = ['Food', 'Transport', 'Salary', 'Shopping', 'Entertainment', 'Utilities'];
    const subCategories = ['Groceries', 'Taxi', 'Monthly Salary', 'Clothes', 'Movies', 'Electricity'];

    // Cards
    const cards = ['Visa', 'Mastercard', 'Amex', 'Cash', 'Wallet'];

    // Generate data
    for (let i = 0; i < 50; i++) {
        let date = '';
        if (i < 10) date = '2025-07-01';
        else if (i < 20) date = '2025-07-05';
        else if (i < 30) date = '2025-08-12';
        else if (i < 40) date = '2025-09-20';
        else date = '2025-10-15';

        const time = `${Math.floor(Math.random() * 12 + 1)}:${Math.floor(Math.random() * 60)
            .toString()
            .padStart(2, '0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}`;

        const desc = `Transaction ${i + 1}`;

        const categoryIndex = Math.floor(Math.random() * categories.length);

        const { amount, className } = getRandomAmount();

        dataSource.push({
            key: i,
            date,
            time,
            description: desc,
            amount: <span className={className}>{amount}</span>,
            category: categories[categoryIndex],
            subCategory: subCategories[categoryIndex],
            card: cards[Math.floor(Math.random() * cards.length)]
        });
    }

    const contentStyle: React.CSSProperties = {
        margin: 0,
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };

    const onChange = (currentSlide: number) => {
        console.log(currentSlide);
    };

    return (
        <div>
            <h3 className='text-secondary mb-3'>Transaction Records</h3>

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
                            <div className="row">
                                <div className="col-12 justify-content-center align-items-center" style={{ height: '300px' }}>
                                    <Pie className={'d-flex justify-content-center'} {...cardPie} />

                                    {/* <Carousel className="w-100 h-100" arrows autoplay autoplaySpeed={5000}>
                                        <div className="d-flex justify-content-center align-items-center h-100">
                                            <Pie {...cardPie} />
                                        </div>
                                        <div className="d-flex justify-content-center align-items-center h-100">
                                            <Pie {...cashPie} />
                                        </div>
                                        <div className="d-flex justify-content-center align-items-center h-100">
                                            <Pie {...ewalletPie} />
                                        </div>
                                    </Carousel> */}
                                </div>
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

            <div className='row mb-4'>
                <Table dataSource={dataSource} columns={columns}/>
            </div>
        </div>
    )
    
}