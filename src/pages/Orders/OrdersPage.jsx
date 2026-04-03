import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MdEdit, 
  MdOutlineRemoveRedEye, 
  MdFiberManualRecord, 
  MdListAlt, // Better icon for "Orders List"
  MdAdd // Simple plus icon for the button
} from 'react-icons/md';
import PrimeDataTable from '../../components/Table/Table';
import './OrdersPage.css';
import { ordersData } from '../../constant/data';
import PageHeader from '../../components/Common/PageHeader';

const OrdersPage = () => {
    const navigate = useNavigate();

    const columns = useMemo(() => [
        { 
            field: 'id', 
            header: 'Order ID', 
            body: (rowData) => <span className="order-id-text">ORD-{rowData.id}</span> 
        },
        { 
            field: 'prevId', 
            header: 'Prev Order ID',
        },
        { 
            field: 'status', 
            header: 'Status',
            body: (rowData) => {
                const statusClass = rowData.status.toLowerCase().replace(/\s+/g, '-');
                return (
                    <span className={`status-badge badge-${statusClass}`}>
                        <MdFiberManualRecord className="status-dot" />
                        <span className="status-text">{rowData.status}</span>
                    </span>
                );
            }
        },
        { 
            field: 'client', 
            header: 'Client',
            body: (rowData) => (
                <div className="client-cell">
                    <span className="client-name">{rowData.client}</span>
                    <span className="client-type">Corporate</span>
                </div>
            )
        },
        { 
            field: 'created', 
            header: 'Created',
        },
        { 
            field: 'product', 
            header: 'Parent / Products',
        },
        { 
            field: 'type', 
            header: 'Orthotic Type',
        },
        { 
            field: 'topCover', 
            header: 'Top Cover',
        },
        { 
            field: 'qty', 
            header: 'Quantity',
        },
        { 
            field: 'rush', 
            header: 'Rush Order',
        },
        {
            field: 'actions',
            header: 'Actions',
            sortable: false,
            body: (rowData) => (
                <div className="action-buttons">
                    <button
                        className="btn-icon view"
                        title="View"
                        onClick={() => navigate(`/orders/${rowData.id}`)}
                    >
                        <MdOutlineRemoveRedEye />
                    </button>
                </div>
            )
        }
    ], [navigate]);

    return (
        <div className="orders-container">
            {/* Common Header Implementation */}
            <PageHeader
                title="Orders Management"
                description="Manage, filter and track all customer orders in real-time."
                icon={MdListAlt}
                showBack={false} // No back button on a top-level list page
                breadcrumb={[
                    { label: 'Dashboard', path: '/' },
                    { label: 'Orders', active: true }
                ]}
             
            />
            
            <div className="table-content-wrapper">
                <PrimeDataTable 
                    columns={columns} 
                    data={ordersData} 
                    title='Total Orders' 
                    totalRecords={ordersData?.length} 
                />
            </div>
        </div>
    );
};

export default OrdersPage;