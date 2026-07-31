import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input, Select, Button, Textarea, DatePicker } from '../../../../components/ui';
import { Stack, Grid, Divider } from '../../../../components/layout';

/**
 * TaskForm - Shared form for creating tasks.
 */
const TaskForm = React.memo(({
  initialValues = null,
  onSubmit,
  loading = false,
}) => {
  const [subject, setSubject] = useState(initialValues?.subject || '');
  const [leadName, setLeadName] = useState(initialValues?.leadName || 'Office 365 migration deal');
  const [dueDate, setDueDate] = useState(initialValues?.dueDate || '');
  const [priority, setPriority] = useState(initialValues?.priority || 'Normal');
  const [assignedTo, setAssignedTo] = useState(initialValues?.assignedTo || 'Raj Sonar');
  const [instructions, setInstructions] = useState(initialValues?.instructions || '');
  
  const [errors, setErrors] = useState({});

  const validate = () => {
    const tempErrors = {};
    if (!subject.trim()) tempErrors.subject = 'Task subject is required.';
    if (!dueDate.trim()) tempErrors.dueDate = 'Due date is required.';
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    onSubmit({
      subject,
      leadName,
      dueDate,
      priority,
      assignedTo,
      instructions
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Stack space={5}>
        <Grid cols={{ default: 1, md: 2 }} gap={5}>
          <Input
            label="Task Subject"
            required
            placeholder="E.g., Send pricing draft sheets"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            error={errors.subject}
            disabled={loading}
          />
          <Select
            label="Associated Lead / Deal"
            options={['Office 365 migration deal', 'Hardware silicon supply deal', 'Adwords cloud expansion', 'VR headset integration contract']}
            value={leadName}
            onChange={(e) => setLeadName(e.target.value)}
            disabled={loading}
          />
          <DatePicker
            label="Due Date"
            required
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            error={errors.dueDate}
            disabled={loading}
          />
          <Select
            label="Task Priority"
            options={['Low', 'Normal', 'High', 'Urgent']}
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            disabled={loading}
          />
          <Select
            label="Assignee Employee"
            options={['Raj Sonar', 'Sarah Connor', 'John Connor', 'Agent Smith', 'Trinity Bell', 'Thomas Anderson']}
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            disabled={loading}
          />
        </Grid>

        <Textarea
          label="Instructions & Description"
          placeholder="Detail specific checklists or actions required..."
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
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
            Create Task
          </Button>
        </div>
      </Stack>
    </form>
  );
});

TaskForm.displayName = 'TaskForm';

TaskForm.propTypes = {
  initialValues: PropTypes.shape({
    subject: PropTypes.string,
    leadName: PropTypes.string,
    dueDate: PropTypes.string,
    priority: PropTypes.string,
    assignedTo: PropTypes.string,
    instructions: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default TaskForm;
