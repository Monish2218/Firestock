import List from "./List"
import { useFirestoreContext } from "../context/FirestoreContext"
import { useAuthContext } from "../context/AuthContext"
import { useMemo } from "react"

const StockImages = () => {
    const { state } = useFirestoreContext()
    const { currentUser } = useAuthContext()

    const items = useMemo(() => {
        const filtered = state.items.filter(item => {
            const username = currentUser?.displayName.split(" ").join("")
            return item.user === username?.toLowerCase()
        })
        return currentUser ? filtered : []
    }, [state.items, currentUser])
    return(
        <>
            <h1>My Stock Images</h1>
            <List items={items}/>
        </>
    )
}
export default StockImages