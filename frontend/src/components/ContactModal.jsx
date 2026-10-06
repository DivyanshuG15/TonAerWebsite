import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ShieldCheck, X } from "lucide-react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function ContactModal({ open, onClose }) {
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", email: "", message: "" });

  useEffect(() => {
    if (open) {
      setSent(false);
      setSubmitError("");
    }
  }, [open]);

  const submit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setSubmitError("");
    try {
      await axios.post(`${API}/contact`, form);
      setSent(true);
    } catch {
      setSubmitError("We couldn’t send your enquiry right now. Please try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal-backdrop"
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onMouseDown={(event) => event.target === event.currentTarget && onClose()}
        >
          <motion.div
            className="contact-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-title"
            data-testid="contact-modal"
            initial={{ y: 46, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <button className="modal-close" onClick={onClose} aria-label="Close contact form" data-testid="contact-modal-close"><X /></button>
            {sent ? (
              <div className="success-state">
                <div className="success-icon"><ShieldCheck /></div>
                <p className="eyebrow teal">MESSAGE RECEIVED</p>
                <h2>We’ll be in touch.</h2>
                <p>Thanks for reaching out to TonAer. Our team will follow up shortly.</p>
                <button className="button button-dark" onClick={onClose} data-testid="contact-success-close">Close</button>
              </div>
            ) : (
              <>
                <p className="eyebrow teal">START A CONVERSATION</p>
                <h2 id="contact-title">Let’s make every<br /><em>connection smarter.</em></h2>
                <p className="modal-intro">Tell us a little about your network and we’ll connect you with the right TonAer team.</p>
                <form onSubmit={submit} data-testid="contact-form">
                  <label>Name<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} data-testid="contact-name-input" /></label>
                  <label>Company<input required value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} data-testid="contact-company-input" /></label>
                  <label>Work email<input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} data-testid="contact-email-input" /></label>
                  <label>How can we help?<textarea required rows="3" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} data-testid="contact-message-input" /></label>
                  {submitError && <p className="form-error" role="alert" data-testid="contact-form-error">{submitError}</p>}
                  <button className="button button-teal form-submit" disabled={submitting} data-testid="contact-form-submit">
                    {submitting ? "Sending…" : "Send enquiry"} <ArrowUpRight size={18} />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
