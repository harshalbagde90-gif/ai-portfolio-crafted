import { useInView } from "@/hooks/useInView";
import { Briefcase, GraduationCap } from "lucide-react";

const experiences = [
  {
    type: "work",
    title: "Web Agency — Client Projects",
    company: "Web Mantu",
    period: "2022 - Present",
    description: [
      "Delivered 20+ websites for clients across various industries",
      "Specialized in responsive and modern web applications",
      "Integrated AI capabilities into client projects",
      "Maintained 100% client satisfaction rate",
    ],
  },
  {
    type: "work",
    title: "Frontend Development",
    company: "Tech Startup",
    period: "2021 - 2022",
    description: [
      "Worked on front-end development using React",
      "Collaborated with design team for UI/UX implementation",
      "Participated in agile development processes",
    ],
  },
  {
    type: "education",
    title: "Bachelor of Computer Applications (BCA)",
    company: "University",
    period: "2020 - 2023",
    description: [
      "Focused on computer science fundamentals",
      "Specialized in web development and programming",
    ],
  },
];

export const ExperienceSection = () => {
  const { ref, isInView } = useInView();

  return (
    <section id="experience" className="py-24 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div
          className={`text-center max-w-2xl mx-auto mb-16 ${isInView ? "opacity-100 animate-fade-up" : "opacity-0"
            }`}
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Our Journey
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-4">
            Experience & <span className="text-gradient">Education</span>
          </h2>
          <p className="text-muted-foreground">
            A timeline of our professional growth and educational background.
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-[#D4A43A] to-primary transform md:-translate-x-1/2" />

            {experiences.map((exp, index) => (
              <div
                key={`${exp.title}-${index}`}
                className={`relative flex items-start gap-8 mb-12 ${isInView ? "opacity-100 animate-fade-up" : "opacity-0"
                  }`}
                style={{ animationDelay: `${0.2 + index * 0.15}s` }}
              >
                {/* Timeline Node */}
                <div
                  className={`absolute left-0 md:left-1/2 w-12 h-12 rounded-full glass flex items-center justify-center transform -translate-x-1/2 glow-sm z-10 ${index % 2 === 0 ? "md:-translate-x-1/2" : "md:-translate-x-1/2"
                    }`}
                >
                  {exp.type === "work" ? (
                    <Briefcase className="text-primary" size={20} />
                  ) : (
                    <GraduationCap className="text-[#D4A43A]" size={20} />
                  )}
                </div>

                {/* Content Card */}
                <div
                  className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${index % 2 === 0
                    ? "md:mr-auto md:pr-8 md:text-right"
                    : "md:ml-auto md:pl-8"
                    }`}
                >
                  <div className="p-6 rounded-2xl glass group hover:glow transition-all duration-300">
                    <span className="inline-block px-3 py-1 text-xs rounded-full bg-primary/10 text-primary mb-3">
                      {exp.period}
                    </span>
                    <h3 className="font-display text-lg font-semibold mb-1">
                      {exp.title}
                    </h3>
                    <p className="text-primary/80 text-sm mb-4">{exp.company}</p>
                    <ul
                      className={`space-y-2 ${index % 2 === 0 ? "md:text-right" : ""
                        }`}
                    >
                      {exp.description.map((item, i) => (
                        <li
                          key={i}
                          className={`text-muted-foreground text-sm flex items-start gap-2 ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                            }`}
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};