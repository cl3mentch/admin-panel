import { TActionOptions } from "@/components/shared/table/data-actions";
import UserFormPage from "../_components/page-form";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { userid?: string };
}) {
  const userId = (await searchParams).userid;
  return {
    title: `Dashboard : User${userId ? ` (${userId})` : ""}`,
  };
}

export default async function SlugPage({
  params,
  searchParams,
}: {
  params: { slug: TActionOptions };
  searchParams: Promise<{ userid?: string }>;
}) {
  const userId = (await searchParams).userid;
  const slug = (await params).slug;

  return <UserFormPage slug={slug} userId={userId} />;
}
