import { useState } from 'react';

export default function useAccountName() {
  const [formShown, setFormShown] = useState(false);

  const handleFormShown = () => {
    setFormShown((prevState) => !prevState);
  };

  return { formShown, handleFormShown };
}
