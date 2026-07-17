import SectionHeader from "@/components/SectionHeader";
import ExperienceChart from "@/components/ExperienceChart";

export default function Experience() {
  return (
    <section id="work-experience" className="relative px-4 md:px-8 py-20 md:py-28">
      <div className="max-w-7xl mx-auto">

        <div className="[&_span]:text-sm [&_span]:md:text-xl">
          <SectionHeader
            index="02"
            label="Trade History"
            title="$Work Experience"
            subtitle=""
          />
        </div>
        <ExperienceChart />
      </div>
    </section>
  );
}
