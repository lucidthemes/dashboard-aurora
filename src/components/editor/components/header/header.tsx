import EditorHeaderOptions from './options';
import EditorHeaderButtonSettings from './button-settings';
import EditorHeaderButtonPublish from './button-publish';

export default function EditorHeader({ type, action }: { type: 'post' | 'page'; action: 'create' | 'edit' }) {
  return (
    <div className="relative z-1 flex w-full shrink-0 justify-between border-b bg-background p-5">
      <EditorHeaderOptions />
      <div className="flex gap-x-5">
        <EditorHeaderButtonSettings />
        <EditorHeaderButtonPublish type={type} action={action} />
      </div>
    </div>
  );
}
