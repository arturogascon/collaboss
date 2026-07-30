import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ProfileForms from "@/app/profile/profileForms";
import { getUserById } from "../utils/db/users";

export default async function Profile() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const user = await getUserById(session.user.id);

  if (!user) {
    redirect("/login");
  }

  return <ProfileForms username={user.username} email={user.email} />;
}
