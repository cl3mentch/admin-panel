import FormPage from "./_components/form-page";

export function generateMetadata({ searchParams }: any) {
  const userId = searchParams.userid;
  return {
    title: `Dashboard : User${userId ? ` (${userId})` : ""}`,
  };
}

export default function Page({ params, searchParams }: any) {
  const userId = searchParams.userid;
  const slug = params.slug;

  return <FormPage slug={slug} userId={userId} />;
}
