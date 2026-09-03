import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useShallow } from 'zustand/react/shallow';

import { useEditorStore } from '../../store/editor-store';

import getEditorSidebarSettingsImage from '../../data/sidebars/get-image';

export function useEditorSidebarSettingsImage() {
  const [imageOpen, setImageOpen] = useState(true);

  const handleImageOpen = () => {
    setImageOpen((prevState) => !prevState);
  };

  const { editorMediaId, editorContentErrors } = useEditorStore(
    useShallow((state) => ({
      editorMediaId: state.editorContent?.media_id,
      editorContentErrors: state.editorContentErrors,
    })),
  );

  const editorMediaErrors = editorContentErrors?.filter((error) => error.path === 'media_id');

  return { imageOpen, handleImageOpen, editorMediaId, editorMediaErrors };
}

export function useEditorSidebarSettingsImageAdd() {
  const { setMediaDialogOpen, setMediaDialogType, setMediaDialogContext, setMediaDialogCount } = useEditorStore(
    useShallow((state) => ({
      setMediaDialogOpen: state.setMediaDialogOpen,
      setMediaDialogType: state.setMediaDialogType,
      setMediaDialogContext: state.setMediaDialogContext,
      setMediaDialogCount: state.setMediaDialogCount,
    })),
  );

  const addSettingsImageContent = () => {
    setMediaDialogOpen(true);
    setMediaDialogType('image');
    setMediaDialogContext('settings');
    setMediaDialogCount('single');
  };

  return addSettingsImageContent;
}

export function useEditorSidebarSettingsImageEdit(mediaId: string) {
  const imageQuery = useQuery({
    queryKey: ['editorSidebarSettingsImage', mediaId],
    queryFn: () => getEditorSidebarSettingsImage(mediaId),
  });

  const {
    setMediaDialogOpen,
    setMediaDialogType,
    setMediaDialogContext,
    setMediaDialogCount,
    removeSettingsImageContent,
  } = useEditorStore(
    useShallow((state) => ({
      setMediaDialogOpen: state.setMediaDialogOpen,
      setMediaDialogType: state.setMediaDialogType,
      setMediaDialogContext: state.setMediaDialogContext,
      setMediaDialogCount: state.setMediaDialogCount,
      removeSettingsImageContent: state.removeSettingsImageContent,
    })),
  );

  const editSettingsImageContent = () => {
    setMediaDialogOpen(true);
    setMediaDialogType('image');
    setMediaDialogContext('settings');
    setMediaDialogCount('single');
  };

  return { imageQuery, editSettingsImageContent, removeSettingsImageContent };
}
