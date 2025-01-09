import React, { useState } from 'react';
import { CustomInput } from './CustomInput';
import { RegionDropdown } from './RegionDropdown';

interface RegionSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function RegionSelect({ value, onChange }: RegionSelectProps) {
  const [isCustom, setIsCustom] = useState(false);

  if (isCustom) {
    return (
      <CustomInput
        value={value}
        onChange={onChange}
        onBack={() => setIsCustom(false)}
      />
    );
  }

  return (
    <RegionDropdown
      value={value}
      onChange={onChange}
      onCustomClick={() => setIsCustom(true)}
    />
  );
}