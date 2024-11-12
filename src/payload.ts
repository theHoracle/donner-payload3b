import { getPayloadHMR } from "@payloadcms/next/utilities"
import config from "@payload-config"

const payload = await getPayloadHMR({ config })

export default payload;