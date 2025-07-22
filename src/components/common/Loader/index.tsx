export default function Loader({ inline = false }: { inline: boolean }) {
  if (inline) {
    return (
      <span className="ml-2 inline-block w-4 h-4 border-2 border-blue-700 border-t-transparent rounded-full animate-spin align-middle" />
    );
  }
  return (
    <div className="flex justify-center items-center py-4">
      <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
