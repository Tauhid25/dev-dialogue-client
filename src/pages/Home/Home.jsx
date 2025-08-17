import React from "react";
import Banner from "../../components/Banner";
import PostContainer from "../../components/PostContainer";
import TagSection from "../../components/TagSection";
import SearchResults from "../../components/SearchResults";
import FeaturedDiscussions from "../../components/FeaturedDiscussions";
import TopContributors from "../../components/TopContributors";
import TagExplorer from "../../components/TagExplorer";
import AnnouncementContainer from "../../components/AnnouncementContainer";
import Testimonials from "../../components/Testimonials";
import Overview from "../../components/Overview";
import Newsletter from "../../components/Newsletter";
import FAQ from "../../components/FAQ";

const Home = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16 space-y-8 bg-blue-50">
      <Banner></Banner>
      <SearchResults></SearchResults>
      <PostContainer></PostContainer>
      <AnnouncementContainer></AnnouncementContainer>
      <FeaturedDiscussions></FeaturedDiscussions>
      <TopContributors></TopContributors>
      <Overview></Overview>
      <Testimonials></Testimonials>
      <FAQ></FAQ>
      <Newsletter></Newsletter>
      <TagExplorer></TagExplorer>
    </div>
  );
};

export default Home;
