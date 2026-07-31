import React, { useState } from 'react';
import { 
  Activity, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Search, 
  Plus, 
  Trash2, 
  Edit, 
  CheckCircle,
  AlertTriangle,
  XCircle,
  Eye,
  Loader,
  Play,
  Mail,
  User,
  Settings,
  Calendar,
  Grid as GridIcon,
  HelpCircle,
  Bell,
  Info,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

import {
  PageContainer,
  PageHeader,
  Section,
  Card,
  Grid,
  Stack,
  Divider,
  PageLoader
} from '../components/layout';

import {
  Badge,
  StatusBadge,
  Avatar,
  StatCard,
  InfoCard,
  NotificationCard,
  ActivityCard,
  EmptyState,
  Button,
  Input,
  Textarea,
  Select,
  Checkbox,
  Radio,
  ToggleSwitch,
  DatePicker,
  SearchBar,
  FilterBar,
  BreadcrumbItem,
  Tabs,
  Dropdown,
  ActionMenu,
  Modal,
  ConfirmationModal,
  Toast,
  LoadingSpinner,
  DataTable,
  Pagination,
  ChartPlaceholder
} from '../components/ui';

export default function UIPlayground() {
  // Navigation & Page State
  const [activeTab, setActiveTab] = useState('layout');
  const [showFullLoader, setShowFullLoader] = useState(false);

  // Form Components Testing States
  const [testText, setTestText] = useState('');
  const [testSelect, setTestSelect] = useState('');
  const [testCheckbox, setTestCheckbox] = useState(false);
  const [testRadio, setTestRadio] = useState('option-a');
  const [testToggle, setTestToggle] = useState(true);
  const [testDate, setTestDate] = useState('');
  const [testTextError, setTestTextError] = useState('');

  // Search & Filter State
  const [filterSearch, setFilterSearch] = useState('');
  const [filtersList, setFiltersList] = useState([
    { id: 'status', label: 'Status: Active' },
    { id: 'role', label: 'Role: Manager' }
  ]);

  // Modals & Feedback Testing States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [showToast, setShowToast] = useState(true);

  // Table Data State
  const [tableData, setTableData] = useState([
    { id: 1, name: 'Jane Cooper', company: 'Microsoft', status: 'Active', role: 'Admin', email: 'jane.cooper@example.com' },
    { id: 2, name: 'Cody Fisher', company: 'Apple', status: 'Inactive', role: 'Editor', email: 'cody.fisher@example.com' },
    { id: 3, name: 'Esther Howard', company: 'Google', status: 'Active', role: 'Viewer', email: 'esther.howard@example.com' },
    { id: 4, name: 'Jenny Wilson', company: 'Facebook', status: 'Suspended', role: 'Admin', email: 'jenny.wilson@example.com' },
    { id: 5, name: 'Kristin Watson', company: 'Amazon', status: 'Active', role: 'Editor', email: 'kristin.watson@example.com' },
  ]);
  const [tableSortCol, setTableSortCol] = useState('name');
  const [tableSortDir, setTableSortDir] = useState('asc');
  const [tableLoading, setTableLoading] = useState(false);
  const [tablePage, setTablePage] = useState(1);

  // InfoCard Items
  const detailItems = [
    { label: 'Full Name', value: 'Sarah Connor' },
    { label: 'Email Address', value: 'sarah.connor@sky.net' },
    { label: 'Account Tier', value: 'Enterprise' },
    { label: 'Assigned Agent', value: 'T-800 Model 101' },
  ];

  // Breadcrumbs config
  const breadcrumbs = [
    { label: 'Panorama Home', href: '/' },
    { label: 'Design System', href: '#' },
    { label: 'Interactive Playground' }
  ];

  // Tab definitions
  const playgroundTabs = [
    { id: 'layout', label: 'Layout & Containers', icon: GridIcon },
    { id: 'forms', label: 'Forms & Controls', icon: Edit },
    { id: 'display', label: 'Data Display', icon: Users },
    { id: 'feedback', label: 'Feedback & Modals', icon: Bell },
    { id: 'data', label: 'Data & Charts', icon: Activity },
  ];

  // Table Columns
  const tableColumns = [
    { key: 'name', label: 'User Name', sortable: true },
    { key: 'company', label: 'Company', sortable: true },
    {
      key: 'status',
      label: 'Account Status',
      sortable: false,
      render: (val) => <StatusBadge status={val} />
    },
    { key: 'role', label: 'Role Title', sortable: true },
  ];

  // Table Sort logic
  const handleTableSort = (columnKey) => {
    const isSameCol = tableSortCol === columnKey;
    const direction = isSameCol && tableSortDir === 'asc' ? 'desc' : 'asc';
    
    setTableSortCol(columnKey);
    setTableSortDir(direction);
    setTableLoading(true);

    // Simulate short network sort
    setTimeout(() => {
      const sorted = [...tableData].sort((a, b) => {
        const valA = String(a[columnKey]).toLowerCase();
        const valB = String(b[columnKey]).toLowerCase();
        return direction === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      });
      setTableData(sorted);
      setTableLoading(false);
    }, 400);
  };

  const handleConfirmAction = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setConfirmLoading(false);
      setIsConfirmOpen(false);
      alert('Action completed successfully.');
    }, 1500);
  };

  const handleTriggerFullLoader = () => {
    setShowFullLoader(true);
    setTimeout(() => setShowFullLoader(false), 2000);
  };

  const removeFilter = (id) => {
    setFiltersList(filtersList.filter(f => f.id !== id));
  };

  const clearFilters = () => {
    setFiltersList([]);
    setFilterSearch('');
  };

  const dropdownMenuItems = [
    { label: 'View Profile', icon: User, onClick: () => alert('View Profile Clicked') },
    { label: 'Edit Permissions', icon: Settings, onClick: () => alert('Settings Clicked') },
    { label: 'Deactivate Account', icon: Trash2, danger: true, onClick: () => setIsConfirmOpen(true) },
  ];

  return (
    <PageContainer padding="p-4 md:p-8" className="bg-neutral-50">
      {/* Fullscreen PageLoader demo */}
      {showFullLoader && (
        <PageLoader fullscreen label="Switching application context..." />
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmAction}
        loading={confirmLoading}
        title="Confirm Deactivation"
        message="Are you sure you want to deactivate Sarah Connor's CRM access? This will freeze all client communications associated with this representative."
      />

      {/* Standard modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New CRM Lead Entry"
        size="md"
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={() => { setIsModalOpen(false); alert('Lead added.'); }}>
              Save Lead
            </Button>
          </>
        }
      >
        <Stack space={4}>
          <Input label="Lead Name" required placeholder="E.g., John Doe" />
          <Input label="Company" placeholder="E.g., Weyland-Yutani Corp" />
          <Grid cols={2} gap={4}>
            <Select label="Priority" options={['Low', 'Medium', 'High']} placeholder="Select Priority" />
            <DatePicker label="Follow-up Date" />
          </Grid>
          <Textarea label="Internal Notes" placeholder="Enter lead requirements..." />
        </Stack>
      </Modal>

      <Stack space={6}>
        {/* PageHeader Component */}
        <PageHeader
          title="Component Library Playground"
          description="Interactive showcase documentation displaying the exact production-ready layout and UI components built for Panorama CRM."
          breadcrumbs={breadcrumbs}
          actions={
            <>
              <Button variant="secondary" size="sm" leadingIcon={Loader} onClick={handleTriggerFullLoader}>
                Fullscreen Loader
              </Button>
              <Button variant="primary" size="sm" leadingIcon={Plus} onClick={() => setIsModalOpen(true)}>
                Quick Add Lead
              </Button>
            </>
          }
        />

        {/* Tab Toggle Navigation */}
        <Tabs
          tabs={playgroundTabs}
          activeTab={activeTab}
          onChange={setActiveTab}
          variant="line"
        />

        {/* ==================== TAB 1: LAYOUTS ==================== */}
        {activeTab === 'layout' && (
          <Stack space={6}>
            <Section
              title="Layout Containers & Dividers"
              description="Basic grouping structures for spacing and layouts."
            >
              <Grid cols={{ default: 1, md: 2 }} gap={6}>
                <Card title="PageContainer & Section">
                  <div className="border border-dashed border-neutral-300 rounded-lg p-4 bg-neutral-50 text-xs text-neutral-600 leading-relaxed space-y-2">
                    <p className="font-semibold text-neutral-800">PageContainer</p>
                    <p>Acts as the global viewport constraint. Limits width on huge desktop screens (max-w-7xl) while scaling down elegantly on mobile screens.</p>
                    <Divider className="my-2" />
                    <p className="font-semibold text-neutral-800">Section</p>
                    <p>Standardizes sections titles, header margins, dividers, and optional collapse toggles.</p>
                  </div>
                </Card>

                <Card title="Card & Divider Structures">
                  <div className="border border-neutral-200 rounded-lg p-4 bg-white space-y-4">
                    <div className="text-xs font-bold uppercase text-neutral-400">Card Header</div>
                    <Divider />
                    <div className="text-xs text-neutral-600">Card content goes here. Separated from header/footer panels via thin Divider lines.</div>
                    <Divider />
                    <div className="flex justify-between text-xs text-neutral-400">
                      <span>Footer metadata</span>
                      <span>1.0.0</span>
                    </div>
                  </div>
                </Card>
              </Grid>
            </Section>

            <Section title="Grid & Stack Alignment Preview" collapsible>
              <Card title="Responsive Grid (cols: { default: 1, md: 3 })" hoverable>
                <Grid cols={{ default: 1, md: 3 }} gap={4}>
                  <div className="bg-primary-50 text-primary-700 text-xs font-semibold p-4 rounded text-center border border-primary-200">
                    Grid Item A
                  </div>
                  <div className="bg-success-50 text-success-700 text-xs font-semibold p-4 rounded text-center border border-success-200">
                    Grid Item B
                  </div>
                  <div className="bg-warning-50 text-warning-700 text-xs font-semibold p-4 rounded text-center border border-warning-200">
                    Grid Item C
                  </div>
                </Grid>
              </Card>

              <Card title="Horizontal Stack (direction: 'row', justify: 'between')" hoverable className="mt-4">
                <Stack direction="row" justify="between" align="center" className="bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                  <span className="text-xs font-bold text-neutral-700">Left Content Column</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-neutral-400">Inline spacer divider:</span>
                    <Divider vertical className="h-4" />
                    <span className="crm-badge-success">Stack Item</span>
                  </div>
                </Stack>
              </Card>
            </Section>
          </Stack>
        )}

        {/* ==================== TAB 2: FORMS ==================== */}
        {activeTab === 'forms' && (
          <Section
            title="Form Fields & Selection Controls"
            description="Highly accessible form fields featuring focus states, error labels, and full parameter configuration."
          >
            <Grid cols={{ default: 1, md: 2 }} gap={8}>
              {/* Text Fields */}
              <Card title="Input Fields & Textareas" hoverable>
                <Stack space={4}>
                  <Input
                    label="Username (Required & Icon)"
                    placeholder="Enter profile handle"
                    required
                    leadingIcon={User}
                    value={testText}
                    onChange={(e) => {
                      setTestText(e.target.value);
                      if (e.target.value.length < 3) {
                        setTestTextError('Username must be at least 3 characters.');
                      } else {
                        setTestTextError('');
                      }
                    }}
                    error={testTextError}
                  />

                  <Input
                    label="API Key (Disabled State)"
                    disabled
                    value="sk_live_5128371928371928"
                    helperText="System integrations key."
                  />

                  <Textarea
                    label="Corporate Bio"
                    placeholder="Describe your corporate goals..."
                    helperText="Limit bio description to 300 words."
                  />
                </Stack>
              </Card>

              {/* Selection inputs */}
              <Card title="Dropdowns, Toggles & Ticks" hoverable>
                <Stack space={4}>
                  <Select
                    label="Assigned Branch Team"
                    options={[
                      { label: 'Europe, Middle East, Africa (EMEA)', value: 'emea' },
                      { label: 'North America (NA)', value: 'na' },
                      { label: 'Asia Pacific (APAC)', value: 'apac' }
                    ]}
                    placeholder="Choose branch location"
                    value={testSelect}
                    onChange={(e) => setTestSelect(e.target.value)}
                  />

                  <DatePicker
                    label="Target Closing Date"
                    value={testDate}
                    onChange={(e) => setTestDate(e.target.value)}
                  />

                  <div className="flex flex-col gap-3 py-2 border-t border-neutral-100 mt-2">
                    <Checkbox
                      label="Accept terms & privacy standards"
                      helperText="Required to sign up new clients."
                      checked={testCheckbox}
                      onChange={(e) => setTestCheckbox(e.target.checked)}
                    />
                    
                    <Divider />

                    <div className="space-y-2">
                      <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block">Radio Selection</span>
                      <Stack direction="row" space={6}>
                        <Radio
                          label="Tier A"
                          name="tier-radio"
                          checked={testRadio === 'option-a'}
                          onChange={() => setTestRadio('option-a')}
                        />
                        <Radio
                          label="Tier B"
                          name="tier-radio"
                          checked={testRadio === 'option-b'}
                          onChange={() => setTestRadio('option-b')}
                        />
                      </Stack>
                    </div>

                    <Divider />

                    <ToggleSwitch
                      label="Activate pipeline auto-distribution"
                      helperText="Enabling this handles automated routing of leads."
                      checked={testToggle}
                      onChange={(e) => setTestToggle(e.target.checked)}
                    />
                  </div>
                </Stack>
              </Card>
            </Grid>

            {/* Search and Filters */}
            <Card title="Filters Panel Showcase" className="mt-6">
              <FilterBar
                searchQuery={filterSearch}
                onSearchChange={(e) => setFilterSearch(e.target.value)}
                onSearchClear={() => setFilterSearch('')}
                placeholder="Search database leads..."
                activeFilters={filtersList}
                onRemoveFilter={removeFilter}
                onClearFilters={clearFilters}
                actions={
                  <Button variant="secondary" size="sm" leadingIcon={Settings}>
                    Filter Options
                  </Button>
                }
              />
            </Card>
          </Section>
        )}

        {/* ==================== TAB 3: DISPLAY ==================== */}
        {activeTab === 'display' && (
          <Stack space={6}>
            <Section title="Badges, Avatars & Cards" description="Components to visually organize profiles and status details.">
              <Grid cols={{ default: 1, md: 3 }} gap={6}>
                {/* Standard Badging */}
                <Card title="Badges & Statuses">
                  <Stack space={4}>
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Standard Badges</span>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="default">Default</Badge>
                        <Badge variant="primary">Primary</Badge>
                        <Badge variant="success">Success</Badge>
                        <Badge variant="danger">Danger</Badge>
                        <Badge variant="info">Info</Badge>
                      </div>
                    </div>

                    <Divider />

                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Status Badges (StatusBadge)</span>
                      <div className="flex flex-wrap gap-2">
                        <StatusBadge status="Active" />
                        <StatusBadge status="Pending" />
                        <StatusBadge status="Suspended" />
                        <StatusBadge status="Won" />
                      </div>
                    </div>
                  </Stack>
                </Card>

                {/* Profile Avatars */}
                <Card title="Profile Avatars">
                  <Stack space={4}>
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Avatar Sizes</span>
                      <Stack direction="row" space={3} align="center">
                        <Avatar name="Sarah Connor" size="xs" />
                        <Avatar name="Sarah Connor" size="sm" />
                        <Avatar name="Sarah Connor" size="md" />
                        <Avatar name="Sarah Connor" size="lg" />
                        <Avatar name="Sarah Connor" size="xl" />
                      </Stack>
                    </div>

                    <Divider />

                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Avatars with Status Indicators</span>
                      <Stack direction="row" space={4}>
                        <Avatar name="John Connor" size="md" status="online" />
                        <Avatar name="Marcus Wright" size="md" status="busy" />
                        <Avatar name="Kyle Reese" size="md" status="away" />
                        <Avatar name="Skynet Agent" size="md" status="offline" />
                      </Stack>
                    </div>
                  </Stack>
                </Card>

                {/* Info Detail Card */}
                <InfoCard
                  title="Lead Profile Details"
                  items={detailItems}
                  cols={2}
                  headerActions={
                    <button className="text-xs text-primary-600 font-semibold hover:underline bg-transparent border-0 cursor-pointer">
                      Edit
                    </button>
                  }
                />
              </Grid>
            </Section>

            {/* Notification logs & Timelines */}
            <Section title="Alert Logs & Timelines" description="Notification logging and audit timelines.">
              <Grid cols={{ default: 1, lg: 2 }} gap={6}>
                {/* Notification Stack */}
                <Card title="Notifications Inbox">
                  <Stack space={3}>
                    <NotificationCard
                      title="New client contract signed"
                      description="Weyland-Yutani Corp completed contract signing for the space mining operations deal."
                      time="2 minutes ago"
                      unread
                      icon={Mail}
                      variant="primary"
                    />
                    <NotificationCard
                      title="Database sync warning"
                      description="Branch servers experienced sync latency of +450ms. No loss registered."
                      time="1 hour ago"
                      icon={AlertTriangle}
                      variant="warning"
                    />
                    <NotificationCard
                      title="Representative access revoked"
                      description="Representative Marcus Wright has been de-provisioned from all CRM dashboards."
                      time="Yesterday"
                      icon={XCircle}
                      variant="danger"
                    />
                  </Stack>
                </Card>

                {/* Activity Feed timeline */}
                <Card title="Audit Log Feed">
                  <div className="pl-2 pt-2">
                    <ActivityCard
                      title="Deal Pipeline created"
                      description="Created deal pipeline 'Earth colony colonizations' valued at $8.4M."
                      time="10:14 AM"
                      icon={Plus}
                      variant="success"
                    />
                    <ActivityCard
                      title="Lead metadata edited"
                      description="Sarah Connor edited lead profile telephone details."
                      time="09:30 AM"
                      icon={Edit}
                      variant="info"
                    />
                    <ActivityCard
                      title="Failed login attempt log"
                      description="Skynet Core registered a failed API token check on server node B."
                      time="08:11 AM"
                      icon={AlertTriangle}
                      variant="danger"
                      isLast
                    />
                  </div>
                </Card>
              </Grid>
            </Section>

            {/* Empty State */}
            <Section title="Empty State Display">
              <EmptyState
                title="No sales representatives assigned"
                description="This customer account does not have any active representatives. Assign a manager to activate contract negotiations."
                action={
                  <Button variant="primary" size="sm" leadingIcon={Plus}>
                    Assign Representative
                  </Button>
                }
              />
            </Section>
          </Stack>
        )}

        {/* ==================== TAB 4: FEEDBACK ==================== */}
        {activeTab === 'feedback' && (
          <Section
            title="Interactive Feedback & Dialogs"
            description="Visual responses and alert banners for validation updates."
          >
            <Grid cols={{ default: 1, md: 2 }} gap={8}>
              {/* Modal controls */}
              <Card title="Overlays & Confirm Dialogs" hoverable>
                <Stack space={4}>
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    Test modals, backdrop lock scrolling, and keyboard actions.
                  </p>
                  
                  <Stack direction="row" space={4}>
                    <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)}>
                      Open Setup Form Modal
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => setIsConfirmOpen(true)}>
                      Open Confirm Deactivation
                    </Button>
                  </Stack>

                  <Divider />

                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block">Standalone Loading Spinners</span>
                    <Stack direction="row" space={4} align="center">
                      <LoadingSpinner size="sm" />
                      <LoadingSpinner size="md" />
                      <LoadingSpinner size="lg" />
                    </Stack>
                  </div>
                </Stack>
              </Card>

              {/* Toast Alerts (UI preview) */}
              <Card title="Toast Alerts Preview" hoverable>
                <Stack space={3}>
                  {showToast && (
                    <Toast
                      message="Representative updated"
                      description="The details for representative Sarah Connor have been updated successfully."
                      variant="success"
                      onClose={() => setShowToast(false)}
                    />
                  )}
                  
                  {!showToast && (
                    <Button variant="outline" size="sm" onClick={() => setShowToast(true)}>
                      Reset Success Toast
                    </Button>
                  )}

                  <Toast
                    message="Pipeline synchronization latency"
                    description="EMEA pipeline logs sync is currently delayed by 5 minutes."
                    variant="warning"
                  />
                  <Toast
                    message="Database write error"
                    description="Could not execute SQL write statement on table CRM_RECORDS."
                    variant="error"
                  />
                </Stack>
              </Card>
            </Grid>
          </Section>
        )}

        {/* ==================== TAB 5: DATA & CHARTS ==================== */}
        {activeTab === 'data' && (
          <Stack space={6}>
            {/* Dynamic Data Table */}
            <Section
              title="DataTable & Pagination Showcase"
              description="A dynamic table that supports dynamic render cells, custom status badges, sorting UI, and record actions."
            >
              <Card title="User Database Table">
                <DataTable
                  columns={tableColumns}
                  data={tableData}
                  loading={tableLoading}
                  sortColumn={tableSortCol}
                  sortDirection={tableSortDir}
                  onSort={handleTableSort}
                  onRowClick={(row) => alert(`Row clicked: ${row.name}`)}
                  renderRowActions={(row) => (
                    <ActionMenu items={dropdownMenuItems} />
                  )}
                />
                
                {/* Pagination */}
                <Pagination
                  currentPage={tablePage}
                  totalItems={24}
                  pageSize={5}
                  onPageChange={(page) => {
                    setTablePage(page);
                    setTableLoading(true);
                    setTimeout(() => setTableLoading(false), 500);
                  }}
                />
              </Card>
            </Section>

            {/* Chart placeholders */}
            <Section title="Dashboard Analytics Skeletons" description="Mock components representing area, line, bar, and doughnut charts.">
              <Grid cols={{ default: 1, lg: 2 }} gap={6}>
                <Card>
                  <ChartPlaceholder type="area" title="Area Chart - Monthly Deal Volume" />
                </Card>
                <Card>
                  <ChartPlaceholder type="line" title="Line Chart - User Conversions" />
                </Card>
                <Card>
                  <ChartPlaceholder type="bar" title="Bar Chart - Pipeline Revenue per Region" />
                </Card>
                <Card>
                  <ChartPlaceholder type="donut" title="Donut Chart - Lead Source Distribution" />
                </Card>
              </Grid>
            </Section>
          </Stack>
        )}
      </Stack>
    </PageContainer>
  );
}
