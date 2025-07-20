import { useState } from "react";
import TagSection from "../components/TagSection";
import SearchByTagResult from "../components/SearchByTagResult";

const TagExplorer = () => {
  const [selectedTag, setSelectedTag] = useState(null);

  return (
    <div className="w-11/12 mx-auto">
      <TagSection onTagClick={setSelectedTag} />
      <SearchByTagResult selectedTag={selectedTag} />
    </div>
  );
};

export default TagExplorer;
