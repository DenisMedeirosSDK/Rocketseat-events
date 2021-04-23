import { http } from "./app";
import './websocket/client'
import './websocket/admin'

http.listen(3333, () => console.log('Server running in port, 3333'))
