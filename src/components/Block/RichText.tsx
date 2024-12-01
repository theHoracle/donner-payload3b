import LexicalContent from "../LexicalContent"

export default function RichText({ content }: {content: any}) {
  if (content?.root?.children?.length === 0) return null
  return (
    <section className="py-10">
        <div className="prose dark:prose-invert md:prose-lg">
          <LexicalContent childrenNodes={content?.root?.children} lazyLoadImages={true} />
        </div>
    </section>
  )
}