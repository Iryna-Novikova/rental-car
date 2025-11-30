import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { Metadata } from 'next';

import { getCarByID } from '@/lib/api';
import CarDetailClient from './CarDetail.client';

interface CarPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: CarPageProps): Promise<Metadata> {
  const { id } = await params;
  const car = await getCarByID(id);

  return {
    title: `Car: ${car.brand} ${car.model}, ${car.year}`,
    description: car.description.slice(0, 30),
    openGraph: {
      title: `Car: ${car.brand} ${car.model}, ${car.year}`,
      description: car.description.slice(0, 30),
      url: `http://localhost:3000/cars/${car.id}`,
      images: [
        {
          url: `${car.img}`,
          width: 640,
          height: 512,
          alt: `Car: ${car.brand} ${car.model}`,
        },
      ],
      type: 'website',
    },
  };
}

const CarPage = async ({ params }: CarPageProps) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['car', id],
    queryFn: () => getCarByID(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CarDetailClient />
    </HydrationBoundary>
  );
};

export default CarPage;
