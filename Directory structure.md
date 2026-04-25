Directory structure:
└── microsoft-promptions/
    ├── README.md
    ├── CONTRIBUTING.md
    ├── LICENSE
    ├── nx.json
    ├── package.json
    ├── SECURITY.md
    ├── TRANSPARENCY_NOTE.md
    ├── tsconfig.json
    ├── .prettierrc.json
    ├── .yarnrc.yml
    ├── apps/
    │   ├── promptions-chat/
    │   │   ├── README.md
    │   │   ├── index.html
    │   │   ├── package.json
    │   │   ├── tsconfig.json
    │   │   ├── tsconfig.node.json
    │   │   ├── vite.config.ts
    │   │   ├── .env.example
    │   │   └── src/
    │   │       ├── App.tsx
    │   │       ├── index.css
    │   │       ├── main.tsx
    │   │       ├── reactUtil.ts
    │   │       ├── types.ts
    │   │       ├── vite-env.d.ts
    │   │       ├── components/
    │   │       │   ├── AssistantMessage.tsx
    │   │       │   ├── ChatHistory.tsx
    │   │       │   ├── ChatInput.tsx
    │   │       │   ├── ChatOptionsPanel.tsx
    │   │       │   ├── ErrorMessageComponent.tsx
    │   │       │   ├── index.ts
    │   │       │   ├── MarkdownRenderer.tsx
    │   │       │   ├── messageStyles.ts
    │   │       │   ├── SendButton.tsx
    │   │       │   └── UserMessage.tsx
    │   │       └── services/
    │   │           ├── ChatService.ts
    │   │           └── PromptionsService.ts
    │   └── promptions-image/
    │       ├── index.html
    │       ├── package.json
    │       ├── tsconfig.json
    │       ├── tsconfig.node.json
    │       ├── vite.config.ts
    │       ├── .env.example
    │       └── src/
    │           ├── App.tsx
    │           ├── index.css
    │           ├── main.tsx
    │           ├── reactUtil.ts
    │           ├── types.ts
    │           ├── vite-env.d.ts
    │           ├── components/
    │           │   ├── GeneratedImage.tsx
    │           │   ├── ImageInput.tsx
    │           │   ├── index.ts
    │           │   └── OptionsPanel.tsx
    │           └── services/
    │               ├── ImageService.ts
    │               └── PromptionsImageService.ts
    └── packages/
        ├── promptions-llm/
        │   ├── README.md
        │   ├── package.json
        │   ├── project.json
        │   ├── tsconfig.json
        │   └── src/
        │       ├── basicOptions.ts
        │       ├── index.ts
        │       └── types.ts
        └── promptions-ui/
            ├── README.md
            ├── package.json
            ├── project.json
            ├── tsconfig.json
            └── src/
                ├── basicOptions.tsx
                ├── compactOptions.tsx
                ├── index.ts
                └── types.ts


Files Content:

================================================
FILE: README.md
================================================
# Promptions - Ephemeral UI for Prompting

Ephemeral UI for prompt refinement - turn one prompt into interactive controls to steer and refine AI.
![Promptions demo](./Promptions.gif)

## Overview

Promptions is a simple, flexible **dynamic prompt middleware technique for AI** that uses **ephemeral UI**, developed by the ENCODE and [Tools for Thought](https://aka.ms/toolsforthought) projects at [Microsoft Research, Cambridge, UK](https://www.microsoft.com/en-us/research/lab/microsoft-research-cambridge/). From a single, simple prompt, the system helps users steer the AI by suggesting parameterized choices as dynamically generated, ephemeral UI components. As users click on choices, the same output updates immediately—not just as additional chat responses. The dynamic UI can be configured per prompt.

- For more on what Promptions can do, and for responsible AI suggestions, see our [TRANSPARENCY_NOTE.md](TRANSPARENCY_NOTE.md).
- A detailed discussion of Promptions, including how it was developed and tested, can be found in our research paper "[Dynamic Prompt Middleware: Contextual Prompt Refinement Controls for Comprehension Tasks](https://aka.ms/promptionspaper)."

Promptions is best suited for end-user interfaces where parameterizing prompts adds context that helps steer outputs toward user preferences, without requiring users to write or speak that context. The technique is simple yet effective, and it is easy to customize for many applications—serving developers from individual vibe coders to enterprise teams.

| Real-world use                        | Description                                                                                                                                                                                     |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Customer support chatbots             | Users refine support queries on the fly (e.g., specify tone or detail level) and see updated answers instantly, improving resolution speed and satisfaction.                                    |
| Content creation platforms            | Writers and marketers tweak style, length, or format parameters through GUI controls, iterating drafts faster while maintaining creative direction.                                             |
| Data analytics and BI dashboards      | Analysts adjust filters, aggregation levels, or visualization styles via checkboxes and sliders, regenerating AI-driven reports and insights instantly.                                         |
| Educational tutoring systems          | Students select difficulty, focus topics, or feedback style, prompting the AI tutor to adapt explanations and examples to individual learning needs.                                            |
| Healthcare decision-support tools     | Clinicians refine symptom context, risk factors, or treatment priorities through guided options, obtaining tailored diagnostic suggestions and care pathways.                                   |
| Data annotation and curation          | Promptions can parameterize labeling decisions into structured GUI inputs (e.g. sentiment sliders, style toggles), improving consistency, speed, and auditability in dataset creation.          |
| Interactive explainability & auditing | Promptions allows users to explore how AI outputs shift with different refinement choices, offering a lightweight way to probe bias, model boundaries, or failure modes through UI interaction. |
| Human-AI co-creation experiments      | Promptions enables controlled studies of creative workflows—researchers can observe how users interact with dynamic controls vs. freeform input when generating stories, resumes, or code.      |

## Project Structure

```
promptions/
├── apps/                          # Frontend applications
│   ├── promptions-chat/           # Chat interface (port 3003)
│   └── promptions-image/          # Image generation interface (port 3004)
├── packages/                      # Shared libraries
│   ├── promptions-llm/            # LLM utilities and integrations
│   └── promptions-ui/             # Shared React UI components
├── package.json                   # Root package configuration
├── nx.json                        # NX build system configuration
└── tsconfig.json                  # TypeScript configuration
```

## Prerequisites

Before building and running this project, ensure you have:

- **Node.js** (v18 or higher)
- **Corepack** (included with Node.js v16.10+, enables automatic Yarn management)
- **TypeScript** (v5.0 or higher)
- **OpenAI API Key** (for chat and image generation features)

### Setting up Corepack (Recommended)

This project uses **Yarn 4.9.1** which is automatically managed via corepack. No manual Yarn installation needed!

```bash
# Enable corepack (if not already enabled)
corepack enable

# Verify corepack is working (should show yarn 4.9.1)
corepack yarn --version
```

> **Note:** Corepack is included with Node.js v16.10+ but may need to be enabled. If you're using an older Node.js version, you can install corepack separately: `npm install -g corepack`

### Alternative: Manual Yarn Installation

If you prefer not to use corepack:

```bash
# Install Yarn globally
npm install -g yarn@4.9.1
```

## Quick Start

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone <repository-url>
cd promptions

# Enable corepack (if not already enabled and using corepack)
corepack enable

# Install all dependencies across the monorepo
# Corepack will automatically use the correct Yarn version (4.9.1)
yarn install
```

### 2. Build the Project

```bash
# Build all packages and applications
yarn build
```

### 3. Run the applications (and set your API key)

Set your OpenAI API key so the apps can call the OpenAI APIs.

Option A — .env files (recommended for local development):

- Create `apps/promptions-chat/.env` with:

    ```dotenv
    VITE_OPENAI_API_KEY=your_openai_api_key_here
    ```

- Create `apps/promptions-image/.env` with:

    ```dotenv
    VITE_OPENAI_API_KEY=your_openai_api_key_here
    ```

Option B — set it in your shell (PowerShell example):

```powershell
# Chat app
$env:VITE_OPENAI_API_KEY="your_openai_api_key_here" ; yarn workspace @promptions/promptions-chat dev

# Image app
$env:VITE_OPENAI_API_KEY="your_openai_api_key_here" ; yarn workspace @promptions/promptions-image dev
```

Start the dev servers:

- Chat application (http://localhost:3003):

    ```powershell
    yarn workspace @promptions/promptions-chat dev
    ```

- Image generation application (http://localhost:3004):

    ```powershell
    yarn workspace @promptions/promptions-image dev
    ```

## Available Commands

### Root Level Commands

| Command               | Description                                      |
| --------------------- | ------------------------------------------------ |
| `yarn build`          | Build all packages and applications              |
| `yarn typecheck`      | Run TypeScript type checking across all projects |
| `yarn clean`          | Clean all build artifacts                        |
| `yarn prettier:check` | Check code formatting                            |
| `yarn prettier:write` | Format code                                      |

### Individual Package Commands

Each package supports these commands:

| Command                                   | Description                          |
| ----------------------------------------- | ------------------------------------ |
| `yarn workspace <package-name> build`     | Build specific package               |
| `yarn workspace <package-name> typecheck` | Type check specific package          |
| `yarn workspace <package-name> clean`     | Clean build artifacts                |
| `yarn workspace <package-name> dev`       | Start development server (apps only) |
| `yarn workspace <package-name> preview`   | Preview production build (apps only) |

### Package Names

- `@promptions/promptions-chat`
- `@promptions/promptions-image`
- `@promptions/promptions-llm`
- `@promptions/promptions-ui`

## CONTRIBUTING

This project welcomes contributions and suggestions. For information about contributing to Promptions, please see our [CONTRIBUTING.md](CONTRIBUTING.md) guide, which includes current issues to be resolved and other forms of contributing.

## CONTACT

We welcome feedback and collaboration from our audience. If you have suggestions, questions, or observe unexpected/offensive behavior in our technology, please contact us at [promptionsgithub@service.microsoft.com](promptionsgithub@service.microsoft.com).

If the team receives reports of undesired behavior or identifies issues independently, we will update this repository with appropriate mitigations.

## TRADEMARKS

Microsoft, Windows, Microsoft Azure, and/or other Microsoft products and services referenced in the documentation may be either trademarks or registered trademarks of Microsoft in the United States and/or other countries. The licenses for this project do not grant you rights to use any Microsoft names, logos, or trademarks. Microsoft's general trademark guidelines can be found at http://go.microsoft.com/fwlink/?LinkID=254653.

Any use of third-party trademarks or logos are subject to those third-party's policies.

## PRIVACY & ETHICS

Privacy information can be found at https://go.microsoft.com/fwlink/?LinkId=521839



================================================
FILE: CONTRIBUTING.md
================================================
## Contributing

This project welcomes contributions and suggestions. Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit [Contributor License Agreements](https://cla.opensource.microsoft.com).

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.



================================================
FILE: LICENSE
================================================
    MIT License

    Copyright (c) Microsoft Corporation.

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE



================================================
FILE: nx.json
================================================
{
    "$schema": "./node_modules/nx/schemas/nx-schema.json",
    "targetDefaults": {
        "build": {
            "dependsOn": ["^build"],
            "cache": true
        },
        "typecheck": {
            "dependsOn": ["^build"],
            "cache": true
        },
        "test": {
            "cache": true
        }
    }
}



================================================
FILE: package.json
================================================
{
    "name": "promptions",
    "version": "1.0.0",
    "description": "Monorepo for promptions",
    "license": "MIT",
    "private": true,
    "workspaces": [
        "apps/*",
        "packages/*"
    ],
    "packageManager": "yarn@4.9.1",
    "scripts": {
        "clean": "yarn nx run-many -t clean",
        "typecheck": "yarn nx run-many -t typecheck",
        "build": "yarn nx run-many -t build",
        "prettier:check": "prettier --check .",
        "prettier:write": "prettier --write ."
    },
    "devDependencies": {
        "@nx/web": "20.8.1",
        "globals": "^16.0.0",
        "nx": "20.8.1",
        "prettier": "^3.5.3",
        "typescript": ">=5.0.0",
        "typescript-eslint": "^8.30.1"
    }
}



================================================
FILE: SECURITY.md
================================================
<!-- BEGIN MICROSOFT SECURITY.MD V1.0.0 BLOCK -->

## Security

Microsoft takes the security of our software products and services seriously, which
includes all source code repositories in our GitHub organizations.

**Please do not report security vulnerabilities through public GitHub issues.**

For security reporting information, locations, contact information, and policies,
please review the latest guidance for Microsoft repositories at
[https://aka.ms/SECURITY.md](https://aka.ms/SECURITY.md).

<!-- END MICROSOFT SECURITY.MD BLOCK -->



================================================
FILE: TRANSPARENCY_NOTE.md
================================================
# Promptions

## OVERVIEW

Promptions is a simple and flexible **dynamic prompt middleware UI for AI technique**. From a single, simple, prompt, the system helps users steer the AI, customizing their outputs by suggesting parameterized choices in the form of dynamically generated user interface components​. As the user clicks on choices, they get immediate changes to the same output, not just additional chat responses. Dynamic UI can be per-prompt and per-session.

### What Can Promptions Do

Promptions was developed as a simple technique to help AI end-user application developers improve their users' AI steering experiences, to get more value from their application.
A detailed discussion of Promptions, including how it was developed and tested, can be found in our paper at: https://aka.ms/promptionspaper.

### Intended Uses

Promptions is best suited for incorporating into any end-user user interface in which parameterization of prompts to add further context would help steer the output to the user's preferences, without having to write or speak the context. The technique is simple but effective, and can be easily customized to fit any application, suiting developers from individual vibe-coders to those in enterprise.

| Real-world use                        | Description                                                                                                                                                                                     |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Customer support chatbots             | Users refine support queries on the fly (e.g., specify tone or detail level) and see updated answers instantly, improving resolution speed and satisfaction.                                    |
| Content creation platforms            | Writers and marketers tweak style, length, or format parameters through GUI controls, iterating drafts faster while maintaining creative direction.                                             |
| Data analytics and BI dashboards      | Analysts adjust filters, aggregation levels, or visualization styles via checkboxes and sliders, regenerating AI-driven reports and insights instantly.                                         |
| Educational tutoring systems          | Students select difficulty, focus topics, or feedback style, prompting the AI tutor to adapt explanations and examples to individual learning needs.                                            |
| Healthcare decision-support tools     | Clinicians refine symptom context, risk factors, or treatment priorities through guided options, obtaining tailored diagnostic suggestions and care pathways.                                   |
| Data annotation and curation          | Promptions can parameterize labeling decisions into structured GUI inputs (e.g. sentiment sliders, style toggles), improving consistency, speed, and auditability in dataset creation.          |
| Interactive explainability & auditing | Promptions allows users to explore how AI outputs shift with different refinement choices, offering a lightweight way to probe bias, model boundaries, or failure modes through UI interaction. |
| Human-AI co-creation experiments      | Promptions enables controlled studies of creative workflows—researchers can observe how users interact with dynamic controls vs. freeform input when generating stories, resumes, or code.      |

Promptions is being shared with the research community to facilitate reproduction of our results and foster further research in this area.
Promptions is intended to be used by domain experts who are independently capable of evaluating the quality of outputs before acting on them.

### Out-of-Scope Uses

Promptions is not well suited for high-stakes or compliance-critical domains where outputs must follow strict regulatory standards (e.g., legal filings, medical diagnoses, or financial disclosures). In these contexts, dynamically steerable AI interfaces may introduce ambiguity, variation, or unintended bias that conflicts with traceability and audit requirements. It is also not designed for tasks requiring long-form reasoning chains, deeply nested prompt dependencies, or multi-modal coordination (e.g., simultaneous visual + textual generation), as its UI paradigm prioritizes simplicity and responsiveness over complex workflow orchestration.

We do not recommend using Promptions in commercial or real-world applications without further testing and development. It is being released for research purposes.

Promptions was not designed or evaluated for all possible downstream purposes. Developers should consider its inherent limitations as they select use cases, and evaluate and mitigate for accuracy, safety, and fairness concerns specific to each intended downstream use.

Promptions should not be used in highly regulated domains where inaccurate outputs could suggest actions that lead to injury or negatively impact an individual's legal, financial, or life opportunities.

We do not recommend using Promptions in the context of high-risk decision making (e.g. in law enforcement, legal, finance, or healthcare).

Promptions does not provide medical or clinical opinions and is not designed to replace the role of qualified medical professionals in appropriately identifying, assessing, diagnosing, or managing medical conditions.

## HOW TO GET STARTED

To begin using Promptions, follow instructions at [microsoft/promptions](https://github.com/microsoft/promptions/)

## EVALUATION

Promptions was evaluated on its ability to explain spreadsheet formulas, python code, short text passages, and as a teaching aid for data analysis and visualization concepts
A detailed discussion of our evaluation methods and results can be found in our paper at: https://aka.ms/promptionspaper.

### Evaluation Methods

We used user preferences to measure Promptions' performance.
We used a comparative user lab study to measure user preferences for Promptions dynamic UI against a static options system.
The model used for evaluation was gpt4-turbo. For more on this specific model, please see https://platform.openai.com/docs/models/gpt-4-turbo.
Results may vary if Promptions is used with a different model, or when using other models for evaluation, based on their unique design, configuration and training.
In addition to robust quality performance testing, Promptions was assessed from a Responsible AI perspective. Based on these results, we implemented mitigations to minimize Promption's susceptibility to misuse.

### Evaluation Results

At a high level, we found that, compared to a Static prompt refinement approach, the Promptions Dynamic prompt refinement approach afforded more control, lowered barriers to providing context, and encouraged task exploration and reflection, but reasoning about the effects of generated controls on the final output remains challenging. Our findings suggest that dynamic prompt middleware can improve the user experience of generative AI workflows.

## LIMITATIONS

Promptions was developed for research and experimental purposes. Further testing and validation are needed before considering its application in commercial or real-world scenarios.

Promptions was designed and tested using the English language. Performance in other languages may vary and should be assessed by someone who is both an expert in the expected outputs and a native speaker of that language.
Promptions' outputs generated by AI return options non-deterministically. Parameterized choices and outputs are likely to differ across turns and sessions.

Outputs generated by AI may include factual errors, fabrication, or speculation. Users are responsible for assessing the accuracy of generated content. All decisions leveraging outputs of the system should be made with human oversight and not be based solely on system outputs. Promptions inherits any biases, errors, or omissions produced by its base model. Developers are advised to choose an appropriate base LLM/MLLM carefully, depending on the intended use case. Promptions inherits any biases, errors, or omissions characteristic of its training data, which may be amplified by any AI-generated interpretations. Developers are advised to use content mitigations such as Azure Content Moderation APIs and test their systems using a service such as the Azure AI safety evaluations.

There has not been a systematic effort to ensure that systems using Promptions are protected from security vulnerabilities such as indirect prompt injection attacks. Any systems using it should take proactive measures to harden their systems as appropriate.

## BEST PRACTICES

Promptions in a general purpose library for integrating prompt clarifications and elaborations into a generative AI experience through dynamic UI. As with any generative AI experience, options can be hallucinated or incorrect, so human judgment should be applied when considering the output.

The method for generating options is general and broadly applicable, but for specific scenarios better results may be achieved by extending or modifying option generation to include domain specific details, for instance, options of software library supported by your context.

Options are created by LLM's generating JSON and then rendering that JSON using provided UI components. By default, Promptions uses capable LLMs that are highly reliable at generating JSON, but for further reliability constrained decoding (structured outputs) could be applied for simple JSON schemas. If Promptions is extended to generate UI directly via LLM code generation, this code must be executed int a sandboxed environment.

Promptions' sample code integrates with an external LLM API, so sensitive data should not be used.
We strongly encourage users to use LLMs/MLLMs that support robust Responsible AI mitigations, such as Azure Open AI (AOAI) services. Such services continually update their safety and RAI mitigations with the latest industry standards for responsible use. For more on AOAI's best practices when employing foundations models for scripts and applications:

- [Blog post on responsible AI features in AOAI that were presented at Ignite 2023](https://techcommunity.microsoft.com/t5/ai-azure-ai-services-blog/announcing-new-ai-safety-amp-responsible-ai-features-in-azure/ba-p/3983686)
- [Overview of Responsible AI practices for Azure OpenAI models](https://learn.microsoft.com/en-us/legal/cognitive-services/openai/overview)
- [Azure OpenAI Transparency Note](https://learn.microsoft.com/en-us/legal/cognitive-services/openai/transparency-note)
- [OpenAI s Usage policies](https://openai.com/policies/usage-policies)
- [Azure OpenAI s Code of Conduct](https://learn.microsoft.com/en-us/legal/cognitive-services/openai/code-of-conduct)

Users are responsible for sourcing their datasets legally and ethically. This could include securing appropriate copy rights, ensuring consent for use of audio/images, and/or the anonymization of data prior to use in research.
Users are reminded to be mindful of data privacy concerns and are encouraged to review the privacy policies associated with any models and data storage solutions interfacing with Promptions.

It is the user's responsibility to ensure that the use of Promptions complies with relevant data protection regulations and organizational guidelines.

### Suggested Jailbreak Mitigations

Promptions sample code includes components that interact with large language models (LLMs), which may be vulnerable to jailbreak attacks—user-crafted prompts designed to bypass safety instructions. To mitigate the risk of jailbreaks, we recommend a layered approach:

- Metaprompt Defense: Use Microsoft's recommended metaprompt structure, which includes a final instruction explicitly prohibiting the model from revealing or altering its safety rules. This has shown strong resistance to adversarial prompts in internal evaluations.
- Platform Safeguards: Integrate Azure AI safety features such as jailbreak classifiers, content filters, and blocklists to detect and block harmful outputs.
- Developer Responsibility: As this is an open source release, developers are expected to evaluate and adapt the code responsibly. We encourage logging user inputs, avoiding direct exposure of raw model outputs, and applying additional safety layers during deployment.

For more details, see Microsoft's guidance on jailbreak mitigation at [AI jailbreaks: What they are and how they can be mitigated | Microsoft Security Blog.](https://www.microsoft.com/en-us/security/blog/2024/06/04/ai-jailbreaks-what-they-are-and-how-they-can-be-mitigated/)

### Suggestions for Other Mitigations

| Stakeholders/Use Case                                               | Potential harms                                                                                                 | Potential mitigation                                                                                                                                         |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Non-technical end users (chatbots & content creation)               | Overreliance on AI outputs that may contain errors, bias, or outdated information                               | Display confidence/uncertainty indicators; embed disclaimers; require optional “verify with human” step; offer “undo” or revision history features           |
| Business analysts (BI dashboards & reporting)                       | Misinterpreting or overfitting to spurious correlations in AI-generated insights                                | Surface data provenance and model assumptions; limit refinement ranges; mandate manual sign-off on critical metrics; log all parameter changes               |
| Educators & learners (intelligent tutoring systems)                 | Learning from incorrect or oversimplified explanations, reinforcing misconceptions                              | Integrate educator review workflows; flag low-confidence responses; link to curated, authoritative resources; provide error-reporting UI                     |
| Citizen developers (low-code/no-code AI integration)                | Accidentally exposing sensitive data, misconfiguring prompts leading to inappropriate outputs                   | Enforce input sanitization and PII redaction by default; ship with secure templates; include step-by-step integration guides; sandbox testing mode           |
| Organizations & businesses (customer support, marketing, analytics) | Brand/reputation damage from biased or offensive outputs; regulatory non-compliance (e.g., GDPR, FINRA)         | Establish usage governance policies; maintain audit logs; run periodic bias and compliance audits; restrict high-risk refinement options                     |
| Malicious actors (propaganda, phishing, disinformation)             | Crafting highly persuasive or deceptive content at scale; evading content filters through iterative refinements | Implement rate-limiting and anomaly detection; require user authentication and reputation scoring; deploy robust content-safety filters; human review queues |

## LICENSE

Microsoft, and any contributors, grant you a license to any code in the repository under the MIT License. See the LICENSE file. Microsoft and any contributors reserve all other rights, whether under their respective copyrights, patents, or trademarks, whether by implication, estoppel, or otherwise.

```
MIT License

Copyright (c) 2025 Microsoft Corporation

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

## THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## CONTACT

We welcome feedback and collaboration from our audience. If you have suggestions, questions, or observe unexpected/offensive behavior in our technology, please contact us at [promptionsgithub@service.microsoft.com](promptionsgithub@service.microsoft.com).

If the team receives reports of undesired behavior or identifies issues independently, we will update this repository with appropriate mitigations.



================================================
FILE: tsconfig.json
================================================
{
    "compilerOptions": {
        "allowJs": true,
        "allowUnusedLabels": false,
        "declaration": true,
        "declarationMap": true,
        "emitDecoratorMetadata": true,
        "esModuleInterop": true,
        "experimentalDecorators": true,
        "forceConsistentCasingInFileNames": true,
        "isolatedModules": true,
        "jsx": "react-jsx",
        "lib": ["dom", "dom.iterable", "esnext"],
        "module": "esnext",
        "moduleResolution": "bundler",
        "noFallthroughCasesInSwitch": true,
        "noImplicitReturns": true,
        "noUncheckedSideEffectImports": true,
        "noUnusedParameters": false, // Let typescript-eslint handle this
        "noUnusedLocals": false, // Let typescript-eslint handle this
        "outDir": "lib",
        "pretty": true,
        "removeComments": false,
        "resolveJsonModule": true,
        "skipLibCheck": true,
        "inlineSourceMap": true,
        "strict": true,
        "target": "esnext",
        "useDefineForClassFields": true
    },
    "compileOnSave": false,
    "buildOnSave": false,
    "exclude": [
        "node_modules",
        "dist",
        "lib",
        "coverage",
        "build",
        "scripts",
        "test",
        "**/*.test.tsx",
        "**/*.test.ts",
        "**/*.spec.tsx",
        "**/*.spec.ts"
    ]
}



================================================
FILE: .prettierrc.json
================================================
{
    "printWidth": 120,
    "trailingComma": "all",
    "tabWidth": 4,
    "semi": true,
    "singleQuote": false,
    "endOfLine": "auto",
    "overrides": [
        {
            "files": ["*.yml", "*.yaml"],
            "options": {
                "tabWidth": 2
            }
        }
    ]
}



================================================
FILE: .yarnrc.yml
================================================
enableTelemetry: 0

nodeLinker: node-modules

npmPublishRegistry: "https://npm.pkg.github.com"
npmPublishAccess: public



================================================
FILE: apps/promptions-chat/README.md
================================================
# Promptions Chat

A modern chat interface built with React, Vite, Fluent UI, and OpenAI streaming responses.

## Features

- 🎨 Beautiful UI with Microsoft Fluent UI components
- 💬 Real-time streaming responses from OpenAI
- ⚡ Fast development with Vite
- 📱 Responsive design
- ⌨️ Keyboard shortcuts (Enter to send, Shift+Enter for new line)

## Getting Started

### Prerequisites

- Node.js 18+
- Yarn (workspace package manager)
- OpenAI API key

### Installation

1. From the workspace root, install dependencies:

    ```bash
    yarn install
    ```

2. Navigate to the chat app directory:

    ```bash
    cd apps/promptions-chat
    ```

3. Copy the environment file and add your OpenAI API key:

    ```bash
    cp .env.example .env
    ```

    Edit `.env` and add your OpenAI API key:

    ```
    VITE_OPENAI_API_KEY=your_api_key_here
    ```

### Development

Start the development server:

```bash
yarn dev
```

The app will be available at `http://localhost:3003`

### Building

Build the application for production:

```bash
yarn build
```

### Type Checking

Run TypeScript type checking:

```bash
yarn typecheck
```

## Architecture

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Fluent UI** - Microsoft's design system
- **OpenAI API** - GPT-3.5-turbo with streaming
- **TypeScript** - Full type safety

## Security Notes

⚠️ **Important**: This demo uses `dangerouslyAllowBrowser: true` for the OpenAI client, which exposes your API key in the browser. In a production application, you should:

1. Move OpenAI API calls to a backend server
2. Implement proper authentication
3. Use environment variables on the server side
4. Add rate limiting and other security measures

## Contributing

This is part of the promptions monorepo. Please see the main README for contribution guidelines.



================================================
FILE: apps/promptions-chat/index.html
================================================
<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Promptions Chat</title>
    </head>
    <body>
        <div id="root"></div>
        <script type="module" src="/src/main.tsx"></script>
    </body>
</html>



================================================
FILE: apps/promptions-chat/package.json
================================================
{
    "name": "@promptions/promptions-chat",
    "version": "1.0.0",
    "type": "module",
    "description": "Chat interface for promptions using OpenAI and Fluent UI",
    "license": "MIT",
    "scripts": {
        "dev": "vite --port 3003",
        "build": "tsc && vite build",
        "preview": "vite preview",
        "typecheck": "tsc --noEmit",
        "clean": "rimraf dist"
    },
    "dependencies": {
        "@fluentui/react-components": "^9.54.0",
        "@fluentui/react-icons": "^2.0.258",
        "@promptions/promptions-ui": "workspace:*",
        "immer": "^10.1.1",
        "openai": "^5.8.2",
        "react": "^18.3.1",
        "react-dom": "^18.3.1",
        "react-markdown": "^10.1.0",
        "rehype-highlight": "^7.0.2",
        "remark-gfm": "^4.0.1"
    },
    "devDependencies": {
        "@types/react": "^18.3.12",
        "@types/react-dom": "^18.3.1",
        "@vitejs/plugin-react": "^4.3.3",
        "rimraf": "^5.0.0",
        "typescript": "^5.6.3",
        "vite": "^7.0.3"
    }
}



================================================
FILE: apps/promptions-chat/tsconfig.json
================================================
{
    "compilerOptions": {
        "target": "ES2020",
        "useDefineForClassFields": true,
        "lib": ["ES2020", "DOM", "DOM.Iterable"],
        "module": "ESNext",
        "skipLibCheck": true,
        "moduleResolution": "bundler",
        "allowImportingTsExtensions": true,
        "resolveJsonModule": true,
        "isolatedModules": true,
        "noEmit": true,
        "jsx": "react-jsx",
        "strict": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "noFallthroughCasesInSwitch": true
    },
    "include": ["src"],
    "references": [{ "path": "./tsconfig.node.json" }]
}



================================================
FILE: apps/promptions-chat/tsconfig.node.json
================================================
{
    "compilerOptions": {
        "composite": true,
        "skipLibCheck": true,
        "module": "ESNext",
        "moduleResolution": "bundler",
        "allowSyntheticDefaultImports": true,
        "strict": true
    },
    "include": ["vite.config.ts"]
}



================================================
FILE: apps/promptions-chat/vite.config.ts
================================================
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3003,
    },
    define: {
        "process.env": {},
    },
});



================================================
FILE: apps/promptions-chat/.env.example
================================================
# Copy this file to .env and add your OpenAI API key
VITE_OPENAI_API_KEY=your_openai_api_key_here



================================================
FILE: apps/promptions-chat/src/App.tsx
================================================
import React from "react";
import OpenAI from "openai";
import { FluentProvider, webLightTheme, makeStyles, tokens } from "@fluentui/react-components";
import { ChatService } from "./services/ChatService";
import { ChatMessage, PromptionsService } from "./services/PromptionsService";
import { current, produce } from "immer";
import { depsEqual, useMounted, usePreviousIf } from "./reactUtil";
import { ChatInput, ChatHistory, ChatOptionsPanel } from "./components";
import {
    State,
    RefreshParams,
    OptionsParams,
    ChatParams,
    RequestMessage,
    ResponseMessage,
    ErrorMessage,
    HistoryMessage,
    compareRefreshParams,
    compareOptionsParams,
    compareChatParams,
} from "./types";
import { compactOptionSet, basicOptionSet, BasicOptions, VisualOptionSet } from "@promptions/promptions-ui";

const useStyles = makeStyles({
    appContainer: {
        height: "100vh",
        display: "flex",
        flexDirection: "row",
        backgroundColor: tokens.colorNeutralBackground1,
        fontFamily: tokens.fontFamilyBase,
    },
    chatContainer: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
    },
    chatScrollArea: {
        flex: 1,
        overflowY: "scroll",
        position: "relative",
        scrollBehavior: "smooth",
        "&::-webkit-scrollbar": {
            width: "8px",
        },
        "&::-webkit-scrollbar-track": {
            backgroundColor: tokens.colorNeutralBackground3,
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: tokens.colorNeutralStroke1,
            borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: tokens.colorNeutralStroke2,
        },
    },
    chatPanel: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
        position: "relative",
    },
    messagesContainer: {
        flex: 1,
        padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalM}`,
    },
    inputContainer: {
        padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalM}`,
        backgroundColor: tokens.colorNeutralBackground1,
        borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
        position: "sticky",
        bottom: 0,
        zIndex: 100,
        display: "flex",
        justifyContent: "center",
    },
    inputWrapper: {
        width: "50%",
        maxWidth: "800px",
    },
});

const chat = new ChatService();

// Available option sets
const availableOptionSets = [
    { key: "compact", label: "Compact Options", optionSet: compactOptionSet },
    { key: "expanded", label: "Expanded Options", optionSet: basicOptionSet },
];

// Default option set
const defaultOptionSet = basicOptionSet;

// Enable autoscroll for better UX in the new layout
const enableAutoscroll = true;

function updateHistoryContent(
    content: string,
    done: boolean,
    historySet: (fn: (prev: HistoryMessage[]) => void) => void,
) {
    historySet((draft) => {
        const lastMessage = draft.at(-1);
        if (lastMessage?.role !== "assistant") return;
        lastMessage.content = content;
        lastMessage.contentDone = done;
    });
}

function updateHistoryOptions(
    options: BasicOptions,
    done: boolean,
    historySet: (fn: (prev: HistoryMessage[]) => void) => void,
    currentOptionSet: VisualOptionSet<BasicOptions>,
) {
    historySet((draft) => {
        const lastMessage = draft.at(-1);
        if (lastMessage?.role !== "assistant") return;
        lastMessage.options = currentOptionSet.mergeOptions(lastMessage.options as BasicOptions, options);
        lastMessage.optionsDone = done;
    });
}

function updateHistoryWithError(message: ErrorMessage, historySet: (fn: (prev: HistoryMessage[]) => void) => void) {
    historySet((draft) => {
        draft.pop();
        draft.push(message);
    });
}

function updateHistoryClear(
    options: boolean,
    content: boolean,
    historySet: (fn: (prev: HistoryMessage[]) => void) => void,
    currentOptionSet: VisualOptionSet<BasicOptions>,
) {
    historySet((draft) => {
        const lastMessage = draft.at(-1);
        if (lastMessage?.role !== "assistant") return;
        if (options) {
            lastMessage.options = currentOptionSet.emptyOptions();
            lastMessage.optionsDone = false;
        }
        if (content) {
            lastMessage.content = "";
            lastMessage.contentDone = false;
        }
    });
}

const scrolledToBottom = (element: HTMLElement) => element.scrollTop > element.scrollHeight - element.clientHeight - 10;

// Helper function to get refresh parameters
const getRefreshParams = (history: HistoryMessage[], refreshRequestId: string): RefreshParams | undefined => {
    const refreshMessage = history.find((x) => x.id === refreshRequestId);
    const historyUpToRefresh = refreshMessage ? history.slice(0, history.indexOf(refreshMessage)) : undefined;
    return historyUpToRefresh && refreshMessage && refreshMessage.role === "assistant" && refreshMessage.contentDone
        ? { refreshMessage: refreshMessage, historyUpToRefresh }
        : undefined;
};

// Helper function to get options parameters
const getOptionsParams = (
    penultRequest: RequestMessage | undefined,
    lastResponse: ResponseMessage | undefined,
    prevHistory: HistoryMessage[],
): OptionsParams | undefined => {
    return penultRequest && lastResponse
        ? {
              message: penultRequest.content,
              prevHistory: prevHistory,
          }
        : undefined;
};

// Helper function to get chat parameters
const getChatParams = (
    penultRequest: RequestMessage | undefined,
    lastResponse: ResponseMessage | undefined,
    prevHistory: HistoryMessage[],
    refreshRequestId: string,
): ChatParams | undefined => {
    return penultRequest && lastResponse && lastResponse.optionsDone && !refreshRequestId
        ? {
              message: penultRequest.content,
              inlineOptions: lastResponse.options,
              prevHistory: prevHistory,
          }
        : undefined;
};

function elaborateMessagesWithOptions(messages: HistoryMessage[]): ChatMessage[] {
    const output: ChatMessage[] = [];

    for (const msg of messages) {
        if (msg.role === "user") {
            output.push({ role: "user", content: msg.content });
        }
        if (msg.role === "assistant") {
            const options = msg.options;
            if (options.prettyPrintAsConversation) {
                const { question, answer } = options.prettyPrintAsConversation();
                output.push({ role: "assistant", content: question });
                output.push({ role: "user", content: answer });
                output.push({ role: "assistant", content: msg.content });
            } else {
                output.push({ role: "user", content: options.prettyPrint() });
                output.push({ role: "assistant", content: msg.content });
            }
        }
    }

    return output;
}

const ChatPanel: React.FC<{
    refreshRequest: State<string>;
    historyState: State<HistoryMessage[]>;
    pendingScroll: React.MutableRefObject<boolean>;
    chatContainerRef: React.RefObject<HTMLDivElement>;
    styles: ReturnType<typeof useStyles>;
    currentOptionSet: VisualOptionSet<BasicOptions>;
    promptions: PromptionsService;
}> = (props) => {
    const { historyState, refreshRequest, pendingScroll, chatContainerRef, styles, currentOptionSet, promptions } =
        props;
    const penultMessage = historyState.get.at(-2);
    const lastMessage = historyState.get.at(-1);
    const penultRequest = penultMessage?.role === "user" ? penultMessage : undefined;
    const lastResponse = lastMessage?.role === "assistant" ? lastMessage : undefined;

    const prevHistory = usePreviousIf(historyState.get.slice(0, -2), depsEqual);
    const _setter = historyState.set;
    const historySet = React.useCallback(
        (fn: (prev: HistoryMessage[]) => void) => {
            _setter((prev: any) => {
                const snapshot = current(prev);
                fn(prev);

                if (chatContainerRef.current != null) {
                    // We don't want to fight the user over the scroll position.
                    // If the user has scrolled up, we won't scroll down.

                    // Two conditions when we want to scroll:
                    //   - new messages are being appended
                    //   - the user is at the bottom of the chat
                    const shouldScroll = snapshot.length < prev.length || scrolledToBottom(chatContainerRef.current);
                    if (shouldScroll && enableAutoscroll) pendingScroll.current = true;
                }
            });
        },
        [_setter, pendingScroll, chatContainerRef],
    );

    const doRefreshParams = usePreviousIf(getRefreshParams(historyState.get, refreshRequest.get), compareRefreshParams);

    React.useEffect(() => {
        if (doRefreshParams === undefined) return;

        const abort = new AbortController();

        // Debounce the async function call by 100ms
        const timeoutId = setTimeout(() => {
            (async () => {
                if (abort.signal.aborted) {
                    return;
                }

                historySet((draft) => {
                    const refreshMessage = draft.find((x) => x.id === doRefreshParams.refreshMessage.id);
                    if (refreshMessage && refreshMessage.role === "assistant") {
                        refreshMessage.content = "";
                        refreshMessage.contentDone = false;
                        refreshMessage.options = basicOptionSet.emptyOptions();
                        refreshMessage.optionsDone = false;
                        draft.splice(draft.indexOf(refreshMessage) + 1);
                    }
                });

                const history = elaborateMessagesWithOptions(doRefreshParams.historyUpToRefresh);

                try {
                    await promptions.refreshOptions(
                        doRefreshParams.refreshMessage.options,
                        history,
                        (options, done) => {
                            updateHistoryOptions(options as BasicOptions, done, historySet, currentOptionSet);
                        },
                    );
                } catch (error) {
                    if (error instanceof OpenAI.APIUserAbortError) {
                        console.log("Chat request aborted by user");
                        return;
                    }
                    updateHistoryWithError(
                        { id: crypto.randomUUID(), role: "error", content: (error as Error).message },
                        historySet,
                    );
                } finally {
                    refreshRequest.set(() => "");
                }
            })();
        }, 100);

        return () => {
            clearTimeout(timeoutId);
            abort.abort("effect disposed");
        };
    }, [doRefreshParams, historySet, refreshRequest.set]);

    // Kick off the creation of the options as required, when the chat history changes.
    const doOptionsParams = usePreviousIf(
        getOptionsParams(penultRequest, lastResponse, prevHistory),
        compareOptionsParams,
    );

    React.useEffect(() => {
        if (doOptionsParams === undefined) return;

        const { message, prevHistory } = doOptionsParams;

        const abort = new AbortController();

        const timeoutId = setTimeout(() => {
            (async () => {
                if (abort.signal.aborted) {
                    return;
                }

                updateHistoryClear(true, true, historySet, currentOptionSet);

                const history = [
                    ...elaborateMessagesWithOptions(prevHistory),
                    { role: "user", content: message } as const,
                ];

                if (abort.signal.aborted) {
                    return;
                }

                try {
                    await promptions.getOptions(history, (options, done) => {
                        updateHistoryOptions(options as BasicOptions, done, historySet, currentOptionSet);
                    });
                } catch (error) {
                    updateHistoryWithError(
                        { id: crypto.randomUUID(), role: "error", content: (error as Error).message },
                        historySet,
                    );
                }
            })();
        }, 100);

        return () => {
            clearTimeout(timeoutId);
            abort.abort("effect disposed");
        };
    }, [doOptionsParams, historySet]);

    const doChatParams = usePreviousIf(
        getChatParams(penultRequest, lastResponse, prevHistory, refreshRequest.get),
        compareChatParams,
    );

    React.useEffect(() => {
        if (doChatParams === undefined) return;

        const { message, inlineOptions, prevHistory } = doChatParams;

        const abort = new AbortController();

        // Debounce the async function call by 100ms
        const timeoutId = setTimeout(() => {
            (async () => {
                if (abort.signal.aborted) {
                    return;
                }

                // Clear content before regenerating.
                updateHistoryClear(false, true, historySet, currentOptionSet);

                const history = [
                    {
                        role: "system",
                        content:
                            "You are a helpful AI chat bot. When responding to a user consider whether they have provided any additional settings or selections. If they have, do not ask them extra follow-up questions but continue with their intent based on the context.",
                    } as const,
                    ...elaborateMessagesWithOptions([
                        ...prevHistory,
                        { id: "", role: "user", content: message } as const,
                        {
                            id: "",
                            role: "assistant",
                            content: "",
                            options: inlineOptions as BasicOptions,
                            optionsDone: false,
                            contentDone: false,
                        } as const,
                    ]).slice(0, -1),
                ];

                if (abort.signal.aborted) {
                    return;
                }

                try {
                    await chat.streamChat(
                        history,
                        (content, done) => {
                            updateHistoryContent(content, done, historySet);
                        },
                        { signal: abort.signal },
                    );
                } catch (error) {
                    if (error instanceof OpenAI.APIUserAbortError) {
                        console.log("Chat request aborted by user");
                        return;
                    }
                    updateHistoryWithError(
                        { id: crypto.randomUUID(), role: "error", content: (error as Error).message },
                        historySet,
                    );
                }
            })();
        }, 100);

        return () => {
            clearTimeout(timeoutId);
            abort.abort("effect disposed");
        };
    }, [doChatParams, historySet]);

    const send = async (message: string) => {
        historySet((draft) => {
            draft.push({ id: crypto.randomUUID(), role: "user", content: message });
            draft.push({
                id: crypto.randomUUID(),
                role: "assistant",
                options: currentOptionSet.emptyOptions(),
                optionsDone: false,
                content: "",
                contentDone: false,
            });
        });
    };

    return (
        <div className={styles.chatPanel}>
            {/* Messages container without scrolling */}
            <div className={styles.messagesContainer}>
                <ChatHistory history={historyState.get} historySet={historySet} currentOptionSet={currentOptionSet} />
            </div>
            {/* Input container anchored to bottom */}
            <div className={styles.inputContainer}>
                <div className={styles.inputWrapper}>
                    <ChatInput
                        disabled={
                            lastResponse !== undefined && (!lastResponse.optionsDone || !lastResponse.contentDone)
                        }
                        send={send}
                        historyState={historyState}
                    />
                </div>
            </div>
        </div>
    );
};

function App() {
    const mount = useMounted();
    const [history, setChatHistory] = React.useState<HistoryMessage[]>([]);
    const [refreshRequestId, setRefreshRequestId] = React.useState<string>("");
    const [currentOptionSet, setCurrentOptionSet] = React.useState<VisualOptionSet<BasicOptions>>(defaultOptionSet);
    const [optionsPanelVisible, setOptionsPanelVisible] = React.useState(false);
    const styles = useStyles();

    // Create promptions service instance with current option set
    const promptions = React.useMemo(() => {
        return new PromptionsService(chat, currentOptionSet);
    }, [currentOptionSet]);

    const historyState: State<HistoryMessage[]> = {
        get: history,
        set: React.useCallback(
            (f: any) => {
                if (!mount.isMounted) return;
                setChatHistory((prev) => {
                    const next = produce(prev, f);
                    return next;
                });
            },
            [mount],
        ),
    };

    const refreshRequest: State<string> = {
        get: refreshRequestId,
        set: React.useCallback(
            (f: (prev: string) => void) => {
                if (!mount.isMounted) return;
                setRefreshRequestId((prev) => {
                    const next = produce(prev, f);
                    return next;
                });
            },
            [mount],
        ),
    };

    const pendingScroll = React.useRef(false);
    const chatContainerRef = React.useRef<HTMLDivElement>(null);

    const handleOptionSetChange = (newOptionSet: VisualOptionSet<BasicOptions>) => {
        setCurrentOptionSet(newOptionSet);
    };

    const handleToggleOptionsPanel = () => {
        setOptionsPanelVisible(!optionsPanelVisible);
    };

    React.useLayoutEffect(() => {
        if (pendingScroll.current && chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                behavior: "smooth",
                top: chatContainerRef.current.scrollHeight,
            });
            pendingScroll.current = false;
        }
    });

    return (
        <FluentProvider theme={webLightTheme}>
            <div className={styles.appContainer}>
                {/* Expanding Sidebar */}
                <ChatOptionsPanel
                    visualOptionSet={currentOptionSet}
                    onOptionSetChange={handleOptionSetChange}
                    availableOptionSets={availableOptionSets}
                    isVisible={optionsPanelVisible}
                    onToggleVisibility={handleToggleOptionsPanel}
                />

                {/* Chat Container */}
                <div className={styles.chatContainer}>
                    <div className={styles.chatScrollArea} ref={chatContainerRef}>
                        <ChatPanel
                            refreshRequest={refreshRequest}
                            historyState={historyState}
                            pendingScroll={pendingScroll}
                            chatContainerRef={chatContainerRef}
                            styles={styles}
                            currentOptionSet={currentOptionSet}
                            promptions={promptions}
                        />
                    </div>
                </div>
            </div>
        </FluentProvider>
    );
}

export default App;



================================================
FILE: apps/promptions-chat/src/index.css
================================================
body {
    margin: 0;
    font-family:
        -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans",
        "Droid Sans", "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
}

/* Markdown Styling */
.markdown-content {
    line-height: 1.6;
    color: #333;
}

.markdown-content h1,
.markdown-content h2,
.markdown-content h3,
.markdown-content h4,
.markdown-content h5,
.markdown-content h6 {
    margin-top: 1.5em;
    margin-bottom: 0.5em;
    font-weight: 600;
    line-height: 1.25;
}

.markdown-content h1 {
    font-size: 1.8em;
    border-bottom: 2px solid #e1e4e8;
    padding-bottom: 0.3em;
}

.markdown-content h2 {
    font-size: 1.5em;
    border-bottom: 1px solid #e1e4e8;
    padding-bottom: 0.3em;
}

.markdown-content h3 {
    font-size: 1.25em;
}

.markdown-content h4 {
    font-size: 1.1em;
}

.markdown-content h5,
.markdown-content h6 {
    font-size: 1em;
}

.markdown-content p {
    margin-bottom: 1em;
}

.markdown-content ul,
.markdown-content ol {
    padding-left: 1.5em;
    margin-bottom: 1em;
}

.markdown-content li {
    margin-bottom: 0.25em;
}

.markdown-content blockquote {
    margin: 1em 0;
    padding: 0.5em 1em;
    border-left: 4px solid #dfe2e5;
    background-color: #f6f8fa;
    color: #6a737d;
}

.markdown-content blockquote p {
    margin: 0;
}

/* Code styling */
.markdown-content code {
    background-color: #f1f3f4;
    border: 1px solid #e1e4e8;
    border-radius: 4px;
    padding: 0.2em 0.4em;
    font-size: 0.9em;
    color: #d73a49;
}

.markdown-content pre {
    background-color: #f6f8fa;
    border: 1px solid #e1e4e8;
    border-radius: 6px;
    padding: 1em;
    overflow-x: auto;
    margin: 1em 0;
    line-height: 1.45;
}

.markdown-content pre code {
    background: none;
    border: none;
    padding: 0;
    color: inherit;
    font-size: 0.85em;
}

/* Table styling */
.markdown-content table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    margin: 1em 0;
    border: 1px solid #e1e4e8;
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.markdown-content table th,
.markdown-content table td {
    padding: 12px 16px;
    text-align: left;
    border-bottom: 1px solid #e1e4e8;
    border-right: 1px solid #e1e4e8;
}

.markdown-content table th:last-child,
.markdown-content table td:last-child {
    border-right: none;
}

.markdown-content table th {
    background-color: #f6f8fa;
    font-weight: 600;
    color: #24292e;
}

.markdown-content table tbody tr:hover {
    background-color: #f6f8fa;
}

.markdown-content table tbody tr:last-child td {
    border-bottom: none;
}

/* Links */
.markdown-content a {
    color: #0366d6;
    text-decoration: none;
}

.markdown-content a:hover {
    text-decoration: underline;
}

/* Horizontal rule */
.markdown-content hr {
    height: 1px;
    border: none;
    background-color: #e1e4e8;
    margin: 2em 0;
}

/* Images */
.markdown-content img {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
}

/* Inline elements */
.markdown-content strong {
    font-weight: 600;
}

.markdown-content em {
    font-style: italic;
}

/* Task lists */
.markdown-content input[type="checkbox"] {
    margin-right: 0.5em;
}

/* Responsive tables */
@media (max-width: 768px) {
    .markdown-content table {
        font-size: 0.9em;
    }

    .markdown-content table th,
    .markdown-content table td {
        padding: 8px 12px;
    }
}



================================================
FILE: apps/promptions-chat/src/main.tsx
================================================
import React from "react";
import ReactDOM from "react-dom/client";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <FluentProvider theme={webLightTheme}>
            <App />
        </FluentProvider>
    </React.StrictMode>,
);



================================================
FILE: apps/promptions-chat/src/reactUtil.ts
================================================
import React from "react";

export function useMounted(): { readonly isMounted: boolean } {
    const state = React.useRef<{
        isMounted: boolean;
        mountId: object | undefined;
    }>({
        get isMounted() {
            return this.mountId !== undefined;
        },
        mountId: undefined,
    });
    React.useEffect(() => {
        const obj = state.current;
        const mountId = {};
        obj.mountId = mountId;
        return () => {
            if (obj.mountId === mountId) {
                obj.mountId = undefined;
            }
        };
    }, []);
    const obj = state.current;
    if (obj.mountId === undefined) {
        obj.mountId = {};
    }
    return obj;
}

/**
 * For `prev` that was passed as `next` in a previous render:
 * - If `condition(prev, next)` is true, returns `prev`.
 * - Otherwise, assigns `prev` to be `next` and returns it.
 *
 * @example
 * // Memoize using deep equality of the result:
 * const value = usePreviousIf(React.useMemo(() => {...compute value...}, [...deps...]), valueEquals);
 * @example
 * // Update state only after a condition is met:
 * const state = usePreviousIf(nextState, () => {...check arbitrary condition...})
 */
export function usePreviousIf<T>(next: T, condition: (prev: T, next: T) => boolean): T {
    const prevRef = React.useRef<readonly [T]>();
    return (prevRef.current = prevRef.current && condition(prevRef.current[0], next) ? prevRef.current : [next])[0];
}

/**
 * Compares dependencies for equality using React's algorithm, in the sense that for any given `deps1` and `deps2`, if
 * React's algorithm returns `true` or `false`, `depsEqual` returns the same value.
 *
 * (React's algorithm throws an error if the dependencies change length, but `depsEqual` doesn't.)
 */
export function depsEqual(deps1: React.DependencyList, deps2: React.DependencyList) {
    if (deps1.length !== deps2.length) return false;
    for (let i = 0; i < deps1.length; i++) {
        if (!Object.is(deps1[i], deps2[i])) return false;
    }
    return true;
}



================================================
FILE: apps/promptions-chat/src/types.ts
================================================
import { Options } from "../../../packages/promptions-llm/src";

// State type for reactive state management
export type State<T> = { get: T; set: (fn: (prev: T) => void) => void };

// Message types
export interface RequestMessage {
    id: string;
    role: "user";
    content: string;
}

export interface ResponseMessage {
    id: string;
    role: "assistant";
    options: Options;
    optionsDone: boolean;
    content: string;
    contentDone: boolean;
}

export type ErrorMessage = {
    id: string;
    role: "error";
    content: string;
};

export type HistoryMessage = RequestMessage | ResponseMessage | ErrorMessage;

export interface RefreshParams {
    refreshMessage: ResponseMessage;
    historyUpToRefresh: HistoryMessage[];
}

export interface OptionsParams {
    message: string;
    prevHistory: HistoryMessage[];
}

export interface ChatParams {
    message: string;
    inlineOptions: Options;
    prevHistory: HistoryMessage[];
}

// Comparison functions for effect parameters
export const compareRefreshParams = (prev: RefreshParams | undefined, next: RefreshParams | undefined): boolean => {
    return prev?.historyUpToRefresh === next?.historyUpToRefresh && prev?.refreshMessage.id === next?.refreshMessage.id;
};

export const compareOptionsParams = (prev: OptionsParams | undefined, next: OptionsParams | undefined): boolean => {
    return (
        prev !== undefined &&
        next !== undefined &&
        prev.message === next.message &&
        prev.prevHistory === next.prevHistory
    );
};

export const compareChatParams = (prev: ChatParams | undefined, next: ChatParams | undefined): boolean => {
    return (
        prev !== undefined &&
        next !== undefined &&
        prev.message === next.message &&
        prev.inlineOptions === next.inlineOptions &&
        prev.prevHistory === next.prevHistory
    );
};



================================================
FILE: apps/promptions-chat/src/vite-env.d.ts
================================================
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_OPENAI_API_KEY: string;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}



================================================
FILE: apps/promptions-chat/src/components/AssistantMessage.tsx
================================================
import React from "react";
import { ResponseMessage } from "../types";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { Card, Skeleton, SkeletonItem, makeStyles, tokens } from "@fluentui/react-components";

const useStyles = makeStyles({
    messageContainer: {
        display: "flex",
        justifyContent: "flex-start",
        marginBottom: tokens.spacingVerticalM,
    },
    messageCard: {
        maxWidth: "100%",
        minWidth: "100%",
        backgroundColor: "transparent",
        color: tokens.colorNeutralForeground1,
        padding: tokens.spacingVerticalM,
        border: "none",
        boxShadow: "none",
    },
    messageContent: {
        fontSize: tokens.fontSizeBase300,
        lineHeight: tokens.lineHeightBase300,
    },
    thinkingContainer: {
        width: "80%",
    },
});

interface AssistantMessageProps {
    message: ResponseMessage;
}

export const AssistantMessage: React.FC<AssistantMessageProps> = ({ message }) => {
    const styles = useStyles();

    // Generate random widths for skeleton items
    const generateRandomWidth = () => Math.floor(Math.random() * 40) + 50; // 50-90%
    const skeletonWidths = React.useMemo(
        () => [`${generateRandomWidth()}%`, `${generateRandomWidth()}%`, `${generateRandomWidth()}%`],
        [],
    );

    return (
        <div className={styles.messageContainer}>
            <Card className={styles.messageCard}>
                {/* Render markdown content */}
                {message.content || !message.contentDone ? (
                    message.content ? (
                        <div className={styles.messageContent}>
                            <MarkdownRenderer content={message.content} />
                        </div>
                    ) : (
                        <div className={styles.thinkingContainer}>
                            <Skeleton
                                style={{ display: "flex", flexDirection: "column", gap: "5px" }}
                                aria-label="Loading Content"
                            >
                                <SkeletonItem style={{ width: skeletonWidths[0] }} />
                                <SkeletonItem style={{ width: skeletonWidths[1] }} />
                                <SkeletonItem style={{ width: skeletonWidths[2] }} />
                            </Skeleton>
                        </div>
                    )
                ) : null}
            </Card>
        </div>
    );
};



================================================
FILE: apps/promptions-chat/src/components/ChatHistory.tsx
================================================
import React from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { UserMessage, AssistantMessage, ErrorMessageComponent } from "./";
import { HistoryMessage } from "../types";
import { BasicOptions, VisualOptionSet } from "@promptions/promptions-ui";

const useStyles = makeStyles({
    chatRow: {
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "0",
        marginBottom: tokens.spacingVerticalXL,
    },
    messagesColumn: {
        width: "50%",
        minWidth: "50%",
        display: "flex",
        flexDirection: "column",
    },
    optionsColumn: {
        width: "25%",
        minWidth: "25%",
        paddingLeft: tokens.spacingHorizontalM,
        position: "sticky",
        top: tokens.spacingVerticalL,
    },
    spacerColumn: {
        width: "25%",
    },
    welcomeContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        textAlign: "center",
        padding: tokens.spacingHorizontalXL,
    },
    welcomeIcon: {
        fontSize: "64px",
        marginBottom: tokens.spacingVerticalL,
    },
    welcomeTitle: {
        fontSize: tokens.fontSizeBase600,
        fontWeight: tokens.fontWeightSemibold,
        color: tokens.colorNeutralForeground1,
        marginBottom: tokens.spacingVerticalM,
    },
    welcomeSubtitle: {
        fontSize: tokens.fontSizeBase300,
        color: tokens.colorNeutralForeground2,
        maxWidth: "400px",
        lineHeight: "1.5",
    },
    refreshButton: {
        minWidth: "24px",
        height: "24px",
        padding: "2px",
        marginBottom: tokens.spacingVerticalS,
    },
    optionsHeader: {
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: tokens.spacingVerticalS,
    },
});

interface ChatHistoryProps {
    history: HistoryMessage[];
    historySet: (fn: (prev: HistoryMessage[]) => void) => void;
    currentOptionSet: VisualOptionSet<BasicOptions>;
}

export const ChatHistory: React.FC<ChatHistoryProps> = ({ history, historySet, currentOptionSet }) => {
    const styles = useStyles();

    const OptionRenderer = currentOptionSet.getComponent();

    if (history.length === 0) {
        return (
            <div className={styles.chatRow}>
                <div className={styles.spacerColumn}></div>
                <div className={styles.messagesColumn}>
                    <div className={styles.welcomeContainer}>
                        <div className={styles.welcomeIcon}>🤖</div>
                        <h2 className={styles.welcomeTitle}>Welcome to Promptions AI Chat</h2>
                        <p className={styles.welcomeSubtitle}>Start a conversation by typing a message below.</p>
                    </div>
                </div>
                <div className={styles.optionsColumn}></div>
            </div>
        );
    }

    // Find the latest assistant message
    const latestAssistantMessage = [...history].reverse().find((msg) => msg.role === "assistant");
    const latestAssistantId = latestAssistantMessage?.id;

    const messageElements: JSX.Element[] = [];

    for (let i = 0; i < history.length; i++) {
        const message = history[i];

        if (message.role === "user") {
            messageElements.push(
                <div key={message.id} className={styles.chatRow}>
                    <div className={styles.spacerColumn}></div>
                    <div className={styles.messagesColumn}>
                        <UserMessage message={message} />
                    </div>
                    <div className={styles.optionsColumn}></div>
                </div>,
            );
        } else if (message.role === "assistant") {
            messageElements.push(
                <div key={message.id} className={styles.chatRow}>
                    <div className={styles.spacerColumn}></div>
                    <div className={styles.messagesColumn}>
                        <AssistantMessage message={message} />
                    </div>
                    <div className={styles.optionsColumn}>
                        {message.options && !message.options.isEmpty() && (
                            <>
                                {/* <div className={styles.optionsHeader}>
                                    {onRefreshOptions && (
                                        <Button
                                            appearance="subtle"
                                            size="small"
                                            disabled={!message.optionsDone}
                                            icon={<ArrowClockwise24Regular />}
                                            onClick={() => onRefreshOptions(message.id)}
                                            className={styles.refreshButton}
                                            title={message.optionsDone ? "Refresh Options" : "Generating options..."}
                                        />
                                    )}
                                </div> */}
                                <OptionRenderer
                                    options={message.options as any}
                                    set={(updatedOptions) => {
                                        historySet((draft) => {
                                            const msg = draft.find((m) => m.id === message.id);
                                            if (msg && msg.role === "assistant") {
                                                msg.options = updatedOptions as BasicOptions;
                                            }
                                        });
                                    }}
                                    disabled={message.id !== latestAssistantId}
                                />
                            </>
                        )}
                    </div>
                </div>,
            );
        } else if (message.role === "error") {
            messageElements.push(
                <div key={message.id} className={styles.chatRow}>
                    <div className={styles.spacerColumn}></div>
                    <div className={styles.messagesColumn}>
                        <ErrorMessageComponent message={message} />
                    </div>
                    <div className={styles.optionsColumn}></div>
                </div>,
            );
        }
    }

    return <>{messageElements}</>;
};



================================================
FILE: apps/promptions-chat/src/components/ChatInput.tsx
================================================
import React from "react";
import { HistoryMessage } from "../types";
import { Textarea, makeStyles, tokens, Button } from "@fluentui/react-components";
import { Send24Regular, Delete24Regular, Info16Regular } from "@fluentui/react-icons";

const useStyles = makeStyles({
    inputContainer: {
        display: "flex",
        gap: tokens.spacingHorizontalS,
        alignItems: "center",
        backgroundColor: tokens.colorNeutralBackground1,
    },
    containerWrapper: {
        display: "flex",
        flexDirection: "column",
        gap: tokens.spacingVerticalXS,
    },
    input: {
        flex: 1,
        minHeight: "40px",
    },
    sendButton: {
        minWidth: "32px",
        height: "32px",
        padding: "6px",
    },
    clearButton: {
        minWidth: "32px",
        height: "32px",
        padding: "6px",
    },
    disclaimerText: {
        fontSize: tokens.fontSizeBase100,
        color: tokens.colorNeutralForeground2,
        display: "flex",
        alignItems: "center",
        gap: tokens.spacingHorizontalXXS,
        paddingLeft: tokens.spacingHorizontalXS,
    },
});

type State<T> = { get: T; set: (fn: (prev: T) => void) => void };

interface ChatInputProps {
    disabled: boolean;
    send: (message: string) => void;
    historyState: State<HistoryMessage[]>;
}

export const ChatInput: React.FC<ChatInputProps> = (props) => {
    const { disabled, send, historyState } = props;
    const [text, setText] = React.useState("");
    const styles = useStyles();

    const onSend = () => {
        if (text.trim()) {
            setText("");
            send(text);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Enter" && !event.shiftKey && !disabled && !event.repeat && text.trim()) {
            event.preventDefault();
            onSend();
        }
    };

    return (
        <div className={styles.containerWrapper}>
            <div className={styles.inputContainer}>
                <Textarea
                    value={text}
                    disabled={disabled}
                    placeholder="Type your message here... (Press Enter to send)"
                    autoComplete="off"
                    autoFocus
                    className={styles.input}
                    onChange={(_, data) => setText(data.value)}
                    onKeyDown={handleKeyDown}
                    resize="vertical"
                />
                <Button
                    appearance="primary"
                    disabled={disabled || !text.trim()}
                    onClick={onSend}
                    className={styles.sendButton}
                    icon={<Send24Regular />}
                    title="Send message"
                />
                <Button
                    appearance="subtle"
                    onClick={() => {
                        historyState.set(() => []);
                    }}
                    className={styles.clearButton}
                    icon={<Delete24Regular />}
                    title="Clear chat"
                />
            </div>
            <div className={styles.disclaimerText}>
                <Info16Regular />
                AI generated responses should be verified before taking action.
            </div>
        </div>
    );
};



================================================
FILE: apps/promptions-chat/src/components/ChatOptionsPanel.tsx
================================================
import React from "react";
import { makeStyles, tokens, Text, Card, CardHeader, Button, RadioGroup, Radio } from "@fluentui/react-components";
import { Settings24Regular } from "@fluentui/react-icons";
import { VisualOptionSet, BasicOptions } from "@promptions/promptions-ui";

const useStyles = makeStyles({
    sidebar: {
        height: "100vh",
        backgroundColor: tokens.colorNeutralBackground2,
        borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
        display: "flex",
        flexDirection: "column",
        transition: "width 0.3s ease-in-out",
        overflow: "hidden",
    },
    sidebarCollapsed: {
        width: "60px",
        minWidth: "60px",
    },
    sidebarExpanded: {
        width: "300px",
        minWidth: "300px",
    },
    toggleButton: {
        width: "48px",
        height: "48px",
        margin: tokens.spacingVerticalS,
        alignSelf: "center",
        borderRadius: tokens.borderRadiusMedium,
        flexShrink: 0,
    },
    expandedContent: {
        padding: tokens.spacingHorizontalM,
        display: "flex",
        flexDirection: "column",
        gap: tokens.spacingVerticalM,
        transition: "opacity 0.3s ease-in-out 0.1s", // Delay opacity to let width animate first
        overflow: "auto",
        flex: 1,
        minWidth: 0, // Prevent content from forcing width
    },
    collapsedContent: {
        opacity: 0,
        pointerEvents: "none",
        transition: "opacity 0.2s ease-in-out", // Faster fade out
    },
    card: {
        padding: tokens.spacingHorizontalM,
        backgroundColor: tokens.colorNeutralBackground1,
    },
    optionGroup: {
        display: "flex",
        flexDirection: "column",
        gap: tokens.spacingVerticalXS,
    },
    optionLabel: {
        fontSize: tokens.fontSizeBase200,
        fontWeight: tokens.fontWeightSemibold,
        color: tokens.colorNeutralForeground1,
        marginBottom: tokens.spacingVerticalXS,
    },
    radioGroup: {
        display: "flex",
        flexDirection: "column",
        gap: tokens.spacingVerticalXS,
    },
    description: {
        fontSize: tokens.fontSizeBase100,
        color: tokens.colorNeutralForeground2,
        marginTop: tokens.spacingVerticalXS,
        lineHeight: "1.4",
    },
});

export interface ChatOptionsPanelProps {
    visualOptionSet: VisualOptionSet<BasicOptions>;
    onOptionSetChange: (optionSet: VisualOptionSet<BasicOptions>) => void;
    availableOptionSets: { key: string; label: string; optionSet: VisualOptionSet<BasicOptions> }[];
    isVisible: boolean;
    onToggleVisibility: () => void;
}

export const ChatOptionsPanel: React.FC<ChatOptionsPanelProps> = ({
    visualOptionSet,
    onOptionSetChange,
    availableOptionSets,
    isVisible,
    onToggleVisibility,
}) => {
    const styles = useStyles();

    const currentOptionKey = availableOptionSets.find((opt) => opt.optionSet === visualOptionSet)?.key || "compact";

    const handleOptionChange = (_event: React.FormEvent<HTMLDivElement>, data: { value: string }) => {
        const selectedOption = availableOptionSets.find((opt) => opt.key === data.value);
        if (selectedOption) {
            onOptionSetChange(selectedOption.optionSet);
        }
    };

    return (
        <div className={`${styles.sidebar} ${isVisible ? styles.sidebarExpanded : styles.sidebarCollapsed}`}>
            {/* Toggle Button */}
            <Button
                className={styles.toggleButton}
                appearance="subtle"
                icon={<Settings24Regular />}
                onClick={onToggleVisibility}
                title={isVisible ? "Close Options Panel" : "Open Options Panel"}
            />

            <div className={`${styles.expandedContent} ${!isVisible ? styles.collapsedContent : ""}`}>
                <Card className={styles.card}>
                    <CardHeader>
                        <Text className={styles.optionLabel}>Display Style</Text>
                    </CardHeader>

                    <div className={styles.optionGroup}>
                        <RadioGroup
                            value={currentOptionKey}
                            onChange={handleOptionChange}
                            className={styles.radioGroup}
                        >
                            {availableOptionSets.map((option) => (
                                <Radio key={option.key} value={option.key} label={option.label} />
                            ))}
                        </RadioGroup>
                        <Text className={styles.description}>
                            Choose how options are displayed in the chat. Expanded options show detailed controls, while
                            compact options use dropdown menus to save space.
                        </Text>
                    </div>
                </Card>
            </div>
        </div>
    );
};



================================================
FILE: apps/promptions-chat/src/components/ErrorMessageComponent.tsx
================================================
import React from "react";
import { ErrorMessage } from "../types";
import { Card, Text, makeStyles, tokens, Avatar } from "@fluentui/react-components";
import { ErrorCircle24Regular } from "@fluentui/react-icons";

const useStyles = makeStyles({
    messageContainer: {
        display: "flex",
        justifyContent: "flext-start",
        marginBottom: tokens.spacingVerticalM,
    },
    messageCard: {
        maxWidth: "70%",
        backgroundColor: tokens.colorPaletteRedBackground1,
        padding: tokens.spacingVerticalM,
        border: "none",
        boxShadow: "none",
    },
    messageHeader: {
        display: "flex",
        alignItems: "center",
        gap: tokens.spacingHorizontalS,
        marginBottom: tokens.spacingVerticalS,
    },
    errorTitle: {
        fontSize: tokens.fontSizeBase200,
        fontWeight: tokens.fontWeightSemibold,
        color: tokens.colorNeutralForeground2,
    },
    messageContent: {
        fontSize: tokens.fontSizeBase300,
        lineHeight: tokens.lineHeightBase300,
        color: tokens.colorNeutralForeground1,
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
    },
});

interface ErrorMessageComponentProps {
    message: ErrorMessage;
}

export const ErrorMessageComponent: React.FC<ErrorMessageComponentProps> = ({ message }) => {
    const styles = useStyles();

    return (
        <div className={styles.messageContainer}>
            <Card className={styles.messageCard}>
                <div className={styles.messageHeader}>
                    <Avatar icon={<ErrorCircle24Regular />} size={20} color="neutral" />
                    <Text className={styles.errorTitle}>Error</Text>
                </div>
                <Text className={styles.messageContent}>{message.content}</Text>
            </Card>
        </div>
    );
};



================================================
FILE: apps/promptions-chat/src/components/index.ts
================================================
export { SendButton } from "./SendButton";
export { UserMessage } from "./UserMessage";
export { AssistantMessage } from "./AssistantMessage";
export { ErrorMessageComponent } from "./ErrorMessageComponent";
export { ChatInput } from "./ChatInput";
export { MarkdownRenderer } from "./MarkdownRenderer";
export { ChatHistory } from "./ChatHistory";
export { ChatOptionsPanel } from "./ChatOptionsPanel";



================================================
FILE: apps/promptions-chat/src/components/MarkdownRenderer.tsx
================================================
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css"; // You can choose a different theme

interface MarkdownRendererProps {
    content: string;
    className?: string;
    style?: React.CSSProperties;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className, style }) => {
    return (
        <div className={`markdown-content ${className || ""}`} style={style}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                    // Custom components for better styling
                    a: ({ node, ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" />,
                    // Ensure code blocks have proper styling
                    pre: ({ node, ...props }) => <pre {...props} style={{ overflow: "auto", maxWidth: "100%" }} />,
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};

export default MarkdownRenderer;



================================================
FILE: apps/promptions-chat/src/components/messageStyles.ts
================================================
[Empty file]


================================================
FILE: apps/promptions-chat/src/components/SendButton.tsx
================================================
import React from "react";

export const SendButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
    return <button {...props}>Send</button>;
};



================================================
FILE: apps/promptions-chat/src/components/UserMessage.tsx
================================================
import React from "react";
import { RequestMessage } from "../types";
import { Card, Text, makeStyles, tokens } from "@fluentui/react-components";

const useStyles = makeStyles({
    messageContainer: {
        display: "flex",
        justifyContent: "flex-start",
        marginBottom: tokens.spacingVerticalM,
    },
    messageCard: {
        maxWidth: "100%",
        backgroundColor: tokens.colorNeutralBackground5,
        color: tokens.colorNeutralForeground1,
        padding: tokens.spacingVerticalM,
        marginLeft: tokens.spacingVerticalM,
        border: "none",
        boxShadow: "none",
    },
    messageHeader: {
        display: "flex",
        alignItems: "center",
        gap: tokens.spacingHorizontalS,
        marginBottom: tokens.spacingVerticalS,
    },
    userName: {
        fontSize: tokens.fontSizeBase200,
        fontWeight: tokens.fontWeightSemibold,
    },
    messageContent: {
        fontSize: tokens.fontSizeBase300,
        lineHeight: tokens.lineHeightBase300,
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
    },
});

interface UserMessageProps {
    message: RequestMessage;
}

export const UserMessage: React.FC<UserMessageProps> = ({ message }) => {
    const styles = useStyles();

    return (
        <div className={styles.messageContainer}>
            <Card className={styles.messageCard}>
                <Text className={styles.messageContent}>{message.content}</Text>
            </Card>
        </div>
    );
};



================================================
FILE: apps/promptions-chat/src/services/ChatService.ts
================================================
import OpenAI from "openai";

interface ChatMessage {
    role: "user" | "assistant" | "system";
    content: string;
}

export class ChatService {
    private client: OpenAI;

    constructor() {
        // In a real application, you'd want to handle the API key more securely
        // For development, you can set VITE_OPENAI_API_KEY in your .env file
        const apiKey = import.meta.env.VITE_OPENAI_API_KEY || process.env.OPENAI_API_KEY;

        if (!apiKey) {
            throw new Error(
                "OpenAI API key is required. Please set VITE_OPENAI_API_KEY in your environment variables.",
            );
        }

        this.client = new OpenAI({
            apiKey,
            dangerouslyAllowBrowser: true, // Only for demo purposes - use a backend in production
        });
    }

    async streamChat(
        messages: ChatMessage[],
        onContent: (content: string, done: boolean) => void,
        options?: { signal?: AbortSignal },
    ): Promise<void> {
        console.log(JSON.stringify(messages, null, 2));

        try {
            const stream = await this.client.chat.completions.create(
                {
                    model: "gpt-4.1",
                    messages: messages as OpenAI.Chat.Completions.ChatCompletionMessageParam[],
                    stream: true,
                    temperature: 0.7,
                    max_tokens: 1000,
                },
                {
                    signal: options?.signal,
                },
            );

            let accumulatedContent = "";

            for await (const chunk of stream) {
                const content = chunk.choices[0]?.delta?.content ?? "";
                accumulatedContent += content;
                onContent(accumulatedContent, false);
            }

            onContent(accumulatedContent, true);
        } catch (error) {
            console.error("Error in streamChat:", error);
            throw error;
        }
    }

    async sendMessage(messages: ChatMessage[]): Promise<string> {
        try {
            const response = await this.client.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: messages as OpenAI.Chat.Completions.ChatCompletionMessageParam[],
                temperature: 0.7,
                max_tokens: 1000,
            });

            return response.choices[0]?.message?.content || "No response received";
        } catch (error) {
            console.error("Error in sendMessage:", error);
            throw error;
        }
    }
}



================================================
FILE: apps/promptions-chat/src/services/PromptionsService.ts
================================================
import { ChatService } from "./ChatService";
import { Options, OptionSet } from "@promptions/promptions-llm";

export interface ChatMessage {
    role: "user" | "assistant" | "system";
    content: string;
}

export class PromptionsService {
    private chatService: ChatService;
    private optionSet: OptionSet<Options>;

    constructor(chatService: ChatService, optionSet: OptionSet<Options>) {
        this.chatService = chatService;
        this.optionSet = optionSet;
    }

    async getOptions(
        chatHistory: ChatMessage[],
        onOptions: (options: Options, done: boolean) => void,
        options?: { signal?: AbortSignal },
    ): Promise<void> {
        const systemPrompt: ChatMessage = {
            role: "system",
            content: `You are an AI assistant that generates interactive options based on conversation history. 

Given a chat conversation, analyze the context and generate relevant interactive options that the user might want to select from.

Your response must be a valid JSON array following this exact schema:
${this.optionSet.getSchemaSpec()}

Guidelines for generating options:
1. Analyze the conversation history to understand the context and user's needs
2. Generate 2-4 relevant option controls that would be useful for the user
3. For single-select options, provide 3-5 meaningful choices
4. For multi-select options, provide 4-8 options where multiple selections make sense
5. Use clear, descriptive labels for both the controls and their options
6. Make sure the options are contextually relevant to the conversation
7. Return ONLY the JSON array in a single json markdown block, without any additional text or explanation.

Example output format:
<example>
\`\`\`json
[
  ...
]
\`\`\`
</example>
`,
        };

        const messages: ChatMessage[] = [systemPrompt, ...chatHistory];

        await this.chatService.streamChat(
            messages,
            (content, done) => {
                if (done) {
                    const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/);
                    const jsonText = jsonMatch ? jsonMatch[1] : content.trim();
                    const parsedOptions = this.optionSet.validateJSON(jsonText);
                    if (!parsedOptions) {
                        throw new Error(`Invalid options JSON: ${jsonText}`);
                    }
                    return onOptions(parsedOptions, true);
                }
                const partialOptions = this.tryParsePartialOptions(content);
                if (partialOptions) {
                    onOptions(partialOptions, done);
                }
            },
            options,
        );
    }

    async refreshOptions(
        existingOptions: Options,
        chatHistory: ChatMessage[],
        onOptions: (options: Options, done: boolean) => void,
        options?: { signal?: AbortSignal },
    ): Promise<void> {
        const formattedExistingOptions = existingOptions.prettyPrint();

        const systemPrompt: ChatMessage = {
            role: "system",
            content: `You are an AI assistant that regenerates interactive options based on conversation history and existing options. 

Given a chat conversation and a set of existing options, analyze the updated context and generate new relevant interactive options that the user might want to select from. Consider the existing options as context but generate fresh, contextually appropriate options for the current state of the conversation.

Current existing options:
${formattedExistingOptions}

Your response must be a valid JSON array following this exact schema:
${this.optionSet.getSchemaSpec()}

Guidelines for regenerating options:
1. Analyze the conversation history to understand the updated context and user's evolving needs
2. Consider the existing options but don't feel constrained to replicate them exactly
3. Generate 2-4 relevant option controls that would be useful for the user in the current context
4. For single-select options, provide 3-5 meaningful choices
5. For multi-select options, provide 4-8 options where multiple selections make sense
6. Use clear, descriptive labels for both the controls and their options
7. Make sure the new options are contextually relevant to the current conversation state
8. The new options should reflect any progression or changes in the conversation since the existing options were generated
9. Return ONLY the JSON array in a single json markdown block, without any additional text or explanation.

Example output format:
<example>
\`\`\`json
[
  ...
]
\`\`\`
`,
        };

        const messages: ChatMessage[] = [systemPrompt, ...chatHistory];

        await this.chatService.streamChat(
            messages,
            (content, done) => {
                if (done) {
                    const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/);
                    const jsonText = jsonMatch ? jsonMatch[1] : content.trim();
                    const parsedOptions = this.optionSet.validateJSON(jsonText);
                    if (!parsedOptions) {
                        throw new Error(`Invalid options JSON: ${jsonText}`);
                    }
                    return onOptions(parsedOptions, true);
                }
                const partialOptions = this.tryParsePartialOptions(content);
                if (partialOptions) {
                    onOptions(partialOptions, done);
                }
            },
            options,
        );
    }

    private tryParsePartialOptions(optionsStr: string): Options | undefined {
        try {
            const jsonMatch = optionsStr.match(/```(?:json)?\s*(\[[\s\S]*?\])\s*```/);
            let jsonStr = jsonMatch ? jsonMatch[1] : optionsStr;
            return this.optionSet.validatePartialJSON?.(jsonStr);
        } catch (error) {
            return undefined;
        }
    }
}



================================================
FILE: apps/promptions-image/index.html
================================================
<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Promptions Image</title>
    </head>
    <body>
        <div id="root"></div>
        <script type="module" src="/src/main.tsx"></script>
    </body>
</html>



================================================
FILE: apps/promptions-image/package.json
================================================
{
    "name": "@promptions/promptions-image",
    "version": "1.0.0",
    "type": "module",
    "description": "Image generation interface for promptions using OpenAI DALL-E and Fluent UI",
    "license": "MIT",
    "scripts": {
        "dev": "vite --port 3004",
        "build": "tsc && vite build",
        "preview": "vite preview",
        "typecheck": "tsc --noEmit",
        "clean": "rimraf dist"
    },
    "dependencies": {
        "@fluentui/react-components": "^9.54.0",
        "@fluentui/react-icons": "^2.0.258",
        "@promptions/promptions-ui": "workspace:*",
        "immer": "^10.1.1",
        "openai": "^5.8.2",
        "react": "^18.3.1",
        "react-dom": "^18.3.1"
    },
    "devDependencies": {
        "@types/react": "^18.3.12",
        "@types/react-dom": "^18.3.1",
        "@vitejs/plugin-react": "^4.3.3",
        "rimraf": "^5.0.0",
        "typescript": "^5.6.3",
        "vite": "^7.0.3"
    }
}



================================================
FILE: apps/promptions-image/tsconfig.json
================================================
{
    "compilerOptions": {
        "target": "ES2020",
        "useDefineForClassFields": true,
        "lib": ["ES2020", "DOM", "DOM.Iterable"],
        "module": "ESNext",
        "skipLibCheck": true,
        "moduleResolution": "bundler",
        "allowImportingTsExtensions": true,
        "resolveJsonModule": true,
        "isolatedModules": true,
        "noEmit": true,
        "jsx": "react-jsx",
        "strict": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "noFallthroughCasesInSwitch": true
    },
    "include": ["src"],
    "references": [{ "path": "./tsconfig.node.json" }]
}



================================================
FILE: apps/promptions-image/tsconfig.node.json
================================================
{
    "compilerOptions": {
        "composite": true,
        "skipLibCheck": true,
        "module": "ESNext",
        "moduleResolution": "bundler",
        "allowSyntheticDefaultImports": true,
        "strict": true
    },
    "include": ["vite.config.ts"]
}



================================================
FILE: apps/promptions-image/vite.config.ts
================================================
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3004,
    },
    define: {
        "process.env": {},
    },
});



================================================
FILE: apps/promptions-image/.env.example
================================================
# Copy this file to .env and add your OpenAI API key
VITE_OPENAI_API_KEY=your_openai_api_key_here



================================================
FILE: apps/promptions-image/src/App.tsx
================================================
import React from "react";
import {
    FluentProvider,
    webLightTheme,
    makeStyles,
    tokens,
    Menu,
    MenuTrigger,
    MenuPopover,
    MenuList,
    MenuItem,
    Button,
} from "@fluentui/react-components";
import { ChevronDown24Regular, Options24Regular } from "@fluentui/react-icons";
import { ImageService } from "./services/ImageService";
import { PromptionsImageService } from "./services/PromptionsImageService";
import { produce } from "immer";
import { useMounted } from "./reactUtil";
import { ImageInput, GeneratedImage, OptionsPanel } from "./components";
import { compactOptionSet, basicOptionSet, BasicOptions, Options, VisualOptionSet } from "@promptions/promptions-ui";

const useStyles = makeStyles({
    appContainer: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: tokens.colorNeutralBackground1,
        fontFamily: tokens.fontFamilyBase,
    },
    header: {
        padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalXL}`,
        backgroundColor: tokens.colorNeutralBackground2,
        borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
        boxShadow: tokens.shadow4,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    headerTitle: {
        fontSize: tokens.fontSizeBase600,
        fontWeight: tokens.fontWeightSemibold,
        color: tokens.colorNeutralForeground1,
        margin: 0,
    },
    headerActions: {
        display: "flex",
        alignItems: "center",
        gap: tokens.spacingHorizontalM,
    },
    mainContainer: {
        flex: 1,
        display: "flex",
        overflow: "hidden",
    },
    leftPanel: {
        width: "40%",
        padding: tokens.spacingHorizontalL,
        borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
        display: "flex",
        flexDirection: "column",
        gap: tokens.spacingVerticalL,
    },
    rightPanel: {
        width: "60%",
        padding: tokens.spacingHorizontalL,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: tokens.colorNeutralBackground2,
    },
});

// State type for reactive state management
type State<T> = { get: T; set: (fn: (prev: T) => void) => void };

interface ImageState {
    prompt: string;
    options: Options;
    optionsLoading: boolean;
    imageUrl?: string;
    imageLoading: boolean;
    error?: string;
    abortController?: AbortController;
}

const imageService = new ImageService();

function App() {
    const mount = useMounted();
    const abortControllerRef = React.useRef<AbortController | null>(null);
    const [visualOptionsSet, setVisualOptionsSet] = React.useState<VisualOptionSet<BasicOptions>>(basicOptionSet);

    const optionsSet = React.useMemo(() => {
        const { getComponent, ...options } = visualOptionsSet;
        return options;
    }, [visualOptionsSet]);

    const getComponent = React.useMemo(() => visualOptionsSet.getComponent(), [visualOptionsSet]);

    const promptionsImageService = React.useMemo(() => {
        return new PromptionsImageService(imageService, optionsSet);
    }, [optionsSet]);

    const [state, setState] = React.useState<ImageState>({
        prompt: "",
        options: optionsSet.emptyOptions(),
        optionsLoading: false,
        imageLoading: false,
    });

    const handleOptionSetChange = (newOptionSet: VisualOptionSet<BasicOptions>) => {
        setVisualOptionsSet(newOptionSet);
    };

    const styles = useStyles();

    const imageState: State<ImageState> = {
        get: state,
        set: React.useCallback(
            (f: any) => {
                if (!mount.isMounted) return;
                setState((prev) => {
                    const next = produce(prev, f);
                    return next;
                });
            },
            [mount],
        ),
    };

    const handlePromptChange = (newPrompt: string) => {
        imageState.set((draft) => {
            draft.prompt = newPrompt;
            draft.error = undefined;
        });
    };

    const handleElaborate = async () => {
        if (!state.prompt.trim()) return;

        // Abort any existing operation
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        const abortController = new AbortController();
        abortControllerRef.current = abortController;

        imageState.set((draft) => {
            draft.options = visualOptionsSet.emptyOptions();
            draft.optionsLoading = true;
            draft.error = undefined;
            draft.abortController = abortController;
        });

        try {
            await promptionsImageService.getPromptOptions(
                state.prompt,
                (options: BasicOptions, done: boolean) => {
                    imageState.set((draft) => {
                        draft.options = visualOptionsSet.mergeOptions(draft.options as BasicOptions, options);
                        draft.optionsLoading = !done;
                        if (done) {
                            draft.abortController = undefined;
                            abortControllerRef.current = null;
                        }
                    });
                },
                { signal: abortController.signal },
            );
        } catch (error) {
            imageState.set((draft) => {
                draft.optionsLoading = false;
                draft.abortController = undefined;
                if (error instanceof Error && error.name !== "AbortError") {
                    draft.error = error.message;
                }
            });
            abortControllerRef.current = null;
        }
    };

    const handleCancelElaborate = () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            abortControllerRef.current = null;
            imageState.set((draft) => {
                draft.optionsLoading = false;
                draft.abortController = undefined;
            });
        }
    };

    const handleGenerate = async () => {
        if (!state.prompt.trim()) return;

        // Abort any existing operation
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        const abortController = new AbortController();
        abortControllerRef.current = abortController;

        imageState.set((draft) => {
            draft.imageLoading = true;
            draft.error = undefined;
            draft.abortController = abortController;
        });

        try {
            // Combine prompt with options to create enhanced prompt
            let enhancedPrompt = state.prompt;
            if (!state.options.isEmpty()) {
                if (state.options.prettyPrintAsConversation) {
                    const answer = state.options.prettyPrintAsConversation().answer;
                    enhancedPrompt = `${state.prompt}\n\nAdditional details:\n\n${answer}`;
                } else {
                    enhancedPrompt = `${state.prompt}\n\nAdditional details: ${state.options.prettyPrint()}`;
                }
            }

            const images = await imageService.generateImage(
                {
                    kind: "dall-e-3",
                    prompt: enhancedPrompt,
                    size: "1024x1024",
                    quality: "hd",
                    n: 1,
                },
                {
                    signal: abortController.signal,
                },
            );

            imageState.set((draft) => {
                draft.imageUrl = images[0] ? `data:image/png;base64,${images[0].base64String}` : undefined;
                draft.imageLoading = false;
                draft.abortController = undefined;
            });
            abortControllerRef.current = null;
        } catch (error) {
            imageState.set((draft) => {
                draft.imageLoading = false;
                draft.abortController = undefined;
                if (error instanceof Error && error.name !== "AbortError") {
                    draft.error = error.message;
                }
            });
            abortControllerRef.current = null;
        }
    };

    const handleCancelGenerate = () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            abortControllerRef.current = null;
            imageState.set((draft) => {
                draft.imageLoading = false;
                draft.abortController = undefined;
            });
        }
    };

    const handleOptionsChange = (newOptions: Options) => {
        imageState.set((draft) => {
            draft.options = newOptions as BasicOptions;
        });
    };

    React.useEffect(() => {
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    return (
        <FluentProvider theme={webLightTheme}>
            <div className={styles.appContainer}>
                <header className={styles.header}>
                    <h1 className={styles.headerTitle}>Promptions AI Image Generator</h1>
                    <div className={styles.headerActions}>
                        <Menu>
                            <MenuTrigger disableButtonEnhancement>
                                <Button appearance="subtle" icon={<Options24Regular />} iconPosition="before">
                                    {visualOptionsSet === basicOptionSet ? "Expanded Options" : "Compact Options"}
                                    <ChevronDown24Regular style={{ marginLeft: "8px" }} />
                                </Button>
                            </MenuTrigger>
                            <MenuPopover>
                                <MenuList>
                                    <MenuItem
                                        onClick={() => handleOptionSetChange(basicOptionSet)}
                                        disabled={visualOptionsSet === basicOptionSet}
                                    >
                                        Expanded Options
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => handleOptionSetChange(compactOptionSet)}
                                        disabled={visualOptionsSet === compactOptionSet}
                                    >
                                        Compact Options
                                    </MenuItem>
                                </MenuList>
                            </MenuPopover>
                        </Menu>
                    </div>
                </header>

                <div className={styles.mainContainer}>
                    <div className={styles.leftPanel}>
                        <ImageInput
                            prompt={state.prompt}
                            onPromptChange={handlePromptChange}
                            onElaborate={handleElaborate}
                            onGenerate={handleGenerate}
                            onCancelElaborate={handleCancelElaborate}
                            onCancelGenerate={handleCancelGenerate}
                            elaborateLoading={state.optionsLoading}
                            generateLoading={state.imageLoading}
                            error={state.error}
                        />

                        <OptionsPanel
                            options={state.options}
                            optionsRenderer={getComponent}
                            onOptionsChange={handleOptionsChange}
                            loading={state.optionsLoading}
                        />
                    </div>

                    <div className={styles.rightPanel}>
                        <GeneratedImage imageUrl={state.imageUrl} loading={state.imageLoading} prompt={state.prompt} />
                    </div>
                </div>
            </div>
        </FluentProvider>
    );
}

export default App;



================================================
FILE: apps/promptions-image/src/index.css
================================================
body {
    margin: 0;
    font-family: "Segoe UI", "Droid Sans", "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
}

/* Image display styling */
.generated-image {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.image-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 16px;
    margin-top: 16px;
}

.image-container {
    position: relative;
    background: #f8f9fa;
    border-radius: 8px;
    padding: 8px;
    transition: transform 0.2s ease;
}

.image-container:hover {
    transform: scale(1.02);
}

.image-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 200px;
    background: #f0f0f0;
    border-radius: 8px;
    flex-direction: column;
    gap: 12px;
}



================================================
FILE: apps/promptions-image/src/main.tsx
================================================
import React from "react";
import ReactDOM from "react-dom/client";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <FluentProvider theme={webLightTheme}>
            <App />
        </FluentProvider>
    </React.StrictMode>,
);



================================================
FILE: apps/promptions-image/src/reactUtil.ts
================================================
import React from "react";

export function useMounted(): { readonly isMounted: boolean } {
    const state = React.useRef<{
        isMounted: boolean;
        mountId: object | undefined;
    }>({
        get isMounted() {
            return this.mountId !== undefined;
        },
        mountId: undefined,
    });
    React.useEffect(() => {
        const obj = state.current;
        const mountId = {};
        obj.mountId = mountId;
        return () => {
            if (obj.mountId === mountId) {
                obj.mountId = undefined;
            }
        };
    }, []);
    const obj = state.current;
    if (obj.mountId === undefined) {
        obj.mountId = {};
    }
    return obj;
}



================================================
FILE: apps/promptions-image/src/types.ts
================================================
// State type for reactive state management
export type State<T> = { get: T; set: (fn: (prev: T) => void) => void };

// Image generation parameters
export interface BaseImageGenerationParams {
    prompt: string;
    size?: "1024x1024" | "1024x1792" | "1792x1024";
    quality?: "high" | "medium" | "low";
    n?: number;
}

// GPT Image 1 parameters
export interface GPTImage1Params {
    kind: "gpt-image-1";
    prompt: string;
    size?: "1024x1024" | "1024x1792" | "1792x1024";
    quality?: "high" | "medium" | "low";
    n?: number;
}

// DALL-E 3 parameters
export interface DallE3Params {
    kind: "dall-e-3";
    prompt: string;
    size?: "1024x1024" | "1024x1792" | "1792x1024";
    quality?: "standard" | "hd";
    style?: "vivid" | "natural";
    n?: number;
}

// Union type for all image generation parameters
export type ImageGenerationParams = GPTImage1Params | DallE3Params;

// Generated image result
export interface GeneratedImage {
    id: string;
    base64String: string;
    prompt: string;
    revisedPrompt?: string;
    timestamp: Date;
}

// Options elaboration parameters
export interface OptionsParams {
    prompt: string;
}

// Generation status
export type GenerationStatus = "idle" | "elaborating" | "generating" | "completed" | "error";

// Error type
export interface GenerationError {
    message: string;
    code?: string;
}



================================================
FILE: apps/promptions-image/src/vite-env.d.ts
================================================
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_OPENAI_API_KEY: string;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}



================================================
FILE: apps/promptions-image/src/components/GeneratedImage.tsx
================================================
import React from "react";
import {
    makeStyles,
    tokens,
    Spinner,
    Text,
    Card,
    CardHeader,
    CardPreview,
    Button,
    CardFooter,
} from "@fluentui/react-components";
import { ImageMultiple24Regular, ArrowDownload24Regular } from "@fluentui/react-icons";

const useStyles = makeStyles({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
    },
    loadingContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: tokens.spacingVerticalL,
    },
    loadingText: {
        fontSize: tokens.fontSizeBase300,
        color: tokens.colorNeutralForeground2,
    },
    emptyContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: tokens.spacingVerticalL,
        padding: tokens.spacingHorizontalXXL,
        textAlign: "center",
    },
    emptyIcon: {
        fontSize: "48px",
        color: tokens.colorNeutralForeground3,
    },
    emptyText: {
        fontSize: tokens.fontSizeBase300,
        color: tokens.colorNeutralForeground2,
    },
    imageCard: {
        maxWidth: "100%",
        maxHeight: "100%",
        width: "fit-content",
        height: "fit-content",
    },
    image: {
        maxWidth: "100%",
        maxHeight: "70vh",
        objectFit: "contain",
        borderRadius: tokens.borderRadiusMedium,
    },
    imageMetadata: {
        marginTop: tokens.spacingVerticalS,
        fontSize: tokens.fontSizeBase200,
        color: tokens.colorNeutralForeground2,
        fontStyle: "italic",
    },
    downloadButton: {
        marginTop: tokens.spacingVerticalS,
    },
});

interface GeneratedImageProps {
    imageUrl?: string;
    loading: boolean;
    prompt: string;
}

export const GeneratedImage: React.FC<GeneratedImageProps> = ({ imageUrl, loading, prompt }) => {
    const styles = useStyles();

    const handleDownload = () => {
        if (!imageUrl) return;

        // Create a filename based on the prompt (sanitized)
        const sanitizedPrompt = prompt
            .replace(/[^a-zA-Z0-9\s]/g, "")
            .replace(/\s+/g, "_")
            .substring(0, 50);
        const filename = `generated_image_${sanitizedPrompt || "untitled"}.png`;

        // Create a link element and trigger download
        const link = document.createElement("a");
        link.href = imageUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.loadingContainer}>
                    <Spinner size="large" />
                    <Text className={styles.loadingText}>Generating your image...</Text>
                </div>
            </div>
        );
    }

    if (!imageUrl) {
        return (
            <div className={styles.container}>
                <div className={styles.emptyContainer}>
                    <ImageMultiple24Regular className={styles.emptyIcon} />
                    <Text className={styles.emptyText}>Enter a prompt and click "Generate" to create an image</Text>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <Card className={styles.imageCard}>
                <CardPreview>
                    <img
                        src={imageUrl}
                        alt={prompt}
                        className={styles.image}
                        onError={(e) => {
                            console.error("Image failed to load:", e);
                        }}
                    />
                </CardPreview>
                <CardHeader>
                    <Text className={styles.imageMetadata}>Generated from: "{prompt}"</Text>
                </CardHeader>
                <CardFooter>
                    <Button
                        appearance="primary"
                        icon={<ArrowDownload24Regular />}
                        onClick={handleDownload}
                        className={styles.downloadButton}
                    >
                        Download Image
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};



================================================
FILE: apps/promptions-image/src/components/ImageInput.tsx
================================================
import React from "react";
import { makeStyles, tokens, Textarea, Button, MessageBar, Spinner } from "@fluentui/react-components";
import { ImageEdit24Regular, Sparkle24Regular, DismissCircle24Regular, Info16Regular } from "@fluentui/react-icons";

const useStyles = makeStyles({
    container: {
        display: "flex",
        flexDirection: "column",
        gap: tokens.spacingVerticalM,
    },
    textarea: {
        minHeight: "120px",
        fontFamily: tokens.fontFamilyBase,
        fontSize: tokens.fontSizeBase300,
        lineHeight: tokens.lineHeightBase300,
    },
    buttonContainer: {
        display: "flex",
        gap: tokens.spacingHorizontalM,
    },
    button: {
        flex: 1,
    },
    errorMessage: {
        marginTop: tokens.spacingVerticalS,
        textWrap: "wrap",
        padding: tokens.spacingVerticalS,
    },
    disclaimerText: {
        fontSize: tokens.fontSizeBase100,
        color: tokens.colorNeutralForeground2,
        display: "flex",
        alignItems: "center",
        gap: tokens.spacingHorizontalXXS,
        paddingLeft: tokens.spacingHorizontalXS,
    },
});

interface ImageInputProps {
    prompt: string;
    onPromptChange: (prompt: string) => void;
    onElaborate: () => void;
    onGenerate: () => void;
    onCancelElaborate?: () => void;
    onCancelGenerate?: () => void;
    elaborateLoading: boolean;
    generateLoading: boolean;
    error?: string;
}

export const ImageInput: React.FC<ImageInputProps> = ({
    prompt,
    onPromptChange,
    onElaborate,
    onGenerate,
    onCancelElaborate,
    onCancelGenerate,
    elaborateLoading,
    generateLoading,
    error,
}) => {
    const styles = useStyles();

    const isDisabled = elaborateLoading || generateLoading;

    return (
        <div className={styles.container}>
            <Textarea
                className={styles.textarea}
                placeholder="Describe the image you want to generate..."
                value={prompt}
                onChange={(_, data) => onPromptChange(data.value)}
                disabled={isDisabled}
                resize="vertical"
            />

            <div className={styles.disclaimerText}>
                <Info16Regular />
                AI generated responses should be verified before taking action.
            </div>

            <div className={styles.buttonContainer}>
                {elaborateLoading && onCancelElaborate ? (
                    <Button
                        className={styles.button}
                        appearance="secondary"
                        icon={<DismissCircle24Regular />}
                        onClick={onCancelElaborate}
                    >
                        Cancel
                    </Button>
                ) : (
                    <Button
                        className={styles.button}
                        appearance="secondary"
                        icon={elaborateLoading ? <Spinner size="tiny" /> : <Sparkle24Regular />}
                        onClick={onElaborate}
                        disabled={isDisabled || !prompt.trim()}
                    >
                        {elaborateLoading ? "Elaborating..." : "Elaborate"}
                    </Button>
                )}

                {generateLoading && onCancelGenerate ? (
                    <Button
                        className={styles.button}
                        appearance="primary"
                        icon={<DismissCircle24Regular />}
                        onClick={onCancelGenerate}
                    >
                        Cancel
                    </Button>
                ) : (
                    <Button
                        className={styles.button}
                        appearance="primary"
                        icon={generateLoading ? <Spinner size="tiny" /> : <ImageEdit24Regular />}
                        onClick={onGenerate}
                        disabled={isDisabled || !prompt.trim()}
                    >
                        {generateLoading ? "Generating..." : "Generate"}
                    </Button>
                )}
            </div>

            {error && (
                <MessageBar className={styles.errorMessage} intent="error">
                    {error}
                </MessageBar>
            )}
        </div>
    );
};



================================================
FILE: apps/promptions-image/src/components/index.ts
================================================
export { ImageInput } from "./ImageInput";
export { GeneratedImage } from "./GeneratedImage";
export { OptionsPanel } from "./OptionsPanel";



================================================
FILE: apps/promptions-image/src/components/OptionsPanel.tsx
================================================
import React from "react";
import { makeStyles, tokens, Text, Spinner, Card, CardHeader } from "@fluentui/react-components";
import { OptionRenderer, Options } from "@promptions/promptions-ui";

const useStyles = makeStyles({
    container: {
        display: "flex",
        flexDirection: "column",
        gap: tokens.spacingVerticalS,
    },
    card: {
        padding: tokens.spacingHorizontalM,
    },
    header: {
        fontSize: tokens.fontSizeBase300,
        fontWeight: tokens.fontWeightSemibold,
        marginBottom: tokens.spacingVerticalS,
    },
    loadingContainer: {
        display: "flex",
        alignItems: "center",
        gap: tokens.spacingHorizontalS,
        padding: tokens.spacingVerticalM,
        justifyContent: "center",
    },
    loadingText: {
        fontSize: tokens.fontSizeBase200,
        color: tokens.colorNeutralForeground2,
    },
    emptyText: {
        fontSize: tokens.fontSizeBase200,
        color: tokens.colorNeutralForeground3,
        textAlign: "center",
        padding: tokens.spacingVerticalL,
        fontStyle: "italic",
    },
});

interface OptionsPanelProps {
    options: Options;
    optionsRenderer: OptionRenderer;
    onOptionsChange: (options: Options) => void;
    loading: boolean;
}

export const OptionsPanel: React.FC<OptionsPanelProps> = ({
    options,
    optionsRenderer: OptionsRenderer,
    onOptionsChange,
    loading,
}) => {
    const styles = useStyles();

    return (
        <div className={styles.container}>
            <Card className={styles.card}>
                <CardHeader>
                    <Text className={styles.header}>Options</Text>
                </CardHeader>

                {!loading && options.isEmpty() && (
                    <Text className={styles.emptyText}>
                        Click "Elaborate" to generate interactive options for your prompt
                    </Text>
                )}

                {loading && options.isEmpty() && (
                    <div className={styles.loadingContainer}>
                        <Spinner size="small" />
                        <Text className={styles.loadingText}>Generating options...</Text>
                    </div>
                )}

                {!options.isEmpty() && <OptionsRenderer options={options} set={onOptionsChange} />}
            </Card>
        </div>
    );
};



================================================
FILE: apps/promptions-image/src/services/ImageService.ts
================================================
import OpenAI from "openai";
import { ImageGenerationParams, GeneratedImage } from "../types";

export class ImageService {
    private client: OpenAI;

    constructor() {
        const apiKey = import.meta.env.VITE_OPENAI_API_KEY || process.env.OPENAI_API_KEY;

        if (!apiKey) {
            throw new Error(
                "OpenAI API key is required. Please set VITE_OPENAI_API_KEY in your environment variables.",
            );
        }

        this.client = new OpenAI({
            apiKey,
            dangerouslyAllowBrowser: true, // Only for demo purposes - use a backend in production
        });
    }

    async generateImage(params: ImageGenerationParams, options?: { signal?: AbortSignal }): Promise<GeneratedImage[]> {
        try {
            console.log("Generating image with params:", params);

            const response = await this.client.images.generate(
                {
                    model: params.kind,
                    prompt: params.prompt,
                    size: params.size,
                    quality: params.quality,
                    n: params.n || 1,
                    response_format: "b64_json",
                },
                {
                    signal: options?.signal,
                },
            );

            const images: GeneratedImage[] = (response.data || []).map((image) => ({
                id: crypto.randomUUID(),
                base64String: image.b64_json!,
                prompt: params.prompt,
                revisedPrompt: image.revised_prompt,
                timestamp: new Date(),
            }));

            console.log("Generated images:", images);
            return images;
        } catch (error) {
            console.error("Error generating image:", error);
            throw error;
        }
    }

    async streamChat(
        messages: Array<{ role: "user" | "assistant" | "system"; content: string }>,
        onContent: (content: string, done: boolean) => void,
        options?: { signal?: AbortSignal },
    ): Promise<void> {
        try {
            const stream = await this.client.chat.completions.create(
                {
                    model: "gpt-4.1",
                    messages: messages as OpenAI.Chat.Completions.ChatCompletionMessageParam[],
                    stream: true,
                    temperature: 0.7,
                    max_tokens: 1000,
                },
                {
                    signal: options?.signal,
                },
            );

            let accumulatedContent = "";

            for await (const chunk of stream) {
                const content = chunk.choices[0]?.delta?.content ?? "";
                accumulatedContent += content;
                onContent(accumulatedContent, false);
            }

            onContent(accumulatedContent, true);
        } catch (error) {
            console.error("Error in streamChat:", error);
            throw error;
        }
    }
}



================================================
FILE: apps/promptions-image/src/services/PromptionsImageService.ts
================================================
import { ImageService } from "./ImageService";
import { BasicOptions, OptionSet } from "@promptions/promptions-ui";

export class PromptionsImageService {
    private imageService: ImageService;
    private optionSet: OptionSet<BasicOptions>;

    constructor(imageService: ImageService, optionSet: OptionSet<BasicOptions>) {
        this.imageService = imageService;
        this.optionSet = optionSet;
    }

    async getPromptOptions(
        prompt: string,
        onOptions: (options: BasicOptions, done: boolean) => void,
        options?: { signal?: AbortSignal },
    ): Promise<void> {
        const systemPrompt = `You are an AI assistant that generates interactive options for image generation prompts. 

Given a user's image prompt, analyze it and generate relevant interactive options that would help refine and improve the image generation.

Your response must be a valid JSON array following this exact schema:
${this.optionSet.getSchemaSpec()}

Guidelines for generating options:
1. Analyze the prompt to understand what type of image the user wants
2. Generate 3-5 relevant option controls that would be useful for image refinement
3. Include options for:
   - Art style (photorealistic, cartoon, painting, etc.)
   - Color palette or mood
   - Lighting conditions
   - Composition or perspective
   - Additional elements or details
4. For single-select options, provide 3-6 meaningful choices
5. For multi-select options, provide 4-8 options where multiple selections make sense
6. Use clear, descriptive labels for both the controls and their options
7. Make sure the options are contextually relevant to the image prompt
8. Return ONLY the JSON array in a single json markdown block, without any additional text or explanation.

Example output format:
\`\`\`json
[
  {
    "label": "Art Style",
    "type": "single-select",
    "options": ["Photorealistic", "Digital Art", "Oil Painting", "Watercolor", "Sketch"]
  },
  {
    "label": "Lighting",
    "type": "single-select", 
    "options": ["Natural daylight", "Golden hour", "Dramatic shadows", "Soft studio lighting", "Neon/cyberpunk"]
  }
]
\`\`\``;

        const messages = [
            { role: "system" as const, content: systemPrompt },
            { role: "user" as const, content: `Generate options for this image prompt: "${prompt}"` },
        ];

        await this.imageService.streamChat(
            messages,
            (content, done) => {
                if (done) {
                    const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/);
                    const jsonText = jsonMatch ? jsonMatch[1] : content.trim();
                    const parsedOptions = this.optionSet.validateJSON(jsonText);
                    if (!parsedOptions) {
                        console.error(`Invalid options JSON: ${jsonText}`);
                        return onOptions(this.optionSet.emptyOptions(), true);
                    }
                    return onOptions(parsedOptions, true);
                }
                const partialOptions = this.tryParsePartialOptions(content);
                if (partialOptions) {
                    onOptions(partialOptions, done);
                }
            },
            options,
        );
    }

    async refreshOptions(
        existingOptions: BasicOptions,
        prompt: string,
        onOptions: (options: BasicOptions, done: boolean) => void,
        options?: { signal?: AbortSignal },
    ): Promise<void> {
        const formattedExistingOptions = existingOptions.prettyPrint();

        const systemPrompt = `You are an AI assistant that regenerates interactive options for image generation prompts based on existing options.

Given a user's image prompt and existing options, analyze the context and generate new relevant interactive options that would help refine and improve the image generation. Consider the existing options as context but generate fresh, contextually appropriate options.

Current existing options:
${formattedExistingOptions}

Your response must be a valid JSON array following this exact schema:
${this.optionSet.getSchemaSpec()}

Guidelines for regenerating options:
1. Analyze the prompt to understand what type of image the user wants
2. Consider the existing options but don't feel constrained to replicate them exactly
3. Generate 3-5 relevant option controls that would be useful for image refinement
4. Include options for:
   - Art style (photorealistic, cartoon, painting, etc.)
   - Color palette or mood
   - Lighting conditions
   - Composition or perspective
   - Additional elements or details
5. For single-select options, provide 3-6 meaningful choices
6. For multi-select options, provide 4-8 options where multiple selections make sense
7. Use clear, descriptive labels for both the controls and their options
8. Make sure the new options are contextually relevant to the image prompt
9. The new options should reflect any refinements or improvements over the existing ones
10. Return ONLY the JSON array in a single json markdown block, without any additional text or explanation.

Example output format:
\`\`\`json
[
  {
    "label": "Art Style",
    "type": "single-select",
    "options": ["Photorealistic", "Digital Art", "Oil Painting", "Watercolor", "Sketch"]
  },
  {
    "label": "Lighting",
    "type": "single-select", 
    "options": ["Natural daylight", "Golden hour", "Dramatic shadows", "Soft studio lighting", "Neon/cyberpunk"]
  }
]
\`\`\``;

        const messages = [
            { role: "system" as const, content: systemPrompt },
            { role: "user" as const, content: `Regenerate options for this image prompt: "${prompt}"` },
        ];

        await this.imageService.streamChat(
            messages,
            (content, done) => {
                if (done) {
                    const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/);
                    const jsonText = jsonMatch ? jsonMatch[1] : content.trim();
                    const parsedOptions = this.optionSet.validateJSON(jsonText);
                    if (!parsedOptions) {
                        console.error(`Invalid options JSON: ${jsonText}`);
                        return onOptions(this.optionSet.emptyOptions(), true);
                    }
                    return onOptions(parsedOptions, true);
                }
                const partialOptions = this.tryParsePartialOptions(content);
                if (partialOptions) {
                    onOptions(partialOptions, done);
                }
            },
            options,
        );
    }

    private tryParsePartialOptions(optionsStr: string): BasicOptions | undefined {
        try {
            const jsonMatch = optionsStr.match(/```(?:json)?\s*(\[[\s\S]*?\])\s*```/);
            let jsonStr = jsonMatch ? jsonMatch[1] : optionsStr;
            return this.optionSet.validatePartialJSON?.(jsonStr);
        } catch (error) {
            return undefined;
        }
    }
}



================================================
FILE: packages/promptions-llm/README.md
================================================
[Empty file]


================================================
FILE: packages/promptions-llm/package.json
================================================
{
    "name": "@promptions/promptions-llm",
    "version": "1.0.0",
    "description": "LLM utilities and integrations for promptions",
    "main": "dist/index.js",
    "types": "dist/index.d.ts",
    "license": "MIT",
    "scripts": {
        "build": "tsc",
        "build:watch": "tsc --watch",
        "clean": "rimraf dist",
        "typecheck": "tsc --noEmit"
    },
    "files": [
        "dist",
        "README.md"
    ],
    "keywords": [
        "llm",
        "ai",
        "typescript",
        "promptions"
    ],
    "devDependencies": {
        "@types/node": "^20.0.0",
        "rimraf": "^5.0.0",
        "typescript": "^5.0.0"
    },
    "peerDependencies": {
        "typescript": ">=5.0.0"
    },
    "dependencies": {
        "zod": "^3.25.67"
    }
}



================================================
FILE: packages/promptions-llm/project.json
================================================
{
    "name": "promptions-llm",
    "$schema": "../../node_modules/nx/schemas/project-schema.json",
    "sourceRoot": "packages/promptions-llm/src",
    "projectType": "library",
    "targets": {
        "build": {
            "executor": "nx:run-commands",
            "options": {
                "command": "tsc",
                "cwd": "packages/promptions-llm"
            }
        },
        "typecheck": {
            "executor": "nx:run-commands",
            "options": {
                "command": "tsc --noEmit",
                "cwd": "packages/promptions-llm"
            }
        },
        "test": {
            "executor": "nx:run-commands",
            "options": {
                "command": "jest",
                "cwd": "packages/promptions-llm"
            }
        },
        "clean": {
            "executor": "nx:run-commands",
            "options": {
                "command": "rimraf dist",
                "cwd": "packages/promptions-llm"
            }
        }
    },
    "tags": ["type:lib", "scope:promptions-llm"]
}



================================================
FILE: packages/promptions-llm/tsconfig.json
================================================
{
    "extends": "../../tsconfig.json",
    "compilerOptions": {
        "outDir": "./dist",
        "rootDir": "./src",
        "declaration": true,
        "declarationMap": true,
        "composite": true,
        "incremental": true
    },
    "include": ["src/**/*"],
    "exclude": ["dist", "node_modules", "**/*.test.ts", "**/*.spec.ts"],
    "references": []
}



================================================
FILE: packages/promptions-llm/src/basicOptions.ts
================================================
import * as z from "zod";
import { OptionSet, Options } from "./types";

const multiOptionControl = z.object({
    kind: z.literal("multi-select"),
    label: z.string(),
    options: z.record(z.string()),
    value: z.union([z.string(), z.array(z.string())]),
});

const singleOptionControl = z.object({
    kind: z.literal("single-select"),
    label: z.string(),
    options: z.record(z.string()),
    value: z.union([z.string(), z.tuple([z.string()])]),
});

const binaryOptionControl = z.object({
    kind: z.literal("binary-select"),
    label: z.string(),
    options: z.object({
        enabled: z.string(),
        disabled: z.string(),
    }),
    value: z.union([z.literal("enabled"), z.literal("disabled")]),
});

const optionControl = z.union([multiOptionControl, singleOptionControl, binaryOptionControl]);
const optionControlList = z.array(optionControl);
type OptionControlList = z.infer<typeof optionControlList>;

// Export individual option types
export type MultiOptionControl = z.infer<typeof multiOptionControl>;
export type SingleOptionControl = z.infer<typeof singleOptionControl>;
export type BinaryOptionControl = z.infer<typeof binaryOptionControl>;
export type OptionControl = z.infer<typeof optionControl>;

export class BasicOptions implements Options {
    constructor(readonly options: OptionControlList) {}

    prettyPrint(): string {
        return this.options
            .map((control) => {
                if (control.kind === "single-select") {
                    const selectedValue = Array.isArray(control.value) ? control.value[0] : control.value;
                    const selectedLabel = control.options[selectedValue] || selectedValue;
                    return `Single Select: ${control.label} with options [${Object.keys(control.options).join(", ")}] - Selected: ${selectedLabel}`;
                } else if (control.kind === "binary-select") {
                    const selectedValue = control.value;
                    const selectedLabel = control.options[selectedValue] || selectedValue;
                    return `Binary Select: ${control.label} with options [${Object.entries(control.options)
                        .map(([key, label]) => `${key}: ${label}`)
                        .join(", ")}] - Selected: ${selectedLabel}`;
                } else {
                    const selectedValues = Array.isArray(control.value) ? control.value : [control.value];
                    const selectedLabels = selectedValues.map((val) => control.options[val] || val);
                    return `Multi Select: ${control.label} with options [${Object.keys(control.options).join(", ")}] - Selected: ${selectedLabels.join(", ")}`;
                }
            })
            .join("\n\n");
    }

    prettyPrintAsConversation(): { question: string; answer: string } {
        const question = this.options
            .map((control) => {
                if (control.kind === "single-select") {
                    return `What is your choice for ${control.label}? Options are: ${Object.entries(control.options)
                        .map(([key, label]) => `${key}: ${label}`)
                        .join(", ")}`;
                } else if (control.kind === "binary-select") {
                    return `What is your choice for ${control.label}? Options are: ${Object.entries(control.options)
                        .map(([key, label]) => `${key}: ${label}`)
                        .join(", ")}`;
                } else {
                    return `What are your choices for ${control.label}? Options are: ${Object.entries(control.options)
                        .map(([key, label]) => `${key}: ${label}`)
                        .join(", ")}`;
                }
            })
            .join("\n");

        const answer = this.options
            .map((control) => {
                if (control.kind === "single-select") {
                    const selectedValue = Array.isArray(control.value) ? control.value[0] : control.value;
                    const selectedLabel = control.options[selectedValue] || selectedValue;
                    return `${control.label}: ${selectedLabel}`;
                } else if (control.kind === "binary-select") {
                    const selectedValue = control.value;
                    const selectedLabel = control.options[selectedValue] || selectedValue;
                    return `${control.label}: ${selectedLabel}`;
                } else {
                    const selectedValues = Array.isArray(control.value) ? control.value : [control.value];
                    const selectedLabels = selectedValues.map((val) => control.options[val] || val);
                    return `${control.label}: ${selectedLabels.join(", ")}`;
                }
            })
            .join("\n");

        return { question, answer };
    }

    mergeOptions(update: BasicOptions): BasicOptions {
        const thisLen = this.options.length;
        // keep any options after len
        const mergedControls = [...this.options.slice(0, thisLen), ...update.options.slice(thisLen)];
        return new BasicOptions(mergedControls);
    }

    isEmpty(): boolean {
        return this.options.length === 0;
    }
}

const schemaString: string = `\`\`\`typescript
interface SingleOptionControl {
  kind: "single-select";
  label: string;
  options: Record<string, string>;
  value: string;
}

interface MultiOptionControl {
  kind: "multi-select";
  label: string;
  options: Record<string, string>;
  value: string[]; // Must include at least one option
}

interface BinaryOptionControl {
  kind: "binary-select";
  label: string;
  options: {
    enabled: string; // Label for enabled state
    disabled: string; // Label for disabled state
  };
  value: "enabled" | "disabled"; // Must be either "enabled" or "disabled"
}

type OptionControl = SingleOptionControl | MultiOptionControl | BinaryOptionControl;

type OptionControlList = OptionControl[];
\`\`\``;

export const basicOptionSet: OptionSet<BasicOptions> = {
    getSchemaSpec: () => schemaString,
    validateJSON: (value: string): BasicOptions | undefined => {
        try {
            const parsed = JSON.parse(value);

            // First try to parse as the original format
            const originalResult = optionControlList.safeParse(parsed);
            if (originalResult.success) {
                return new BasicOptions(originalResult.data);
            }

            // If that fails, try to parse as the flattened JSON schema format
            if (parsed && typeof parsed === "object" && Array.isArray(parsed.options)) {
                const transformedOptions = parsed.options.map((item: any) => {
                    if (item.kind === "binary-select") {
                        return {
                            kind: item.kind,
                            label: item.label,
                            options: {
                                enabled: item.enabled_label || "Yes",
                                disabled: item.disabled_label || "No",
                            },
                            value: item.selected_values[0] || "disabled",
                        };
                    } else {
                        // Convert flattened format back to our internal format
                        const options: Record<string, string> = {};
                        if (item.option_keys && item.option_values) {
                            for (let i = 0; i < Math.min(item.option_keys.length, item.option_values.length); i++) {
                                options[item.option_keys[i]] = item.option_values[i];
                            }
                        }

                        return {
                            kind: item.kind,
                            label: item.label,
                            options: options,
                            value: item.kind === "single-select" ? item.selected_values[0] : item.selected_values,
                        };
                    }
                });

                const transformedResult = optionControlList.safeParse(transformedOptions);
                if (transformedResult.success) {
                    return new BasicOptions(transformedResult.data);
                }
            }

            return undefined;
        } catch (error) {
            return undefined;
        }
    },
    validatePartialJSON: (value: string): BasicOptions | undefined => {
        try {
            let jsonStr = value;
            const arrayStart = jsonStr.indexOf("[");
            if (arrayStart === -1) return undefined;

            jsonStr = jsonStr.substring(arrayStart);

            for (let i = jsonStr.lastIndexOf("},"); i >= 0; i = jsonStr.lastIndexOf("},", i - 1)) {
                const potentialJson = jsonStr.substring(0, i + 1) + "]";

                try {
                    const parsed = JSON.parse(potentialJson);
                    if (Array.isArray(parsed)) {
                        const validated = basicOptionSet.validateJSON(JSON.stringify(parsed));
                        if (validated) {
                            return validated;
                        }
                    }
                } catch {
                    continue;
                }
            }

            const completeJsonAttempts = [jsonStr, jsonStr + "]", jsonStr.replace(/,\s*$/, "") + "]"];

            for (const attempt of completeJsonAttempts) {
                try {
                    const parsed = JSON.parse(attempt);
                    if (Array.isArray(parsed)) {
                        const validated = basicOptionSet.validateJSON(JSON.stringify(parsed));
                        if (validated) {
                            return validated;
                        }
                    }
                } catch {
                    continue;
                }
            }
            return undefined;
        } catch (error) {
            return undefined;
        }
    },
    emptyOptions: () => new BasicOptions([]),
    mergeOptions: (base: BasicOptions, update: BasicOptions): BasicOptions => {
        return base.mergeOptions(update);
    },
};



================================================
FILE: packages/promptions-llm/src/index.ts
================================================
// Export all public APIs from this package
// This file serves as the main entry point

export * from "./types";
export * from "./basicOptions";



================================================
FILE: packages/promptions-llm/src/types.ts
================================================
export interface Options {
    prettyPrint(): string;
    prettyPrintAsConversation?(): { question: string; answer: string };
    isEmpty(): boolean;
}

export interface OptionSet<T extends Options> {
    /**
     * Return a string representation describing the option schema that is suitable for LLMs to understand
     * and generate conforming JSON.
     */
    getSchemaSpec(): string;
    /**
     * Validate the provided JSON string against the option schema.
     */
    validateJSON(value: string): T | undefined;
    /**
     * Incrementally validate a partial JSON string against the option schema
     */
    validatePartialJSON?(value: string): T | undefined;
    /**
     * Returns empty options useful for initializing state or when no options are available.
     */
    emptyOptions(): T;
    /**
     * Merge two options together. Used for apply updates to existing options.
     */
    mergeOptions(base: T, update: T): T;
}



================================================
FILE: packages/promptions-ui/README.md
================================================
# @promptions/promptions-ui

UI components and utilities for promptions applications.

## Features

- React components for rendering LLM options
- Fluent UI integration
- TypeScript support
- Visual option sets for interactive chat interfaces

## Installation

```bash
npm install @promptions/promptions-ui
```

## Usage

```typescript
import { MessageOptions, VisualOptionSet } from "@promptions/promptions-ui";

// Use MessageOptions component to render interactive options
<MessageOptions
    options={options}
    messageId={messageId}
    set={updateFunction}
    disabled={false}
/>
```

## Dependencies

This package requires:

- React 18+
- @fluentui/react-components 9+
- @promptions/promptions-llm

## License

MIT



================================================
FILE: packages/promptions-ui/package.json
================================================
{
    "name": "@promptions/promptions-ui",
    "version": "1.0.0",
    "description": "UI components and utilities for promptions",
    "main": "dist/index.js",
    "types": "dist/index.d.ts",
    "license": "MIT",
    "scripts": {
        "build": "tsc",
        "build:watch": "tsc --watch",
        "clean": "rimraf dist",
        "typecheck": "tsc --noEmit"
    },
    "files": [
        "dist",
        "README.md"
    ],
    "keywords": [
        "ui",
        "react",
        "components",
        "typescript",
        "promptions"
    ],
    "devDependencies": {
        "@types/node": "^20.0.0",
        "@types/react": "^18.0.0",
        "rimraf": "^5.0.0",
        "typescript": "^5.0.0"
    },
    "peerDependencies": {
        "@fluentui/react-components": ">=9.0.0",
        "react": ">=18.0.0",
        "typescript": ">=5.0.0"
    },
    "dependencies": {
        "@promptions/promptions-llm": "1.0.0"
    }
}



================================================
FILE: packages/promptions-ui/project.json
================================================
{
    "name": "promptions-ui",
    "$schema": "../../node_modules/nx/schemas/project-schema.json",
    "sourceRoot": "packages/promptions-ui/src",
    "projectType": "library",
    "targets": {
        "build": {
            "executor": "nx:run-commands",
            "options": {
                "command": "tsc",
                "cwd": "packages/promptions-ui"
            }
        },
        "typecheck": {
            "executor": "nx:run-commands",
            "options": {
                "command": "tsc --noEmit",
                "cwd": "packages/promptions-ui"
            }
        },
        "test": {
            "executor": "nx:run-commands",
            "options": {
                "command": "jest",
                "cwd": "packages/promptions-ui"
            }
        },
        "clean": {
            "executor": "nx:run-commands",
            "options": {
                "command": "rimraf dist",
                "cwd": "packages/promptions-ui"
            }
        }
    },
    "tags": ["type:lib", "scope:promptions-ui"]
}



================================================
FILE: packages/promptions-ui/tsconfig.json
================================================
{
    "extends": "../../tsconfig.json",
    "compilerOptions": {
        "outDir": "./dist",
        "rootDir": "./src",
        "declaration": true,
        "declarationMap": true,
        "jsx": "react-jsx"
    },
    "include": ["src/**/*"],
    "exclude": ["dist", "node_modules", "**/*.test.*", "**/*.spec.*"]
}



================================================
FILE: packages/promptions-ui/src/basicOptions.tsx
================================================
import React from "react";
import { makeStyles, tokens, Radio, Checkbox, Text, Label, Switch } from "@fluentui/react-components";
import {
    BasicOptions,
    SingleOptionControl,
    MultiOptionControl,
    BinaryOptionControl,
    basicOptionSet as b,
} from "@promptions/promptions-llm";
import { VisualOptionSet, OptionRenderer } from "./types";

const useStyles = makeStyles({
    optionsContainer: {
        marginBottom: tokens.spacingVerticalM,
        padding: tokens.spacingVerticalS,
        borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
        borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    },
    optionGroup: {
        marginBottom: tokens.spacingVerticalM,
    },
    optionLabel: {
        fontSize: tokens.fontSizeBase200,
        fontWeight: tokens.fontWeightSemibold,
        marginBottom: tokens.spacingVerticalXS,
        color: tokens.colorNeutralForeground1,
    },
    optionType: {
        fontSize: tokens.fontSizeBase100,
        color: tokens.colorNeutralForeground3,
        marginBottom: tokens.spacingVerticalS,
        fontStyle: "italic",
    },
    choicesContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: tokens.spacingHorizontalM,
    },
    choiceItem: {
        display: "flex",
        alignItems: "center",
        gap: tokens.spacingHorizontalXS,
        padding: tokens.spacingVerticalXS,
    },
    toggleContainer: {
        display: "flex",
        alignItems: "center",
        gap: tokens.spacingHorizontalS,
    },
    toggleLabel: {
        fontSize: tokens.fontSizeBase200,
        color: tokens.colorNeutralForeground1,
    },
});

interface SingleSelectOptionProps {
    option: SingleOptionControl;
    optionIndex: number;
    options: BasicOptions;
    set: (options: BasicOptions) => void;
    disabled: boolean;
}

const SingleSelectOption: React.FC<SingleSelectOptionProps> = ({ option, optionIndex, options, set, disabled }) => {
    const styles = useStyles();

    const currentValue = Array.isArray(option.value) ? option.value[0] : option.value;

    return (
        <div className={styles.choicesContainer}>
            {Object.entries(option.options).map(([key, label]) => (
                <div key={key} className={styles.choiceItem}>
                    <Label>
                        <Radio
                            value={key}
                            checked={currentValue === key}
                            disabled={disabled}
                            onChange={() => {
                                if (disabled) return;
                                set(
                                    new BasicOptions(
                                        options.options.map((opt, idx) =>
                                            idx === optionIndex ? { ...opt, value: key } : opt,
                                        ) as any,
                                    ),
                                );
                            }}
                        />
                        {label}
                    </Label>
                </div>
            ))}
        </div>
    );
};

interface MultiSelectOptionProps {
    option: MultiOptionControl;
    optionIndex: number;
    options: BasicOptions;
    set: (options: BasicOptions) => void;
    disabled: boolean;
}

const MultiSelectOption: React.FC<MultiSelectOptionProps> = ({ option, optionIndex, options, set, disabled }) => {
    const styles = useStyles();

    return (
        <div className={styles.choicesContainer}>
            {Object.entries(option?.options ?? []).map(([key, label]) => {
                const currentValues = Array.isArray(option.value) ? option.value : [];
                const isChecked = currentValues.includes(key);

                return (
                    <div key={key} className={styles.choiceItem}>
                        <Label>
                            <Checkbox
                                checked={isChecked}
                                disabled={disabled}
                                onChange={() => {
                                    if (disabled) return;
                                    const newValues = isChecked
                                        ? currentValues.filter((v: string) => v !== key)
                                        : [...currentValues, key];

                                    set(
                                        new BasicOptions(
                                            options.options.map((opt, idx) =>
                                                idx === optionIndex ? { ...opt, value: newValues } : opt,
                                            ) as any,
                                        ),
                                    );
                                }}
                            />
                            {label}
                        </Label>
                    </div>
                );
            })}
        </div>
    );
};

interface BinaryOptionProps {
    option: BinaryOptionControl;
    optionIndex: number;
    options: BasicOptions;
    set: (options: BasicOptions) => void;
    disabled: boolean;
}

const BinaryOption: React.FC<BinaryOptionProps> = ({ option, optionIndex, options, set, disabled }) => {
    const styles = useStyles();
    const isEnabled = option.value === "enabled";

    return (
        <div className={styles.toggleContainer}>
            <Label className={styles.toggleLabel}>{isEnabled ? option.options.enabled : option.options.disabled}</Label>
            <Switch
                checked={isEnabled}
                disabled={disabled}
                onChange={(_, data) => {
                    if (disabled) return;
                    const newValue = data.checked ? "enabled" : "disabled";
                    set(
                        new BasicOptions(
                            options.options.map((opt, idx) =>
                                idx === optionIndex ? { ...opt, value: newValue } : opt,
                            ) as any,
                        ),
                    );
                }}
            />
        </div>
    );
};

const MessageOptions: OptionRenderer = ({ options, set, disabled = false }) => {
    const styles = useStyles();

    if (!(options instanceof BasicOptions)) {
        throw new Error("Expected options to be an instance of BasicOptions");
    }

    return (
        <div className={styles.optionsContainer}>
            {options.options.map((option: any, optionIndex: number) => (
                <div key={optionIndex} className={styles.optionGroup}>
                    <Text className={styles.optionLabel}>{option.label}</Text>

                    {option.kind === "single-select" ? (
                        <SingleSelectOption
                            option={option}
                            optionIndex={optionIndex}
                            options={options}
                            set={set}
                            disabled={disabled}
                        />
                    ) : option.kind === "binary-select" ? (
                        <BinaryOption
                            option={option}
                            optionIndex={optionIndex}
                            options={options}
                            set={set}
                            disabled={disabled}
                        />
                    ) : (
                        <MultiSelectOption
                            option={option}
                            optionIndex={optionIndex}
                            options={options}
                            set={set}
                            disabled={disabled}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export const basicOptionSet: VisualOptionSet<BasicOptions> = {
    ...b,
    getComponent: () => MessageOptions,
};



================================================
FILE: packages/promptions-ui/src/compactOptions.tsx
================================================
import React from "react";
import {
    makeStyles,
    tokens,
    Dropdown,
    Option,
    Switch,
    Text,
    Label,
    Combobox,
    Tag,
    TagGroup,
    Button,
} from "@fluentui/react-components";
import { Dismiss12Regular } from "@fluentui/react-icons";
import {
    BasicOptions,
    SingleOptionControl,
    MultiOptionControl,
    BinaryOptionControl,
    basicOptionSet as b,
} from "@promptions/promptions-llm";
import { VisualOptionSet, OptionRenderer } from "./types";

const useStyles = makeStyles({
    optionsContainer: {
        marginBottom: tokens.spacingVerticalM,
        padding: tokens.spacingVerticalS,
        borderRadius: tokens.borderRadiusMedium,
        backgroundColor: tokens.colorNeutralBackground2,
        border: `1px solid ${tokens.colorNeutralStroke2}`,
    },
    optionGroup: {
        marginBottom: tokens.spacingVerticalM,
        "&:last-child": {
            marginBottom: "0",
        },
    },
    optionLabel: {
        fontSize: tokens.fontSizeBase200,
        fontWeight: tokens.fontWeightSemibold,
        marginBottom: tokens.spacingVerticalXS,
        color: tokens.colorNeutralForeground1,
        display: "block",
    },
    optionType: {
        fontSize: tokens.fontSizeBase100,
        color: tokens.colorNeutralForeground3,
        marginBottom: tokens.spacingVerticalS,
        fontStyle: "italic",
    },
    singleSelectContainer: {
        display: "flex",
        alignItems: "center",
        gap: tokens.spacingHorizontalM,
    },
    toggleContainer: {
        display: "flex",
        alignItems: "center",
        gap: tokens.spacingHorizontalS,
    },
    toggleLabel: {
        fontSize: tokens.fontSizeBase200,
        color: tokens.colorNeutralForeground1,
    },
    dropdownContainer: {
        minWidth: "200px",
    },
    multiSelectContainer: {
        display: "flex",
        flexDirection: "column",
        gap: tokens.spacingVerticalS,
    },
    selectedTags: {
        marginTop: tokens.spacingVerticalXS,
        display: "flex",
        flexWrap: "wrap",
        rowGap: tokens.spacingHorizontalS,
    },
});

interface CompactSingleSelectOptionProps {
    option: SingleOptionControl;
    optionIndex: number;
    options: BasicOptions;
    set: (options: BasicOptions) => void;
    disabled: boolean;
}

const CompactSingleSelectOption: React.FC<CompactSingleSelectOptionProps> = ({
    option,
    optionIndex,
    options,
    set,
    disabled,
}) => {
    const styles = useStyles();
    const optionEntries = Object.entries(option.options);
    const currentValue = Array.isArray(option.value) ? option.value[0] : option.value;

    // For single-select with more than 2 options, use a dropdown
    return (
        <div className={styles.dropdownContainer}>
            <Dropdown
                value={option.options[currentValue] || currentValue}
                selectedOptions={[currentValue]}
                disabled={disabled}
                onOptionSelect={(_, data) => {
                    if (disabled) return;
                    const selectedValue = data.optionValue;
                    if (selectedValue) {
                        set(
                            new BasicOptions(
                                options.options.map((opt, idx) =>
                                    idx === optionIndex ? { ...opt, value: selectedValue } : opt,
                                ) as any,
                            ),
                        );
                    }
                }}
            >
                {optionEntries.map(([key, label]) => (
                    <Option key={key} value={key}>
                        {label as string}
                    </Option>
                ))}
            </Dropdown>
        </div>
    );
};

interface CompactMultiSelectOptionProps {
    option: MultiOptionControl;
    optionIndex: number;
    options: BasicOptions;
    set: (options: BasicOptions) => void;
    disabled: boolean;
}

const CompactMultiSelectOption: React.FC<CompactMultiSelectOptionProps> = ({
    option,
    optionIndex,
    options,
    set,
    disabled,
}) => {
    const styles = useStyles();
    const optionEntries = Object.entries(option.options);
    const currentValues = Array.isArray(option.value) ? option.value : [];

    return (
        <div className={styles.multiSelectContainer}>
            <Combobox
                multiselect
                placeholder="Select options..."
                disabled={disabled}
                selectedOptions={currentValues}
                value={currentValues.map((val: string) => option.options[val] || val).join(", ")}
                onOptionSelect={(_, data) => {
                    if (disabled) return;
                    const selectedValue = data.optionValue;
                    if (selectedValue) {
                        const isCurrentlySelected = currentValues.includes(selectedValue);
                        const newValues = isCurrentlySelected
                            ? currentValues.filter((v: string) => v !== selectedValue)
                            : [...currentValues, selectedValue];

                        set(
                            new BasicOptions(
                                options.options.map((opt, idx) =>
                                    idx === optionIndex ? { ...opt, value: newValues } : opt,
                                ) as any,
                            ),
                        );
                    }
                }}
            >
                {optionEntries.map(([key, label]) => (
                    <Option key={key} value={key}>
                        {label as string}
                    </Option>
                ))}
            </Combobox>

            {currentValues.length > 0 && (
                <TagGroup className={styles.selectedTags}>
                    {currentValues.map((value: string) => (
                        <div key={value} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                            <Tag>{option.options[value] || value}</Tag>
                            {!disabled && (
                                <Button
                                    appearance="subtle"
                                    size="small"
                                    icon={<Dismiss12Regular />}
                                    onClick={() => {
                                        const newValues = currentValues.filter((v: string) => v !== value);
                                        set(
                                            new BasicOptions(
                                                options.options.map((opt, idx) =>
                                                    idx === optionIndex ? { ...opt, value: newValues } : opt,
                                                ) as any,
                                            ),
                                        );
                                    }}
                                />
                            )}
                        </div>
                    ))}
                </TagGroup>
            )}
        </div>
    );
};

interface CompactBinaryOptionProps {
    option: BinaryOptionControl;
    optionIndex: number;
    options: BasicOptions;
    set: (options: BasicOptions) => void;
    disabled: boolean;
}

const CompactBinaryOption: React.FC<CompactBinaryOptionProps> = ({ option, optionIndex, options, set, disabled }) => {
    const styles = useStyles();
    const isEnabled = option.value === "enabled";

    return (
        <div className={styles.toggleContainer}>
            <Label className={styles.toggleLabel}>{isEnabled ? option.options.enabled : option.options.disabled}</Label>
            <Switch
                checked={isEnabled}
                disabled={disabled}
                onChange={(_, data) => {
                    if (disabled) return;
                    const newValue = data.checked ? "enabled" : "disabled";
                    set(
                        new BasicOptions(
                            options.options.map((opt, idx) =>
                                idx === optionIndex ? { ...opt, value: newValue } : opt,
                            ) as any,
                        ),
                    );
                }}
            />
        </div>
    );
};

const CompactMessageOptions: OptionRenderer = ({ options, set, disabled = false }) => {
    const styles = useStyles();

    if (!(options instanceof BasicOptions)) {
        throw new Error("Expected options to be an instance of BasicOptions");
    }

    return (
        <div className={styles.optionsContainer}>
            {options.options.map((option: any, optionIndex: number) => (
                <div key={optionIndex} className={styles.optionGroup}>
                    <Label className={styles.optionLabel}>{option.label}</Label>

                    {option.kind === "single-select" ? (
                        <CompactSingleSelectOption
                            option={option}
                            optionIndex={optionIndex}
                            options={options}
                            set={set}
                            disabled={disabled}
                        />
                    ) : option.kind === "binary-select" ? (
                        <CompactBinaryOption
                            option={option}
                            optionIndex={optionIndex}
                            options={options}
                            set={set}
                            disabled={disabled}
                        />
                    ) : (
                        <CompactMultiSelectOption
                            option={option}
                            optionIndex={optionIndex}
                            options={options}
                            set={set}
                            disabled={disabled}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

// Export as a new visual option set
export const compactOptionSet: VisualOptionSet<BasicOptions> = {
    ...b,
    getComponent: () => CompactMessageOptions,
};



================================================
FILE: packages/promptions-ui/src/index.ts
================================================
// Export all public APIs from this package
// This file serves as the main entry point

export * from "./types";
export * from "./basicOptions";
export * from "./compactOptions";

export { BasicOptions } from "@promptions/promptions-llm";
export type { Options, OptionSet } from "@promptions/promptions-llm";



================================================
FILE: packages/promptions-ui/src/types.ts
================================================
import { Options, OptionSet } from "@promptions/promptions-llm";

export type OptionRenderer = React.FC<{
    options: Options;
    set: (option: Options) => void;
    disabled?: boolean;
}>;

export interface VisualOptionSet<T extends Options> extends OptionSet<T> {
    getComponent: () => OptionRenderer;
}


