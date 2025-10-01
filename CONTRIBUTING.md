# Contributing to Instagram Influencer Profile Page

Thank you for your interest in contributing to this project! This document provides guidelines and instructions for contributing.

## 🤝 Ways to Contribute

- **Bug Reports**: Help us identify and fix bugs
- **Feature Requests**: Suggest new features or improvements
- **Code Contributions**: Submit bug fixes or new features
- **Documentation**: Improve README, comments, or guides
- **Testing**: Help test new features and report issues

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Git
- Basic knowledge of React, TypeScript, and Tailwind CSS

### Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/yourusername/instagram-influencer-profile.git
   cd instagram-influencer-profile
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

## 📝 Development Guidelines

### Code Style
- **TypeScript**: Use strict typing, avoid `any` types
- **React**: Use functional components with hooks
- **Tailwind**: Use utility classes, avoid custom CSS when possible
- **Components**: Keep components small and focused on single responsibility

### File Organization
```
components/
├── ComponentName.tsx      # Main component
├── ui/                   # Reusable UI components
└── hooks/                # Custom React hooks (if created)
```

### Naming Conventions
- **Components**: PascalCase (`ProfileHeader.tsx`)
- **Files**: kebab-case for utilities (`api-client.ts`)
- **Variables**: camelCase (`userData`, `fetchUserProfile`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_RETRY_ATTEMPTS`)

### Component Structure
```tsx
import React from 'react';
import { ComponentProps } from './types'; // if needed

interface ComponentNameProps {
  // Define props with clear types
}

export function ComponentName({ prop1, prop2 }: ComponentNameProps) {
  // Component logic
  
  return (
    <div className="component-root-styles">
      {/* Component JSX */}
    </div>
  );
}
```

## 🧪 Testing Guidelines

### Manual Testing
- Test on multiple screen sizes (mobile, tablet, desktop)
- Verify responsive design works correctly
- Test both with and without backend connectivity
- Ensure loading states work properly

### Browser Testing
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📋 Pull Request Process

### Before Submitting
1. **Test your changes thoroughly**
2. **Ensure code follows style guidelines**
3. **Update documentation if needed**
4. **Check for console errors**
5. **Verify responsive design**

### PR Description Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested on desktop
- [ ] Tested on mobile
- [ ] Tested with mock data
- [ ] Tested with API integration

## Screenshots (if applicable)
Add screenshots showing the changes

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console errors
```

### Review Process
1. **Automated checks** will run on your PR
2. **Code review** by maintainers
3. **Testing** on different environments
4. **Approval** and merge

## 🐛 Bug Reports

### Before Reporting
1. **Search existing issues** to avoid duplicates
2. **Test with latest version**
3. **Try to reproduce** the issue consistently

### Bug Report Template
```markdown
**Bug Description**
Clear description of the bug

**Steps to Reproduce**
1. Go to...
2. Click on...
3. See error

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Environment**
- Browser: [Chrome/Firefox/Safari]
- Version: [browser version]
- Device: [Desktop/Mobile/Tablet]
- Screen size: [if relevant]

**Screenshots**
Add screenshots if helpful
```

## ✨ Feature Requests

### Feature Request Template
```markdown
**Feature Description**
Clear description of the proposed feature

**Problem/Use Case**
What problem does this solve?

**Proposed Solution**
How should this work?

**Alternatives Considered**
Other solutions you've considered

**Additional Context**
Any other relevant information
```

## 🏗️ Architecture Guidelines

### State Management
- Use React hooks for local state
- Prefer props drilling for simple cases
- Consider Context API for deeply nested props

### API Integration
- Use the existing Supabase client pattern
- Implement proper error handling
- Include loading states
- Provide fallback to mock data

### Styling
- Use Tailwind utility classes
- Follow the existing design system
- Ensure dark mode compatibility (if implemented)
- Maintain responsive design principles

### Performance
- Lazy load images where appropriate
- Minimize re-renders with proper dependency arrays
- Use React.memo for expensive components
- Optimize bundle size

## 🔒 Security Guidelines

- **API Keys**: Never commit API keys or secrets
- **Environment Variables**: Use proper environment variable patterns
- **User Input**: Sanitize and validate all user inputs
- **Dependencies**: Keep dependencies updated

## 📚 Resources

### Project Documentation
- [README.md](README.md) - Project overview and setup
- [Component Documentation](components/) - Individual component guides

### External Resources
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [ShadCN/UI Components](https://ui.shadcn.com/)
- [Supabase Documentation](https://supabase.com/docs)

## ❓ Questions

If you have questions about contributing:
1. **Check existing issues** and discussions
2. **Create a new issue** with the "question" label
3. **Join community discussions** (if available)

## 🙏 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- Project documentation

Thank you for contributing to make this project better! 🚀