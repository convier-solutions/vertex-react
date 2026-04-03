import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MdSecurity, 
  MdTitle, 
  MdDescription, 
  MdHourglassTop,
  MdSave,
  MdArrowBack,
  MdCheck
} from 'react-icons/md';
import FormInput from '../../components/Common/FormInput';
import FormSelect from '../../components/Common/FormSelect';
import PageHeader from '../../components/Common/PageHeader';
import useRoles from '../../context/useRoles';
import './CreateRolePage.css';

const CreateRolePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const numericId = isEdit ? Number(id) : null;
  const { roles, addRole, updateRole } = useRoles();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const existingRole = isEdit ? roles.find((r) => r.id === numericId) : null;

  const [formData, setFormData] = useState(() => ({
    title: existingRole?.title || '',
    description: existingRole?.description || '',
    orderStatus: existingRole?.orderStatus || '',
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const payload = {
      title: formData.title,
      description: formData.description,
      orderStatus: formData.orderStatus,
    };

    if (isEdit && existingRole) {
      updateRole(existingRole.id, payload);
    } else {
      addRole(payload);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/roles');
      }, 2000);
    }, 500);
  };

  if (isSuccess) {
    return (
      <div className="status-container">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="apple-success-card"
        >
          <div className="success-visual">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="success-ring"
            >
              <MdCheck size={48} className="apple-success-icon" />
            </motion.div>
          </div>
          <div className="success-content">
            <h2>{isEdit ? 'Role Updated' : 'Role Created'}</h2>
            <p>
              {isEdit
                ? 'The role has been successfully updated.'
                : 'The new role has been successfully added.'}
            </p>
          </div>
          <div className="apple-progress-wrapper">
            <motion.div 
              className="apple-progress-bar"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "linear" }}
            />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="create-role-container">
      <PageHeader
        title={isEdit ? 'Edit Role' : 'Create New Role'}
        description={
          isEdit
            ? 'Update role details and its associated order status.'
            : 'Define a new role and its associated order status.'
        }
        icon={MdSecurity}
        showBack={true}
        onBackClick={() => navigate('/roles')}
        breadcrumb={[
          { label: 'Dashboard', path: '/' },
          { label: 'Roles', path: '/roles' },
          { label: isEdit ? 'Edit Role' : 'Create Role', active: true }
        ]}
      />

      <div className="form-content-wrapper">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="form-card"
        >
          <div className="card-header">
            <MdSecurity className="card-icon" size={32} />
            <h3>Role Details</h3>
          </div>

          <form onSubmit={handleSubmit} className="role-form-grid">
            <FormInput
              label="Title*"
              icon={MdTitle}
              name="title"
              type="text"
              placeholder="e.g. Administrator"
              value={formData.title}
              onChange={handleChange}
              required
            />

           
            <FormSelect
              label="Order Status*"
              icon={MdHourglassTop}
              name="orderStatus"
              value={formData.orderStatus}
              onChange={handleChange}
              required
              options={[
                { value: '', label: 'Select Status' },
                { value: 'in_progress', label: 'In Progress' },
                { value: 'file_ready', label: 'File Ready' },
              ]}
            />
<div style={{ gridColumn: 'span 2' }}>
             <FormInput
              label="Description"
              icon={MdDescription}
              name="description"
              type="text"
              placeholder="Enter role description..."
              value={formData.description}
              onChange={handleChange}
            />
           


            <div className="form-actions">
              <button 
                type="button" 
                className="btn-secondary"
                onClick={() => navigate('/roles')}
              >
                <MdArrowBack /> Cancel
              </button>
              <button 
                type="submit" 
                className="btn-primary" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>Processing...</>
                ) : (
                  <>
                    <MdSave /> {isEdit ? 'Update Role' : 'Create Role'}
                  </>
                )}
              </button>
            </div>
             </div>
          </form>
        </motion.section>
      </div>
    </div>
  );
};

export default CreateRolePage;
