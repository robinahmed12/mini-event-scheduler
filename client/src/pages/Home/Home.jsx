import React from "react";
import KeyFeatures from "../Landing/KeyFeatures";
import Banner from "../Landing/Banner";
import About from "../Landing/About";
import TestimonialSection from "../Landing/TestimonialSection";
import Section from "../../components/Section/Section";
import { useEffect } from "react";

const Home = () => {

  return (

    useEffect(()=> {
      document.title = "Home"
    }),
    <>
      <div className="pt-20">
        <Section>
          <Banner />
        </Section>

        <Section>
          <KeyFeatures />
        </Section>
        <Section>
          <About />
        </Section>
        <Section>
          <TestimonialSection />
        </Section>
      </div>
    </>
  );
};

export default Home;
