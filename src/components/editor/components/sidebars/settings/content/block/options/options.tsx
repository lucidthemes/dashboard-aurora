import { Separator } from '@/components/ui/separator';

import type { ContentBlocks } from '../../../../../../schemas/content/content-blocks.schema';
import type { EditorBlocks } from '../../../../../../schemas/content/editor-blocks.schema';

import EditorSettingsSidebarContentBlockTabOptionDropdown from './dropdown';
import EditorSettingsSidebarContentBlockTabOptionForm from './form';
import EditorSettingsSidebarContentBlockTabOptionSlider from './slider';
import EditorSettingsSidebarContentBlockTabOptionToggle from './toggle';

export default function EditorSettingsSidebarContentBlockTabOptions({
  block,
  blockOptions,
}: {
  block: ContentBlocks;
  blockOptions: EditorBlocks['options'];
}) {
  if (!blockOptions) return;

  return (
    <>
      <Separator />
      <span className="text-sm font-medium">Options</span>
      {blockOptions.map((option) => {
        switch (option.type) {
          case 'dropdown':
            return (
              <EditorSettingsSidebarContentBlockTabOptionDropdown key={option.name} block={block} option={option} />
            );

          case 'form':
            return <EditorSettingsSidebarContentBlockTabOptionForm key={option.name} block={block} option={option} />;

          case 'slider':
            return <EditorSettingsSidebarContentBlockTabOptionSlider key={option.name} block={block} option={option} />;

          case 'toggle':
            return <EditorSettingsSidebarContentBlockTabOptionToggle key={option.name} block={block} option={option} />;

          default:
            return;
        }
      })}
    </>
  );
}
