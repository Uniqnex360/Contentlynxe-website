import {
  ArrowRight,
  Building2,
  CircleCheck,
  Globe2,
  Mail,
  Phone,
  Search,
  User,
  ChevronDown,
  Check,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface DemoForm {
  name: string;
  email: string;
  company: string;
  mobile: string;
  url: string;
  country: string;
}

interface DemoSectionProps {
  form: DemoForm;
  submitted: boolean;
  setSubmitted: (submitted: boolean) => void;
  showEmailModal: boolean;
  setShowEmailModal: (show: boolean) => void;
  updateField: (field: keyof DemoForm, value: string) => void;
}

//@ts-ignore
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log("api base url", API_BASE_URL);

/**
 * Countries
 *
 * First:
 * US
 * UK
 * Ireland
 * Australia
 *
 * Then all remaining countries alphabetically.
 */
const countries = [
  "United States",
  "United Kingdom",
  "Ireland",
  "Australia",

  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Democratic Republic of the Congo",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

const DemoSection = ({
  form,
  submitted,
  setSubmitted,
  setShowEmailModal,
  updateField,
}: DemoSectionProps) => {
  const [countryOpen, setCountryOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");

  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const countrySearchRef = useRef<HTMLInputElement>(null);

  /**
   * Close country dropdown when clicking outside.
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target as Node)
      ) {
        setCountryOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /**
   * Focus search input whenever dropdown opens.
   */
  useEffect(() => {
    if (countryOpen) {
      setTimeout(() => {
        countrySearchRef.current?.focus();
      }, 0);
    }
  }, [countryOpen]);

  /**
   * Filter countries based on search.
   *
   * The original order is preserved, meaning:
   * US, UK, Ireland, Australia
   * will always remain first when they match the search.
   */
  const filteredCountries = countries.filter((country) =>
    country.toLowerCase().includes(countrySearch.toLowerCase()),
  );

  const handleCountrySelect = (country: string) => {
    updateField("country", country);
    setCountryOpen(false);
    setCountrySearch("");
  };

  const handleDemoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Immediately show the success state
    setSubmitted(true);

    // Send request in the background
    fetch(`${API_BASE_URL}/api/v1/temp-user/`, {
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
        country: form.country,
      }),
    })
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.detail || "Something went wrong. Please try again.",
          );
        }

        console.log("Demo submission successful:", data);
      })
      .catch((error) => {
        console.error("Demo submission error:", error);
      });
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
              {/* Name */}
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

              {/* Email */}
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

              {/* Company */}
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

              {/* Mobile */}
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

              {/* Country */}
              <div
                className="demo-field demo-country-field"
                ref={countryDropdownRef}
              >
                <Globe2 size={16} />

                <button
                  type="button"
                  className="country-select-trigger"
                  onClick={() => setCountryOpen((previous) => !previous)}
                  aria-haspopup="listbox"
                  aria-expanded={countryOpen}
                >
                  <span
                    className={
                      form.country ? "country-selected" : "country-placeholder"
                    }
                  >
                    {form.country || "Select country"}
                  </span>

                  <ChevronDown
                    size={16}
                    className={countryOpen ? "country-chevron-open" : ""}
                  />
                </button>

                {countryOpen && (
                  <div className="country-dropdown">
                    {/* Search */}
                    <div className="country-search">
                      <Search size={15} />

                      <input
                        ref={countrySearchRef}
                        type="text"
                        value={countrySearch}
                        onChange={(e) => setCountrySearch(e.target.value)}
                        placeholder="Search country..."
                        aria-label="Search country"
                      />
                    </div>

                    {/* Country list */}
                    <div
                      className="country-list"
                      role="listbox"
                      aria-label="Countries"
                    >
                      {filteredCountries.length > 0 ? (
                        filteredCountries.map((country) => (
                          <button
                            key={country}
                            type="button"
                            className={`country-option ${
                              form.country === country
                                ? "country-option-selected"
                                : ""
                            }`}
                            onClick={() => handleCountrySelect(country)}
                            role="option"
                            aria-selected={form.country === country}
                          >
                            <span>{country}</span>

                            {form.country === country && <Check size={15} />}
                          </button>
                        ))
                      ) : (
                        <div className="country-no-results">
                          No countries found
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Product URL */}
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

              {/* Submit */}
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
