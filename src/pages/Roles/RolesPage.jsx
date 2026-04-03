import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MdSecurity, 
  MdEdit, 
  MdDelete, 
  MdAdd,
  MdShield
} from 'react-icons/md';
import PrimeDataTable from '../../components/Table/Table';
import PageHeader from '../../components/Common/PageHeader';
import ConfirmDialog from '../../components/Common/ConfirmDialog';
import RoleEditDialog from '../../components/Common/RoleEditDialog';
import useRoles from '../../context/useRoles';
import './CreateRolePage.css'; // Reusing styles for simplicity

const RolesPage = () => {
  const navigate = useNavigate();
  const { roles, deleteRole, updateRole } = useRoles();
  const [roleToDelete, setRoleToDelete] = useState(null);
  const [roleToEdit, setRoleToEdit] = useState(null);

  const columns = useMemo(() => [
    { 
      field: 'id', 
      header: 'ID', 
      width: '5rem',
      body: (rowData) => <span className="order-id-text">#{rowData.id}</span> 
    },
    { 
      field: 'title', 
      header: 'Title',
      body: (rowData) => <span className="font-semibold text-primary">{rowData.title}</span>
    },
    { 
      field: 'description', 
      header: 'Description',
      body: (rowData) => (
        <div className="description-cell">
          <span className="text-secondary">{rowData.description}</span>
        </div>
      )
    },
    {
      field: 'actions',
      header: 'Actions',
      sortable: false,
      width: '8rem',
      body: (rowData) => (
        <div className="action-buttons">
          <button
            className="btn-icon edit"
            title="Edit"
            onClick={() => setRoleToEdit(rowData)}
          >
            <MdEdit />
          </button>
          <button
            className="btn-icon delete"
            title="Delete"
            onClick={() => setRoleToDelete(rowData)}
          >
            <MdDelete />
          </button>
        </div>
      )
    }
  ], [navigate]);

  return (
    <div className="roles-container">
      <PageHeader
        title="Roles Management"
        description="Manage user roles, permissions and associated workflows."
        icon={MdShield}
        showBack={false}
        breadcrumb={[
          { label: 'Dashboard', path: '/' },
          { label: 'Roles', active: true }
        ]}
        actions={
          <button
            type="button"
            className="btn-primary"
            onClick={() => navigate('/roles/create')}
          >
            <MdAdd /> New Role
          </button>
        }
      />
      
      <div className="table-content-wrapper">
        <PrimeDataTable 
          columns={columns} 
          data={roles} 
          title="All Roles" 
          totalRecords={roles.length} 
        />
      </div>

      <ConfirmDialog
        visible={!!roleToDelete}
        title="Delete this role?"
        message={roleToDelete ? `This action will permanently remove the "${roleToDelete.title}" role.` : ''}
        confirmLabel="Delete Role"
        cancelLabel="Cancel"
        onCancel={() => setRoleToDelete(null)}
        onConfirm={() => {
          if (roleToDelete) {
            deleteRole(roleToDelete.id);
            setRoleToDelete(null);
          }
        }}
      />

      <RoleEditDialog
        visible={!!roleToEdit}
        role={roleToEdit}
        onCancel={() => setRoleToEdit(null)}
        onSave={(updates) => {
          if (roleToEdit) {
            updateRole(roleToEdit.id, updates);
            setRoleToEdit(null);
          }
        }}
      />
    </div>
  );
};

export default RolesPage;
