import { Spinner } from "@shopify/polaris";
import { lazy, Suspense } from "react";
import { Routes as ReactRouterRoutes, Route } from "react-router-dom";
import ManageDisocunts from "./pages/ManageDisocunts";
// import VolumeDiscount from "./pages/VolumeDiscount";

const LoadingScreen = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spinner accessibilityLabel="Spinner example" size="large" />
    </div>
  );
};

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

// custom components
const CreateDiscount = Loadable(
  lazy(() => import("./pages/others/CreateDiscount"))
);
const Discounts = Loadable(lazy(() => import("./pages/others/Discounts")));
const Suggestions = Loadable(lazy(() => import("./pages/others/Suggestions")));
const UpdateDiscount = Loadable(
  lazy(() => import("./pages/others/UpdateDiscount"))
);
/**
 * File-based routing.
 * @desc File-based routing that uses React Router under the hood.
 * To create a new route create a new .jsx file in `/pages` with a default export.
 *
 * Some examples:
 * * `/pages/index.jsx` matches `/`
 * * `/pages/blog/[id].jsx` matches `/blog/123`
 * * `/pages/[...catchAll].jsx` matches any URL not explicitly matched
 *
 * @param {object} pages value of import.meta.globEager(). See https://vitejs.dev/guide/features.html#glob-import
 *
 * @return {Routes} `<Routes/>` from React Router, with a `<Route/>` for each file in `pages`
 */

export default function Routes({ pages }) {
  const routes = useRoutes(pages);
  const routeComponents = routes.map(({ path, component: Component }) => (
    <Route key={path} path={path} element={<Component />} />
  ));

  const NotFound = routes.find(({ path }) => path === "/notFound").component;

  return (
    <ReactRouterRoutes>
      {routeComponents}
      <Route path="/update-suggestions" element={<Suggestions />} />
      <Route path="/manage-discounts">
        <Route path="" element={<ManageDisocunts />} />
      </Route>
      <Route path="/discounts">
        <Route path="" element={<Discounts />} />
        <Route path="offer-create" element={<CreateDiscount />} />
        <Route path="update?:key" element={<UpdateDiscount />} />
        {/* <Route path="volume-discount" element={<VolumeDiscount />} /> */}
      </Route>

      <Route path="*" element={<NotFound />} />
    </ReactRouterRoutes>
  );
}

function useRoutes(pages) {
  const routes = Object.keys(pages)
    .map((key) => {
      let path = key
        .replace("./pages", "")
        .replace(/\.(t|j)sx?$/, "")
        /**
         * Replace /index with /
         */
        .replace(/\/index$/i, "/")
        /**
         * Only lowercase the first letter. This allows the developer to use camelCase
         * dynamic paths while ensuring their standard routes are normalized to lowercase.
         */
        .replace(/\b[A-Z]/, (firstLetter) => firstLetter.toLowerCase())
        /**
         * Convert /[handle].jsx and /[...handle].jsx to /:handle.jsx for react-router-dom
         */
        .replace(/\[(?:[.]{3})?(\w+?)\]/g, (_match, param) => `:${param}`);

      if (path.endsWith("/") && path !== "/") {
        path = path.substring(0, path.length - 1);
      }

      if (!pages[key].default) {
        console.warn(`${key} doesn't export a default React component`);
      }

      return {
        path,
        component: pages[key].default,
      };
    })
    .filter((route) => route.component);

  return routes;
}
