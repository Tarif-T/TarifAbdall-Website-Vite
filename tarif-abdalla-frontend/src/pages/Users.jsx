import CrudManager from "../components/CrudManager";

const fields = [
  { name: "firstname", label: "First Name", required: true, placeholder: "First name" },
  { name: "lastname", label: "Last Name", required: true, placeholder: "Last name" },
  { name: "email", label: "Email", type: "email", required: true, placeholder: "user@email.com" },
  { name: "password", label: "Password", type: "password", required: true, placeholder: "Minimum 6 chars" },
];

export default function Users() {
  return <CrudManager title="Users" endpoint="users" fields={fields} />;
}
