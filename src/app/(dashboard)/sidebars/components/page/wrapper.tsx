'use client';

import { useShallow } from 'zustand/react/shallow';

import DeleteDialog from '@/components/dialogs/delete';
import SheetForm from '@/components/sheets/form';

import { useSidebarsStore } from '../../store/sidebars-store';
import SidebarsForm from '../form';
import useSidebarsCreateForm from '../../hooks/use-create-form';
import useSidebarsEditForm from '../../hooks/use-edit-form';

export default function SidebarsPageWrapper({ children }: { children: React.ReactNode }) {
  const {
    createSheetOpen,
    editSheetOpen,
    deleteDialogOpen,
    deleteDialogSidebarId,
    setCreateSheetOpen,
    setEditSheetOpen,
    setEditSheetSidebar,
    setDeleteDialogOpen,
  } = useSidebarsStore(
    useShallow((state) => ({
      createSheetOpen: state.createSheetOpen,
      editSheetOpen: state.editSheetOpen,
      deleteDialogOpen: state.deleteDialogOpen,
      deleteDialogSidebarId: state.deleteDialogSidebarId,
      setCreateSheetOpen: state.setCreateSheetOpen,
      setEditSheetOpen: state.setEditSheetOpen,
      setEditSheetSidebar: state.setEditSheetSidebar,
      setDeleteDialogOpen: state.setDeleteDialogOpen,
    })),
  );

  const createSheetClose = () => {
    setCreateSheetOpen(false);
  };

  const editSheetClose = () => {
    setEditSheetOpen(false);
    setEditSheetSidebar(null);
  };

  const deleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const sidebarCreateForm = useSidebarsCreateForm();
  const sidebarsEditForm = useSidebarsEditForm();

  return (
    <>
      {children}

      {/* Create sidebar sheet */}
      <SheetForm
        sheetOpen={createSheetOpen}
        sheetClose={createSheetClose}
        formId="sidebars-create-form"
        title="Create new sidebar"
        description="Create a new sidebar with selected widgets"
        size="large"
        submitButtonText="Create sidebar"
        submitIsPending={sidebarCreateForm.isPending}
      >
        <SidebarsForm
          form={sidebarCreateForm.form}
          onSubmit={sidebarCreateForm.onSubmit}
          formId="sidebars-create-form"
        />
      </SheetForm>

      {/* Edit sidebar sheet */}
      <SheetForm
        sheetOpen={editSheetOpen}
        sheetClose={editSheetClose}
        formId="sidebars-edit-form"
        title="Edit sidebar"
        size="large"
        submitIsPending={sidebarsEditForm.isPending}
      >
        <SidebarsForm form={sidebarsEditForm.form} onSubmit={sidebarsEditForm.onSubmit} formId="sidebars-edit-form" />
      </SheetForm>

      {/* delete sidebar dialog */}
      <DeleteDialog
        dialogOpen={deleteDialogOpen}
        dialogClose={deleteDialogClose}
        deleteRowId={deleteDialogSidebarId}
        deleteTable="sidebars"
        deletePath="/sidebars"
        deleteLogEventName="DELETE_SIDEBAR"
        deleteLogEventMessage="Sidebar"
        title="Delete sidebar"
      />
    </>
  );
}
