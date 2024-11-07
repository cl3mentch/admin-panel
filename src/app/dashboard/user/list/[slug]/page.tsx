import FormPage from "./_components/form-page";

export async function generateMetadata({ searchParams }: any) {
  const userId = (await searchParams).userid;
  return {
    title: `Dashboard : User${userId ? ` (${userId})` : ""}`,
  };
}

export default async function Page({ params, searchParams }: any) {
  const userId = (await searchParams).userid;
  const slug = (await params).slug;

  return <FormPage slug={slug} userId={userId} />;
}
