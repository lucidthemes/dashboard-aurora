'use client';

import { useState, useEffect } from 'react';

import { cn } from '@/lib/utils';
import { Tabs } from '@/components/ui/tabs';
import { useShallow } from 'zustand/react/shallow';

import { useEditorStore } from '../../../store/editor-store';

import EditorSettingsSidebarHeader from './header';
import EditorSettingsSidebarContent from './content';

export default function EditorSettingsSidebar({ type }: { type: 'post' | 'page' }) {
  const { settingsSidebarOpen, selectedContentBlock } = useEditorStore(
    useShallow((state) => ({
      settingsSidebarOpen: state.settingsSidebarOpen,
      selectedContentBlock: state.selectedContentBlock,
    })),
  );

  const [activeTab, setActiveTab] = useState<'document' | 'block'>('document');

  useEffect(() => {
    const updateTab = (option: 'document' | 'block') => {
      setActiveTab(option);
    };

    if (selectedContentBlock !== null) {
      updateTab('block');
    } else {
      updateTab('document');
    }
  }, [selectedContentBlock]);

  return (
    <div
      className={cn(
        'relative h-full overflow-hidden border-l bg-background transition-all duration-200',
        settingsSidebarOpen ? 'w-[350px] opacity-100' : 'w-0 border-0 opacity-0',
      )}
    >
      <div className="absolute inset-0 flex flex-col">
        <Tabs value={activeTab} className="flex-1 overflow-y-auto">
          <EditorSettingsSidebarHeader
            type={type}
            settingsSidebarOpen={settingsSidebarOpen}
            setActiveTab={setActiveTab}
          />
          <div className="flex-1 overflow-y-auto">
            <EditorSettingsSidebarContent type={type} selectedContentBlock={selectedContentBlock} />
          </div>
        </Tabs>
      </div>
    </div>
  );
}
