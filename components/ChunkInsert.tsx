export const ChunkInsert = ({ content }: { key: number; content: string }) => {
  return (
    <span className="font-semibold whitespace-pre-wrap bg-emerald-100">
      {content}
    </span>
  );
};
