import InformationDashboard from "../../components/Oders/InformationPanels";
import OrderActivityLogs from "../../components/Oders/OrderActivityLogs";
import OrderInformation from "../../components/Oders/OrderInformation";
import OrderManagement from "../../components/Oders/OrderManagementSection";
import OrderStatus from "../../components/Oders/OrderStatus";
import ScanManagement from "../../components/Oders/ScanFileManagement";
import ShippingInformation from "../../components/Oders/ShippingInformation";
import PageHeader from "../../components/Common/PageHeader";
import { MdPostAdd } from 'react-icons/md';
import './OrderDetailPage.css';

const OrderDetailPage = () => {
  // Demo Data Object containing everything for both components
  const demoOrder = {
    // Data for OrderStatus
    id: "3124",
    prevId: "2978",
    currentStatus: "shipped", // matches your logic keys
    
    // Data for OrderInformation
    orthoticType: "Performance Sport",
    material: "3mm Semi-Rigid Polypropylene",
    topCover: "Black Neoprene (3mm)",
    midLayer: "Blue Poron (2mm)",
    shoeType: "Running Shoe / Sneaker",
    archHeight: "High Arch Support",
    pathology: "Pes Planus & Heel Pain",
    corrections: "Rearfoot Varus Post (4°)",
    heelLeft: "5.0mm",
    heelRight: "5.0mm",
    isRush: true, // Will show as "Yes"
    quantity: "1 Pair",
    length: "Full Length (Trimmed to fit)"
  };

  const handleEdit = () => {
    alert("Opening Edit Panel for Order #" + demoOrder.id);
  };

  return (
    <div className="order-details-container">
      {/* 1. Page Breadcrumbs & Title using Common PageHeader */}
      <PageHeader
        title={`Order #${demoOrder.id}`}
        description="Comprehensive overview of order specifications, production status, and logistics."
        icon={MdPostAdd}
        breadcrumb={[
          { label: 'Dashboard', path: '/' },
          { label: 'Orders', path: '/orders' },
          { label: `Order #${demoOrder.id}`, active: true }
        ]}
        backPath="/orders"
      />

      <main className="order-detail-content-layout">
        {/* 2. Status Tracker Component */}
        <OrderStatus initialOrderData={demoOrder} />
        
        {/* 3. Detailed Specifications Component */}
        <OrderInformation 
          data={demoOrder} 
          onEdit={handleEdit} 
        />

        <InformationDashboard/>

        <OrderManagement />
<ScanManagement />

<ShippingInformation />

<OrderActivityLogs />
      </main>
    </div>
  );
};

export default OrderDetailPage;