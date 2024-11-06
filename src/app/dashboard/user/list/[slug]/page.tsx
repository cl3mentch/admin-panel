import UserFormPage from "../_components/user-form";

export let metadata = {
  title: "Dashboard : Employee View",
};

export default async function Page({ params }: { params: { slug: string } }) {
  const slug = (await params).slug;
  return <UserFormPage slug={slug} />;
}
