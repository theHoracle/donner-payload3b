import { getPayload as payloader } from 'payload'
import config from "@payload-config"

const getPayload = async () => await payloader({ config })

export default getPayload;