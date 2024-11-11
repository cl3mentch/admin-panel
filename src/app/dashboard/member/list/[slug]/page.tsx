import { pageTitle, param } from "../_components/config/setting";
import FormPage from "../_components/page/form-page";

export async function generateMetadata({ searchParams }: any) {
  const userId = (await searchParams).userid;
  return {
    title: `Dashboard : ${pageTitle} ${userId ? ` (${userId})` : ""}`,
  };
}

export default async function Page({ params, searchParams }: any) {
  const recordId = await searchParams;
  const slug = (await params).slug;

  return <FormPage slug={slug} recordId={recordId[param]} />;
}
