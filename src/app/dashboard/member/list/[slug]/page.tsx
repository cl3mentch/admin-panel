import FormPage from "../_components/page/form-page";

export async function generateMetadata({ searchParams }: any) {
  const userId = (await searchParams).userid;
  return {
    title: `Dashboard : Member ${userId ? ` (${userId})` : ""}`,
  };
}

export default async function Page({ params, searchParams }: any) {
  const userId = (await searchParams).userid;
  const slug = (await params).slug;

  return <FormPage slug={slug} userId={userId} />;
}
