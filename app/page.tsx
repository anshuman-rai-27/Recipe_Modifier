import RecipeModifier from "@/components/recipe";
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotPopup } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";

export default function Home() {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit">
      <div className="min-h-screen flex items-center justify-center">
        <RecipeModifier/>
      </div>
      <CopilotPopup
        instructions="As a recipe modifier, your role is to assist users in adjusting and customizing their recipes."
        labels={{
          title: "Recipe Modifier",
          initial: "Hello! I'm here to assist you. I can help you modify recipes and suggest substitutions or alterations.",
        }}
      />
    </CopilotKit>
  );
}
