import CrudManager from "../components/CrudManager";

const fields = [
  { name: "title", label: "Title", required: true, placeholder: "Project title" },
  { name: "completion", label: "Completion Date", type: "date", required: true },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    required: true,
    placeholder: "Brief project summary",
  },
];

export default function Projects() {
  return <CrudManager title="Projects" endpoint="projects" fields={fields} />;
}

