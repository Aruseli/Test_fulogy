import { AnaliticsProvider } from "./packages/analitics";
import analiticsConfig from "./analitics.config";

import "normalize.css";

export const Page = ({ children }) => {
  return <AnaliticsProvider {...analiticsConfig}>{children}</AnaliticsProvider>;
};
