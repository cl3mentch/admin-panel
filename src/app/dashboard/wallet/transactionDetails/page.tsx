import { pageTitle } from "./_components/setting";
import IndexPage from "./_components";

export const metadata = {
  title: `Dashboard: ${pageTitle}`,
};

export default function Page() {
  return <IndexPage />;
}
