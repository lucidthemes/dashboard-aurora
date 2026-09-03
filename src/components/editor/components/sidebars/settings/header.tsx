'use client';

import type { Dispatch, SetStateAction } from 'react';
import { X } from 'lucide-react';

import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

import { useEditorStore } from '../../../store/editor-store';

interface EditorSettingsSidebarHeaderProps {
  type: 'post' | 'page';
  settingsSidebarOpen: boolean;
  setActiveTab: Dispatch<SetStateAction<'document' | 'block'>>;
}

export default function EditorSettingsSidebarHeader({
  type,
  settingsSidebarOpen,
  setActiveTab,
}: EditorSettingsSidebarHeaderProps) {
  const setSettingsSidebarOpen = useEditorStore((state) => state.setSettingsSidebarOpen);

  return (
    <div className="flex items-center justify-between border-b py-2.5 pr-2.5">
      <TabsList className="bg-background p-0">
        <TabsTrigger
          value="document"
          className="h-14 cursor-pointer rounded-none px-4 capitalize data-[state=active]:border-b-2! data-[state=active]:border-b-primary! data-[state=active]:shadow-none!"
          onClick={() => setActiveTab('document')}
        >
          <span>{type}</span>
        </TabsTrigger>
        <TabsTrigger
          value="block"
          className="h-14 cursor-pointer rounded-none px-4 capitalize data-[state=active]:border-b-2! data-[state=active]:border-b-primary! data-[state=active]:shadow-none!"
          onClick={() => setActiveTab('block')}
        >
          <span>Block</span>
        </TabsTrigger>
      </TabsList>
      <Button
        variant="ghost"
        size="icon"
        className="cursor-pointer"
        onClick={() => setSettingsSidebarOpen(!settingsSidebarOpen)}
      >
        <X />
      </Button>
    </div>
  );
}
