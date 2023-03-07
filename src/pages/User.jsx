
import { api } from "../http/axios"

export function User() {

    return <div onClick={async () => await api.get('/')}>
        gggg
    </div>
}