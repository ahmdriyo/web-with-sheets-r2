import { CarDetailView } from "@/src/features/car-detail";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CarDetailPage({ params }: PageProps) {
  const { slug } = await params;
  return <CarDetailView slug={slug} />;
}
