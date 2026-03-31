import { useState } from 'react';

export default function useAccountDelete() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen((prevState) => !prevState);
  };

  return { dialogOpen, handleDialogOpen };
}
