"use client";

import { useState } from 'react';
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ROLE_PATHS } from "@/lib/constants";
import { LaptopOutlined, NotificationOutlined, UserOutlined, DashboardOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

import "./components.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/reset.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@sweetalert2/theme-bootstrap-4/bootstrap-4.min.css';

import Swal from 'sweetalert2';
import Image from 'next/image'
import Link from "next/link"
import React from "react";

const { Sider } = Layout;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();

  // Get the active menu key based on current pathname
  const getActiveKey = (): string[] => {
    // Map pathnames to menu keys
    const pathToKey: Record<string, string> = {
      '/dashboard': 'dashboard',
      '/dashboard/registration': 'registration',
      '/dashboard/visitor-list': 'visitor-list',
      '/dashboard/security-list': 'security-list',
      '/dashboard/report': 'report',
      '/dashboard/finance-dashboard': 'finance-dashboard',
      '/dashboard/add-transaction': 'add-transaction',
      '/dashboard/transaction-record': 'transaction-record',
      '/dashboard/commitment': 'commitment',
      '/dashboard/wishlist': 'wishlist',
      '/dashboard/debts-tracker': 'debts'
    };

    const key = pathToKey[pathname];
    return key ? [key] : ['dashboard'];
  };

  // Get the parent menu keys that should be open based on current pathname
  const getOpenKeys = (): string[] => {
    const openKeys: string[] = [];

    // Visitor Management submenu
    if (['/dashboard/registration', '/dashboard/visitor-list'].includes(pathname)) {
      openKeys.push('visitor-management');
    }

    // Managerial submenu
    if (['/dashboard/security-list', '/dashboard/report'].includes(pathname)) {
      openKeys.push('managerial');
    }

    // Transactions submenu
    if (['/dashboard/add-transaction', '/dashboard/transaction-record'].includes(pathname)) {
      openKeys.push('transactions');
    }

    // Budgeting submenu
    if (['/dashboard/commitment', '/dashboard/wishlist', '/dashboard/debts-tracker'].includes(pathname)) {
      openKeys.push('budgeting');
    }

    return openKeys;
  };

  // Authentication of what does the user can access.
  const canAccess = (path: string) => {
    const roles = (session as any)?.roles || [];
    
    // If requesting dashboard, always allow (all roles can access it)
    if (path === "/dashboard") return true;
    
    // For specific pages, check if user's role has permission
    for (const role of roles) {
      if (ROLE_PATHS[role]?.includes(path)) return true;
    }

    return false; // ✅ Changed from true to false - deny by default
  }

  // Define the sidebar accessibility 
  const sidebarItems: MenuProps['items'] = [];

  // Dashboard
  sidebarItems.push({
    key: 'dashboard',
    icon: <DashboardOutlined />,
    label: <Link href="/dashboard" className="text-decoration-none">Dashboard</Link>
  });

  // sidebarItems.push({
  //   key: 'registerGroup',
  //   label: 'Registration',
  //   type: 'group',
  // })

  // Visitor Management
  const visitorChildren: MenuProps['items'] = [];
  if (canAccess("/dashboard/registration")) {
    visitorChildren.push({
      key: 'registration',
      icon: <i className='bi bi-person-check'></i>,
      label: <Link href="/dashboard/registration" className='text-decoration-none'>Registration</Link>
    });
  }
  if (canAccess("/dashboard/visitor-list")) {
    visitorChildren.push({
      key: 'visitor-list',
      icon: <i className='bi bi-card-list'></i>,
      label: <Link href="/dashboard/visitor-list" className='text-decoration-none'>Visitor List</Link>
    });
  }
  if (visitorChildren.length > 0) {
    sidebarItems.push({
      key: 'visitor-management',
      icon: <i className='bi bi-people-fill'></i>,
      label: <span>Visitor Management</span>,
      children: visitorChildren
    });
  }

  // Managerial
  const managerialChildren: MenuProps['items'] = [];
  if (canAccess("/dashboard/security-list")) {
    managerialChildren.push({
      key: 'security-list',
      icon: <i className='bi bi-person-vcard'></i>,
      label: <Link href="/dashboard/security-list" className='text-decoration-none'>Security List</Link>
    });
  }
  if (canAccess("/dashboard/report")) {
    managerialChildren.push({
      key: 'report',
      icon: <i className='bi bi-file-earmark-text'></i>,
      label: <Link href="/dashboard/report" className='text-decoration-none'>Report</Link>
    });
  }
  if (managerialChildren.length > 0) {
    sidebarItems.push({
      key: 'managerial',
      icon: <i className='bi bi-building-fill-gear'></i>,
      label: <span>Managerial</span>,
      children: managerialChildren
    });
  }

  sidebarItems.push({
    key: 'financeGroup',
    label: 'Finance',
    type: 'group',
  })

  // Financial Tracker Apps Related:
  // --------------------------------------------------------------------------------------------

  if(canAccess("/dashboard/finance-dashboard")) {
    sidebarItems.push({
      key: 'finance-dashboard',
      icon: <DashboardOutlined />,
      label: <Link href="/dashboard/finance-dashboard" className="text-decoration-none">Dashboard Finance</Link>
    })
  }

  const transactionsChildren: MenuProps['items'] = [];
  if(canAccess("/dashboard/add-transaction")) {
    transactionsChildren.push({
      key: 'add-transaction',
      icon: <i className='bi bi-currency-dollar'></i>,
      label: <Link href="/dashboard/add-transaction" className='text-decoration-none'>Add Transaction</Link>
    })
  }
  if(canAccess("/dashboard/transaction-record")) {
    transactionsChildren.push({
      key: 'transaction-record',
      icon: <i className='bi bi-table'></i>,
      label: <Link href="/dashboard/transaction-record" className='text-decoration-none'>Transaction Records</Link>
    })
  }
  if(transactionsChildren.length > 0) {
    sidebarItems.push({
      key: 'transactions',
      icon: <i className='bi bi-journal-text'></i>,
      label: <span>Transactions</span>,
      children: transactionsChildren
    })
  }
  
  const budgetingChildren: MenuProps['items'] = [];
  if(canAccess("/dashboard/commitment")) {
    budgetingChildren.push({
      key: 'commitment',
      icon: <i className='bi bi-cash-stack'></i>,
      label: <Link href="/dashboard/commitment" className='text-decoration-none'>Commitments</Link>
    })
  }
  if(canAccess("/dashboard/commitment")) {
    budgetingChildren.push({
      key: 'wishlist',
      icon: <i className='bi bi-gift'></i>,
      label: <Link href="/dashboard/wishlist" className='text-decoration-none'>Wishlists</Link>
    })
  }
  if(canAccess("/dashboard/debts-tracker")) {
    budgetingChildren.push({
      key: 'debts',
      icon: <i className='bi bi-person-check'></i>,
      label: <Link href="/dashboard/debts-tracker" className='text-decoration-none'>Debts</Link>
    })
  }
  if(budgetingChildren.length > 0) {
    sidebarItems.push({
      key: 'budgeting',
      icon: <i className='bi bi-wallet2'></i>,
      label: <span>Budgeting</span>,
      children: budgetingChildren
    })
  }
  
  // --------------------------------------------------------------------------------------------



  const getLinkClass = (path: string) =>
    pathname === path 
      ? "sidebar-link active" : "sidebar-link";
  
  return (

    <div className={`${geistSans.variable} ${geistMono.variable} antialiased bg-dark h-100`}>
      <Sider trigger={null} collapsible width={290} className='bg-dark' collapsed={!isOpen}>
        <Menu
            mode="inline"
            selectedKeys={getActiveKey()}
            defaultOpenKeys={getOpenKeys()}
            style={{ borderInlineEnd: 0 }}
            className='bg-dark h-100'
            theme="dark"
            items={sidebarItems}
          />
      </Sider>
    </div>

    // <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
    //     <div className="d-flex" style={{ minHeight: "100vh" }}>

    //       {/* Sidebar */}
    //       <div className={`bg-dark p-3 sidebar ${!isOpen ? "closed" : ""}`}>

    //         {/* Dashboard */}
    //         <div className="mb-4">
    //           <Link href="/dashboard" className={`p-1 ps-2 my-2 ${getLinkClass("/dashboard")}`}>
    //             <i className="bi bi-speedometer2 me-2"></i>Dashboard
    //           </Link>
    //         </div>

    //         {/* Visitor Management Section */}
    //         {(canAccess("/dashboard/registration") || canAccess("/dashboard/visitor-list")) && (
    //           <div className="mb-4">
              
    //             <h6 className="p-1 ps-2 pb-0 mb-0 text-secondary">Visitor Management</h6>

    //             {canAccess("/dashboard/registration") && (
    //               <Link href="/dashboard/registration" className={`p-1 ps-2 my-1 ${getLinkClass("/dashboard/registration")}`}>
    //                 <i className="bi bi-person-check me-2"></i>Registration
    //               </Link>
    //             )}
                
    //             {canAccess("/dashboard/visitor-list") && (
    //               <Link href="/dashboard/visitor-list" className={`p-1 ps-2 my-1 ${getLinkClass("/dashboard/visitor-list")}`}>
    //                 <i className="bi bi-card-list me-2"></i>Visitor List
    //               </Link>
    //             )}
                
    //           </div>
    //         )}
            

    //         {/* Admin Section */}
    //         {(canAccess("/dashboard/security-list") || canAccess("/dashboard/report")) && (
    //           <div className="mb-4">
    //             <h6 className="p-1 ps-2 pb-0 mb-0 text-secondary">Managerial</h6>
    //             {canAccess("/dashboard/security-list") && (
    //               <Link href="/dashboard/security-list" className={`p-1 ps-2 my-1 ${getLinkClass("/dashboard/security-list")}`}>
    //                 <i className="bi bi-person-lines-fill me-2"></i>Security List
    //               </Link>
    //             )}
    //             {canAccess("/dashboard/report") && (
    //               <Link href="/dashboard/report" className={`p-1 ps-2 my-1 ${getLinkClass("/dashboard/report")}`}>
    //                 <i className="bi bi-file-earmark-text me-2"></i>Report
    //               </Link>
    //             )}
    //           </div>
    //         )}            
    //     </div>

    //   </div>
    // </div>
  );
}
