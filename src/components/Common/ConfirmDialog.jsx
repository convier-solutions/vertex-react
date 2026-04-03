import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MdWarningAmber, MdClose } from 'react-icons/md';
import './ConfirmDialog.css';

const ConfirmDialog = ({
  visible,
  title = 'Delete Role',
  message,
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
}) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="confirm-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="confirm-card"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <button className="confirm-close" type="button" onClick={onCancel}>
              <MdClose size={18} />
            </button>
            <div className="confirm-icon-ring">
              <MdWarningAmber className="confirm-icon" size={32} />
            </div>
            <h3 className="confirm-title">{title}</h3>
            {message && <p className="confirm-message">{message}</p>}
            <div className="confirm-actions">
              <button type="button" className="btn-secondary" onClick={onCancel}>
                {cancelLabel}
              </button>
              <button type="button" className="btn-danger" onClick={onConfirm}>
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmDialog;
