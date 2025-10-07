# AMP Test Task - Frontend Application

**Author:** Areg Hovhannisyan  
**Created:** October 7, 2025
**Last Updated:** October 7, 2025
**Version:** 1.1.0

A modern, enterprise-grade React application built with TypeScript, featuring comprehensive authentication system, state management with Zustand, and optimized form handling with React Hook Form and Zod validation.

## 🏗️ Project Overview

This application demonstrates advanced React development practices with a focus on:

- **Authentication Flow**: Complete login and OTP verification system with manual storage
- **State Management**: Zustand for global state (manual persistence)
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**: Ant Design with Tailwind CSS styling
- **Type Safety**: Full TypeScript coverage with strict mode
- **Performance**: Optimized components with memoization

## 📁 Current Project Structure

```
amp-test-task/
├── src/
│   ├── main.tsx                    # Application entry point
│   ├── App.tsx                     # Main application component
│   ├── index.css                   # Global styles with Tailwind
│   ├── @types/                     # TypeScript type definitions
│   │   ├── api.types.ts           # API response types
│   │   └── index.ts               # Type exports
│   ├── components/                 # Reusable UI components
│   │   ├── auth/
│   │   │   ├── AuthWrapper.tsx    # Authentication flow wrapper
│   │   │   └── index.ts           # Auth component exports
│   │   └── index.ts               # Component barrel exports
│   ├── config/                     # Application configuration
│   │   ├── antd.ts                # Ant Design theme configuration
│   │   ├── api.ts                 # API client configuration
│   │   ├── api-endpoints-config.ts # API endpoint definitions
│   │   ├── images-config.ts       # Image asset paths
│   │   ├── query-config.ts        # TanStack Query configuration
│   │   ├── validation-rules-config.ts # Validation rules
│   │   └── index.ts               # Config exports
│   ├── forms/                      # Form components and schemas
│   │   ├── auth/
│   │   │   ├── login.form.tsx     # Login form component
│   │   │   ├── login.schema.ts    # Login validation schema
│   │   │   ├── login.validation.ts # Login validation rules
│   │   │   ├── otp.form.tsx       # OTP verification form
│   │   │   └── index.ts           # Auth form exports
│   │   └── index.ts               # Form exports
│   ├── layouts/                    # Layout components
│   │   ├── Layout.tsx             # Main application layout
│   │   └── index.ts               # Layout exports
│   ├── pages/                      # Page components
│   │   ├── auth/
│   │   │   ├── Login.tsx          # Login page component
│   │   │   └── index.ts           # Auth page exports
│   │   ├── Dashboard.tsx          # Main dashboard page
│   │   └── index.ts               # Page exports
│   ├── providers/                  # Context providers
│   │   ├── auth-provider.tsx      # Authentication context
│   │   ├── query-provider.tsx     # TanStack Query provider
│   │   └── index.ts               # Provider exports
│   ├── service/                    # API service layer
│   │   ├── auth/
│   │   │   ├── api.ts             # Authentication API calls
│   │   │   ├── mutations.ts       # React Query mutations
│   │   │   ├── queries.ts         # React Query queries
│   │   │   ├── types.ts           # Auth service types
│   │   │   └── index.ts           # Auth service exports
│   │   └── index.ts               # Service exports
│   ├── store/                      # State management
│   │   ├── auth-store.ts          # Authentication state (Zustand)
│   │   ├── app-store.ts           # Application state (Zustand)
│   │   └── index.ts               # Store exports
│   └── vite-env.d.ts              # Vite environment types
├── public/                         # Static assets
│   └── assets/
│       └── images/
│           └── CompanyLogo.svg     # Company logo
├── dist/                          # Production build output
├── Dockerfile                     # Development container
├── Dockerfile.prod                # Production container
├── nginx.conf                     # Nginx configuration
├── package.json                   # Dependencies and scripts
├── vite.config.ts                 # Vite configuration
├── tsconfig.json                  # TypeScript configuration
├── tailwind.config.js             # Tailwind CSS configuration
├── postcss.config.js              # PostCSS configuration
└── README.md                      # This file
```

## 🚀 Key Features & Technologies

### Core Technologies

- **React 18.2.0** - Latest React with concurrent features
- **TypeScript 5.2.2** - Full type safety with strict mode
- **Vite 5.0.8** - Fast build tool and development server
- **Tailwind CSS 4.1.14** - Utility-first CSS framework
- **Ant Design 5.27.4** - Enterprise UI component library

### State Management

- **Zustand 5.0.8** - Lightweight state management with persistence
- **TanStack Query 5.0.0** - Server state management and caching
- **React Hook Form 7.64.0** - Performant form handling

### Validation & Forms

- **Zod 4.1.11** - TypeScript-first schema validation
- **@hookform/resolvers 5.2.2** - Form validation resolvers

### HTTP Client

- **Xior 0.7.8** - Modern HTTP client with interceptors

### Development Tools

- **ESLint** - Code linting with TypeScript support
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 🏗️ Architecture Patterns

### 1. **Authentication Flow**

```typescript
// Complete authentication system with:
// - Login form with email/password validation
// - OTP verification with timer and resend functionality
// - OTP-gated authentication (no redirect to Dashboard until OTP success)
// - Manual session persistence in localStorage with expiry handling
// - Secure token handling
```

### 2. **State Management Architecture**

```typescript
// Zustand stores with manual persistence:
// - auth-store.ts: Authentication state (no Zustand persist middleware)
// - app-store.ts: Application-wide state management
// - TanStack Query: Server state caching and synchronization
```

### 3. **Form Handling Pattern**

```typescript
// React Hook Form + Zod validation:
// - Real-time validation with immediate feedback
// - Type-safe form schemas
// - Optimized re-rendering with memoization
// - Accessibility features with ARIA labels
```

### 4. **Component Architecture**

```typescript
// Modular component structure:
// - AuthWrapper: Unified authentication flow
// - Form components: Reusable with validation
// - Layout components: Consistent page structure
// - Barrel exports: Clean import paths
```

## 📦 Available Scripts

```bash
# Development
npm run dev          # Start development server (http://localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint with TypeScript support
```

## 🐳 Docker Support

### Development Environment

```bash
# Build development image
docker build -t amp-frontend-dev .

# Run development container
docker run -p 5173:5173 amp-frontend-dev
```

### Production Environment

```bash
# Build production image
docker build -f Dockerfile.prod -t amp-frontend-prod .

# Run production container
docker run -p 80:80 amp-frontend-prod
```

## 🔧 Configuration Details

### TypeScript Configuration

- **Target**: ES2020 with modern features
- **Strict Mode**: Enabled for maximum type safety
- **Path Mapping**: Clean imports with `@/` prefix
- **JSX Transform**: React 17+ automatic JSX runtime

### Vite Configuration

- **React Plugin**: Fast refresh and HMR
- **Path Resolution**: Absolute imports with `@/` alias
- **Build Optimization**: Tree-shaking and code splitting

### Tailwind CSS

- **Version 4.1.14**: Latest with new features
- **PostCSS Integration**: Automatic vendor prefixing
- **Custom Configuration**: Extended theme and utilities

## 🎯 Key Components Analysis

### Authentication System

- **LoginForm**: Email/password validation with real-time feedback
- **OTPForm**: 6-digit verification with timer and resend functionality
- **AuthWrapper**: Unified authentication flow with step indicators
- **AuthProvider**: Context-based state management

### Dashboard

- **User Information Display**: Profile data with avatar and details
- **Security Features**: Logout functionality with confirmation
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Access Control**: Authentication state validation

### State Management

- **Auth Store**: User authentication state with manual localStorage persistence (custom init + save)
- **App Store**: Application-wide state for UI and configuration
- **Query Cache**: Server state management with TanStack Query

## 🌐 API Integration

### Authentication Endpoints

- **Login**: Email/password authentication
- **OTP Verification**: 6-digit code validation
- **Token Management**: Secure token storage and manual persistence with expiry

### HTTP Client Configuration

- **Base URL**: Configurable API endpoint
- **Interceptors**: Request/response handling
- **Error Handling**: Centralized error management
- **Type Safety**: Full TypeScript coverage

## 🎨 UI/UX Features

### Design System

- **Ant Design Components**: Enterprise-grade UI components
- **Tailwind CSS**: Utility-first styling approach
- **Responsive Design**: Mobile-first responsive layout
- **Accessibility**: ARIA labels and keyboard navigation

### User Experience

- **Loading States**: Spinners and skeleton loaders
- **Error Handling**: User-friendly error messages
- **Form Validation**: Real-time feedback with clear instructions
- **Progress Indicators**: Visual feedback for multi-step processes

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd amp-test-task

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Setup

```bash
# Development server runs on http://localhost:5173
# Hot reload enabled for instant feedback
# TypeScript checking in real-time
```

## 📝 Development Guidelines

### Code Organization

1. **Components**: Create in appropriate directories with TypeScript props
2. **Forms**: Use React Hook Form with Zod validation schemas
3. **State**: Use Zustand for global state, TanStack Query for server state
4. **Styling**: Use Tailwind CSS classes with Ant Design components

### TypeScript Best Practices

- Use strict mode for maximum type safety
- Define interfaces for all props and API responses
- Use path mapping for clean imports
- Leverage TypeScript's type inference

### Performance Optimization

- Use React.memo for expensive components
- Implement useCallback and useMemo for expensive calculations
- Optimize bundle size with tree-shaking
- Use lazy loading for large components

## 🔒 Security Features

### Authentication Security

- **Input Validation**: Zod schemas for all form inputs
- **Token Management**: Secure storage with expiration handling
- **Rate Limiting**: OTP attempt tracking and cooldown
- **XSS Protection**: Proper input sanitization

### Data Protection

- **Type Safety**: TypeScript prevents runtime errors
- **Validation**: Client-side validation with server-side verification
- **Error Handling**: Secure error messages without sensitive data

## 📈 Performance Metrics

### Bundle Optimization

- **Tree Shaking**: Unused code elimination
- **Code Splitting**: Lazy loading for better performance
- **Minification**: Optimized production builds
- **Asset Optimization**: Compressed images and fonts

### Runtime Performance

- **Memoization**: Prevent unnecessary re-renders
- **Virtual Scrolling**: Efficient large list rendering
- **Caching**: TanStack Query for server state caching
- **Lazy Loading**: On-demand component loading

## 🧪 Testing Strategy

### Recommended Testing Approach

- **Unit Tests**: Component logic and utility functions
- **Integration Tests**: Form validation and API integration
- **E2E Tests**: Complete user authentication flow
- **Accessibility Tests**: Screen reader and keyboard navigation

### Testing Tools

- **Jest**: Unit testing framework
- **React Testing Library**: Component testing utilities
- **Cypress**: End-to-end testing
- **Storybook**: Component documentation and testing

## 🚀 Deployment

### Production Build

```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

### Docker Production

```bash
# Build production Docker image
docker build -f Dockerfile.prod -t amp-frontend-prod .

# Run production container
docker run -p 80:80 amp-frontend-prod
```

### Environment Variables

```env
VITE_API_BASE_URL=https://api.example.com
VITE_APP_NAME=AMP Test Task
VITE_OTP_EXPIRY_TIME=300
```

## 📞 Support & Maintenance

### Code Quality

- **ESLint**: Automated code linting
- **TypeScript**: Compile-time error checking
- **Prettier**: Code formatting (recommended)
- **Husky**: Git hooks for quality gates

### Monitoring

- **Error Tracking**: Implement error monitoring service
- **Performance Monitoring**: Track Core Web Vitals
- **Analytics**: User behavior tracking
- **Logging**: Structured logging for debugging

---

**Author:** Areg Hovhannisyan  
**Email:** beg.areg1255@gmail.com  
**LinkedIn:** [Areg Hovhannisyan](https://www.linkedin.com/in/areg-begunts/)  
**GitHub:** [@areg-hovhannisyan](https://github.com/AregBeg)

**Project Repository:** [AMP Test Task Frontend](https://github.com/AregBeg/amp-test-task)

_This project demonstrates modern React development practices with enterprise-grade architecture, comprehensive authentication system, and optimized performance._
