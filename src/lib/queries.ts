import getPayload from "@/payload";
import { unstable_cache } from "./unstable-cache";

// from nextjs 15.0.4, use the "use cache" directive instead
export const getAllCauses = unstable_cache(
   async () => {
        const payload = await getPayload()
        return payload.find({
            collection: 'causes',
            depth: 2,
            page: 1,
            limit: 10,
            where: {
                approved: {
                    equals: 'approved'
                }
            }
        })
    },
    ["causes"],
    {
        revalidate: 60 * 60 * 2, // two hours,
    },
)

export const getCause = unstable_cache(
   async (slug: string) => {
        const payload = await getPayload()
        return payload.find({
        collection: 'causes',
        depth: 2,
        where: {
            slug: {
                equals: slug
            },
            approved: {
                equals: 'approved'
            }
        }
    })},
    ["causes", "slug"],
    {
        revalidate: 60 * 60 * 2, // two hours,
    },
)