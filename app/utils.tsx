import { ChunkDelete } from "@/components/ChunkDelete";
import { ChunkEqual } from "@/components/ChunkEqual";
import { ChunkInsert } from "@/components/ChunkInsert";
import { ChunkUpdate } from "@/components/ChunkUpdate";
import {
  DIFF_DELETE,
  DIFF_EQUAL,
  DIFF_INSERT,
  diff_match_patch,
} from "diff-match-patch";

export const compareStrings = (s1: string, s2: string) => {
  let dmp = new diff_match_patch();
  let diff = dmp.diff_main(s1, s2);
  dmp.diff_cleanupSemantic(diff);

  let result: JSX.Element[] = [];
  let skipNext = false;

  diff.forEach((part: [number, string], index: number) => {
    if (skipNext) {
      skipNext = false;
      return;
    }

    const nextPart = diff[index + 1];

    if (part[0] === DIFF_INSERT) {
      if (nextPart && nextPart[0] === DIFF_DELETE) {
        result.push(
          <ChunkUpdate
            key={index}
            insertContent={part[1]}
            deleteContent={nextPart[1]}
          />
        );
        skipNext = true;
      } else {
        result.push(<ChunkInsert key={index} content={part[1]} />);
      }
    } else if (part[0] === DIFF_DELETE) {
      if (nextPart && nextPart[0] === DIFF_INSERT) {
        result.push(
          <ChunkUpdate
            key={index}
            insertContent={nextPart[1]}
            deleteContent={part[1]}
          />
        );
        skipNext = true;
      } else {
        result.push(<ChunkDelete key={index} content={part[1]} />);
      }
    } else if (part[0] === DIFF_EQUAL) {
      result.push(<ChunkEqual key={index} content={part[1]} />);
    }
  });
  return result;
};
