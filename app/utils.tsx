import { ChunkDelete } from "@/components/ChunkDelete";
import { ChunkEqual } from "@/components/ChunkEqual";
import { ChunkInsert } from "@/components/ChunkInsert";
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
  diff.forEach((part: [number, string], index: number) => {
    if (part[0] === DIFF_INSERT) {
      result.push(<ChunkInsert key={index} content={part[1]} />);
    } else if (part[0] === DIFF_DELETE) {
      result.push(<ChunkDelete key={index} content={part[1]} />);
    } else if (part[0] === DIFF_EQUAL) {
      result.push(<ChunkEqual key={index} content={part[1]} />);
    }
  });
  return result;
};
