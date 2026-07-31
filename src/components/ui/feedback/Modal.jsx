import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { X } from 'lucide-react';

/**
 * Modal component - Standard dialog box with keyboard escape and click outside listeners.
 */
const Modal = React.memo(({
  isOpen,
  onClose,
  title = '',
  children,
  footer = null,
  size = 'md',
  closeOnClickOutside = true,
  className = '',
  ...props
}) => {
  const modalRef = useRef(null);

  // Close on Escape key & Lock body scroll
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (closeOnClickOutside && modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '5xl': 'max-w-5xl',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-neutral-900/40 backdrop-blur-xs transition-opacity duration-200"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      {...props}
    >
      <div
        ref={modalRef}
        className={`w-full bg-white rounded-xl shadow-modal border border-neutral-200 flex flex-col overflow-hidden transform scale-100 transition-transform duration-200 ${
          sizeClasses[size] || sizeClasses.md
        } ${className}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
          <h3 id="modal-title" className="text-base font-bold text-neutral-800">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Close dialog"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4 overflow-y-auto max-h-[70vh] crm-scrollbar text-sm text-neutral-600 leading-relaxed">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 border-t border-neutral-100 bg-neutral-50 flex items-center justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
});

Modal.displayName = 'Modal';

Modal.propTypes = {
  /** If true, the modal opens as a dialog overlay */
  isOpen: PropTypes.bool.isRequired,
  /** Callback fired to close the modal */
  onClose: PropTypes.func.isRequired,
  /** Header title text */
  title: PropTypes.string,
  /** Modal body content */
  children: PropTypes.node.isRequired,
  /** Modal actions buttons footer */
  footer: PropTypes.node,
  /** Modal container width variant */
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', '2xl', '5xl']),
  /** If true, clicking on backdrop overlay closes the modal */
  closeOnClickOutside: PropTypes.bool,
  /** Additional CSS class names */
  className: PropTypes.string,
};

export default Modal;
