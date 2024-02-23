import { Home } from "./Home";

const showSupportUkraineBanner =
  (process.env.SHOW_SUPPORT_UKRAINE_BANNER ?? "false") === "true";

export default function Page() {
  return <Home showSupportUkraineBanner={showSupportUkraineBanner} />;
}
