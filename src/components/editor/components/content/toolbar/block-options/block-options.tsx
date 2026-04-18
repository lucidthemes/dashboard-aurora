import { Separator } from '@/components/ui/separator';

import type { ContentBlocks } from '../../../../schemas/content/content-blocks.schema';
import type { EditorBlocks } from '../../../../schemas/content/editor-blocks.schema';

import EditorToolbarBlockOptionDropdown from './dropdown';
import EditorToolbarBlockOptionForm from './form';
import EditorToolbarBlockOptionSlider from './slider';
import EditorToolbarBlockOptionToggle from './toggle';

export default function EditorToolbarBlockOptions({
  block,
  blockOptions,
}: {
  block: ContentBlocks;
  blockOptions: EditorBlocks['options'];
}) {
  if (!blockOptions) return;

  return (
    <>
      <Separator orientation="vertical" className="h-auto! w-2 bg-border" />

      {blockOptions.map((option) => {
        if (option.showInToolbar) {
          switch (option.type) {
            case 'dropdown':
              return <EditorToolbarBlockOptionDropdown key={option.name} block={block} option={option} />;

            case 'form':
              return <EditorToolbarBlockOptionForm key={option.name} block={block} option={option} />;

            case 'slider':
              return <EditorToolbarBlockOptionSlider key={option.name} block={block} option={option} />;

            case 'toggle':
              return <EditorToolbarBlockOptionToggle key={option.name} block={block} option={option} />;

            default:
              return;
          }
        }
      })}
    </>
  );
}
