import { redirect } from "next/navigation";
import { signOut } from "../action";

export default async function Logout() {
    await signOut(); // Ensure user is signed out
    redirect('/auth/login'); // Redirect to the login page
    // No need to return JSX as redirect terminates execution
}
