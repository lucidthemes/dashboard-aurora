import type { ContentBlocks } from '../../../../../schemas/content/content-blocks.schema';
import type { EditorBlocks } from '../../../../../schemas/content/editor-blocks.schema';

import EditorSettingsSidebarContentBlockTabSupports from './supports/supports';
import EditorSettingsSidebarContentBlockTabOptions from './options';
import EditorSettingsSidebarContentBlockTabAdvanced from './advanced';

export default function EditorSettingsSidebarContentBlockTabContent({
  block,
  blockMeta,
}: {
  block: ContentBlocks;
  blockMeta: EditorBlocks;
}) {
  const blockSupports = blockMeta.supports;
  const blockSupportsAdvanced = blockSupports?.anchor || blockSupports?.customClasses;

  const blockOptions = blockMeta.options;

  return (
    <>
      {blockSupports && <EditorSettingsSidebarContentBlockTabSupports block={block} blockSupports={blockSupports} />}
      {blockOptions && <EditorSettingsSidebarContentBlockTabOptions block={block} blockOptions={blockOptions} />}
      {blockSupportsAdvanced && (
        <EditorSettingsSidebarContentBlockTabAdvanced block={block} blockSupports={blockSupports} />
      )}
    </>
  );
}
