import React from "react";

export default function Contact() {
  return (
    <div>
      <h1>Contact Me</h1>
      <hr />

      <section>
        <p><strong>Email:</strong> tarifelsir@gmail.com</p>
        <p><strong>Location:</strong> Ontario, Canada</p>

        <h2>Get in Touch</h2>
        <form>
          <label>Name:</label><br />
          <input type="text" /><br /><br />

          <label>Email:</label><br />
          <input type="email" /><br /><br />

          <label>Message:</label><br />
          <textarea rows="5"></textarea><br /><br />

          <button type="submit">Send</button>
        </form>
      </section>
    </div>
  );
}

