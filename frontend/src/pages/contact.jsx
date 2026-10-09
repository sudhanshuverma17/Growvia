import { Layout } from "@/components/layout";
import { ContactSection } from "@/components/contact/ContactSection";
import { SEO } from "@/components/SEO";

export default function Contact() {
  return (
    <Layout>
      <SEO
        title="Contact Us — Get in Touch with Honesvia"
        description="Have questions regarding career roadmaps, counseling sessions, or partnerships? Contact the Honesvia team for responsive support."
        canonical="https://honesvia.com/contact"
      />
      <ContactSection isStandalonePage={true} />
    </Layout>
  );
}
