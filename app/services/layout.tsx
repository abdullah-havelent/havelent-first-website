import ServiceWheel from '@/components/ServiceWheel';

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ServiceWheel />
    </>
  );
}
