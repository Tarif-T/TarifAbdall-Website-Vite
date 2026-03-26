import CrudManager from "../components/CrudManager";

const fields = [
  { name: "title", label: "Title", required: true, placeholder: "Service title" },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    required: true,
    placeholder: "What this service offers",
  },
];

export default function Services() {
  return <CrudManager title="Services" endpoint="services" fields={fields} />;
}

