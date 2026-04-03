import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MdSecurity, MdTitle, MdDescription, MdHourglassTop, MdClose, MdSave } from 'react-icons/md';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import './RoleEditDialog.css';

const RoleEditDialog = ({ visible, role, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    orderStatus: '',
  });

  useEffect(() => {
    if (role) {
      setFormData({
        title: role.title || '',
        description: role.description || '',
        orderStatus: role.orderStatus || '',
      });
    }
  }, [role]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title?.trim()) return;
    onSave({
      title: formData.title.trim(),
      description: formData.description,
      orderStatus: formData.orderStatus,
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="role-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="role-modal-card"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <button type="button" className="role-modal-close" onClick={onCancel}>
              <MdClose size={18} />
            </button>

            <div className="role-modal-header">
              <div className="role-modal-icon-glow">
                <MdSecurity size={24} />
              </div>
              <div>
                <h3 className="role-modal-title">Edit Role</h3>
                <p className="role-modal-subtitle">Update role details and associated status without leaving the page.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="role-modal-grid">
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

              <div className="role-modal-full">
                <FormInput
                  label="Description"
                  icon={MdDescription}
                  name="description"
                  type="text"
                  placeholder="Enter role description..."
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div className="role-modal-actions">
                <button type="button" className="btn-secondary" onClick={onCancel}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  <MdSave /> Save Changes
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RoleEditDialog;
