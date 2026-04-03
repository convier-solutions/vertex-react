import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MdArrowBack, 
  MdPostAdd, 
  MdSave, 
  MdCheckCircle, 
  MdHourglassTop,
  MdBadge,
  MdContactPhone,
  MdStraighten,
  MdPerson,
  MdCalendarToday,
  MdHeight,
  MdFitnessCenter,
  MdPhone,
  MdEmail,
  MdLocationCity,
  MdStore,
  MdChevronRight,
  MdChevronLeft,
  MdOutlineVerified,
  MdCheck,
  MdSettings,
  MdLayers,
  MdHealing,
  MdEdit,
  MdNumbers
} from 'react-icons/md';
import FormInput from '../../components/Common/FormInput';
import FormSelect from '../../components/Common/FormSelect';
import FormDatePicker from '../../components/Common/FormDatePicker';
import PageHeader from '../../components/Common/PageHeader';
import './CreateOrderPage.css';

const CreateOrderPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    // Patient Identity (Step 1)
    patient: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    height: '0',
    weight: '0',
    shoeSize: '',
    phone: '',
    mobile: '',
    email: '',
    city: '',

    // Order Details (Step 2)
    customOrthoticType: '',
    topCovers: '',
    midLayerMaterial: '',
    shoeType: '',
    archHeight: '',
    pathologies: '',
    corrections: '',
    quantity: '1',
    orthoticLength: 'Full',
    heelLiftRight: '',
    heelLiftLeft: '',
    notes: '',
    rushOrder: false,
  });

  const mockPatients = [
    { 
      id: 'apple', 
      firstName: 'Apple', 
      lastName: 'test', 
      birthDate: '2000-01-01', 
      height: '175', 
      weight: '70', 
      shoeSize: 'M 2 / W 3.5 / Youth 2',
      phone: '123456789',
      mobile: '987654321',
      email: 'apple@example.com',
      city: 'Cupertino'
    },
    { 
      id: 'john', 
      firstName: 'John', 
      lastName: 'Doe', 
      birthDate: '1990-05-15', 
      height: '180', 
      weight: '80', 
      shoeSize: 'M 9 / W 10.5',
      phone: '555-1234',
      mobile: '555-5678',
      email: 'john.doe@example.com',
      city: 'New York'
    }
  ];

  const steps = [
    { id: 1, title: 'Add Patient Details', icon: <MdBadge size={28} /> },
    { id: 2, title: 'Add Order Details', icon: <MdPostAdd size={28} /> },
    { id: 3, title: 'Review & Confirm', icon: <MdOutlineVerified size={28} /> },
  ];

  const handlePatientChange = (value) => {
    const patientId = value;
    setFormData(prev => ({ ...prev, patient: patientId }));
    
    if (patientId) {
      const selectedPatient = mockPatients.find(p => p.id === patientId);
      if (selectedPatient) {
        setFormData(prev => ({
          ...prev,
          firstName: selectedPatient.firstName,
          lastName: selectedPatient.lastName,
          birthDate: selectedPatient.birthDate,
          height: selectedPatient.height,
          weight: selectedPatient.weight,
          shoeSize: selectedPatient.shoeSize,
          phone: selectedPatient.phone,
          mobile: selectedPatient.mobile,
          email: selectedPatient.email,
          city: selectedPatient.city,
        }));
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ 
      ...prev, 
      [name]: value 
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/orders');
      }, 3000);
    }, 2500);
  };

 if (isSuccess) {
  return (
    <div className="status-container">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
        className="apple-success-card"
      >
        <div className="success-visual">
          {/* Animated Success Ring */}
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="success-ring"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <MdCheck size={48} className="apple-success-icon" />
            </motion.div>
          </motion.div>
        </div>

        <div className="success-content">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Order Created
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            The patient record has been secured. <br />
            You will be redirected shortly.
          </motion.p>
        </div>

        {/* Minimal Progress Loader */}
        <div className="apple-progress-wrapper">
          <motion.div 
            className="apple-progress-bar"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, ease: "linear" }}
          />
        </div>
      </motion.div>
    </div>
  );
}

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.section 
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="form-card"
          >
            <div className="card-header">
              <h3 className='ubuntu-medium'>Add Patient Details</h3>
            </div>
            <div className="form-grid">
              <FormSelect
                label="Patient"
                icon={MdPerson}
                name="patient"
                value={formData.patient}
                onChange={handlePatientChange}
                fullWidth
                options={[
                  { value: '', label: 'Select Patient' },
                  ...mockPatients.map(p => ({ value: p.id, label: `${p.firstName} ${p.lastName}` }))
                ]}
              />

              <FormInput
                label="First Name*"
                placeholder="e.g. John"
                icon={MdPerson}
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <FormInput
                label="Last Name"
                placeholder="e.g. Doe"
                icon={MdPerson}
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
              />
              <FormDatePicker
                label="Birth Date*"
                icon={MdCalendarToday}
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                required
              />
              <FormInput
                label="Height"
                icon={MdHeight}
                name="height"
                type="number"
                value={formData.height}
                onChange={handleChange}
              />
              <FormInput
                label="Weight"
                icon={MdFitnessCenter}
                name="weight"
                type="number"
                value={formData.weight}
                onChange={handleChange}
              />
              <FormSelect
                label="Shoe Size*"
                icon={MdStore}
                name="shoeSize"
                value={formData.shoeSize}
                onChange={(val) => handleSelectChange('shoeSize', val)}
                required
                options={[
                  { value: '', label: 'Select Size' },
                  { value: 'M 2 / W 3.5 / Youth 2', label: 'M 2 / W 3.5 / Youth 2' },
                  { value: 'M 3 / W 4.5', label: 'M 3 / W 4.5' },
                  { value: 'M 4 / W 5.5', label: 'M 4 / W 5.5' },
                  { value: 'M 5 / W 6.5', label: 'M 5 / W 6.5' },
                  { value: 'M 6 / W 7.5', label: 'M 6 / W 7.5' },
                  { value: 'M 7 / W 8.5', label: 'M 7 / W 8.5' },
                  { value: 'M 8 / W 9.5', label: 'M 8 / W 9.5' },
                  { value: 'M 9 / W 10.5', label: 'M 9 / W 10.5' },
                  { value: 'M 10 / W 11.5', label: 'M 10 / W 11.5' },
                  { value: 'M 11 / W 12.5', label: 'M 11 / W 12.5' },
                  { value: 'M 12 / W 13.5', label: 'M 12 / W 13.5' },
                ]}
              />
              <FormInput
                label="Phone"
                placeholder="e.g. 123-456-7890"
                icon={MdPhone}
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
              />
              <FormInput
                label="Mobile"
                placeholder="e.g. 123-456-7890"
                icon={MdPhone}
                name="mobile"
                type="tel"
                value={formData.mobile}
                onChange={handleChange}
              />
              <FormInput
                label="Email"
                placeholder="e.g. john.doe@example.com"
                icon={MdEmail}
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
              <FormInput
                label="City"
                placeholder="e.g. New York"
                icon={MdLocationCity}
                name="city"
                type="text"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
          </motion.section>
        );
      case 2:
        return (
          <motion.section 
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="form-card"
          >
            <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 className='ubuntu-medium'>Add Order Details</h3>
              <button type="button" className="catalog-btn">Material Catalog</button>
            </div>
            <div className="form-grid">
              <FormSelect
                label="Custom Orthotic Type*"
                icon={MdSettings}
                name="customOrthoticType"
                value={formData.customOrthoticType}
                onChange={(val) => handleSelectChange('customOrthoticType', val)}
                required
                options={[
                  { value: '', label: 'Select Custom Orthotic Type' },
                  { value: 'type1', label: 'Type 1' },
                  { value: 'type2', label: 'Type 2' },
                ]}
              />
              <FormSelect
                label="Top Covers*"
                icon={MdLayers}
                name="topCovers"
                value={formData.topCovers}
                onChange={(val) => handleSelectChange('topCovers', val)}
                required
                options={[
                  { value: '', label: 'Select Top Cover' },
                  { value: 'cover1', label: 'Cover 1' },
                  { value: 'cover2', label: 'Cover 2' },
                ]}
              />
              <FormSelect
                label="Mid Layer Material*"
                icon={MdLayers}
                name="midLayerMaterial"
                value={formData.midLayerMaterial}
                onChange={(val) => handleSelectChange('midLayerMaterial', val)}
                required
                options={[
                  { value: '', label: 'Select Mid Layer' },
                  { value: 'mid1', label: 'Mid Layer 1' },
                  { value: 'mid2', label: 'Mid Layer 2' },
                ]}
              />
              <FormSelect
                label="Shoe Type*"
                icon={MdStore}
                name="shoeType"
                value={formData.shoeType}
                onChange={(val) => handleSelectChange('shoeType', val)}
                required
                options={[
                  { value: '', label: 'Select Shoe Type' },
                  { value: 'shoe1', label: 'Shoe 1' },
                  { value: 'shoe2', label: 'Shoe 2' },
                ]}
              />
              <FormSelect
                label="Arch Height*"
                icon={MdHeight}
                name="archHeight"
                value={formData.archHeight}
                onChange={(val) => handleSelectChange('archHeight', val)}
                required
                options={[
                  { value: '', label: 'Select Arch Height' },
                  { value: 'arch1', label: 'Arch 1' },
                  { value: 'arch2', label: 'Arch 2' },
                ]}
              />
              <FormInput
                label="Pathologies"
                placeholder="e.g. Plantar Fasciitis"
                icon={MdHealing}
                name="pathologies"
                type="text"
                value={formData.pathologies}
                onChange={handleChange}
              />
              <FormInput
                label="Corrections"
                placeholder="e.g. Custom Foot Orthotic"
                icon={MdEdit}
                name="corrections"
                type="text"
                value={formData.corrections}
                onChange={handleChange}
              />
              <FormSelect
                label="Quantity*"
                icon={MdNumbers}
                name="quantity"
                value={formData.quantity}
                onChange={(val) => handleSelectChange('quantity', val)}
                required
                options={[
                  ...[1, 2, 3, 4, 5].map(q => ({ value: q.toString(), label: q.toString() }))
                ]}
              />
              <FormSelect
                label="Orthotic Length*"
                icon={MdStraighten}
                name="orthoticLength"
                value={formData.orthoticLength}
                onChange={(val) => handleSelectChange('orthoticLength', val)}
                required
                options={[
                  { value: 'Full', label: 'Full' },
                  { value: '3/4', label: '3/4' },
                ]}
              />
              <FormInput
                label="Heel Lift Right"
                placeholder="e.g. 5mm"
                icon={MdHeight}
                name="heelLiftRight"
                type="text"
                value={formData.heelLiftRight}
                onChange={handleChange}
              />
              <FormInput
                label="Heel Lift Left"
                placeholder="e.g. 5mm"
                icon={MdHeight}
                name="heelLiftLeft"
                type="text"
                value={formData.heelLiftLeft}
                onChange={handleChange}
              />
              <div className=" full-width form-field">
                <label>Notes</label>
                <textarea
                  name="notes"
                  placeholder=''
                  className="form-textarea"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={4}
                />
              </div>
          <div className="form-group full-width rush-order-group">
  <label className="rush-order-label">
    {/* Icon for extra modern touch */}
    <div style={{ 
      fontSize: '20px', 
      background: formData.rushOrder ? '#eff6ff' : '#f1f5f9',
      padding: '10px',
      borderRadius: '12px',
      transition: 'all 0.3s'
    }}>
      ⚡
    </div>
    
    <div className="rush-text-wrapper">
      <span className="rush-title">RUSH ORDER</span>
      <span className="rush-price">+$10.00 Priority Processing</span>
    </div>
  </label>

  {/* Custom Switch Component */}
  <label className="switch">
    <input
      type="checkbox"
      name="rushOrder"
      checked={formData.rushOrder}
      onChange={handleChange}
    />
    <span className="slider"></span>
  </label>
</div>
              
            </div>
          </motion.section>
        );
      case 3:
        return (
          <motion.section 
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="form-card review-step"
          >
            <div className="card-header">
              <MdOutlineVerified className="card-icon" size={32} />
              <h3 className='ubuntu-medium'>Review & Confirm</h3>
              <span className="step-badge">Final Step</span>
            </div>
            <div className="review-grid">
               <div className="review-section-title full-width">Patient Identity</div>
               <div className="review-item">
                 <span className="label">First Name</span>
                 <span className="value">{formData.firstName || 'N/A'}</span>
               </div>
               <div className="review-item">
                 <span className="label">Last Name</span>
                 <span className="value">{formData.lastName || 'N/A'}</span>
               </div>
               <div className="review-item">
                 <span className="label">Birth Date</span>
                 <span className="value">{formData.birthDate || 'N/A'}</span>
               </div>
               <div className="review-item">
                 <span className="label">Shoe Size</span>
                 <span className="value">{formData.shoeSize || 'N/A'}</span>
               </div>
               <div className="review-item">
                 <span className="label">Height</span>
                 <span className="value">{formData.height || '0'}</span>
               </div>
               <div className="review-item">
                 <span className="label">Weight</span>
                 <span className="value">{formData.weight || '0'}</span>
               </div>

               <div className="review-section-title full-width" style={{ marginTop: '1.5rem' }}>Contact Information</div>
               <div className="review-item">
                 <span className="label">Phone</span>
                 <span className="value">{formData.phone || 'N/A'}</span>
               </div>
               <div className="review-item">
                 <span className="label">Mobile</span>
                 <span className="value">{formData.mobile || 'N/A'}</span>
               </div>
               <div className="review-item">
                 <span className="label">Email</span>
                 <span className="value">{formData.email || 'N/A'}</span>
               </div>
               <div className="review-item">
                 <span className="label">City</span>
                 <span className="value">{formData.city || 'N/A'}</span>
               </div>
 
               <div className="review-section-title full-width" style={{ marginTop: '1.5rem' }}>Order Details</div>
               <div className="review-item">
                 <span className="label">Orthotic Type</span>
                 <span className="value">{formData.customOrthoticType || 'N/A'}</span>
               </div>
               <div className="review-item">
                 <span className="label">Top Covers</span>
                 <span className="value">{formData.topCovers || 'N/A'}</span>
               </div>
               <div className="review-item">
                 <span className="label">Mid Layer Material</span>
                 <span className="value">{formData.midLayerMaterial || 'N/A'}</span>
               </div>
               <div className="review-item">
                 <span className="label">Shoe Type</span>
                 <span className="value">{formData.shoeType || 'N/A'}</span>
               </div>
               <div className="review-item">
                 <span className="label">Arch Height</span>
                 <span className="value">{formData.archHeight || 'N/A'}</span>
               </div>
               <div className="review-item">
                 <span className="label">Pathologies</span>
                 <span className="value">{formData.pathologies || 'N/A'}</span>
               </div>
               <div className="review-item">
                 <span className="label">Corrections</span>
                 <span className="value">{formData.corrections || 'N/A'}</span>
               </div>
               <div className="review-item">
                 <span className="label">Quantity</span>
                 <span className="value">{formData.quantity}</span>
               </div>
               <div className="review-item">
                 <span className="label">Orthotic Length</span>
                 <span className="value">{formData.orthoticLength}</span>
               </div>
               <div className="review-item">
                 <span className="label">Heel Lift Right</span>
                 <span className="value">{formData.heelLiftRight || 'N/A'}</span>
               </div>
               <div className="review-item">
                 <span className="label">Heel Lift Left</span>
                 <span className="value">{formData.heelLiftLeft || 'N/A'}</span>
               </div>
               <div className="review-item">
                 <span className="label">Rush Order</span>
                 <span className="value">{formData.rushOrder ? 'Yes ($10)' : 'No'}</span>
               </div>
               <div className="review-item full-width">
                 <span className="label">Notes</span>
                 <span className="value" style={{ whiteSpace: 'pre-wrap' }}>{formData.notes || 'No notes provided'}</span>
               </div>
             </div>
            <div className="confirmation-box">
              <p>By proceeding, you confirm that all information provided is accurate and you are ready to create this order.</p>
            </div>
          </motion.section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="create-order-wrapper">
    
{isSubmitting && (
  <div className="loader-overlay">
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="apple-loader-card"
    >
      {/* Modern CSS Spinner */}
      <div className="apple-spinner"></div>
      
      <div className="loader-text-group">
        <h3>Finalizing Registration</h3>
        <p>Securing record in database</p>
      </div>
      
      {/* Optional: Subtle Progress Glow */}
      <div className="loading-bar-container">
        <div className="loading-bar-glow"></div>
      </div>
    </motion.div>
  </div>
)}
      <div className="create-order-container">
        <PageHeader 
          title="Create New Order"
          description="Start a new order by entering the required details."
          icon={MdPostAdd}
          breadcrumb={[
            { label: 'Dashboard', path: '/' },
            { label: 'Orders', path: '/orders' },
            { label: 'New Order', active: true }
          ]}
          backPath="/orders"
        />

        <div className="stepper-container">
          {steps.map((step) => (
            <div 
              key={step.id} 
              className={`step-item ${currentStep === step.id ? 'active' : ''} ${currentStep > step.id ? 'step-completed' : ''}`}
              onClick={() => currentStep > step.id && setCurrentStep(step.id)}
            >
              <div className="step-icon-wrapper">
                {currentStep > step.id ? <MdCheckCircle size={32} /> : step.icon}
              </div>
              <span className="step-title">{step.title}</span>
              {step.id !== steps.length && <div className="step-connector"></div>}
            </div>
          ))}
        </div>

        <form className="order-form" onSubmit={handleNext}>
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>

          <div className="form-actions">
            {currentStep > 1 && (
             <button type="button" className="btn-back" onClick={handleBack}>
  <MdChevronLeft size={22} /> {/* Reduced size for a more sophisticated look */}
  <span>Back</span> {/* "Back" is cleaner than "Previous Step" for Apple-style UI */}
</button>
            )}
            
            <div style={{ flex: 1 }}></div>

            <button type="button" className="order-btn-cancel" onClick={() => navigate('/orders')}>
              Discard Changes
            </button>
            
            <button type="submit" className="btn-save" disabled={isSubmitting}>
              {currentStep < steps.length ? (
                <>
                  <span>Next Step</span>
                  <MdChevronRight size={28} />
                </>
              ) : (
                <>
                  <MdSave size={24} />
                  <span>Finalize & Create Order</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateOrderPage;
