const topics = [
  {
    title: "Advanced Topics (from TanStack Query):",
    items: [
      "Dependent (Chained) Queries",
      "Prefetching Data",
      "Query Cancellation",
      "Query Filters & Global Query State",
      "React Query Devtools",
      "SSR & Hydration",
      "Custom Query Functions & Query Key Factories",
    ],
  },
  {
    title: "Other Notable TanStack Query Features (Optional/Edge Cases):",
    items: [
      "Parallel Queries (fetching multiple queries at once)",
      "Placeholder Data (showing temporary data while loading)",
      "Initial Data (seeding the cache with initial data)",
      "Error Boundaries (handling errors at a higher level)",
      "Manual Query Invalidation/Refetching",
      "Persisting Cache (e.g., to localStorage for offline support)",
      "Custom Retry/Backoff Logic",
      "Suspense Integration (using React Suspense for data fetching)",
      "Query Subscriptions (listening to query state changes)",
      "Custom Logger (for debugging or analytics)",
      "Testing Utilities (for unit/integration testing hooks)",
    ],
  },
];

const notCovered = [
  "Local UI state (use useState, useReducer, or other state libraries)",
  "Routing (use React Router, Next.js, etc.)",
  "Form state (use Formik, React Hook Form, etc.)",
  "Authentication (though you can fetch auth data with queries)",
];

export const TanstackTopicsList = () => (
  <div
    style={{
      maxWidth: 700,
      margin: "2rem auto 2.5rem auto",
      padding: 24,
      border: "2px solid #222",
      borderRadius: 12,
      background: "#23272f",
      color: "#f3f3f3",
      boxShadow: "0 2px 12px 0 #0002",
      fontFamily: "Segoe UI, Arial, sans-serif",
    }}
  >
    <h2 style={{ color: "#7ecfff", marginBottom: 8 }}>
      TanStack Query: Advanced Topics to Learn
    </h2>
    {topics.map((section, idx) => (
      <div key={section.title} style={{ marginBottom: 18 }}>
        <h3
          style={{
            color: idx === 0 ? "#ffe066" : "#b2f296",
            margin: "10px 0 6px 0",
          }}
        >
          {section.title}
        </h3>
        <ul style={{ margin: 0, paddingLeft: 22, fontSize: 16 }}>
          {section.items.map((item) => (
            <li key={item} style={{ marginBottom: 3 }}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    ))}
    <h3 style={{ color: "#ff8c8c", margin: "18px 0 6px 0" }}>
      What's NOT Covered by TanStack Query:
    </h3>
    <ul style={{ margin: 0, paddingLeft: 22, fontSize: 16 }}>
      {notCovered.map((item) => (
        <li key={item} style={{ marginBottom: 3 }}>
          {item}
        </li>
      ))}
    </ul>
    <div style={{ marginTop: 18, fontSize: 15, color: "#b2f296" }}>
      <b>Summary:</b>
      <ul style={{ margin: 0, paddingLeft: 22 }}>
        <li>
          The 7 advanced topics above are the most important remaining features
          of TanStack Query.
        </li>
        <li>
          There are a few more edge-case or optional features (listed above),
          but you'll rarely need all of them unless you're building a very large
          or complex app.
        </li>
        <li>
          If you master the topics above, you'll be highly proficient with
          TanStack Query!
        </li>
      </ul>
    </div>
  </div>
);
