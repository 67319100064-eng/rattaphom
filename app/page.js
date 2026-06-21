
import Hero from "./components/Hero";


function Greeting({ name }) {
    return <h1>สวัสดีทุกคน, {name}</h1>
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
  const skills  = ["การขาย","การพูดคุย","กำลัง","ความหล่อ"];
  return(
    <Section className="py-20 px-8">
        <h2 className="">ทักษะ</h2>
        <div className="flex flex-wrap gap-3 ">
        {skills.map((skill)=> (
          <span key={skill}>{skill}</span>
        ))}
        </div>
    </Section>
  )
}
function About() {
  const About = ["สาขา เทคโนโลยีธุรกิจดิจิทัล"];
  return(
    <Section className="py-20 px-8">
        <h3 className="">ศึกษาอยู่ที่วิทยาลัยพณิชการธรบุรี</h3>
        <div className="flex flex-wrap gap-3">
        {About.map((About)=> (
          <span key={About}>{About}</span>
        ))}
        </div>
    </Section>
  )
}
export default function Home() {
  return (
    <main className="flex min-h-screen min-w-screen flex-col item-center justify-center gap-3 text-center">
       <Hero />
      <Greeting name="รัฐภูมิ กันภัย" />   
      <Greeting name="เอฟ" />    
      <Skills />
      <About />
      <Section title="เกี่ยวกับตัวฉัน">
          <p>ผมนายรัฐภูมิ กันภัยเป็นชอบพูดถ้ายิ่งรู้จักจะพูดไม่หยุด</p>
      </Section>
             <Section title="ระดับการศึกษา">
          <p>ป.ตรี</p>
      </Section>

    </main>
  );
}