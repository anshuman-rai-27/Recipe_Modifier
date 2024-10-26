
# Recipe Modifier Tool

Recipe Modifier Tool is a web application that allows users to modify recipes based on dietary preferences or to make them healthier. Users can enter a recipe and choose modifications like "Vegetarian," "Non-Vegetarian," "Healthy," or "General Modification," to dynamically generate tailored recipe suggestions.

## Features

- **Recipe Modification**: Modify recipes to fit specific dietary preferences, like Vegetarian or Non-Vegetarian.
- **Customizable Options**: Choose between different modification types to adjust recipes for healthier or general modification.
- **Dynamic Suggestions**: Powered by the Groq language model, each modification generates detailed suggestions.
- **User-Friendly UI**: Built using React, Next.js, and UI components for an intuitive user experience.

## Tech Stack

- **Frontend**: React, Next.js, Tailwind CSS
- **Backend**: Next.js API Routes
- **CopilotKit**: Used for AI-based recipe modification suggestions
- **API Integration**: Groq API for natural language modifications

## ScreenShot

![image](https://github.com/user-attachments/assets/e024ddda-8d3c-4646-b0f8-7c08c8b366c7)


![image](https://github.com/user-attachments/assets/dbe82fe7-4790-4979-876f-cdd96651701b)

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/recipe-modifier-tool.git
   cd recipe-modifier-tool
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Groq API Key:**
   - Create an `.env.local` file in the root directory.
   - Add your Groq API Key:
     ```plaintext
     GROQ_API_KEY=your_groq_api_key
     ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

## Project Structure

```
├── components
│   ├── ui           # UI components (Button, Textarea, etc.)
│   ├── RecipeModifier.tsx   # Main component for recipe modification
├── pages
│   ├── api
│   │   └── getSuggestions.ts  # API route for handling recipe modifications
├── public            # Static files
├── .env.local        # Environment variables
├── package.json
└── README.md
```

## Usage

1. **Enter a Recipe**: Type or paste your recipe into the provided text area.
2. **Choose Modification**: Select from options such as "Vegetarian," "Non-Vegetarian," "Healthy," or "General Modification."
3. **Generate Suggestions**: Click the desired button to get a modified version of your recipe.
4. **View Modified Recipe**: The modified recipe will appear below with clear headings and formatting.

## Sample API Logic

Here's a basic flow of how the backend API works:

- The API receives the recipe and modification type from the frontend.
- It creates a prompt for the Groq language model to generate suggestions based on the selected modification.
- The response is formatted and sent back to the frontend for display.

## Example Code Snippets

### Frontend Modification Trigger
```typescript
const handleGetSuggestions = async (modifierType: string) => {
    const response = await fetch("/api/getSuggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipe, modifierType }),
    });
    const data = await response.json();
    setSuggestions(data.outputText);
};
```

### Backend API Handler
```typescript
export async function POST(req: NextRequest) {
  const { recipe, modifierType } = await req.json();
  let prompt = `Modify the following recipe: ${recipe}.\nProvide the response with proper spacing and headings.`;

  if (modifierType === "veg") {
    prompt = `Modify the following recipe to make it vegetarian: ${recipe}.\nProvide the response with proper spacing and headings.`;
  } else if (modifierType === "non-veg") {
    prompt = `Modify the following recipe to make it non-vegetarian: ${recipe}.\nProvide the response with proper spacing and headings.`;
  } else if (modifierType === "healthy") {
    prompt = `Modify the following recipe to make it healthier: ${recipe}.\nProvide the response with proper spacing and headings.`;
  }

  const resp = await groq.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "llama3-8b-8192",
  });

  const outputText = resp.choices[0]?.message?.content || "";

  return NextResponse.json({ outputText });
}
```
