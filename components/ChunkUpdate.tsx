import { ChunkDelete } from "./ChunkDelete";
import { ChunkInsert } from "./ChunkInsert";

export const ChunkUpdate = ({
  insertContent,
  deleteContent,
}: {
  insertContent: string;
  deleteContent: string;
}) => {
  return (
    <>
      <ChunkDelete content={deleteContent} />
      <ChunkInsert content={insertContent} />
    </>
  );
};
