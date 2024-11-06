import UserViewPage from "../_components/user-view";

export let metadata = {
  title: "Dashboard : Employee View",
};

export default async function Page({ params }: { params: { slug: string } }) {
  const slug = (await params).slug;
  return <UserViewPage slug={slug} />;
}
