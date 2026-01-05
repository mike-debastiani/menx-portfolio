export default function CaseStudy({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <main>
      <h1>Case Study</h1>
      <p>This is the case study page placeholder for {params.slug}.</p>
    </main>
  );
}

