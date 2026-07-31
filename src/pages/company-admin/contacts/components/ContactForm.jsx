import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input, Select, Button } from '../../../../components/ui';
import { Stack, Grid, Divider } from '../../../../components/layout';

/**
 * ContactForm - Shared form for creating or editing contacts.
 */
const ContactForm = React.memo(({
  initialValues = null,
  onSubmit,
  isEdit = false,
  loading = false,
}) => {
  const [name, setName] = useState(initialValues?.name || '');
  const [email, setEmail] = useState(initialValues?.email || '');
  const [phone, setPhone] = useState(initialValues?.phone || '');
  const [organization, setOrganization] = useState(initialValues?.organization || 'Microsoft Corp');
  const [role, setRole] = useState(initialValues?.role || '');
  const [status, setStatus] = useState(initialValues?.status || 'Active');
  
  const [errors, setErrors] = useState({});

  const validate = () => {
    const tempErrors = {};
    if (!name.trim()) tempErrors.name = 'Full name is required.';
    if (!email.trim()) {
      tempErrors.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = 'Email address is invalid.';
    }
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    onSubmit({
      name,
      email,
      phone,
      organization,
      role,
      status
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Stack space={5}>
        <Grid cols={{ default: 1, md: 2 }} gap={5}>
          <Input
            label="Full Name"
            required
            placeholder="E.g., Jane Cooper"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
            disabled={loading}
          />
          <Input
            label="Email Address"
            required
            type="email"
            placeholder="E.g., jane.cooper@microsoft.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            disabled={loading}
          />
          <Input
            label="Phone Number"
            placeholder="E.g., +1 (555) 123-4567"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={loading}
          />
          <Select
            label="Associated Organization"
            options={['Microsoft Corp', 'Apple Inc', 'Google LLC', 'Facebook Meta', 'Amazon Web Services']}
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            disabled={loading}
          />
          <Input
            label="Job Role / Title"
            placeholder="E.g., Procurement Director"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            disabled={loading}
          />
          {isEdit && (
            <Select
              label="Contact Status"
              options={['Active', 'Inactive', 'Suspended']}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              disabled={loading}
            />
          )}
        </Grid>
        
        <Divider className="my-2" />

        <div className="flex items-center justify-end gap-3">
          <Button
            type="submit"
            variant="primary"
            loading={loading}
            size="md"
          >
            {isEdit ? 'Save Changes' : 'Create Contact'}
          </Button>
        </div>
      </Stack>
    </form>
  );
});

ContactForm.displayName = 'ContactForm';

ContactForm.propTypes = {
  initialValues: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    organization: PropTypes.string,
    role: PropTypes.string,
    status: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  isEdit: PropTypes.bool,
  loading: PropTypes.bool,
};

export default ContactForm;
