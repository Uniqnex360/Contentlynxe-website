import {
  ArrowRight,
  Building2,
  CircleCheck,
  Globe2,
  Mail,
  Phone,
  User,
} from "lucide-react";

interface DemoForm {
  name: string;
  email: string;
  company: string;
  mobile: string;
  url: string;
}

interface DemoSectionProps {
  form: DemoForm;
  submitted: boolean;
  setSubmitted: (submitted: boolean) => void;
  showEmailModal: boolean;
  setShowEmailModal: (show: boolean) => void;
  updateField: (field: keyof DemoForm, value: string) => void;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const DemoSection = ({
  form,
  submitted,
  setSubmitted,
  setShowEmailModal,
  updateField,
}: DemoSectionProps) => {
  const handleDemoSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/temp-user/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          company_name: form.company,
          phone_number: form.mobile || null,
          email: form.email,
          product_url: form.url,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.detail || "Something went wrong. Please try again.",
        );
      }

      console.log("Demo submission successful:", data);

      setSubmitted(true);
    } catch (error) {
      console.error("Demo submission error:", error);
    }
  };

  return (
    <section id="demo" className="demo-section section-wrap">
      <div className="demo-panel">
        <div className="demo-copy">
          <div className="eyebrow light-eyebrow">
            <span className="eyebrow-dot" /> See it for yourself
          </div>

          <h2>
            How visible is
            <br />
            <span>your product?</span>
          </h2>

          <p>
            Share your details and we&rsquo;ll run a visibility snapshot across
            AI engines — showing where you stand and what to fix. Write to us at{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setShowEmailModal(true);
              }}
              className="demo-email-link"
            >
              growth@contentlynxe.com
            </a>
          </p>

          {submitted ? (
            <div className="demo-success-box">
              <div className="success-check">
                <CircleCheck size={28} />
              </div>

              <h3>Thank you, {form.name}!</h3>

              <p>
                You will receive your visibility report shortly in your email at{" "}
                <strong>{form.email}</strong>.
              </p>
            </div>
          ) : (
            <form className="demo-form" onSubmit={handleDemoSubmit}>
              <div className="demo-field">
                <User size={16} />

                <input
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="Name"
                  aria-label="Name"
                  required
                />
              </div>

              <div className="demo-field">
                <Mail size={16} />

                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="Email"
                  aria-label="Email"
                  required
                />
              </div>

              <div className="demo-field">
                <Building2 size={16} />

                <input
                  value={form.company}
                  onChange={(e) => updateField("company", e.target.value)}
                  placeholder="Company name"
                  aria-label="Company name"
                  required
                />
              </div>

              <div className="demo-field">
                <Phone size={16} />

                <input
                  type="tel"
                  value={form.mobile}
                  onChange={(e) => updateField("mobile", e.target.value)}
                  placeholder="Mobile (optional)"
                  aria-label="Mobile number"
                />
              </div>

              <div className="demo-field demo-field-full">
                <Globe2 size={16} />

                <input
                  value={form.url}
                  onChange={(e) => updateField("url", e.target.value)}
                  placeholder="Product URL"
                  aria-label="Product URL"
                  required
                />
              </div>

              <button className="button button-light demo-submit" type="submit">
                Get my snapshot <ArrowRight size={16} />
              </button>
            </form>
          )}
        </div>

        <div className="demo-result">
          <div className="result-window">
            <div className="window-head">
              <span />
              <span />
              <span />
              <label>visibility snapshot</label>
            </div>

            <div className="result-body">
              {submitted ? (
                <div className="result-email-confirm">
                  <div className="email-confirm-icon">
                    <Mail size={28} />
                  </div>

                  <span className="muted-label">REPORT INCOMING</span>

                  <h4>Your report is on its way</h4>

                  <p>
                    We&rsquo;re analyzing your product across ChatGPT, Gemini,
                    Claude, and Perplexity. You&rsquo;ll receive the full
                    visibility report at <strong>{form.email}</strong> shortly.
                  </p>
                </div>
              ) : (
                <div className="result-placeholder">
                  <div className="result-ring result-ring-empty">
                    <strong>&mdash;</strong>
                    <small>/ 100</small>
                  </div>

                  <div>
                    <span className="muted-label">CURRENT SCORE</span>

                    <h4>Waiting for your details</h4>

                    <p>Your visibility snapshot will appear here.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
