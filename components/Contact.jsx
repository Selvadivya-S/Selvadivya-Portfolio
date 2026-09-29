import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef();

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    setLoading(true);
    setStatus("");

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        }
      )
      .then(
        () => {
          setStatus("success");
          setLoading(false);

          form.current.reset();

          setTimeout(() => {
            setStatus("");
          }, 5000);
        },
        (error) => {
          console.error("EmailJS Error:", error);

          setStatus("error");
          setLoading(false);
        }
      );
  };

  return (
    <section id="contact">
      <h2 className="section-title">Get in Touch</h2>

      <p className="contact-description">
        Have a question, project idea, or job opportunity? Feel free to
        contact me. I would love to hear from you.
      </p>

      <form
        ref={form}
        onSubmit={sendEmail}
        className="contact-form"
      >
        <input
          type="text"
          name="from_name"
          placeholder="Your Name"
          required
        />

        <input
          type="email"
          name="from_email"
          placeholder="Your Email"
          required
        />

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          required
        />

        <textarea
          name="message"
          rows="7"
          placeholder="Your Message"
          required
        ></textarea>

        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Message"}
        </button>

        {status === "success" && (
          <p className="contact-success">
            ✓ Message sent successfully! Thank you for contacting me.
          </p>
        )}

        {status === "error" && (
          <p className="contact-error">
            ✕ Something went wrong. Please try again.
          </p>
        )}
      </form>
    </section>
  );
};

export default Contact;

