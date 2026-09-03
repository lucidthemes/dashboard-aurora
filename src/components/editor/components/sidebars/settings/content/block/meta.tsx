import type { EditorBlocks } from '../../../../../schemas/content/editor-blocks.schema';

export default function EditorSettingsSidebarContentBlockTabMeta({ blockMeta }: { blockMeta: EditorBlocks }) {
  return (
    <div className="flex flex-col gap-y-2.5">
      <div className="flex items-center gap-x-2.5">
        {blockMeta.icon && (
          <span
            className="flex h-5 w-5 items-center justify-center"
            dangerouslySetInnerHTML={{ __html: blockMeta.icon }}
          />
        )}
        {blockMeta.title && <span className="text-sm text-foreground">{blockMeta.title}</span>}
      </div>
      {blockMeta.description && <p className="text-sm text-foreground">{blockMeta.description}</p>}
    </div>
  );
}
