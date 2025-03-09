import TokenizeBox from "@/components/tokenize/TokenizeBox";

import JobFrame from "@/shared/JobFrame";

export default function Tokenize() {
  return (
    <JobFrame
      link=""
      pageNumber=""
      title="Tokenize your outfit as NFT"
      description="Connect with one of our available wallet providers or create a new one."
    >
      <TokenizeBox />
    </JobFrame>
  );
}
