import { BrowserRouter } from "react-router-dom";
import { NavigationMenu } from "@shopify/app-bridge-react";
import Routes from "./Routes";
import "./style/global.css";

import {
  AppBridgeProvider,
  QueryProvider,
  PolarisProvider,
} from "./components";
import { Provider as ReduxProvider } from "react-redux";
import store from "./redux/store";

export default function App() {
  // Any .tsx or .jsx files in /pages will become a route
  // See documentation for <Routes /> for more info
  const pages = import.meta.globEager("./pages/**/!(*.test.[jt]sx)*.([jt]sx)");

  return (
    <PolarisProvider>
      <ReduxProvider store={store}>
        <BrowserRouter>
          <AppBridgeProvider>
            <QueryProvider>
              <NavigationMenu
                navigationLinks={[
                  {
                    label: "Update Suggestions",
                    destination: "/update-suggestions",
                  },
                  {
                    label: "Discounts",
                    destination: "/discounts",
                  },
                  {
                    label: "Manage Discounts",
                    destination: "/manage-discounts",
                  },
                  // {
                  //   label: "Volume Discount",
                  //   destination: "/discounts/volume-discount",
                  // },
                ]}
              />
              <Routes pages={pages} />
            </QueryProvider>
          </AppBridgeProvider>
        </BrowserRouter>
      </ReduxProvider>
    </PolarisProvider>
  );
}
