import React from "react";
import Banner from "../../components/Banner";
import PostContainer from "../../components/PostContainer";
import TagSection from "../../components/TagSection";
import SearchResults from "../../components/SearchResults";
import FeaturedDiscussions from "../../components/FeaturedDiscussions";
import TopContributors from "../../components/TopContributors";
import TagExplorer from "../../components/TagExplorer";
import AnnouncementContainer from "../../components/AnnouncementContainer";

const Home = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16 space-y-8 bg-gray-100">
      <Banner></Banner>
      <SearchResults></SearchResults>
      <div className="flex flex-col justify-between md:flex-row gap-2">
        <div className="w-full md:w-2/3">
          <PostContainer></PostContainer>
        </div>
        <div className="w-full md:w-1/3 pt-12">
          <AnnouncementContainer></AnnouncementContainer>
        </div>
      </div>
      <FeaturedDiscussions></FeaturedDiscussions>
      <TopContributors></TopContributors>
      <TagExplorer></TagExplorer>
    </div>
  );
};

export default Home;
