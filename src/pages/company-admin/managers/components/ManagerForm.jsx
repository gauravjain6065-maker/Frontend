import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input, Select, Button } from '../../../../components/ui';
import { Stack, Grid, Divider } from '../../../../components/layout';

/**
 * ManagerForm - Shared form for creating or editing managers.
 */
const ManagerForm = React.memo(({
  initialValues = null,
  onSubmit,
  isEdit = false,
  loading = false,
}) => {
  const [name, setName] = useState(initialValues?.name || '');
  const [email, setEmail] = useState(initialValues?.email || '');
  const [phone, setPhone] = useState(initialValues?.phone || '');
  const [department, setDepartment] = useState(initialValues?.department || 'Sales Ops');
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
    if (!phone.trim()) tempErrors.phone = 'Phone number is required.';
    
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
      department,
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
            placeholder="E.g., John Connor"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
            disabled={loading}
          />
          <Input
            label="Email Address"
            required
            type="email"
            placeholder="E.g., john.connor@sky.net"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            disabled={loading}
          />
          <Input
            label="Phone Number"
            required
            placeholder="E.g., +1 (555) 222-3333"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            error={errors.phone}
            disabled={loading}
          />
          <Select
            label="Department Assignment"
            options={['Sales Ops', 'Customer Success', 'Inbound Leads', 'Field Relations']}
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            disabled={loading}
          />
          {isEdit && (
            <Select
              label="Manager Status"
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
            {isEdit ? 'Save Changes' : 'Create Manager'}
          </Button>
        </div>
      </Stack>
    </form>
  );
});

ManagerForm.displayName = 'ManagerForm';

ManagerForm.propTypes = {
  initialValues: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    department: PropTypes.string,
    status: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  isEdit: PropTypes.bool,
  loading: PropTypes.bool,
};

export default ManagerForm;
