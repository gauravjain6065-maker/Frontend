import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Dropdown component - Standard floating select action popover.
 */
const Dropdown = React.memo(({
  trigger,
  items = [],
  align = 'right',
  className = '',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close dropdown on click outside or escape key
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (onClickEvent, isDisabled) => {
    if (isDisabled) return;
    if (onClickEvent) {
      onClickEvent();
    }
    setIsOpen(false);
  };

  const alignClass = align === 'left' ? 'left-0' : 'right-0';

  return (
    <div ref={containerRef} className={`relative inline-block text-left ${className}`} {...props}>
      {/* Trigger Slot */}
      <div onClick={toggleDropdown} role="button" aria-haspopup="true" aria-expanded={isOpen}>
        {trigger}
      </div>

      {/* Menu Overlay */}
      {isOpen && (
        <div
          className={`absolute mt-1.5 w-48 rounded-md bg-white border border-neutral-200 shadow-dropdown z-30 focus:outline-none ${alignClass}`}
          role="menu"
          aria-orientation="vertical"
        >
          <div className="py-1" role="none">
            {items.map((item, idx) => {
              const Icon = item.icon || null;
              
              let itemClass = 'w-full text-left px-4 py-2 text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors focus:bg-neutral-50 focus:outline-none';
              
              if (item.disabled) {
                itemClass += ' text-neutral-300 cursor-not-allowed';
              } else if (item.danger) {
                itemClass += ' text-danger-600 hover:bg-danger-50';
              } else {
                itemClass += ' text-neutral-700 hover:bg-neutral-50';
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={item.disabled}
                  onClick={() => handleItemClick(item.onClick, item.disabled)}
                  className={itemClass}
                  role="menuitem"
                >
                  {Icon && <Icon className="w-4 h-4 flex-shrink-0" />}
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
});

Dropdown.displayName = 'Dropdown';

Dropdown.propTypes = {
  /** React node to trigger opening (e.g. Button or Icon) */
  trigger: PropTypes.node.isRequired,
  /** List of dropdown actions */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func,
      icon: PropTypes.elementType,
      disabled: PropTypes.bool,
      danger: PropTypes.bool,
    })
  ).isRequired,
  /** Alignment of popup menu relative to trigger element */
  align: PropTypes.oneOf(['left', 'right']),
  /** Additional CSS class names */
  className: PropTypes.string,
};

export default Dropdown;
