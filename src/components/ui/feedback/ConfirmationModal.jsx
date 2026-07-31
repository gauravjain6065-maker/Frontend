import React from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';
import Button from '../forms/Button';

/**
 * ConfirmationModal component - Dialog prompt validating actions.
 */
const ConfirmationModal = React.memo(({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message = 'This action cannot be undone. Please confirm to proceed.',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger', // 'danger' | 'primary'
  loading = false,
  ...props
}) => {
  // Compose modal actions footer
  const footerActions = (
    <>
      <Button
        variant="secondary"
        onClick={onClose}
        disabled={loading}
        size="sm"
      >
        {cancelLabel}
      </Button>
      <Button
        variant={variant === 'danger' ? 'danger' : 'primary'}
        onClick={onConfirm}
        loading={loading}
        size="sm"
      >
        {confirmLabel}
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      footer={footerActions}
      closeOnClickOutside={!loading}
      {...props}
    >
      <p className="text-xs text-neutral-600 leading-relaxed">
        {message}
      </p>
    </Modal>
  );
});

ConfirmationModal.displayName = 'ConfirmationModal';

ConfirmationModal.propTypes = {
  /** If true, opens the modal */
  isOpen: PropTypes.bool.isRequired,
  /** Callback fired when cancellation occurs */
  onClose: PropTypes.func.isRequired,
  /** Callback fired when confirmation occurs */
  onConfirm: PropTypes.func.isRequired,
  /** Modal header text */
  title: PropTypes.string,
  /** Dialog prompt body text */
  message: PropTypes.string,
  /** Confirm action button text */
  confirmLabel: PropTypes.string,
  /** Cancel action button text */
  cancelLabel: PropTypes.string,
  /** Coloring type for the confirm button */
  variant: PropTypes.oneOf(['danger', 'primary']),
  /** Disables controls and adds loaders to the confirm button */
  loading: PropTypes.bool,
};

export default ConfirmationModal;
