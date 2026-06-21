// app/page.js
import Hero from "./components/Hero";

function Greeting({ name }) {
    return <h1>Hello, {name}</h1>
}

function Section({ title, children }) {
  return (
    <section className="py-20 px-8">
      <h2 className="text-4xl font-bold mb-8">{title}</h2>
      {children}
    </section>
  );
}
function Skills() {
  const skills = ["Frontend","Backend"];
  return(
    <Section className="py-20 px-8">
        <h2 className="">ทักษะ</h2>
        <div className="flex flex-wrap gap-3">
        {skills.map((skill)=> (
          <span key={skill}>{skill}</span>
        ))}
        </div>
    </Section>
  )
}
export default function Home() {
  return (
    <main>
      <Skills />
      <Hero />
      <Greeting name="อนุวัฒน์" />   
      <Greeting name="สมชาย" />     
      <Greeting name="อนุ" />
       <Hero />  
      <Section title="เกี่นวกับตัวฉัน">
          <p>ผมเป็นนักศึกษา...</p>
      </Section>
       <Section title="ระดับการศึกษา">
          <p>ป.ตรี</p>
      </Section>
    </main>
  );
}