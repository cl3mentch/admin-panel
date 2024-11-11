import { pageTitle, param } from "../_components/config/setting";
import FormPage from "../_components/page/form-page";

export async function generateMetadata({ searchParams }: any) {
  const recordId = await searchParams;
  return {
    title: `Dashboard : ${pageTitle} ${
      recordId ? ` (${recordId[param]})` : ""
    }`,
  };
}

export default async function Page({ params, searchParams }: any) {
  const recordId = await searchParams;
  const slug = (await params).slug;

  return <FormPage slug={slug} recordId={recordId[param]} />;
}
