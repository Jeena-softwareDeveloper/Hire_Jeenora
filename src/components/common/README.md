# Common Components Documentation

## Overview
This directory contains reusable UI components that are used across multiple features in the Jeenora Hire application. These components ensure consistency in design, reduce code duplication, and improve maintainability.

## Available Components

### 1. StatusBadge
**File**: `StatusBadge.jsx`

Displays status information with color-coded badges.

**Usage**:
```javascript
import { StatusBadge } from '@/components/common';

<StatusBadge status="applied" />
<StatusBadge status="interview_scheduled" />
<StatusBadge status="offer_accepted" />
```

**Props**:
- `status` (string): The status to display. Supports: applied, viewed, shortlisted, interview_scheduled, interview_completed, offer_extended, offer_accepted, rejected, withdrawn, pending, approved, active, inactive, open, closed, resolved

**Supported Status Types**:
- Job Applications: applied, viewed, shortlisted, interview_scheduled, interview_completed, offer_extended, offer_accepted, rejected, withdrawn
- General: pending, approved, active, inactive, open, closed, resolved

---

### 2. LoadingSpinner
**File**: `LoadingSpinner.jsx`

Displays a loading spinner with optional message.

**Usage**:
```javascript
import { LoadingSpinner } from '@/components/common';

<LoadingSpinner />
<LoadingSpinner message="Loading jobs..." />
<LoadingSpinner color="#10B981" size={20} />
```

**Props**:
- `color` (string, optional): Spinner color. Default: '#2563EB'
- `size` (number, optional): Spinner size. Default: 15
- `message` (string, optional): Loading message to display

---

### 3. EmptyState
**File**: `EmptyState.jsx`

Displays an empty state with icon, title, description, and optional action button.

**Usage**:
```javascript
import { EmptyState } from '@/components/common';
import { FaBriefcase } from 'react-icons/fa';

<EmptyState
    icon={FaBriefcase}
    title="No jobs found"
    description="Try adjusting your search criteria"
    actionLabel="Clear Filters"
    onAction={handleClearFilters}
/>
```

**Props**:
- `icon` (React Component, optional): Icon component to display
- `title` (string, optional): Main heading
- `description` (string, optional): Descriptive text
- `actionLabel` (string, optional): Button label
- `onAction` (function, optional): Button click handler
- `className` (string, optional): Additional CSS classes

---

### 4. Button
**File**: `Button.jsx`

Reusable button component with multiple variants and states.

**Usage**:
```javascript
import { Button } from '@/components/common';
import { FaSave } from 'react-icons/fa';

<Button>Click Me</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="danger" size="lg">Delete</Button>
<Button loading={true}>Saving...</Button>
<Button icon={FaSave} fullWidth>Save Changes</Button>
```

**Props**:
- `children` (node): Button content
- `variant` (string, optional): Button style. Options: 'primary', 'secondary', 'danger', 'ghost', 'outline'. Default: 'primary'
- `size` (string, optional): Button size. Options: 'sm', 'md', 'lg'. Default: 'md'
- `disabled` (boolean, optional): Disable button. Default: false
- `loading` (boolean, optional): Show loading spinner. Default: false
- `onClick` (function, optional): Click handler
- `type` (string, optional): Button type. Default: 'button'
- `className` (string, optional): Additional CSS classes
- `icon` (React Component, optional): Icon to display
- `fullWidth` (boolean, optional): Make button full width. Default: false

---

### 5. Card
**File**: `Card.jsx`

Container component for content sections.

**Usage**:
```javascript
import { Card } from '@/components/common';

<Card>
    <h3>Card Title</h3>
    <p>Card content goes here</p>
</Card>

<Card padding="lg" hover onClick={handleClick}>
    Clickable card with large padding
</Card>
```

**Props**:
- `children` (node): Card content
- `className` (string, optional): Additional CSS classes
- `padding` (string, optional): Padding size. Options: 'none', 'sm', 'md', 'lg'. Default: 'md'
- `hover` (boolean, optional): Enable hover effect. Default: false
- `onClick` (function, optional): Click handler

---

### 6. Modal
**File**: `Modal.jsx`

Modal dialog component with overlay.

**Usage**:
```javascript
import { Modal } from '@/components/common';

<Modal
    isOpen={isModalOpen}
    onClose={handleClose}
    title="Confirm Action"
    size="md"
>
    <p>Are you sure you want to proceed?</p>
    <div className="flex gap-3 mt-4">
        <Button onClick={handleConfirm}>Confirm</Button>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
    </div>
</Modal>
```

**Props**:
- `isOpen` (boolean): Control modal visibility
- `onClose` (function): Close handler
- `title` (string, optional): Modal title
- `children` (node): Modal content
- `size` (string, optional): Modal size. Options: 'sm', 'md', 'lg', 'xl', 'full'. Default: 'md'
- `showCloseButton` (boolean, optional): Show close button. Default: true

---

### 7. Input
**File**: `Input.jsx`

Form input component with label, icon, and error states.

**Usage**:
```javascript
import { Input } from '@/components/common';
import { FaUser, FaEnvelope } from 'react-icons/fa';

<Input
    label="Full Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    placeholder="Enter your name"
    required
/>

<Input
    label="Email"
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    icon={FaEnvelope}
    error={emailError}
/>
```

**Props**:
- `label` (string, optional): Input label
- `type` (string, optional): Input type. Default: 'text'
- `value` (string): Input value
- `onChange` (function): Change handler
- `placeholder` (string, optional): Placeholder text
- `error` (string, optional): Error message
- `disabled` (boolean, optional): Disable input. Default: false
- `required` (boolean, optional): Mark as required. Default: false
- `icon` (React Component, optional): Icon to display
- `className` (string, optional): Additional CSS classes

---

### 8. Select
**File**: `Select.jsx`

Dropdown select component with label, icon, and error states.

**Usage**:
```javascript
import { Select } from '@/components/common';
import { FaMapMarkerAlt } from 'react-icons/fa';

<Select
    label="Location"
    value={location}
    onChange={(e) => setLocation(e.target.value)}
    options={['Bangalore', 'Mumbai', 'Delhi', 'Hyderabad']}
    required
/>

<Select
    label="Job Type"
    value={jobType}
    onChange={(e) => setJobType(e.target.value)}
    options={[
        { value: 'full-time', label: 'Full Time' },
        { value: 'part-time', label: 'Part Time' },
        { value: 'contract', label: 'Contract' }
    ]}
    icon={FaBriefcase}
    placeholder="Select job type"
/>
```

**Props**:
- `label` (string, optional): Select label
- `value` (string): Selected value
- `onChange` (function): Change handler
- `options` (array): Array of options (strings or objects with value/label)
- `error` (string, optional): Error message
- `disabled` (boolean, optional): Disable select. Default: false
- `required` (boolean, optional): Mark as required. Default: false
- `placeholder` (string, optional): Placeholder text. Default: 'Select an option'
- `icon` (React Component, optional): Icon to display
- `className` (string, optional): Additional CSS classes

---

## Import Methods

### Direct Import (Required)
```javascript
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import Input from '@/components/common/Input';
import StatusBadge from '@/components/common/StatusBadge';
```

### Example Usage
```javascript
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';

function MyComponent() {
    return (
        <Card>
            <Button>Click Me</Button>
        </Card>
    );
}
```

---

## Design System

All common components follow the Jeenora Hire design system:

**Colors**:
- Primary: Green-800 (#065f46)
- Secondary: Blue-600 (#2563EB)
- Danger: Red-600 (#DC2626)
- Success: Green-600 (#16A34A)
- Warning: Yellow-600 (#CA8A04)

**Typography**:
- Font Family: 'Outfit', sans-serif
- Headings: font-bold, font-black
- Body: font-medium, font-semibold

**Spacing**:
- Small: 0.5rem (8px)
- Medium: 1rem (16px)
- Large: 1.5rem (24px)
- Extra Large: 2rem (32px)

**Border Radius**:
- Small: 0.5rem (8px)
- Medium: 0.75rem (12px)
- Large: 1rem (16px)
- Extra Large: 1.5rem (24px)

---

## Best Practices

1. **Always use common components** instead of creating custom ones
2. **Extend components** using className prop for specific needs
3. **Keep components simple** - don't add too many props
4. **Document new components** when adding to this directory
5. **Test components** in isolation before using in features
6. **Follow naming conventions** - use PascalCase for component names

---

## Adding New Common Components

When adding a new common component:

1. Create the component file in `src/components/common/`
2. Export it in `index.js`
3. Add documentation to this README
4. Ensure it follows the design system
5. Keep it under 100 lines if possible
6. Make it reusable and configurable

---

## Migration Guide

To migrate existing components to use common components:

**Before**:
```javascript
<button className="bg-green-800 text-white px-4 py-2 rounded-lg">
    Save
</button>
```

**After**:
```javascript
import { Button } from '@/components/common';

<Button>Save</Button>
```

---

**Last Updated**: December 30, 2025  
**Total Components**: 8  
**Status**: ✅ Active
