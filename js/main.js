import { main } from "./data/mainData.js"
import { sideData } from "./data/sidebarData.js"
import { favHandler } from "./favHandler.js"
import { pipe } from "./helperFunction/common.js"
import { getMainData } from "./server/mainData.js"

const init = () => pipe(
    () => main.showMainHTML(),
    () => sideData.getTemplate(),
    () => favHandler()
)()

await getMainData()
init();