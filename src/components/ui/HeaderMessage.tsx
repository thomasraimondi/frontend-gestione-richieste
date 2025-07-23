export default function HeaderMessage({ title }: { title: string }) {
  return (
    <div className="w-full min-h-[100px] bg-gray-100 p-4 flex items-center justify-center mt-[70px]">
      <h1 className="text-2xl font-bold">{title}</h1>
    </div>
  );
}
