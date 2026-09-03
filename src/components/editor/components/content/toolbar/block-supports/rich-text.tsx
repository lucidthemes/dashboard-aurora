import { useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { Bold, Italic, Link, Link2, X, ChevronDown, Underline, Strikethrough } from 'lucide-react';

import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import useBlocksRichText from '../../../../blocks/use-blocks-rich-text';
import { useEditorStore } from '../../../../store/editor-store';
import type { ContentBlocks } from '../../../../schemas/content/content-blocks.schema';
import type { BlockSupports } from '../../../../blocks/block.schema';

export default function EditorToolbarBlockSupportsRichText({
  block,
  blockSupports,
}: {
  block: ContentBlocks;
  blockSupports: BlockSupports;
}) {
  const { setRichTextSelection, handleContentBlockRichText, handleContentBlockRichTextLinkRemove } =
    useBlocksRichText();

  const {
    contentBlockRichTextActive,
    contentBlockRichTextLinkActive,
    contentBlockRichTextLinkURL,
    setContentBlockRichTextLinkActive,
  } = useEditorStore(
    useShallow((state) => ({
      contentBlockRichTextActive: state.contentBlockRichTextActive,
      contentBlockRichTextLinkActive: state.contentBlockRichTextLinkActive,
      contentBlockRichTextLinkURL: state.contentBlockRichTextLinkURL,
      setContentBlockRichTextLinkActive: state.setContentBlockRichTextLinkActive,
    })),
  );

  const linkInputRef = useRef<HTMLInputElement | null>(null);

  if (!blockSupports.richText) return;

  const boldActive = contentBlockRichTextActive?.includes('bold');
  const italicActive = contentBlockRichTextActive?.includes('italic');
  const linkActive = contentBlockRichTextActive?.includes('link');

  const underlineActive = contentBlockRichTextActive?.includes('underline');
  const strikethroughActive = contentBlockRichTextActive?.includes('strikethrough');
  const dropDownRichTextActive = underlineActive || strikethroughActive;

  return (
    <>
      <Separator orientation="vertical" className="h-auto! w-2 bg-border" />

      <Button
        variant={!boldActive ? 'ghost' : 'default'}
        size="icon-sm"
        className="cursor-pointer"
        title="Bold"
        onMouseDown={(e) => {
          e.preventDefault();
          setRichTextSelection();
        }}
        onClick={() => {
          handleContentBlockRichText({ block, type: 'bold' });
        }}
      >
        <Bold />
      </Button>

      <Button
        variant={!italicActive ? 'ghost' : 'default'}
        size="icon-sm"
        className="cursor-pointer"
        title="Italic"
        onMouseDown={(e) => {
          e.preventDefault();
          setRichTextSelection();
        }}
        onClick={() => {
          handleContentBlockRichText({ block, type: 'italic' });
        }}
      >
        <Italic />
      </Button>

      <Popover modal={false} open={contentBlockRichTextLinkActive}>
        <PopoverTrigger asChild>
          <Button
            variant={!linkActive ? 'ghost' : 'default'}
            size="icon-sm"
            className="cursor-pointer"
            title="Link"
            onMouseDown={(e) => {
              e.preventDefault();
              setRichTextSelection();
            }}
            onClick={() => setContentBlockRichTextLinkActive(!contentBlockRichTextLinkActive)}
          >
            <Link />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="center"
          onOpenAutoFocus={(e) => {
            e.preventDefault();
          }}
        >
          <InputGroup key={contentBlockRichTextLinkURL}>
            <InputGroupInput
              ref={linkInputRef}
              id="rich-text-anchor-link"
              name="rich-text-anchor-link"
              placeholder="Type to add link..."
              defaultValue={contentBlockRichTextLinkURL ?? ''}
            />
            <InputGroupAddon align="inline-end">
              {!contentBlockRichTextLinkURL ? (
                <InputGroupButton
                  variant="ghost"
                  size="icon-sm"
                  className="cursor-pointer"
                  title="Add link"
                  onClick={() => {
                    const linkInput = linkInputRef.current;

                    if (!linkInput) return;

                    const linkURL = linkInput.value;

                    if (linkURL) handleContentBlockRichText({ block, type: 'link', linkURL });
                  }}
                >
                  <Link2 className="h-5 w-5 self-center stroke-foreground [&>svg]:size-5" />
                </InputGroupButton>
              ) : (
                <InputGroupButton
                  variant="ghost"
                  size="icon-sm"
                  className="cursor-pointer"
                  title="Remove link"
                  onClick={() => {
                    handleContentBlockRichTextLinkRemove();
                    setContentBlockRichTextLinkActive(false);
                  }}
                >
                  <X className="h-5 w-5 self-center stroke-foreground [&>svg]:size-5" />
                </InputGroupButton>
              )}
            </InputGroupAddon>
          </InputGroup>
        </PopoverContent>
      </Popover>

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant={!dropDownRichTextActive ? 'ghost' : 'default'}
            size="icon-sm"
            className="cursor-pointer"
            title="More"
          >
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem
            title="Underline"
            className={`cursor-pointer capitalize ${underlineActive ? 'bg-muted' : ''}`}
            onMouseDown={(e) => {
              e.preventDefault();
              setRichTextSelection();
            }}
            onClick={() => {
              handleContentBlockRichText({ block, type: 'underline' });
            }}
          >
            <Underline />
            Underline
          </DropdownMenuItem>

          <DropdownMenuItem
            title="Strikethrough"
            className={`cursor-pointer capitalize ${strikethroughActive ? 'bg-muted' : ''}`}
            onMouseDown={(e) => {
              e.preventDefault();
              setRichTextSelection();
            }}
            onClick={() => {
              handleContentBlockRichText({ block, type: 'strikethrough' });
            }}
          >
            <Strikethrough />
            Strikethrough
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
