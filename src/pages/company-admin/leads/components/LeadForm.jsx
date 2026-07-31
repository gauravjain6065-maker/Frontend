import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input, Select, Button } from '../../../../components/ui';
import { Stack, Grid, Divider } from '../../../../components/layout';
import { PIPELINE_STAGES } from '../../../../mock/leads/mockLeads';

/**
 * LeadForm - Shared form for creating or editing leads.
 */
const LeadForm = React.memo(({
  initialValues = null,
  onSubmit,
  isEdit = false,
  loading = false,
}) => {
  const [name, setName] = useState(initialValues?.name || '');
  const [company, setCompany] = useState(initialValues?.company || 'Microsoft Corp');
  const [value, setValue] = useState(initialValues?.value || '');
  const [stage, setStage] = useState(initialValues?.stage || 'Discovery');
  const [email, setEmail] = useState(initialValues?.email || '');
  const [status, setStatus] = useState(initialValues?.status || 'Active');
  
  const [errors, setErrors] = useState({});

  const validate = () => {
    const tempErrors = {};
    if (!name.trim()) tempErrors.name = 'Deal name is required.';
    if (!value.trim()) tempErrors.value = 'Estimated value is required.';
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    onSubmit({
      name,
      company,
      value: value.startsWith('$') ? value : `$${value}`,
      stage,
      email,
      status
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Stack space={5}>
        <Grid cols={{ default: 1, md: 2 }} gap={5}>
          <Input
            label="Lead / Deal Name"
            required
            placeholder="E.g., Office 365 migration deal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
            disabled={loading}
          />
          <Select
            label="Associated Organization"
            options={['Microsoft Corp', 'Apple Inc', 'Google LLC', 'Facebook Meta', 'Amazon Web Services']}
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            disabled={loading}
          />
          <Input
            label="Estimated Deal Value (USD)"
            required
            placeholder="E.g., 240,000"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            error={errors.value}
            disabled={loading}
          />
          <Select
            label="Pipeline Stage"
            options={PIPELINE_STAGES.map(s => s.value)}
            value={stage}
            onChange={(e) => setStage(e.target.value)}
            disabled={loading}
          />
          <Input
            label="Point of Contact Email"
            type="email"
            placeholder="E.g., procurement@microsoft.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          {isEdit && (
            <Select
              label="Lead Status"
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
            {isEdit ? 'Save Changes' : 'Create Lead'}
          </Button>
        </div>
      </Stack>
    </form>
  );
});

LeadForm.displayName = 'LeadForm';

LeadForm.propTypes = {
  initialValues: PropTypes.shape({
    name: PropTypes.string,
    company: PropTypes.string,
    value: PropTypes.string,
    stage: PropTypes.string,
    email: PropTypes.string,
    status: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  isEdit: PropTypes.bool,
  loading: PropTypes.bool,
};

export default LeadForm;
