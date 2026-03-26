import CrudManager from "../components/CrudManager";

const fields = [
  { name: "firstname", label: "First Name", required: true, placeholder: "Jane" },
  { name: "lastname", label: "Last Name", required: true, placeholder: "Doe" },
  { name: "email", label: "Email", type: "email", required: true, placeholder: "jane@company.com" },
  { name: "position", label: "Position", placeholder: "Manager" },
  { name: "company", label: "Company", placeholder: "Company name" },
];

export default function Contact() {
  return <CrudManager title="Contacts" endpoint="contacts" fields={fields} />;
}

