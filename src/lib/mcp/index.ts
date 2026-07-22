import { defineMcp } from "@lovable.dev/mcp-js";
import getProfile from "./tools/get-profile";
import getSkills from "./tools/get-skills";
import getExperience from "./tools/get-experience";
import getEducation from "./tools/get-education";
import getProjects from "./tools/get-projects";

export default defineMcp({
  name: "shakeer-portfolio-mcp",
  title: "Shakeer Mohammed Portfolio",
  version: "0.1.0",
  instructions:
    "Public tools that expose Shakeer Mohammed's portfolio: profile, skills, work experience, education/certifications, and projects. All data is public; no authentication required.",
  tools: [getProfile, getSkills, getExperience, getEducation, getProjects],
});
