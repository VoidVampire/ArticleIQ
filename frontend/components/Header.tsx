export default function Header() {
  return (
    <header className="bg-black border-b border-zinc-800">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-foreground">
          ArticleIQ
        </h1>
        <p className="mt-2 text-xl text-muted-foreground">
          Summarize, Explore, Ask
        </p>
      </div>
    </header>
  )
}