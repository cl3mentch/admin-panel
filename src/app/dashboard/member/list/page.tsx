import { pageTitle } from "./_components/config/setting";
import TablePage from "./_components/page/table-page";

export const metadata = {
  title: `Dashboard: ${pageTitle}`,
};

export default function Userlist() {
  return <TablePage />;
}
