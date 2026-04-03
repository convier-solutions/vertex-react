import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Skeleton } from 'primereact/skeleton';
import { FilterMatchMode } from 'primereact/api';
import './Table.css';

const PrimeDataTable = ({ 
    data = [], 
    columns = [], 
    title = "Orders Management" 
}) => {
    const [loading, setLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, [data]);

    const skeletonRows = Array.from({ length: 6 });

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;
        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const skeletonTemplate = () => {
        return <Skeleton width="80%" height="1.2rem" borderRadius="16px" />;
    };

    const renderHeader = () => (
        <div className="premium-header">
            <div className="table-header-left">
                <h2 className="table-title">{title}</h2>
                {/* {!loading && <span className="record-count">{data.length} Total Records</span>} */}
            </div>
            <div className="table-header-right">
                <IconField iconPosition="left" className="search-container">
                    <InputIcon className="pi pi-search" />
                    <InputText 
                        value={globalFilterValue} 
                        onChange={onGlobalFilterChange} 
                        placeholder="Search..." 
                        className="premium-search"
                        disabled={loading}
                    />
                </IconField>
            </div>
        </div>
    );

    return (
        <div className="premium-wrapper">
            <div className="table-responsive-container">
                <DataTable 
                    value={loading ? skeletonRows : data} 
                    paginator={!loading} 
                    rows={10} 
                    header={renderHeader()}
                    filters={filters}
                    globalFilterFields={['id', 'client', 'status', 'product']}
                    emptyMessage="No records found."
                    className="p-datatable-premium"
                    rowHover
                    // Essential for responsiveness:
                    responsiveLayout="scroll" 
                    breakpoint="960px"
                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                >
                    {columns.map((col) => (
                        <Column 
                            key={col.field} 
                            field={col.field} 
                            header={col.header} 
                            sortable={!loading}
                            body={loading ? skeletonTemplate : col.body}
                            style={{ minWidth: col.width || '12rem' }}
                        />
                    ))}
                </DataTable>
            </div>
        </div>
    );
};

export default PrimeDataTable;