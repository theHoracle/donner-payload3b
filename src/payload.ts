import { getPayloadHMR } from "@payloadcms/next/utilities"
import config from "@payload-config"

const getPayload = async () => await getPayloadHMR({ config })

export default getPayload;