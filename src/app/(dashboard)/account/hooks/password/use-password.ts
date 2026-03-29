import { useState } from 'react';

export default function useAccountPassword() {
  const [formShown, setFormShown] = useState(false);

  const handleFormShown = () => {
    setFormShown((prevState) => !prevState);
  };

  return { formShown, handleFormShown };
}
