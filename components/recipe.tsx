// "use client";

// import React, { useState } from 'react';
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";
// import ReactMarkdown from 'react-markdown';
// const RecipeModifier: React.FC = () => {
//     const [recipe, setRecipe] = useState<string>('');
//     const [suggestions, setSuggestions] = useState<string>('');

//     // Make the current recipe readable by Copilot
//     useCopilotReadable({ description: "Current recipe", value: recipe });

//     // Define the action to get suggestions dynamically
//     useCopilotAction({
//         name: "Generate Recipe Suggestions",
//         description: "Fetch suggestions for modifying the recipe input",
//         parameters: [
//             { name: "recipe", description: "The input recipe text", type: "string" },
//         ],
//         handler: async ({ recipe }) => {
//             // Simulate fetching suggestions from an API or AI model
//             const response = await fetch("/api/getSuggestions", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ recipe }),
//             });
//             const data = await response.json();
//             setSuggestions(data.outputText);
//         },
//     });

//     const handleRecipeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//         setRecipe(e.target.value);
//     };

//     const handleGetSuggestions = async () => {
//         // This will trigger the Copilot action to fetch suggestions
//         const response = await fetch("/api/getSuggestions", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ recipe }),
//         });
//         const data = await response.json();
//         setSuggestions(data.outputText);
//     };

//     return (
//         <div className="container mx-auto p-6 max-w-4xl bg-white rounded-lg shadow-lg">
//             <h1 className="text-3xl font-semibold text-gray-800 mb-4">Recipe Modifier Tool</h1>
//             <div className="mb-4">
//                 <Textarea
//                     value={recipe}
//                     onChange={handleRecipeInput}
//                     placeholder="Enter your recipe here..."
//                     className="w-full h-40 p-4 text-gray-800 border border-gray-300 rounded-lg"
//                 />
//             </div>
//             <div className='flex gap-4 '>
//             <Button onClick={handleGetSuggestions} className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-lg hover:bg-green-700">
//                 MOdify the recipe
//             </Button>
//             <Button onClick={handleGetSuggestions} className="w-full bg-green-600 text-white py-3 rounded-lg shadow-lg hover:bg-green-700">
//                 Veg
//             </Button>
//             <Button onClick={handleGetSuggestions} className="w-full bg-red-600 text-white py-3 rounded-lg shadow-lg hover:bg-green-700">
//                 Non-Veg
//             </Button>
//             </div>
//             <div className='text-black'>
//             <ReactMarkdown>{suggestions}</ReactMarkdown>
//             </div>
            
//         </div>
//     );
// };

// export default RecipeModifier;


"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";
import ReactMarkdown from 'react-markdown';

const RecipeModifier: React.FC = () => {
    const [recipe, setRecipe] = useState<string>('');
    const [suggestions, setSuggestions] = useState<string>('');

    useCopilotReadable({ description: "Current recipe", value: recipe });

    const handleRecipeModifier = async (modifierType: string) => {
        const response = await fetch("/api/getSuggestions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ recipe, modifierType }),
        });
        const data = await response.json();
        setSuggestions(data.outputText);
    };
    // Define the action to get suggestions dynamically
    useCopilotAction({
        name: "Generate Recipe Suggestions",
        description: "Fetch suggestions for modifying the recipe input",
        parameters: [
            { name: "recipe", description: "The input recipe text", type: "string" },
        ],
        handler: async ({ recipe }) => {
            // Simulate fetching suggestions from an API or AI model
            const response = await fetch("/api/getSuggestions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ recipe }),
            });
            const data = await response.json();
            setSuggestions(data.outputText);
        },
    });

    const handleRecipeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setRecipe(e.target.value);
    };

    return (
        <div className="container mx-auto p-6 max-w-4xl bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">Recipe Modifier Tool</h1>
            <div className="mb-4">
                <Textarea
                    value={recipe}
                    onChange={handleRecipeInput}
                    placeholder="Enter your recipe here..."
                    className="w-full h-40 p-4 text-gray-800 border border-gray-300 rounded-lg"
                />
            </div>
            <div className='flex gap-4 '>
                <Button onClick={() => handleRecipeModifier("modify")} className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-lg hover:bg-green-700">
                    Modify the Recipe
                </Button>
                <Button onClick={() => handleRecipeModifier("veg")} className="w-full bg-green-600 text-white py-3 rounded-lg shadow-lg hover:bg-green-700">
                    Veg
                </Button>
                <Button onClick={() => handleRecipeModifier("non-veg")} className="w-full bg-red-600 text-white py-3 rounded-lg shadow-lg hover:bg-green-700">
                    Non-Veg
                </Button>
                <Button onClick={() => handleRecipeModifier("healthy")} className="w-full bg-yellow-600 text-white py-3 rounded-lg shadow-lg hover:bg-green-700">
                    Healthy Diet
                </Button>
            </div>
            <div className='text-black mt-6'>
                <ReactMarkdown>{suggestions}</ReactMarkdown>
            </div>
        </div>
    );
};

export default RecipeModifier;
