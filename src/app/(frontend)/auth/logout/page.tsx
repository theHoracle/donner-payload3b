
import { redirect } from "next/navigation"
import { signOut } from "../action"

export default async function Logout() {

    await signOut()

    redirect('/auth/login')

    return (<div>
        <h1>Logout</h1>
    </div>)
}

