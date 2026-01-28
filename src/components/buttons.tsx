'use client';

import { Eye, Pencil, Trash2, Plus, Copy } from 'lucide-react';

import { Button } from '@/components/ui/button';

function ViewButton({ className, ...props }: React.ComponentProps<'button'>) {
  return (
    <Button variant="outline" size="icon-sm" className={`cursor-pointer ${className}`} {...props}>
      <Eye />
    </Button>
  );
}

function EditButton({ className, ...props }: React.ComponentProps<'button'>) {
  return (
    <Button variant="outline" size="icon-sm" className={`cursor-pointer ${className}`} {...props}>
      <Pencil />
    </Button>
  );
}

function DeleteButton({ className, ...props }: React.ComponentProps<'button'>) {
  return (
    <Button variant="outline" size="icon-sm" className={`cursor-pointer ${className}`} {...props}>
      <Trash2 />
    </Button>
  );
}

function CreateButton({ className, ...props }: React.ComponentProps<'button'>) {
  return (
    <Button variant="outline" size="default" className={`cursor-pointer ${className}`} {...props}>
      <Plus /> Create
    </Button>
  );
}

function CopyButton({ className, ...props }: React.ComponentProps<'button'>) {
  return (
    <Button variant="outline" size="icon-sm" className={`cursor-pointer ${className}`} {...props}>
      <Copy />
    </Button>
  );
}

export { ViewButton, EditButton, DeleteButton, CreateButton, CopyButton };
