import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserCheck } from 'lucide-react';
import { PageContainer, PageHeader, Card, Stack, PageLoader } from '../../../components/layout';
import { Select, Button } from '../../../components/ui';
import { leadService } from '../../../services/leadService';
import { MOCK_MANAGERS } from '../../../mock/managers/mockManagers';
import { MOCK_EMPLOYEES } from '../../../mock/employees/mockEmployees';

export default function AssignLead() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [assignedOwner, setAssignedOwner] = useState('');

  useEffect(() => {
    const fetchLead = async () => {
      try {
        setLoading(true);
        const data = await leadService.getById(id);
        setLead(data);
        if (data) {
          setAssignedOwner(data.owner);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLead();
  }, [id]);

  const breadcrumbs = [
    { label: 'Dashboard', href: '/company-admin/dashboard' },
    { label: 'Leads', href: '/company-admin/leads' },
    { label: lead ? lead.name : 'Assign Owner', href: lead ? `/company-admin/leads/${lead.id}` : '' },
    { label: 'Assign' }
  ];

  // Group possible owners
  const possibleOwners = [
    ...MOCK_MANAGERS.map(m => m.name),
    ...MOCK_EMPLOYEES.map(e => e.name)
  ];

  const handleAssign = async (e) => {
    e.preventDefault();
    if (!assignedOwner) {
      alert('Please choose an owner.');
      return;
    }
    setSubmitting(true);
    try {
      await leadService.update(lead.id, { owner: assignedOwner });
      alert(`Lead "${lead.name}" assigned to ${assignedOwner} successfully.`);
      navigate(`/company-admin/leads/${lead.id}`);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading && !lead) {
    return (
      <PageContainer>
        <PageLoader />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Stack space={6}>
        <PageHeader
          title="Delegate Contract Lead"
          description={`Update structural account ownership and pipeline tracking permissions for: ${lead.name}`}
          breadcrumbs={breadcrumbs}
        />

        <Card className="max-w-xl">
          <form onSubmit={handleAssign} className="space-y-6">
            <div className="space-y-1">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider block">Lead Target</label>
              <p className="text-sm font-bold text-neutral-800">{lead.name}</p>
              <p className="text-xs text-neutral-400">Account: {lead.company}</p>
            </div>

            <Select
              label="Select Associated Representative"
              options={possibleOwners}
              value={assignedOwner}
              onChange={(e) => setAssignedOwner(e.target.value)}
              required
            />

            <div className="flex gap-3 justify-end">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => navigate(`/company-admin/leads/${lead.id}`)}
                type="button"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                leadingIcon={UserCheck}
                loading={submitting}
                type="submit"
              >
                Assign Owner
              </Button>
            </div>
          </form>
        </Card>
      </Stack>
    </PageContainer>
  );
}
