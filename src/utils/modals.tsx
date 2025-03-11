import { Text } from '@mantine/core';
import { modals } from '@mantine/modals';

interface OpenCustomConfirmModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  childrenText: string;
}

const openCustomConfirmModal = ({
  onConfirm,
  onCancel,
  childrenText,
  title
}: OpenCustomConfirmModalProps) => {
  modals.openConfirmModal({
    title,
    centered: true,
    children: <Text size={'sm'}>{childrenText}</Text>,
    confirmProps: { color: 'red' },
    labels: { confirm: 'Đồng ý', cancel: 'Huỷ bỏ' },
    onCancel,
    onConfirm
  });
};

interface OpenUploadModalProps {
  title: string;
  opened: boolean;
  onClose: () => void;
  afterUpload: (url: string) => void;
}

export const Modals = { openCustomConfirmModal };
