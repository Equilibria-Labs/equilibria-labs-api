export default function Body({ children }: { children: React.ReactNode }) {
  return <div className='flex flex-col gap-4 max-w-5xl p-5'>{children}</div>;
}
