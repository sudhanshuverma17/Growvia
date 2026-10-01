import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const banksDir = path.resolve(__dirname, "../config/stage2-banks");

function saveBank(domain, obj) {
  const p = path.join(banksDir, `${domain}.js`);
  fs.writeFileSync(p, `export default ${JSON.stringify(obj, null, 2)};\n`, "utf8");
  console.log(`Saved ${domain}.js`);
}

// ============================================================================
// 1. Education & Social Impact (education_social)
// ============================================================================
const education_social = {
  domain: "education_social",
  questions: [
    {
      id: "edu_q1",
      text: "Many students in a rural village drop out of school before grade ten. What is your intervention?",
      blendCore: true,
      options: [
        { id: "edu_q1_opt1", text: "Conduct engaging, creative classroom lessons that make foundational concepts exciting and easy.", weights: { teacher: 3, "ed-tech": 1 }, reason: "Interactive classroom pedagogy directly represents foundational teaching." },
        { id: "edu_q1_opt2", text: "Deploy interactive solar-powered tablet learning apps loaded with gamified regional language tutorials.", weights: { "ed-tech": 3, teacher: 1 }, reason: "Solar tablet learning apps and gamified tutorials exemplify educational technology." },
        { id: "edu_q1_opt3", text: "Visit families personally to understand financial hardships and arrange community scholarship aid.", weights: { "social-worker": 3, "civil-services": 1 }, reason: "Grassroots family visits and community scholarship aid reflect social work outreach." },
        { id: "edu_q1_opt4", text: "Design remedial classroom tutoring clinics ensuring slow learners catch up in reading.", weights: { teacher: 3, "social-worker": 1 }, reason: "Remedial reading instruction and learning clinic support represent foundational teaching." },
        { id: "edu_q1_opt5", text: "Provide supportive counseling for students facing anxiety, low self-esteem, or family distress.", weights: { psychologist: 3, "social-worker": 1 }, reason: "Student anxiety and trauma counseling represents school psychological support." },
        { id: "edu_q1_opt6", text: "Coordinate with district education officers to build safe roads and school midday meal programs.", weights: { "civil-services": 3, "social-worker": 1 }, reason: "District government coordination for infrastructure and midday meals is public administration." }
      ]
    },
    {
      id: "edu_q2",
      text: "Your school wants to establish a community outreach center. Which initiative do you manage?",
      blendCore: true,
      options: [
        { id: "edu_q2_opt1", text: "An evening literacy and mathematics tutoring clinic for neighborhood children and workers.", weights: { teacher: 3, "social-worker": 1 }, reason: "Evening literacy tutoring clinics directly involve teaching foundational academics." },
        { id: "edu_q2_opt2", text: "A digital makerspace teaching students computer literacy, animation, and digital storytelling tools.", weights: { "ed-tech": 3, "content-creator": 1 }, reason: "Computer literacy makerspaces and digital tools are core educational technology." },
        { id: "edu_q2_opt3", text: "A community welfare helpdesk connecting struggling families with healthcare and food subsidies.", weights: { "social-worker": 3, teacher: 1 }, reason: "Connecting impoverished families to subsidies and welfare is community social work." },
        { id: "edu_q2_opt4", text: "Develop open-source digital study guides accessible on basic family smartphones.", weights: { "ed-tech": 3, teacher: 1 }, reason: "Developing accessible smartphone-compatible learning software represents educational technology." },
        { id: "edu_q2_opt5", text: "A youth sports and calisthenics playground fostering teamwork, active habits, and confidence.", weights: { "fitness-trainer": 3, teacher: 1 }, reason: "Youth calisthenics and sports teamwork coaching embody fitness training." },
        { id: "edu_q2_opt6", text: "A youth vocational guidance desk matching unemployed teenagers with ethical local apprenticeships.", weights: { "human-resources": 3, "social-worker": 1 }, reason: "Matching candidates with apprenticeships and managing talent pathways is human resources." }
      ]
    },
    {
      id: "edu_q3",
      text: "A new educational reform is being drafted for secondary schools. What is your priority?",
      blendCore: true,
      options: [
        { id: "edu_q3_opt1", text: "Empower teachers with modern pedagogy training and supportive classroom teaching resources.", weights: { teacher: 3, "ed-tech": 1 }, reason: "Pedagogy training and classroom teaching resources directly develop teachers." },
        { id: "edu_q3_opt2", text: "Build adaptive online learning platforms that let every student learn at their own pace.", weights: { "ed-tech": 3, teacher: 1 }, reason: "Adaptive personalized online learning platforms represent educational technology." },
        { id: "edu_q3_opt3", text: "Mandate equal educational access, inclusive ramps, and special assistance for disabled students.", weights: { "social-worker": 3, "civil-services": 1 }, reason: "Advocating for disability access and marginalized student rights is social advocacy work." },
        { id: "edu_q3_opt4", text: "Organize grassroots parent-teacher community councils ensuring marginalized families have a voice.", weights: { "social-worker": 3, teacher: 1 }, reason: "Building community parent councils for educational inclusion is social work advocacy." },
        { id: "edu_q3_opt5", text: "Publish widely shared explainer videos breaking down complex educational concepts for free.", weights: { "content-creator": 3, "ed-tech": 1 }, reason: "Explainer video production democratizing concepts is digital educational content creation." },
        { id: "edu_q3_opt6", text: "Investigate and report on disparities in regional school infrastructure across districts.", weights: { journalist: 3, "social-worker": 1 }, reason: "Reporting community educational disparities in news publications is investigative journalism." }
      ]
    },
    {
      id: "edu_q4",
      text: "During a flood emergency, an informal school is set up in a relief shelter. How do you help?",
      blendCore: true,
      options: [
        { id: "edu_q4_opt1", text: "Gather children into joyful learning circles using storytelling, songs, and paper crafts.", weights: { teacher: 3, "social-worker": 1 }, reason: "Storytelling and creative learning circles engage early childhood classroom teaching." },
        { id: "edu_q4_opt2", text: "Distribute offline audio-visual learning kits so displaced children don't lose academic momentum.", weights: { "ed-tech": 3, teacher: 1 }, reason: "Offline audio-visual hardware and software educational kits embody ed-tech solutions." },
        { id: "edu_q4_opt3", text: "Ensure unaccompanied children are safe, fed, reunited with guardians, and emotionally protected.", weights: { "social-worker": 3, psychologist: 1 }, reason: "Child protection, family reunification, and crisis welfare are fundamental social work duties." },
        { id: "edu_q4_opt4", text: "Introduce full-time school mental health counselors to eliminate teenage exam depression.", weights: { psychologist: 3, teacher: 1 }, reason: "Treating adolescent exam depression through counseling is clinical psychology." },
        { id: "edu_q4_opt5", text: "Organize energizing morning stretch routines and fun physical team games to lift spirits.", weights: { "fitness-trainer": 3, teacher: 1 }, reason: "Leading physical mobility, group stretches, and team games represents fitness coaching." },
        { id: "edu_q4_opt6", text: "Manage volunteer teams and deploy qualified mentors across different shelter camps efficiently.", weights: { "human-resources": 3, "social-worker": 1 }, reason: "Volunteer recruitment, team allocation, and mentor deployment represent human resource management." }
      ]
    },
    {
      id: "edu_q5",
      text: "You are given a philanthropic grant to create lasting social impact. What do you fund?",
      blendCore: false,
      options: [
        { id: "edu_q5_opt1", text: "A fellowship program providing high-quality teachers to under-resourced municipal public schools.", weights: { teacher: 3, "social-worker": 1 }, reason: "Funding teaching fellowships directly places educators in classrooms." },
        { id: "edu_q5_opt2", text: "An open-source AI tutoring platform that provides personalized interactive feedback to millions.", weights: { "ed-tech": 3, "content-creator": 1 }, reason: "Open-source AI tutoring platforms represent advanced educational technology." },
        { id: "edu_q5_opt3", text: "A grassroots social empowerment network eradicating child labor and uplifting street children.", weights: { "social-worker": 3, "civil-services": 1 }, reason: "Grassroots rehabilitation networks eradicating child labor represent community social work." },
        { id: "edu_q5_opt4", text: "Subsidized mental wellness clinics providing therapy for low-income stressed communities.", weights: { psychologist: 3, "social-worker": 1 }, reason: "Community mental health therapy clinics embody professional psychology practice." },
        { id: "edu_q5_opt5", text: "A massive public educational YouTube channel offering world-class science tutorials freely.", weights: { "content-creator": 3, "ed-tech": 1 }, reason: "Building an educational streaming video channel is digital content creation." },
        { id: "edu_q5_opt6", text: "A fair workplace hiring cooperative connecting disadvantaged rural youth with formal jobs.", weights: { "human-resources": 3, "social-worker": 1 }, reason: "Workplace placement and ethical youth employment matchmaking are core HR responsibilities." }
      ]
    },
    {
      id: "edu_q6",
      text: "When working with young people from difficult backgrounds, what is your approach?",
      blendCore: false,
      options: [
        { id: "edu_q6_opt1", text: "Patiently unlock their intellectual curiosity and prove to them that they can master anything.", weights: { teacher: 3, psychologist: 1 }, reason: "Cultivating academic curiosity and intellectual confidence is the essence of teaching." },
        { id: "edu_q6_opt2", text: "Provide interactive digital simulation games where they build confidence through trial and error.", weights: { "ed-tech": 3, teacher: 1 }, reason: "Interactive simulation software and educational gaming belong to ed-tech development." },
        { id: "edu_q6_opt3", text: "Protect their dignity, stand beside them through crises, and fight for their rights.", weights: { "social-worker": 3, "civil-services": 1 }, reason: "Crisis defense, dignity protection, and human rights advocacy define social work." },
        { id: "edu_q6_opt4", text: "Channel their restless energy into athletic training discipline and sports teamwork.", weights: { "fitness-trainer": 3, teacher: 1 }, reason: "Directing energy into sports discipline and athletic training represents fitness training." },
        { id: "edu_q6_opt5", text: "Investigate and document the systemic social hardships they face to inform policy changes.", weights: { journalist: 3, "social-worker": 1 }, reason: "Documentary investigation of systemic social injustices constitutes investigative journalism." },
        { id: "edu_q6_opt6", text: "Implement district government welfare schemes ensuring their families receive dry food rations.", weights: { "civil-services": 3, "social-worker": 1 }, reason: "Implementing official government welfare distribution is administrative civil service." }
      ]
    },
    {
      id: "edu_q7",
      text: "Which lifetime achievement would bring you the greatest sense of purpose and pride?",
      blendCore: false,
      options: [
        { id: "edu_q7_opt1", text: "Hearing from a former struggling student that your belief in them transformed their life.", weights: { teacher: 3, "social-worker": 1 }, reason: "Transforming individual student lives through educational guidance is the teacher's legacy." },
        { id: "edu_q7_opt2", text: "Building an educational technology ecosystem that democratized learning for ten million children.", weights: { "ed-tech": 3, teacher: 1 }, reason: "Democratizing education at scale via digital platforms is the ed-tech milestone." },
        { id: "edu_q7_opt3", text: "Rescuing vulnerable communities from exploitation and seeing them become self-reliant champions.", weights: { "social-worker": 3, "civil-services": 1 }, reason: "Uplifting marginalized communities to self-reliance is the social worker's ultimate goal." },
        { id: "edu_q7_opt4", text: "Healing deep childhood emotional trauma and guiding people toward peaceful, joyful lives.", weights: { psychologist: 3, "social-worker": 1 }, reason: "Resolving psychological trauma to restore well-being defines clinical psychology." },
        { id: "edu_q7_opt5", text: "Coaching young athletes from humble villages until they win medals on international podiums.", weights: { "fitness-trainer": 3, teacher: 1 }, reason: "Developing grassroots athletes into international champions is the fitness coach's dream." },
        { id: "edu_q7_opt6", text: "Broadcast accurate news bulletins so displaced families hear vital aid distribution updates.", weights: { journalist: 3, "social-worker": 1 }, reason: "Broadcasting verified public interest news bulletins represents humanitarian journalism." }
      ]
    }
  ]
};
saveBank("education_social", education_social);

// ============================================================================
// 2. Law & Governance (law_gov)
// ============================================================================
const law_gov = {
  domain: "law_gov",
  questions: [
    {
      id: "law_q1",
      text: "A public controversy arises over a newly introduced town regulation. Where do you step in?",
      blendCore: true,
      options: [
        { id: "law_q1_opt1", text: "Analyze constitutional legal validity and file a petition defending citizen civil rights.", weights: { lawyer: 3, journalist: 1 }, reason: "Filing constitutional petitions defending citizen rights is legal advocacy." },
        { id: "law_q1_opt2", text: "Coordinate district administrative departments to implement policy adjustments fairly and smoothly.", weights: { "civil-services": 3, lawyer: 1 }, reason: "Coordinating district executive departments to implement policy is administrative civil service." },
        { id: "law_q1_opt3", text: "Maintain public peace and deploy disciplined security protocols to prevent street clashes.", weights: { "army-officer": 3, "civil-services": 1 }, reason: "Deploying disciplined security detachments to preserve civil order represents military leadership." },
        { id: "law_q1_opt4", text: "Provide pro-bono legal counsel to community groups seeking formal regulatory exemptions.", weights: { lawyer: 3, "social-worker": 1 }, reason: "Offering pro-bono legal counsel to citizens represents professional legal practice." },
        { id: "law_q1_opt5", text: "Investigate official documents and publish an impartial news report exposing administrative oversights.", weights: { journalist: 3, lawyer: 1 }, reason: "Investigating administrative documents to report facts to the public is journalism." },
        { id: "law_q1_opt6", text: "Draft clear, empathetic public government statements addressing community worries and clarifying misunderstandings.", weights: { "public-relations": 3, "civil-services": 1 }, reason: "Drafting official press statements and reassuring the public is strategic communication." }
      ]
    },
    {
      id: "law_q2",
      text: "During a national emergency relief operation, which leadership role do you instinctively take?",
      blendCore: true,
      options: [
        { id: "law_q2_opt1", text: "Ensure emergency executive decrees comply with legal human rights safeguards and protections.", weights: { lawyer: 3, "civil-services": 1 }, reason: "Verifying emergency decrees against constitutional human rights safeguards is legal counsel." },
        { id: "law_q2_opt2", text: "Direct inter-state disaster aid funds and supervise district administrative supply logistics.", weights: { "civil-services": 3, "army-officer": 1 }, reason: "Directing inter-state disaster aid funds and administrative logistics is civil service governance." },
        { id: "law_q2_opt3", text: "Lead rescue teams into treacherous disaster zones with disciplined courage and tactical precision.", weights: { "army-officer": 3, "civil-services": 1 }, reason: "Leading tactical rescue missions into dangerous disaster terrain defines military leadership." },
        { id: "law_q2_opt4", text: "Supervise emergency district revenue distribution ensuring rapid relief reaches affected families.", weights: { "civil-services": 3, "social-worker": 1 }, reason: "Directing district revenue distribution and relief delivery is civil administrative duty." },
        { id: "law_q2_opt5", text: "Pilot heavy cargo aircraft delivering medical supplies directly into inaccessible flood zones.", weights: { pilot: 3, "army-officer": 1 }, reason: "Flying humanitarian heavy cargo transport into inaccessible zones is professional aviation." },
        { id: "law_q2_opt6", text: "Conduct civic workshops teaching youth about disaster preparedness and citizen mutual responsibilities.", weights: { teacher: 3, "civil-services": 1 }, reason: "Conducting civic education workshops teaching youth responsibility is teaching." }
      ]
    },
    {
      id: "law_q3",
      text: "You are invited to lead a prestigious civic reform committee. What is your priority?",
      blendCore: true,
      options: [
        { id: "law_q3_opt1", text: "Draft legislation that guarantees free and speedy courtroom legal aid for impoverished families.", weights: { lawyer: 3, "social-worker": 1 }, reason: "Drafting statutory courtroom legal aid legislation is legislative legal practice." },
        { id: "law_q3_opt2", text: "Streamline government welfare schemes so subsidies reach rural beneficiaries without bureaucratic corruption.", weights: { "civil-services": 3, lawyer: 1 }, reason: "Streamlining welfare subsidy delivery and combating corruption is civil service reform." },
        { id: "law_q3_opt3", text: "Modernize national border infrastructure defenses and veteran welfare healthcare assistance systems.", weights: { "army-officer": 3, "civil-services": 1 }, reason: "Upgrading border defenses and veteran welfare infrastructure represents military command." },
        { id: "law_q3_opt4", text: "Establish rapid-response defense communication networks linking border posts with regional headquarters.", weights: { "army-officer": 3, "civil-services": 1 }, reason: "Coordinating rapid defense tactical communication networks is military defense command." },
        { id: "law_q3_opt5", text: "Organize peaceful grassroots citizen meetings to ensure vulnerable voices are heard directly.", weights: { "social-worker": 3, lawyer: 1 }, reason: "Mobilizing grassroots civic meetings for vulnerable citizen inclusion is social work advocacy." },
        { id: "law_q3_opt6", text: "Manage diplomatic delegation staff talent, cultural orientation, and ethical workplace conduct.", weights: { "human-resources": 3, "civil-services": 1 }, reason: "Managing diplomatic delegation talent and workplace conduct is human resources." }
      ]
    },
    {
      id: "law_q4",
      text: "An international youth diplomacy delegation is selecting ambassadors. Which post inspires you?",
      blendCore: true,
      options: [
        { id: "law_q4_opt1", text: "Argue international maritime border treaties and resolve cross-border trade arbitration disputes.", weights: { lawyer: 3, "civil-services": 1 }, reason: "Arguing maritime treaties and cross-border commercial arbitration is international law." },
        { id: "law_q4_opt2", text: "Serve as diplomatic foreign service officer representing national interests in global summits.", weights: { "civil-services": 3, lawyer: 1 }, reason: "Representing sovereign policy interests at diplomatic summits is foreign civil service." },
        { id: "law_q4_opt3", text: "Coordinate international peacekeeping defense missions and joint anti-terrorism security drills.", weights: { "army-officer": 3, "civil-services": 1 }, reason: "Directing multinational peacekeeping detachments and security drills is armed forces leadership." },
        { id: "law_q4_opt4", text: "Establish transparent investigative journalism protections that safeguard whistleblowers against intimidation.", weights: { journalist: 3, lawyer: 1 }, reason: "Advocating for investigative reporter protections and whistleblower safety is journalism defense." },
        { id: "law_q4_opt5", text: "Fly international diplomatic transport missions across complex trans-continental airspace routes.", weights: { pilot: 3, "army-officer": 1 }, reason: "Flying international diplomatic transport across global airspace routes is aviation command." },
        { id: "law_q4_opt6", text: "Create nationwide public awareness campaigns informing citizens about their legal rights.", weights: { "public-relations": 3, lawyer: 1 }, reason: "Conducting civic public awareness campaigns informing citizens of rights is public relations." }
      ]
    },
    {
      id: "law_q5",
      text: "A whistleblower reports illegal toxic waste disposal by a powerful corporation. What do you do?",
      blendCore: false,
      options: [
        { id: "law_q5_opt1", text: "Build a watertight courtroom prosecution case demanding strict penalties and environmental compensation.", weights: { lawyer: 3, "civil-services": 1 }, reason: "Building watertight courtroom environmental prosecution cases is legal litigation." },
        { id: "law_q5_opt2", text: "Issue emergency regulatory shutdown notices and order immediate environmental department investigations.", weights: { "civil-services": 3, lawyer: 1 }, reason: "Issuing administrative shutdown orders and dispatching inspectors is civil service authority." },
        { id: "law_q5_opt3", text: "Seal off the hazardous contamination perimeter and enforce strict civilian access bans.", weights: { "army-officer": 3, "civil-services": 1 }, reason: "Securing hazardous perimeters and enforcing emergency exclusion zones is military security." },
        { id: "law_q5_opt4", text: "Expose corporate wrongdoing on the front page of national news with verified documents.", weights: { journalist: 3, lawyer: 1 }, reason: "Publishing front-page national investigative exposés with evidence is journalism." },
        { id: "law_q5_opt5", text: "Manage crisis communications so affected residents receive verified health advisories without panic.", weights: { "public-relations": 3, "civil-services": 1 }, reason: "Disseminating official crisis health advisories to calm panic is public communications." },
        { id: "law_q5_opt6", text: "Provide emergency food and legal aid to families living downstream from toxic dumps.", weights: { "social-worker": 3, lawyer: 1 }, reason: "Direct community relief delivery and grassroots legal aid coordination is social work." }
      ]
    },
    {
      id: "law_q6",
      text: "Which governance milestone would bring you the greatest feeling of lifetime service?",
      blendCore: false,
      options: [
        { id: "law_q6_opt1", text: "Securing a landmark constitutional verdict that protects basic fundamental human dignity forever.", weights: { lawyer: 3, "civil-services": 1 }, reason: "Winning landmark constitutional human dignity verdicts is the lawyer's pinnacle." },
        { id: "law_q6_opt2", text: "Transforming an impoverished rural district into a flourishing model of healthcare and education.", weights: { "civil-services": 3, "army-officer": 1 }, reason: "Transforming an entire district's socio-economic development is civil service governance." },
        { id: "law_q6_opt3", text: "Leading troops bravely in defense of the homeland and keeping millions safe from harm.", weights: { "army-officer": 3, "civil-services": 1 }, reason: "Protecting sovereign borders and civilian life through brave command is military duty." },
        { id: "law_q6_opt4", text: "Commanding international humanitarian evacuation flights rescuing stranded citizens from war zones.", weights: { pilot: 3, "army-officer": 1 }, reason: "Commanding hazardous international evacuation airlift operations is aviation command." },
        { id: "law_q6_opt5", text: "Mentoring thousands of future civil leaders, judges, and public servants throughout your career.", weights: { teacher: 3, "civil-services": 1 }, reason: "Educating and mentoring future judges, diplomats, and civic leaders is teaching." },
        { id: "law_q6_opt6", text: "Cultivating an ethical, transparent civil service workplace free from corruption and favoritism.", weights: { "human-resources": 3, "civil-services": 1 }, reason: "Building corruption-free, meritorious institutional workplace cultures is human resources." }
      ]
    },
    {
      id: "law_q7",
      text: "If you taught a high school civics masterclass, what core value would you instill?",
      blendCore: false,
      options: [
        { id: "law_q7_opt1", text: "The courage to defend truth, uphold constitutional equality, and fight injustice everywhere.", weights: { lawyer: 3, "civil-services": 1 }, reason: "Instilling constitutional defense of equality and truth represents legal ethics." },
        { id: "law_q7_opt2", text: "Dedication to selfless public administrative duty and impartial service to every citizen.", weights: { "civil-services": 3, lawyer: 1 }, reason: "Impartial, selfless public administration for all citizens represents civil services." },
        { id: "law_q7_opt3", text: "Unwavering discipline, physical stamina, and selfless duty in defense of our nation.", weights: { "army-officer": 3, "civil-services": 1 }, reason: "Discipline, physical stamina, and patriotic duty in national defense define military honor." },
        { id: "law_q7_opt4", text: "Relentless curiosity to question authority, expose wrongdoing, and defend democratic freedom.", weights: { journalist: 3, lawyer: 1 }, reason: "Questioning power and investigating wrongdoing to safeguard democracy is journalism." },
        { id: "law_q7_opt5", text: "Clear, honest public communication that bridges societal divides and builds trust.", weights: { "public-relations": 3, "civil-services": 1 }, reason: "Bridging societal divides through transparent public communication is public relations." },
        { id: "law_q7_opt6", text: "Empathy for the marginalized and active commitment to uplifting the disadvantaged.", weights: { "social-worker": 3, "civil-services": 1 }, reason: "Empowering marginalized populations with compassionate advocacy defines social work." }
      ]
    }
  ]
};
saveBank("law_gov", law_gov);

// ============================================================================
// 3. Aviation & Hospitality (aviation_hospitality)
// ============================================================================
const aviation_hospitality = {
  domain: "aviation_hospitality",
  questions: [
    {
      id: "av_q1",
      text: "A mega international sports summit is being hosted in your state. Where do you take charge?",
      blendCore: true,
      options: [
        { id: "av_q1_opt1", text: "Captain special chartered airliners flying international sports delegations safely through all weather.", weights: { pilot: 3, "hotel-management": 1 }, reason: "Piloting commercial charter flights navigating diverse weather represents airline aviation." },
        { id: "av_q1_opt2", text: "Direct grand hotel banquets, luxury accommodations, and five-star culinary hospitality for guests.", weights: { "hotel-management": 3, "event-manager": 1 }, reason: "Managing luxury banqueting and premium guest accommodations is hotel management." },
        { id: "av_q1_opt3", text: "Choreograph the breathtaking stadium opening ceremony, synchronized lights, and stage fireworks.", weights: { "event-manager": 3, "hotel-management": 1 }, reason: "Directing large-scale stadium opening ceremonies and entertainment is event management." },
        { id: "av_q1_opt4", text: "Ensure regional flight schedules and landing slot allocations operate with zero delays.", weights: { pilot: 3, "supply-chain": 1 }, reason: "Managing flight timing slots and aviation schedule precision represents airline operations." },
        { id: "av_q1_opt5", text: "Enforce strict VIP convoy perimeter security and coordinate defense escort protocols smoothly.", weights: { "army-officer": 3, pilot: 1 }, reason: "VIP security cordons and tactical convoy escorts represent defense leadership." },
        { id: "av_q1_opt6", text: "Manage airport baggage handling and high-speed ground transportation fleets across the city.", weights: { "supply-chain": 3, "hotel-management": 1 }, reason: "Managing luggage logistics and multi-modal transit fleets is supply chain management." }
      ]
    },
    {
      id: "av_q2",
      text: "During peak holiday travel, severe fog grounds dozens of flights. How do you respond?",
      blendCore: true,
      options: [
        { id: "av_q2_opt1", text: "Navigate complex runway instrument landing systems with calm airmanship and precision focus.", weights: { pilot: 3, "hotel-management": 1 }, reason: "Instrument landing system approaches in low visibility define skilled piloting." },
        { id: "av_q2_opt2", text: "Provide immediate comfortable airport hotel suites, warm buffet meals, and compassionate guest care.", weights: { "hotel-management": 3, "event-manager": 1 }, reason: "Arranging emergency hotel rooms and compassionate guest care is hotel management." },
        { id: "av_q2_opt3", text: "Quickly set up engaging indoor lounge activities to keep anxious stranded families relaxed.", weights: { "event-manager": 3, "hotel-management": 1 }, reason: "Creating engaging interactive lounge entertainment under crisis is event management." },
        { id: "av_q2_opt4", text: "Transform airport conference suites into comfortable temporary rest lounges with hot beverages.", weights: { "hotel-management": 3, pilot: 1 }, reason: "Mobilizing banquet facilities and guest comfort stations is hotel management." },
        { id: "av_q2_opt5", text: "Inspect jet engine de-icing equipment and hydraulic flap mechanisms on the tarmac.", weights: { "mechanical-engineer": 3, pilot: 1 }, reason: "Inspecting aircraft turbine de-icing systems and hydraulics is mechanical engineering." },
        { id: "av_q2_opt6", text: "Direct press conferences and handle international television media broadcasts seamlessly.", weights: { "public-relations": 3, "event-manager": 1 }, reason: "Managing live press crisis conferences and airline public reputation is public relations." }
      ]
    },
    {
      id: "av_q3",
      text: "You are given complete creative and operational freedom over a resort. What do you introduce?",
      blendCore: true,
      options: [
        { id: "av_q3_opt1", text: "Scenic mountain seaplane tours offering guests breathtaking bird's-eye views of regional valleys.", weights: { pilot: 3, "hotel-management": 1 }, reason: "Operating scenic tourist seaplane excursions represents commercial aviation." },
        { id: "av_q3_opt2", text: "An eco-friendly luxury heritage palace celebrating authentic royal traditions and fine dining.", weights: { "hotel-management": 3, "event-manager": 1 }, reason: "Developing luxury heritage palace hospitality and fine dining is hotel management." },
        { id: "av_q3_opt3", text: "A world-renowned annual music and arts festival drawing celebrated creators from worldwide.", weights: { "event-manager": 3, "hotel-management": 1 }, reason: "Curating international music festivals and performing arts experiences is event management." },
        { id: "av_q3_opt4", text: "Design thrilling aerial acrobatic stunt shows and hot air balloon sunrise flights.", weights: { "event-manager": 3, pilot: 1 }, reason: "Producing aerial stunt spectacles and public entertainment shows is event management." },
        { id: "av_q3_opt5", text: "A boutique experiential travel venture connecting travelers with unexplored tribal villages.", weights: { "startup-founder": 3, "hotel-management": 1 }, reason: "Launching novel experiential travel ventures and boutique startups is entrepreneurship." },
        { id: "av_q3_opt6", text: "A viral international tourism promotional campaign showcasing regional heritage to millions.", weights: { "marketing-manager": 3, "event-manager": 1 }, reason: "Running international destination marketing campaigns is marketing management." }
      ]
    },
    {
      id: "av_q4",
      text: "A luxury international cruise liner is launching its inaugural voyage. What do you oversee?",
      blendCore: true,
      options: [
        { id: "av_q4_opt1", text: "Navigate oceanic trans-ocean voyages safely using satellite maritime and aviation radar.", weights: { pilot: 3, "hotel-management": 1 }, reason: "Radar navigation and oceanic voyage route planning represent navigational command." },
        { id: "av_q4_opt2", text: "Supervise stateroom guest services, Michelin-style dining, and five-star hospitality operations.", weights: { "hotel-management": 3, "event-manager": 1 }, reason: "Supervising luxury stateroom hospitality and culinary services is hotel management." },
        { id: "av_q4_opt3", text: "Produce dazzling nightly Broadway-style theatrical productions and themed deck galas.", weights: { "event-manager": 3, "hotel-management": 1 }, reason: "Producing theatrical stage shows and themed gala banquets is event management." },
        { id: "av_q4_opt4", text: "An outdoor military adventure obstacle course teaching guests survival and leadership skills.", weights: { "army-officer": 3, "hotel-management": 1 }, reason: "Conducting military adventure obstacle courses and survival training is defense leadership." },
        { id: "av_q4_opt5", text: "Inspect maritime propulsion turbines and computerized stabilization fins in deep water.", weights: { "mechanical-engineer": 3, pilot: 1 }, reason: "Maintaining marine propulsion turbines and mechanical stabilizers is mechanical engineering." },
        { id: "av_q4_opt6", text: "Manage multi-continental food container provisioning and cold storage supply pipelines.", weights: { "supply-chain": 3, "hotel-management": 1 }, reason: "Global food supply logistics and container refrigeration pipelines define supply chain." }
      ]
    },
    {
      id: "av_q5",
      text: "Which career milestone in travel and hospitality would bring you greatest fulfillment?",
      blendCore: false,
      options: [
        { id: "av_q5_opt1", text: "Flying commercial airliners across polar routes connecting diverse cultures across continents.", weights: { pilot: 3, "hotel-management": 1 }, reason: "Logging long-haul international airline routes connecting cultures represents piloting." },
        { id: "av_q5_opt2", text: "Managing an iconic heritage hotel renowned globally for unmatched warmth and hospitality.", weights: { "hotel-management": 3, "event-manager": 1 }, reason: "Leading an iconic global heritage hotel defines hotel management excellence." },
        { id: "av_q5_opt3", text: "Planning global mega-expos and international conferences hosting heads of state smoothly.", weights: { "event-manager": 3, "hotel-management": 1 }, reason: "Executing international diplomatic mega-expos represents master event planning." },
        { id: "av_q5_opt4", text: "Coordinating rapid defense airlift operations delivering relief supplies to conflict zones.", weights: { "army-officer": 3, pilot: 1 }, reason: "Directing emergency tactical military airlifts defines armed forces leadership." },
        { id: "av_q5_opt5", text: "Building a global boutique hostel chain for adventurous solo youth backpackers.", weights: { "startup-founder": 3, "hotel-management": 1 }, reason: "Founding an innovative international hospitality chain is startup entrepreneurship." },
        { id: "av_q5_opt6", text: "Running digital brand campaigns that double international tourist arrivals for your region.", weights: { "marketing-manager": 3, "event-manager": 1 }, reason: "Executing regional tourism growth campaigns represents strategic brand marketing." }
      ]
    },
    {
      id: "av_q6",
      text: "When handling a high-pressure crisis during an event or journey, what is your strength?",
      blendCore: false,
      options: [
        { id: "av_q6_opt1", text: "Calmly executing emergency crosswind landings with hundreds of lives in your hands.", weights: { pilot: 3, "hotel-management": 1 }, reason: "Executing difficult crosswind landings under extreme pressure defines airline piloting." },
        { id: "av_q6_opt2", text: "Resolving sudden banquet kitchen crises so prestigious guests notice zero disruption.", weights: { "hotel-management": 3, "event-manager": 1 }, reason: "Crisis hospitality coordination ensuring seamless dining service is hotel management." },
        { id: "av_q6_opt3", text: "Handling live power outages during a live concert so performances resume in minutes.", weights: { "event-manager": 3, "hotel-management": 1 }, reason: "Solving live production emergencies during major concerts represents event direction." },
        { id: "av_q6_opt4", text: "Troubleshooting turbine vibration anomalies before flight takeoff with technical precision.", weights: { "mechanical-engineer": 3, pilot: 1 }, reason: "Diagnosing engine vibrations and aviation mechanical systems is mechanical engineering." },
        { id: "av_q6_opt5", text: "Rerouting critical supply trucks during nationwide border transport strikes seamlessly.", weights: { "supply-chain": 3, "hotel-management": 1 }, reason: "Rerouting transportation networks during logistics strikes is supply chain management." },
        { id: "av_q6_opt6", text: "Managing live press crisis conferences when unexpected travel incidents occur calmly.", weights: { "public-relations": 3, "hotel-management": 1 }, reason: "Hosting live crisis press briefings and preserving public confidence is public relations." }
      ]
    },
    {
      id: "av_q7",
      text: "Which lifetime legacy in aviation, tourism, or public experience do you envision?",
      blendCore: false,
      options: [
        { id: "av_q7_opt1", text: "Retiring after logging thousands of safe flight hours across global airspace safely.", weights: { pilot: 3, "hotel-management": 1 }, reason: "A lifetime of flawless aviation safety across international routes is the pilot's legacy." },
        { id: "av_q7_opt2", text: "Receiving the world's highest hospitality honors for unmatched hotel service excellence.", weights: { "hotel-management": 3, "event-manager": 1 }, reason: "Winning international hospitality industry awards is the hotelier's highest honor." },
        { id: "av_q7_opt3", text: "Directing the most unforgettable Olympic or World Cup opening ceremony in history.", weights: { "event-manager": 3, "hotel-management": 1 }, reason: "Directing an iconic global sports ceremony is the event producer's crowning achievement." },
        { id: "av_q7_opt4", text: "Earning national defense gallantry awards for heroic border and airborne leadership.", weights: { "army-officer": 3, pilot: 1 }, reason: "Receiving gallantry medals for brave airborne defense leadership represents armed service." },
        { id: "av_q7_opt5", text: "Founding a disruptive travel-tech platform that revolutionizes hotel and flight booking.", weights: { "startup-founder": 3, "hotel-management": 1 }, reason: "Revolutionizing booking infrastructure through tech innovation is startup founding." },
        { id: "av_q7_opt6", text: "Leading a global marketing agency that creates unforgettable international travel brands.", weights: { "marketing-manager": 3, "event-manager": 1 }, reason: "Building iconic international travel brands as marketing head represents marketing leadership." }
      ]
    }
  ]
};
saveBank("aviation_hospitality", aviation_hospitality);

console.log("Updated education_social, law_gov, aviation_hospitality.");
