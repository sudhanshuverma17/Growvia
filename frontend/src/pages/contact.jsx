import { Layout } from "@/components/layout";
import { ContactSection } from "@/components/contact/ContactSection";

export default function Contact() {
  return (
    <Layout>
      <ContactSection isStandalonePage={true} />
    </Layout>
  );
}
