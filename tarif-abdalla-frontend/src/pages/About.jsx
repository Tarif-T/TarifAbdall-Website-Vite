const skillGroups = [
  "Electronic engineering foundations",
  "Multimedia and broadcast production",
  "Audio visual communication",
  "Digital marketing certificate perspective",
  "React and modern frontend delivery",
  "Node.js, Express, and MongoDB",
  "Authentication and protected workflows",
  "AI, machine learning, and software engineering",
];

const journeySteps = [
  {
    title: "Electronic Engineering",
    description:
      "My early foundation came from electronic engineering, where I developed analytical thinking, comfort with technical systems, and a strong respect for disciplined problem solving.",
  },
  {
    title: "Multimedia, Audio Visual, and Broadcasting",
    description:
      "From there I moved into multimedia, audio visual, and broadcasting environments. That experience strengthened my understanding of presentation, timing, storytelling, and how people actually receive information.",
  },
  {
    title: "Digital Marketing",
    description:
      "Earning a digital marketing certificate added an audience and strategy lens. It trained me to think not only about building something functional, but also about visibility, engagement, and communication impact.",
  },
  {
    title: "AI and Software Engineering",
    description:
      "Today I bring those layers together in AI and software engineering: technical depth from engineering, presentation awareness from media work, and user-facing strategy from marketing.",
  },
];

const studioPrinciples = [
  { title: "Signal", description: "Technical clarity and systems logic." },
  { title: "Frame", description: "Visual composition and presentation awareness." },
  { title: "Audience", description: "Marketing and communication perspective." },
  { title: "Build", description: "AI workflows and software execution." },
];

// Renders the background narrative, principles, and skill focus areas.
export default function About() {
  return (
    <div className="container">
      <section className="section-card about-panel">
        <p className="eyebrow">About Me</p>
        <div className="about-intro-grid">
          <div>
            <h1>A multidisciplinary path shaping how I build software today.</h1>
            <p className="section-lead">
              I’m Tarif Abdalla, a multidisciplinary builder working at the intersection of software, AI, digital marketing, and creative media. My work combines an engineering mindset with communication and product thinking to create solutions that are practical, scalable, and user-focused.
              Recently, I’ve been focused on projects that move beyond presentation and into systems design: from AI-powered retrieval and knowledge tools to content automation platforms that help creators and businesses turn long-form material into usable digital assets faster. That direction reflects a broader shift in my work toward building products that connect technical architecture, business value, and audience experience.
              My background in electronic engineering, multimedia, and marketing helps me approach each project from multiple angles. I care about clear structure, smart workflows, strong presentation, and tools that solve real problems for users and teams.
            </p>
          </div>

          <aside className="about-accent-card">
            <p className="footer-label">Creative System</p>
            <p>
              I like work that feels engineered and composed at the same time: clear underneath,
              expressive on the surface, and purposeful in how it reaches people.
            </p>

            <div className="principle-grid">
              {studioPrinciples.map((principle) => (
                <article key={principle.title} className="principle-card">
                  <strong>{principle.title}</strong>
                  <span>{principle.description}</span>
                </article>
              ))}
            </div>
          </aside>
        </div>

        <div className="two-column-layout">
          <div className="narrative-stack">
            {journeySteps.map((step) => (
              <article key={step.title} className="timeline-card">
                <p className="footer-label">{step.title}</p>
                <p>{step.description}</p>
              </article>
            ))}
          </div>

          <aside className="skill-panel">
            <p className="footer-label">Working Areas</p>
            <div className="skill-cloud">
              {skillGroups.map((skill) => (
                <span key={skill} className="skill-pill">
                  {skill}
                </span>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
