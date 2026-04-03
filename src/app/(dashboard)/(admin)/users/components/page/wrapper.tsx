'use client';

import SheetContent from '@/components/sheets/content';
import SheetForm from '@/components/sheets/form';

import { useUsersStore } from '../../store/users-store';
import UsersCreateSheetForm from '../sheets/create';
import useUsersCreateSheetForm from '../../hooks/use-create-form';
import UsersViewSheetContent from '../sheets/view';
import useUsersEditSheetForm from '../../hooks/use-edit-form';
import UsersEditSheetForm from '../sheets/edit';
import UsersDeleteUserDialog from '../dialogs/delete-user';

export default function UsersPageWrapper({ children }: { children: React.ReactNode }) {
  const {
    createSheetOpen,
    setCreateSheetOpen,
    viewSheetOpen,
    setViewSheetOpen,
    viewSheetUser,
    setViewSheetUser,
    editSheetOpen,
    setEditSheetOpen,
    setEditSheetUser,
    deleteDialogOpen,
    deleteDialogUserId,
    setDeleteDialogOpen,
    setDeleteDialogUserId,
  } = useUsersStore();

  const usersCreateForm = useUsersCreateSheetForm();

  const usersEditForm = useUsersEditSheetForm();

  const createSheetClose = () => {
    setCreateSheetOpen(false);
  };

  const viewSheetClose = () => {
    setViewSheetOpen(false);
    setViewSheetUser(null);
  };

  const editSheetClose = () => {
    setEditSheetOpen(false);
    setEditSheetUser(null);
  };

  const deleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setDeleteDialogUserId(null);
  };

  return (
    <>
      {children}

      {/* Create user sheet */}
      <SheetForm
        sheetOpen={createSheetOpen}
        sheetClose={createSheetClose}
        formId="users-create-form"
        title="Create new user"
        description="Invite email address to create user"
        submitButtonText="Create user"
        submitIsPending={usersCreateForm.isPending}
      >
        <UsersCreateSheetForm form={usersCreateForm.form} onSubmit={usersCreateForm.onSubmit} />
      </SheetForm>

      {/* View user sheet */}
      <SheetContent
        sheetOpen={viewSheetOpen}
        sheetClose={viewSheetClose}
        title={`User ID: ${viewSheetUser?.id}`}
        description="View user details"
        size="large"
      >
        <UsersViewSheetContent />
      </SheetContent>

      {/* Edit user role sheet */}
      <SheetForm
        sheetOpen={editSheetOpen}
        sheetClose={editSheetClose}
        formId="users-edit-form"
        title="Edit user role"
        description="Update user role to customer, editor, or admin"
        submitIsPending={usersEditForm.isPending}
      >
        <UsersEditSheetForm form={usersEditForm.form} onSubmit={usersEditForm.onSubmit} />
      </SheetForm>

      {/* Delete user dialog */}
      <UsersDeleteUserDialog
        dialogOpen={deleteDialogOpen}
        dialogClose={deleteDialogClose}
        deleteUserId={deleteDialogUserId}
      />
    </>
  );
}
