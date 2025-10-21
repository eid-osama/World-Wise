📦 React Router Basics
react-router-dom → Library for client-side routing in React apps.

<BrowserRouter> → Wraps your app to enable routing via the browser's history API.

<Routes> → Replaces <Switch> in v6, holds all the route definitions.

<Route path="..." element={<Component />} /> → Defines a route.

🧭 Route Matching & Navigation
index prop → Renders this route by default for a parent route (like /app).

path="\*" → Wildcard path for 404 pages.

<Link to="/route"> → Client-side navigation without full page reload.

const navigate = useNavigate();
useNavigate() → Programmatic navigation (e.g. navigate("/login")).

<Route index element={<Navigate replace to="cities" />} /> -> to specfiy a certain tab to be opened once you enter to a page

🧱 Nested Routing
<Route path="app" element={<AppLayout />}> → Creates nested route structure.

<Outlet /> → Placeholder where nested components render inside parent layout.

🔄 Loader-Like Patterns (Pre-fetching)
Place data-fetching inside parent layout (e.g. AppLayout) to avoid duplication.

Fetch shared context like cities or user info here and pass to children.

🧠 Custom Hooks
useCities() → Example of a custom hook for fetching/managing data globally.

Encapsulates logic + state, makes components cleaner.
