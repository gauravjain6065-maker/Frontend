import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ChevronDown } from 'lucide-react';

/**
 * Section component - Separates content groups within a page.
 */
const Section = React.memo(({
  title,
  description = '',
  actions = null,
  children,
  collapsible = false,
  defaultOpen = true,
  className = '',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <section className={`space-y-4 ${className}`} {...props}>
      {/* Section Header */}
      <div className="flex items-center justify-between gap-4 border-b border-neutral-200 pb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            {collapsible && (
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="p-1 rounded text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                aria-expanded={isOpen}
                aria-label={isOpen ? 'Collapse section' : 'Expand section'}
              >
                <ChevronDown
                  className={`w-4 h-4 transform transition-transform duration-200 ${
                    isOpen ? 'rotate-0' : '-rotate-90'
                  }`}
                />
              </button>
            )}
            <h2 className="crm-title-section">{title}</h2>
          </div>
          {description && (
            <p className="crm-text-normal mt-1">{description}</p>
          )}
        </div>

        {/* Section Actions (only show when open, or always show if not collapsible) */}
        {actions && (isOpen || !collapsible) && (
          <div className="flex items-center gap-2">
            {actions}
          </div>
        )}
      </div>

      {/* Section Content */}
      {(!collapsible || isOpen) && (
        <div className="transition-all duration-200 ease-in-out">
          {children}
        </div>
      )}
    </section>
  );
});

Section.displayName = 'Section';

Section.propTypes = {
  /** The main section title */
  title: PropTypes.string.isRequired,
  /** Optional subsection helper description */
  description: PropTypes.string,
  /** Actions aligned to the right of the section header */
  actions: PropTypes.node,
  /** Component content */
  children: PropTypes.node.isRequired,
  /** If true, allows the user to collapse/expand the section */
  collapsible: PropTypes.bool,
  /** Default expansion state if collapsible is active */
  defaultOpen: PropTypes.bool,
  /** Additional CSS class names */
  className: PropTypes.string,
};

export default Section;
