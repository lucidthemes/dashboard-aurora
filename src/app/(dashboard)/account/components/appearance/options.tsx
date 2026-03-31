'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, Laptop } from 'lucide-react';

import { Field, FieldContent, FieldLabel, FieldTitle } from '@/components/ui/field';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function AccountAppearanceOptions() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <RadioGroup
      value={theme}
      onValueChange={(value) => setTheme(value)}
      className="grid grid-cols-2 gap-5 md:grid-cols-3"
    >
      <FieldLabel htmlFor="light-option" className="cursor-pointer bg-white!">
        <div className="aspect-video max-h-30 w-full p-4 pb-0">
          <div className="flex h-full items-center justify-center rounded-md bg-accent">
            <Sun className="h-full max-h-1/3 w-full text-muted-foreground" />
          </div>
        </div>
        <Field orientation="horizontal" className="text-muted-foreground">
          <RadioGroupItem value="light" id="light-option" />
          <FieldContent>
            <FieldTitle>Light</FieldTitle>
          </FieldContent>
        </Field>
      </FieldLabel>
      <FieldLabel htmlFor="dark-option" className="cursor-pointer bg-white!">
        <div className="aspect-video max-h-30 w-full p-4 pb-0">
          <div className="flex h-full items-center justify-center rounded-md bg-accent">
            <Moon className="h-full max-h-1/3 w-full text-muted-foreground" />
          </div>
        </div>
        <Field orientation="horizontal" className="text-muted-foreground">
          <RadioGroupItem value="dark" id="dark-option" />
          <FieldContent>
            <FieldTitle>Dark</FieldTitle>
          </FieldContent>
        </Field>
      </FieldLabel>
      <FieldLabel htmlFor="system-option" className="cursor-pointer bg-white!">
        <div className="aspect-video max-h-30 w-full p-4 pb-0">
          <div className="flex h-full items-center justify-center rounded-md bg-accent">
            <Laptop className="h-full max-h-1/3 w-full text-muted-foreground" />
          </div>
        </div>
        <Field orientation="horizontal" className="text-muted-foreground">
          <RadioGroupItem value="system" id="system-option" />
          <FieldContent>
            <FieldTitle>System</FieldTitle>
          </FieldContent>
        </Field>
      </FieldLabel>
    </RadioGroup>
  );
}
