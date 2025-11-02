# Custom UI Components Library

This directory contains reusable UI components for the Deewan Residency website. All components are built with TypeScript, Tailwind CSS, and follow modern React patterns.

## 🎨 **Available Components**

### **Base Components**
- **Button** - Versatile button component with multiple variants and sizes
- **Input** - Form input with validation and icon support
- **Card** - Container component with glassmorphism support
- **Badge** - Status indicators and labels
- **Avatar** - User profile images and initials
- **Container** - Responsive layout container
- **Spinner** - Loading indicators

### **Form Components** (Planned)
- **Select** - Dropdown selection component
- **Textarea** - Multi-line text input
- **Checkbox** - Checkbox input with custom styling
- **Radio** - Radio button groups

### **Layout Components** (Planned)
- **Grid** - Responsive grid system
- **Stack** - Vertical/horizontal stacking
- **Divider** - Visual separators

### **Feedback Components** (Planned)
- **Alert** - Notification messages
- **Toast** - Temporary notifications
- **Modal** - Dialog overlays
- **Tooltip** - Contextual help

### **Navigation Components** (Planned)
- **Tabs** - Tabbed navigation
- **Breadcrumb** - Navigation breadcrumbs
- **Pagination** - Page navigation

### **Data Display Components** (Planned)
- **Table** - Data tables
- **List** - Structured lists
- **Skeleton** - Loading placeholders

### **Media Components** (Planned)
- **Image** - Optimized image component
- **Video** - Video player component

### **Utility Components**
- **CountUp** - Animated number counting with motion effects
- **SplitText** - Advanced text animations with GSAP SplitText
- **Progress** - Progress indicators (Planned)
- **Accordion** - Collapsible content (Planned)

## 🚀 **Usage**

```tsx
import { Button, Card, Input, Badge } from '@/components/ui';

// Basic usage
<Button variant="primary" size="lg">
  Click me
</Button>

// Card with glassmorphism
<Card glass padding="lg" shadow="xl">
  <h2>Hotel Information</h2>
</Card>

// Input with icon
<Input 
  label="Email"
  type="email"
  icon={<EmailIcon />}
  placeholder="Enter your email"
/>

// Badge
<Badge variant="success" size="sm">
  Available
</Badge>

// CountUp Animation
<CountUp 
  to={150}
  from={0}
  duration={2.5}
  delay={0.2}
  separator=","
  className="text-4xl font-bold"
/>+

// SplitText Animation
<SplitText
  text="Reserve Your Ideal Holiday"
  tag="h1"
  className="text-6xl font-bold text-gray-900"
  splitType="chars"
  delay={50}
  duration={0.8}
  from={{ opacity: 0, y: 50 }}
  to={{ opacity: 1, y: 0 }}
/>
```

## 🎯 **Design Principles**

### **Consistency**
- Unified design tokens (colors, spacing, typography)
- Consistent API patterns across components
- Standardized prop naming conventions

### **Accessibility**
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader optimization
- Focus management

### **Performance**
- Lightweight implementations
- Tree-shaking support
- Optimized re-renders
- Lazy loading where applicable

### **Mobile-First**
- Touch-friendly interactions (44px minimum)
- Responsive design patterns
- Gesture support
- Optimized for mobile performance

### **Theming**
- Glassmorphism effects
- Dark mode support (planned)
- Custom color schemes
- Brand consistency

## 📱 **Mobile Optimization**

All components are optimized for mobile devices:

- **Touch Targets**: Minimum 44px touch areas
- **Responsive Sizing**: Adaptive sizing across breakpoints
- **Gesture Support**: Swipe, pinch, and tap interactions
- **Performance**: Optimized for mobile browsers
- **Accessibility**: Mobile screen reader support

## 🎨 **Glassmorphism Support**

Many components support glassmorphism effects:

```tsx
<Card glass>
  <Input glass />
  <Button variant="primary">
    Action
  </Button>
</Card>
```

## 🔧 **Development**

### **Adding New Components**

1. Create component directory: `src/components/ui/ComponentName/`
2. Add TypeScript component: `ComponentName.tsx`
3. Add index file: `index.ts`
4. Export from main index: `src/components/ui/index.ts`
5. Update this README

### **Component Structure**

```
ComponentName/
├── ComponentName.tsx    # Main component
├── index.ts            # Export file
└── ComponentName.stories.tsx  # Storybook stories (optional)
```

### **TypeScript Patterns**

- Extend base interfaces from `types.ts`
- Use proper prop typing
- Support ref forwarding where needed
- Include proper JSDoc comments

## 🧪 **Testing**

Components should include:
- Unit tests with Jest/React Testing Library
- Accessibility tests
- Visual regression tests (planned)
- Performance benchmarks (planned)

## 📚 **Documentation**

Each component includes:
- TypeScript interfaces
- Usage examples
- Accessibility notes
- Performance considerations
- Mobile-specific behavior

---

**Built with ❤️ for Deewan Residency**