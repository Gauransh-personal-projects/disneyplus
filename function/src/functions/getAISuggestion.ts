import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

import OpenAI from "openai"

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

export async function getAISuggestion(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    const term = request.query.get('term');

    const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ 
            role: 'system', 
            content: `You are a digital video assistant working for a service called Disney Plus. Your job is
            to provide movie suggestions to users based on the videos the user specifies. Provide a quirky breakdown
            of what the user should watch next! Its should only list the names of the fils after the introductions. Keep the 
            response short and sweet! Always list at least 3 films as suggestions. If the user mentions a genre, you should
            provide a suggestion based on that genre. If the user mentions a specific film, you should provide a suggestion`
         }, {
            role: 'user',
            content: `I like: ${term}`,
         },
        ],
    })

    console.log(completion.choices[0])

    return { body: completion.choices[0].message.content || "No suggestion" };
};

app.http('getAISuggestion', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: getAISuggestion
});
