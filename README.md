# TanStack Query Demo App

A comprehensive demonstration of **@tanstack/react-query v5** features with a beautiful Material-UI interface. This project showcases various TanStack Query patterns including queries, mutations, infinite queries, and advanced features in a well-organized, navigable format.

![TanStack Query Demo](https://img.shields.io/badge/TanStack_Query-v5-blue)
![React](https://img.shields.io/badge/React-18-blue)
![Material-UI](https://img.shields.io/badge/Material--UI-5.x-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)

---

## ✨ Features Implemented

### 🔍 **Core Query Features**
- **Basic Queries** - Data fetching with caching and background updates
- **Mutations** - CRUD operations with optimistic updates and cache invalidation
- **Parallel Queries** - Multiple queries running simultaneously
- **Dependent Queries** - Queries that depend on other query results
- **Infinite Queries** - Pagination and infinite scrolling with intersection observer

### 🎨 **UI & Navigation**
- **Material-UI Integration** - Beautiful, responsive UI components
- **Sidebar Navigation** - Clean navigation with feature categories
- **Home Dashboard** - Interactive overview of all features
- **Responsive Design** - Works perfectly on mobile and desktop
- **Feature Organization** - Clean separation by domain (posts, users, todos, etc.)

### 🚀 **Advanced Features**
- **Suspense Integration** - Better loading states with React Suspense
- **Error Boundaries** - Comprehensive error handling
- **Prefetching** - Background data prefetching for better UX
- **Selectors** - Data transformation and filtering
- **React Query Devtools** - Development debugging tools
- **Custom Hooks** - Reusable query logic

---

## 📂 Project Structure

```
src/
├── components/              # Reusable UI components
│   ├── Layout.tsx          # Main navigation layout with sidebar
│   ├── HomePage.tsx        # Feature overview and navigation hub
│   └── FeatureWrapper.tsx  # Consistent feature container
├── features/               # Domain-specific features
│   ├── posts/             # Posts management
│   │   ├── components/
│   │   │   ├── PostList.tsx
│   │   │   ├── AddPostForm.tsx
│   │   │   └── DeletePostButton.tsx
│   │   ├── InfinitePosts.tsx
│   │   ├── InfiniteScrollingPost.tsx
│   │   ├── PostTitle.tsx
│   │   ├── PostsManager.tsx
│   │   └── postApi.ts
│   ├── users/             # User management
│   │   ├── PaginatedUsers.tsx
│   │   ├── UserSearch.tsx
│   │   └── UserWithPosts.tsx
│   ├── todos/             # Todo management
│   │   ├── AddTodo.tsx
│   │   ├── DeleteTodo.tsx
│   │   └── TodoList.tsx
│   ├── dashboard/         # Dashboard features
│   │   ├── UserDashboard.tsx
│   │   ├── ParallelQueries.tsx
│   │   ├── BackgroundDemo.tsx
│   │   ├── PrefetchDemo.tsx
│   │   ├── UserList.tsx
│   │   ├── UserPosts.tsx
│   │   └── dashboardApi.ts
│   └── advanced/          # Advanced features
│       └── SuspensePosts.tsx
├── hooks/                 # Custom hooks
│   └── useIntersectionObserver.ts
├── App.tsx               # Main application component
└── main.tsx             # Application entry point
```

---

## 🛠️ Dependencies

### Core Dependencies
- **@tanstack/react-query** - Data fetching and state management
- **@tanstack/react-query-devtools** - Development debugging tools
- **react** - UI library
- **typescript** - Type safety

### UI & Styling
- **@mui/material** - Material-UI component library
- **@mui/icons-material** - Material-UI icons
- **@emotion/react** - CSS-in-JS styling
- **@emotion/styled** - Styled components
- **framer-motion** - Smooth animations

### Build Tools
- **vite** - Build tool and dev server
- **@vitejs/plugin-react** - Vite React plugin

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tanstack_study_topics
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5174`

### Build for Production
```bash
npm run build
```

---

## 🎯 How to Use

### Navigation
- **Sidebar Navigation**: Use the left sidebar to explore different TanStack Query features
- **Home Page**: Start here to see all available features and their descriptions
- **Feature Pages**: Each feature has interactive examples and helpful tips
- **Mobile**: The navigation drawer works perfectly on mobile devices

### Learning Path
1. **🏠 Home** - Overview of all features
2. **📄 Posts Management** - Learn basic queries and mutations
3. **👥 User Management** - Understand pagination and search
4. **✅ Todo Management** - Master CRUD operations
5. **📊 Dashboard** - See parallel and dependent queries
6. **🔬 Advanced Features** - Dive into Suspense and infinite queries

---

## 📚 TanStack Query Concepts Demonstrated

### Queries
- **Basic Data Fetching** - Simple GET requests with caching
- **Pagination** - Page-based data loading
- **Infinite Queries** - Scroll-based infinite loading
- **Dependent Queries** - Queries that depend on other query results
- **Parallel Queries** - Multiple queries running simultaneously

### Mutations
- **Create Operations** - Adding new data
- **Update Operations** - Modifying existing data
- **Delete Operations** - Removing data
- **Optimistic Updates** - UI updates before server confirmation
- **Cache Invalidation** - Refreshing data after mutations

### Advanced Features
- **Suspense Integration** - Better loading states
- **Error Boundaries** - Comprehensive error handling
- **Prefetching** - Background data loading
- **Selectors** - Data transformation
- **Custom Hooks** - Reusable query logic

---

## 🎨 UI Features

### Material-UI Components
- **AppBar** - Top navigation bar
- **Drawer** - Sidebar navigation
- **Cards** - Feature overview cards
- **Buttons** - Interactive elements
- **Typography** - Consistent text styling
- **Theme** - Custom Material-UI theme

### Responsive Design
- **Mobile First** - Optimized for mobile devices
- **Breakpoints** - Responsive layout at different screen sizes
- **Touch Friendly** - Easy to use on touch devices

### Animations
- **Framer Motion** - Smooth page transitions
- **Loading States** - Visual feedback during data fetching
- **Hover Effects** - Interactive element feedback

---

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Code Organization
- **Feature-based Structure** - Each domain has its own folder
- **Component Separation** - Reusable components in shared folders
- **Type Safety** - Full TypeScript support
- **Consistent Naming** - PascalCase for components, camelCase for utilities

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [TanStack Query](https://tanstack.com/query) - Amazing data fetching library
- [Material-UI](https://mui.com/) - Beautiful React components
- [Vite](https://vitejs.dev/) - Fast build tool
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) - Free fake API for testing

---

## 📞 Support

If you have any questions or need help, please open an issue or reach out to the maintainers.

---

**Happy Learning! 🚀**