import React from 'react';
import PropTypes from 'prop-types';
import { MoreVertical } from 'lucide-react';
import Dropdown from './Dropdown';

/**
 * ActionMenu component - Specific context-menu trigger button (three dots) displaying action items.
 */
const ActionMenu = React.memo(({
  items = [],
  align = 'right',
  className = '',
  ...props
}) => {
  // Three dots trigger button
  const triggerButton = (
    <button
      type="button"
      className="p-1.5 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-full transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500"
      aria-label="Context actions menu"
    >
      <MoreVertical className="w-4 h-4" />
    </button>
  );

  return (
    <Dropdown
      trigger={triggerButton}
      items={items}
      align={align}
      className={className}
      {...props}
    />
  );
});

ActionMenu.displayName = 'ActionMenu';

ActionMenu.propTypes = {
  /** List of dropdown actions to render */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func,
      icon: PropTypes.elementType,
      disabled: PropTypes.bool,
      danger: PropTypes.bool,
    })
  ).isRequired,
  /** Popup alignment relative to target icon */
  align: PropTypes.oneOf(['left', 'right']),
  /** Additional CSS class names */
  className: PropTypes.string,
};

export default ActionMenu;
