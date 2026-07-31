import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input, Select, Button, Textarea } from '../../../../components/ui';
import { Stack, Grid, Divider } from '../../../../components/layout';

/**
 * OrganizationForm - Shared form for creating or editing organizations.
 */
const OrganizationForm = React.memo(({
  initialValues = null,
  onSubmit,
  isEdit = false,
  loading = false,
}) => {
  const [name, setName] = useState(initialValues?.name || '');
  const [domain, setDomain] = useState(initialValues?.domain || '');
  const [industry, setIndustry] = useState(initialValues?.industry || 'Technology');
  const [employees, setEmployees] = useState(initialValues?.employees || '10-50');
  const [billingAddress, setBillingAddress] = useState(initialValues?.billingAddress || '');
  const [status, setStatus] = useState(initialValues?.status || 'Active');
  
  const [errors, setErrors] = useState({});

  const validate = () => {
    const tempErrors = {};
    if (!name.trim()) tempErrors.name = 'Organization name is required.';
    if (!domain.trim()) {
      tempErrors.domain = 'Domain is required.';
    } else if (!/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/.test(domain)) {
      tempErrors.domain = 'Domain name is invalid.';
    }
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    onSubmit({
      name,
      domain,
      industry,
      employees,
      billingAddress,
      status
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Stack space={5}>
        <Grid cols={{ default: 1, md: 2 }} gap={5}>
          <Input
            label="Organization Name"
            required
            placeholder="E.g., LexCorp"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
            disabled={loading}
          />
          <Input
            label="Domain Name"
            required
            placeholder="E.g., lexcorp.com"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            error={errors.domain}
            disabled={loading}
          />
          <Select
            label="Industry Sector"
            options={['Technology', 'Consumer Electronics', 'Social Media', 'Biotech', 'Finance', 'Logistics', 'Manufacturing']}
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            disabled={loading}
          />
          <Select
            label="Company Size (Employees)"
            options={['1-10', '10-50', '50-200', '200-1000', '1000+', '20,000+', '50,000+', '100,000+']}
            value={employees}
            onChange={(e) => setEmployees(e.target.value)}
            disabled={loading}
          />
          {isEdit && (
            <Select
              label="Account Status"
              options={['Active', 'Inactive', 'Suspended']}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              disabled={loading}
            />
          )}
        </Grid>

        <Textarea
          label="Billing Address"
          placeholder="Enter corporate headquarter address..."
          value={billingAddress}
          onChange={(e) => setBillingAddress(e.target.value)}
          disabled={loading}
          rows={3}
        />
        
        <Divider className="my-2" />

        <div className="flex items-center justify-end gap-3">
          <Button
            type="submit"
            variant="primary"
            loading={loading}
            size="md"
          >
            {isEdit ? 'Save Changes' : 'Create Organization'}
          </Button>
        </div>
      </Stack>
    </form>
  );
});

OrganizationForm.displayName = 'OrganizationForm';

OrganizationForm.propTypes = {
  initialValues: PropTypes.shape({
    name: PropTypes.string,
    domain: PropTypes.string,
    industry: PropTypes.string,
    employees: PropTypes.string,
    billingAddress: PropTypes.string,
    status: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  isEdit: PropTypes.bool,
  loading: PropTypes.bool,
};

export default OrganizationForm;
