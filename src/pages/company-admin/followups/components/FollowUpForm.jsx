import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input, Select, Button, Textarea, DatePicker } from '../../../../components/ui';
import { Stack, Grid, Divider } from '../../../../components/layout';

/**
 * FollowUpForm - Shared form for scheduling follow-ups.
 */
const FollowUpForm = React.memo(({
  initialValues = null,
  onSubmit,
  loading = false,
}) => {
  const [type, setType] = useState(initialValues?.type || 'Call');
  const [subject, setSubject] = useState(initialValues?.subject || '');
  const [clientName, setClientName] = useState(initialValues?.clientName || 'Jane Cooper (Microsoft)');
  const [date, setDate] = useState(initialValues?.date || '');
  const [time, setTime] = useState(initialValues?.time || '');
  const [notes, setNotes] = useState(initialValues?.notes || '');
  const [status, setStatus] = useState(initialValues?.status || 'Scheduled');
  
  const [errors, setErrors] = useState({});

  const validate = () => {
    const tempErrors = {};
    if (!subject.trim()) tempErrors.subject = 'Follow-up subject is required.';
    if (!date.trim()) tempErrors.date = 'Follow-up date is required.';
    if (!time.trim()) tempErrors.time = 'Follow-up time is required.';
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    onSubmit({
      type,
      subject,
      clientName,
      date,
      time,
      notes,
      status
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Stack space={5}>
        <Grid cols={{ default: 1, md: 2 }} gap={5}>
          <Select
            label="Communication Type"
            options={['Call', 'Meeting', 'Email', 'Proposal']}
            value={type}
            onChange={(e) => setType(e.target.value)}
            disabled={loading}
          />
          <Input
            label="Follow-up Subject"
            required
            placeholder="E.g., introductory pricing review"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            error={errors.subject}
            disabled={loading}
          />
          <Select
            label="Target Client Partner"
            options={['Jane Cooper (Microsoft)', 'Cody Fisher (Apple)', 'Esther Howard (Google)', 'Jenny Wilson (Facebook Meta)', 'Kristin Watson (Amazon)']}
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            disabled={loading}
          />
          <DatePicker
            label="Follow-up Date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            error={errors.date}
            disabled={loading}
          />
          <Input
            label="Scheduled Time"
            required
            placeholder="E.g., 10:00 AM"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            error={errors.time}
            disabled={loading}
          />
          <Select
            label="Follow-up Status"
            options={['Scheduled', 'Completed', 'Cancelled']}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            disabled={loading}
          />
        </Grid>

        <Textarea
          label="Internal Session Notes"
          placeholder="Enter discussion outlines, talking points, or followups notes..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
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
            Schedule Follow-up
          </Button>
        </div>
      </Stack>
    </form>
  );
});

FollowUpForm.displayName = 'FollowUpForm';

FollowUpForm.propTypes = {
  initialValues: PropTypes.shape({
    type: PropTypes.string,
    subject: PropTypes.string,
    clientName: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    notes: PropTypes.string,
    status: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default FollowUpForm;
