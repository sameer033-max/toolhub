document.addEventListener('DOMContentLoaded', function() {
    console.log('Chatbot script loaded and initialized');
    // Advanced knowledge base for DeepSeek AI with comprehensive capabilities
    const deepseekKnowledge = {
        'hello': "Hello! I'm DeepSeek AI, a state-of-the-art large language model designed to understand and generate human-like text. I'm trained on a vast corpus of data to provide accurate, helpful, and contextually relevant responses. How can I assist you today?",
        
        'help': "I can help you with a wide range of tasks, leveraging my advanced capabilities:\n\n- **Information & Knowledge**: I can provide detailed information on academic subjects, scientific concepts, historical events, current affairs, and more\n\n- **Programming & Technical Support**: I can write, debug, and explain code in Python, JavaScript, Java, C++, Go, Rust and many other languages\n\n- **Creative Writing**: I can draft essays, stories, articles, blog posts, marketing copy, emails, and other content in various styles and tones\n\n- **Problem Solving**: I can help break down complex problems, provide step-by-step solutions, and offer analytical insights\n\n- **Language Processing**: I can translate between languages, summarize long texts, and help improve your writing\n\n- **Learning Assistance**: I can explain difficult concepts, create study materials, and help you understand new subjects\n\n- **Data Analysis**: I can help interpret data, suggest visualization approaches, and extract insights from information\n\nWhat specific type of assistance do you need today?",
        
        'code': "I can assist with coding tasks across numerous programming languages and paradigms. To provide the most helpful response, please share:\n\n1. **Programming Language**: Which language are you working with? (Python, JavaScript, TypeScript, Java, C++, Go, Rust, PHP, Ruby, Swift, Kotlin, etc.)\n\n2. **Project Context**: What are you building? (Web app, mobile app, data analysis, automation, game, API, etc.)\n\n3. **Specific Requirements**: What functionality, performance constraints, or specific libraries/frameworks are you using?\n\n4. **Current Code**: If applicable, share any existing code you're working with or trying to improve\n\n5. **Error Messages**: If debugging, please provide the exact error messages you're encountering\n\nI can help with algorithm design, code optimization, debugging, architecture decisions, best practices, and explaining complex programming concepts.",
        
        'write': "I can help create high-quality written content for various purposes and audiences. My writing capabilities include:\n\n- **Articles & Blog Posts**: Informative, engaging content with proper structure and SEO optimization\n\n- **Academic Writing**: Research papers, essays, literature reviews with proper citations and scholarly tone\n\n- **Business Communication**: Professional emails, reports, proposals, presentations, and marketing materials\n\n- **Creative Writing**: Stories, scripts, poems, and narrative content with engaging plots and characters\n\n- **Technical Documentation**: Clear, concise instructions, API docs, user guides, and technical explanations\n\n- **Web Content**: Landing pages, product descriptions, and conversion-focused copy\n\n- **Social Media**: Platform-specific content optimized for engagement\n\nTo help you best, please share:\n1. Your target audience\n2. The purpose of the content\n3. Preferred tone and style\n4. Any specific points you want to include\n5. Word count or length requirements",
        
        'translate': "I can translate text between numerous languages while preserving meaning, tone, and cultural nuances. For the best results, please provide:\n\n1. **Source Text**: The complete text you want translated\n\n2. **Target Language**: The language you want the text translated into (and specific dialect if applicable)\n\n3. **Context**: The purpose of the translation (casual conversation, business document, technical content, creative work, etc.)\n\n4. **Style Preferences**: Any specific tone or formality level you need maintained\n\n5. **Specialized Terminology**: Any field-specific terms that require particular attention\n\nI can handle translations for many language pairs including English, Spanish, French, German, Chinese, Japanese, Russian, Arabic, Portuguese, Italian, Korean, and many others. I'll do my best to maintain the original meaning while making the translation sound natural in the target language.",
        
        'research': "I can assist with research tasks by:\n\n- Summarizing complex topics and providing overviews of fields of study\n- Explaining scientific concepts and theories\n- Helping formulate research questions and hypotheses\n- Suggesting research methodologies and approaches\n- Analyzing arguments and identifying logical strengths/weaknesses\n- Providing information on historical developments and current trends\n- Offering perspectives from different disciplines\n\nPlease specify your research area and what kind of information or assistance you're looking for.",
        
        'math': "I can help with various mathematical problems and concepts, including:\n\n- Algebra and equations\n- Calculus (derivatives, integrals, differential equations)\n- Statistics and probability\n- Linear algebra and matrices\n- Discrete mathematics\n- Geometry and trigonometry\n- Number theory\n- Mathematical proofs\n\nPlease provide the specific problem or concept you'd like help with, showing your work if applicable so I can understand where you might need assistance.",
        
        'default': "I'm DeepSeek AI, an advanced large language model designed to be helpful, harmless, and honest. I'm trained on a diverse range of internet text to provide informative, accurate, and thoughtful responses across many domains of knowledge.\n\nI can assist with tasks like answering questions, explaining concepts, writing and editing text, generating creative content, solving problems, providing recommendations, and engaging in thoughtful discussions on a wide variety of topics.\n\nI strive to provide balanced perspectives and acknowledge the limitations of my knowledge. While I aim to be helpful, I prioritize accuracy and will acknowledge when I don't have sufficient information rather than providing potentially misleading responses.\n\nHow can I assist you today?"
    };

    // Advanced knowledge base for ChatGPT with comprehensive capabilities
    const chatgptKnowledge = {
        'hello': "Hi there! I'm ChatGPT, an AI assistant developed by OpenAI. I'm designed to be helpful, harmless, and honest in my interactions. I'm here to assist with information, creative tasks, problem-solving, or just conversation. How can I help you today?",
        
        'help': "I can assist you with a wide range of tasks, including:\n\n- **Answering Questions**: Providing information on diverse topics from science and history to arts and culture\n\n- **Creative Writing**: Helping draft stories, poems, scripts, or other creative content\n\n- **Learning Assistance**: Explaining complex concepts, creating study guides, or helping you understand difficult topics\n\n- **Problem Solving**: Breaking down problems and working through solutions step by step\n\n- **Brainstorming**: Generating ideas for projects, content, or solutions to challenges\n\n- **Language Support**: Helping with grammar, style, translations, or language learning\n\n- **Recommendations**: Suggesting books, movies, or resources based on your interests\n\n- **Conversation**: Engaging in thoughtful discussion on topics that interest you\n\nWhat would you like help with today?",
        
        'write': "I can help create various types of written content tailored to your needs:\n\n- **Creative Writing**: Stories, poetry, scripts, dialogue, character development, plot ideas\n\n- **Professional Writing**: Resumes, cover letters, business emails, reports, presentations\n\n- **Academic Writing**: Essays, research summaries, thesis statements, study notes\n\n- **Web Content**: Blog posts, articles, product descriptions, social media content\n\n- **Personal Writing**: Letters, speeches, toasts, personal statements\n\n- **Technical Writing**: Instructions, documentation, explanations of complex concepts\n\nTo help you best, please share:\n1. The type of content you need\n2. Your target audience\n3. The tone you're aiming for (formal, casual, persuasive, etc.)\n4. Any specific points you want to include\n5. Length requirements if applicable",
        
        'explain': "I'd be happy to explain a concept to you. To provide the most helpful explanation, please let me know:\n\n1. **The Topic**: What specific concept, term, or idea would you like me to explain?\n\n2. **Your Background**: What's your current level of familiarity with this topic? (beginner, some knowledge, advanced)\n\n3. **Your Purpose**: Why are you learning about this? (general interest, school assignment, work project, etc.)\n\n4. **Preferred Style**: How would you like me to explain it?\n   - With analogies and examples\n   - Step-by-step breakdown\n   - Visual descriptions\n   - Historical context\n   - Practical applications\n   - Comparison to similar concepts\n\nI'll tailor my explanation to your needs and make complex ideas accessible while maintaining accuracy.",
        
        'ideas': "I can help brainstorm ideas across many domains:\n\n- **Creative Projects**: Story concepts, art projects, music themes, video content\n\n- **Business & Entrepreneurship**: Startup ideas, marketing strategies, product innovations, business models\n\n- **Problem Solving**: Approaches to challenges, alternative solutions, process improvements\n\n- **Education & Learning**: Study methods, project topics, research questions, learning activities\n\n- **Personal Development**: Skill-building opportunities, habit formation, productivity systems\n\n- **Entertainment & Leisure**: Hobby ideas, travel plans, event themes, game concepts\n\nTo generate the most relevant ideas, please share:\n1. Your specific area of interest\n2. Any constraints or requirements\n3. Your goals or what you hope to achieve\n4. Resources available to you\n5. Your preferences or style",
        
        'coding': "I can assist with programming and development tasks, including:\n\n- Writing code snippets and functions\n- Debugging existing code\n- Explaining programming concepts\n- Suggesting algorithms and approaches\n- Recommending libraries and tools\n- Helping with project structure and architecture\n- Providing examples and tutorials\n\nI'm familiar with many languages including Python, JavaScript, Java, C/C++, C#, Ruby, PHP, Go, Swift, and more.\n\nPlease share details about your programming task, including the language you're using and what you're trying to accomplish.",
        
        'default': "I'm ChatGPT, an AI assistant created by OpenAI. I'm designed to be helpful, harmless, and honest in my interactions with humans. I'm trained on a diverse range of internet text but have a knowledge cutoff date, after which I don't have information about events or developments.\n\nI can assist with a wide variety of tasks including answering questions, providing explanations, generating creative content, helping with writing and editing, offering suggestions, and engaging in conversation on many topics.\n\nI strive to be accurate, informative, and supportive while respecting important values like truth, fairness, and human autonomy. I aim to avoid harmful, illegal, unethical, deceptive, or manipulative responses.\n\nHow can I help you today?"
    };
    
    // Conversation memory to maintain context
    const conversationMemory = {
        'DeepSeek AI': [],
        'ChatGPT': []
    };
    
    // Maximum conversation history to store
    const MAX_MEMORY = 5;
    
    // NLP processing function with enhanced capabilities
    function processNLP(text) {
        // Convert to lowercase for processing
        const lowerText = text.toLowerCase();
        
        // Extract key entities and intents
        const entities = extractEntities(lowerText);
        const intent = determineIntent(lowerText);
        const sentiment = analyzeSentiment(lowerText);
        
        return {
            processed: lowerText,
            entities: entities,
            intent: intent,
            sentiment: sentiment
        };
    }
    
    // Advanced entity extraction with context awareness
    function extractEntities(text) {
        const entities = [];
        const lowerText = text.toLowerCase();
        
        // Comprehensive entity categories
        const entityCategories = {
            // Programming languages with variations
            programming_language: {
                terms: [
                    { value: 'javascript', aliases: ['js', 'ecmascript', 'node.js', 'nodejs'] },
                    { value: 'python', aliases: ['py', 'python3', 'python2'] },
                    { value: 'java', aliases: [] },
                    { value: 'c++', aliases: ['cpp', 'cplusplus', 'c plus plus'] },
                    { value: 'c#', aliases: ['csharp', 'c sharp'] },
                    { value: 'ruby', aliases: ['rb'] },
                    { value: 'php', aliases: [] },
                    { value: 'go', aliases: ['golang'] },
                    { value: 'rust', aliases: [] },
                    { value: 'typescript', aliases: ['ts'] },
                    { value: 'swift', aliases: [] },
                    { value: 'kotlin', aliases: [] },
                    { value: 'r', aliases: ['rlang'] },
                    { value: 'scala', aliases: [] },
                    { value: 'perl', aliases: [] },
                    { value: 'haskell', aliases: [] },
                    { value: 'lua', aliases: [] },
                    { value: 'dart', aliases: [] },
                    { value: 'julia', aliases: [] },
                    { value: 'shell', aliases: ['bash', 'zsh', 'powershell', 'command line'] }
                ]
            },
            
            // Content types with variations
            content_type: {
                terms: [
                    { value: 'blog', aliases: ['blog post', 'blog article'] },
                    { value: 'article', aliases: ['feature article', 'news article'] },
                    { value: 'essay', aliases: ['academic essay', 'personal essay'] },
                    { value: 'email', aliases: ['e-mail', 'mail', 'message'] },
                    { value: 'report', aliases: ['business report', 'technical report', 'analysis report'] },
                    { value: 'story', aliases: ['short story', 'narrative'] },
                    { value: 'post', aliases: ['social media post', 'forum post'] },
                    { value: 'whitepaper', aliases: ['white paper', 'technical paper'] },
                    { value: 'case study', aliases: ['case analysis', 'business case'] },
                    { value: 'press release', aliases: ['news release', 'media release'] },
                    { value: 'newsletter', aliases: ['bulletin', 'update'] },
                    { value: 'ebook', aliases: ['e-book', 'digital book'] },
                    { value: 'guide', aliases: ['how-to guide', 'tutorial', 'manual'] },
                    { value: 'documentation', aliases: ['docs', 'technical documentation'] },
                    { value: 'resume', aliases: ['cv', 'curriculum vitae'] },
                    { value: 'cover letter', aliases: ['application letter'] },
                    { value: 'proposal', aliases: ['business proposal', 'project proposal'] },
                    { value: 'script', aliases: ['screenplay', 'teleplay', 'dialogue'] },
                    { value: 'poem', aliases: ['poetry', 'verse'] },
                    { value: 'review', aliases: ['critique', 'evaluation'] }
                ]
            },
            
            // Comprehensive topics
            topic: {
                terms: [
                    { value: 'ai', aliases: ['artificial intelligence', 'machine intelligence'] },
                    { value: 'machine learning', aliases: ['ml', 'deep learning', 'neural networks'] },
                    { value: 'web development', aliases: ['web dev', 'website development', 'web programming'] },
                    { value: 'data science', aliases: ['data analysis', 'big data', 'data mining'] },
                    { value: 'marketing', aliases: ['digital marketing', 'content marketing', 'market research'] },
                    { value: 'seo', aliases: ['search engine optimization', 'search optimization'] },
                    { value: 'business', aliases: ['entrepreneurship', 'startup', 'company', 'corporate'] },
                    { value: 'finance', aliases: ['financial', 'investing', 'money management'] },
                    { value: 'health', aliases: ['healthcare', 'wellness', 'medical', 'fitness'] },
                    { value: 'education', aliases: ['learning', 'teaching', 'academic', 'school'] },
                    { value: 'science', aliases: ['scientific', 'research', 'laboratory'] },
                    { value: 'technology', aliases: ['tech', 'technological', 'digital technology'] },
                    { value: 'environment', aliases: ['environmental', 'sustainability', 'climate'] },
                    { value: 'psychology', aliases: ['mental health', 'behavior', 'cognitive'] },
                    { value: 'design', aliases: ['graphic design', 'ux design', 'ui design', 'web design'] },
                    { value: 'art', aliases: ['artistic', 'fine art', 'visual art'] },
                    { value: 'music', aliases: ['musical', 'audio', 'sound'] },
                    { value: 'literature', aliases: ['literary', 'books', 'writing'] },
                    { value: 'history', aliases: ['historical', 'past events'] },
                    { value: 'politics', aliases: ['political', 'government', 'policy'] },
                    { value: 'sports', aliases: ['athletics', 'fitness', 'games'] },
                    { value: 'travel', aliases: ['tourism', 'vacation', 'journey'] },
                    { value: 'food', aliases: ['cooking', 'cuisine', 'nutrition', 'recipes'] },
                    { value: 'fashion', aliases: ['style', 'clothing', 'apparel'] },
                    { value: 'photography', aliases: ['photos', 'images', 'camera'] },
                    { value: 'film', aliases: ['movies', 'cinema', 'video'] },
                    { value: 'gaming', aliases: ['video games', 'games', 'esports'] },
                    { value: 'social media', aliases: ['social networks', 'online platforms'] },
                    { value: 'cybersecurity', aliases: ['security', 'infosec', 'data security'] },
                    { value: 'blockchain', aliases: ['crypto', 'cryptocurrency', 'web3'] }
                ]
            },
            
            // Technical frameworks and tools
            framework: {
                terms: [
                    { value: 'react', aliases: ['reactjs', 'react.js'] },
                    { value: 'angular', aliases: ['angularjs', 'angular.js'] },
                    { value: 'vue', aliases: ['vuejs', 'vue.js'] },
                    { value: 'django', aliases: [] },
                    { value: 'flask', aliases: [] },
                    { value: 'express', aliases: ['expressjs', 'express.js'] },
                    { value: 'spring', aliases: ['spring boot', 'spring framework'] },
                    { value: 'laravel', aliases: [] },
                    { value: 'tensorflow', aliases: ['tf'] },
                    { value: 'pytorch', aliases: ['torch'] },
                    { value: 'bootstrap', aliases: [] },
                    { value: 'jquery', aliases: [] },
                    { value: 'node', aliases: ['nodejs', 'node.js'] },
                    { value: 'rails', aliases: ['ruby on rails'] },
                    { value: 'wordpress', aliases: ['wp'] },
                    { value: 'flutter', aliases: [] },
                    { value: 'react native', aliases: [] },
                    { value: 'svelte', aliases: [] },
                    { value: 'next.js', aliases: ['nextjs'] },
                    { value: 'nuxt.js', aliases: ['nuxtjs'] }
                ]
            }
        };
        
        // Process each category
        Object.entries(entityCategories).forEach(([category, { terms }]) => {
            terms.forEach(({ value, aliases }) => {
                // Check for the main term
                if (lowerText.includes(value)) {
                    // Find context around the entity
                    const context = findContextWords(lowerText, value);
                    entities.push({
                        type: category,
                        value: value,
                        context: context,
                        confidence: 0.9 // High confidence for exact match
                    });
                } else {
                    // Check for aliases
                    for (const alias of aliases) {
                        if (lowerText.includes(alias)) {
                            const context = findContextWords(lowerText, alias);
                            entities.push({
                                type: category,
                                value: value, // Use the canonical value
                                matchedAlias: alias,
                                context: context,
                                confidence: 0.8 // Slightly lower confidence for alias match
                            });
                            break; // Found an alias, no need to check others
                        }
                    }
                }
            });
        });
        
        // Named entity recognition (simple version)
        const nameRegex = /\b([A-Z][a-z]+ [A-Z][a-z]+)\b/g;
        const matches = text.match(nameRegex);
        if (matches) {
            matches.forEach(name => {
                entities.push({
                    type: 'person',
                    value: name,
                    confidence: 0.7 // Lower confidence for pattern-based detection
                });
            });
        }
        
        // Date/time recognition
        const dateTimePatterns = [
            {regex: /\b\d{1,2}\/\d{1,2}\/\d{2,4}\b/g, type: 'date'},
            {regex: /\b(january|february|march|april|may|june|july|august|september|october|november|december)\s+\d{1,2}(st|nd|rd|th)?(,?\s+\d{4})?\b/gi, type: 'date'},
            {regex: /\b\d{1,2}:\d{2}\s*(am|pm)?\b/gi, type: 'time'}
        ];
        
        dateTimePatterns.forEach(pattern => {
            const matches = text.match(pattern.regex);
            if (matches) {
                matches.forEach(match => {
                    entities.push({
                        type: pattern.type,
                        value: match,
                        confidence: 0.8
                    });
                });
            }
        });
        
        // Remove duplicate entities
        const uniqueEntities = [];
        const seen = new Set();
        
        entities.forEach(entity => {
            const key = `${entity.type}:${entity.value}`;
            if (!seen.has(key)) {
                seen.add(key);
                uniqueEntities.push(entity);
            }
        });
        
        return uniqueEntities;
    }
    
    // Find context words around an entity
    function findContextWords(text, entity, windowSize = 3) {
        const words = text.split(/\s+/);
        const entityWords = entity.split(/\s+/);
        
        // Find the starting index of the entity
        let entityIndex = -1;
        for (let i = 0; i <= words.length - entityWords.length; i++) {
            let match = true;
            for (let j = 0; j < entityWords.length; j++) {
                if (words[i + j] !== entityWords[j]) {
                    match = false;
                    break;
                }
            }
            if (match) {
                entityIndex = i;
                break;
            }
        }
        
        if (entityIndex !== -1) {
            const start = Math.max(0, entityIndex - windowSize);
            const end = Math.min(words.length, entityIndex + entityWords.length + windowSize);
            
            return words.slice(start, entityIndex)
                .concat(words.slice(entityIndex + entityWords.length, end))
                .filter(word => word.length > 3); // Filter out short words
        }
        
        return [];
    }
    
    // Advanced intent recognition with confidence scoring
    function determineIntent(text) {
        const lowerText = text.toLowerCase();
        const intents = [];
        
        // Define intent patterns with keywords and regex patterns
        const intentPatterns = {
            greeting: {
                keywords: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening', 'howdy'],
                patterns: [/^(hi|hello|hey)\b/i],
                weight: 0.9
            },
            
            help: {
                keywords: ['help', 'assist', 'support', 'guide', 'advice', 'how can you help', 'what can you do'],
                patterns: [/how (can|do) (you|I) .{0,20}\?/i, /what (can|do) you .{0,20}\?/i],
                weight: 0.8
            },
            
            code: {
                keywords: ['code', 'program', 'develop', 'script', 'function', 'algorithm', 'debug', 'javascript', 'python', 'java', 'programming', 'coding', 'software', 'app', 'application'],
                patterns: [/how (to|do I) (code|program|implement|debug)/i, /write (a|some) code/i, /help (with|me) (coding|programming)/i],
                weight: 0.85
            },
            
            write: {
                keywords: ['write', 'draft', 'compose', 'create content', 'blog', 'article', 'essay', 'letter', 'email', 'content', 'post', 'story', 'report'],
                patterns: [/help (me|with) writ(e|ing)/i, /draft (a|an)/i, /create (a|an) (blog|article|essay|report)/i],
                weight: 0.8
            },
            
            explain: {
                keywords: ['explain', 'what is', 'how does', 'why is', 'tell me about', 'describe', 'elaborate', 'clarify', 'understand'],
                patterns: [/^(what|how|why|when|where|who|explain|tell me about)/i, /can you (explain|describe|elaborate on)/i],
                weight: 0.85
            },
            
            translate: {
                keywords: ['translate', 'translation', 'in french', 'in spanish', 'in german', 'in japanese', 'in chinese', 'in english', 'from english', 'from spanish'],
                patterns: [/translate .{3,50} (to|into) /i, /how (do you|would you) say .{3,50} in /i],
                weight: 0.9
            },
            
            ideas: {
                keywords: ['idea', 'suggest', 'brainstorm', 'think of', 'come up with', 'creative', 'inspiration', 'innovative', 'concept'],
                patterns: [/give me (some|a few|) ideas/i, /help me (brainstorm|come up with)/i, /suggest (some|a few)/i],
                weight: 0.75
            },
            
            research: {
                keywords: ['research', 'information', 'data', 'facts', 'statistics', 'study', 'analysis', 'investigation', 'findings'],
                patterns: [/find (information|data|research) (about|on)/i, /research (about|on)/i],
                weight: 0.8
            },
            
            math: {
                keywords: ['calculate', 'compute', 'solve', 'equation', 'formula', 'math', 'mathematics', 'arithmetic', 'algebra', 'calculus'],
                patterns: [/solve (this|the) (equation|problem)/i, /calculate (the|this)/i, /what is \d+[\+\-\*\/]\d+/],
                weight: 0.9
            },
            
            opinion: {
                keywords: ['opinion', 'think', 'believe', 'view', 'perspective', 'stance', 'position', 'thoughts', 'feel about'],
                patterns: [/what (do|is) you(r)? (think|opinion|view)/i, /how do you feel about/i],
                weight: 0.7
            },
            
            comparison: {
                keywords: ['compare', 'difference', 'versus', 'vs', 'similarities', 'better', 'worse', 'advantages', 'disadvantages'],
                patterns: [/difference between .{3,30} and .{3,30}/i, /compare .{3,30} (to|with|and) .{3,30}/i, /.{3,20} vs .{3,20}/i],
                weight: 0.85
            },
            
            recommendation: {
                keywords: ['recommend', 'suggestion', 'advise', 'proposal', 'best', 'top', 'favorite', 'suggest'],
                patterns: [/recommend (a|some|the best)/i, /what('s| is) the best/i, /suggest (a|some)/i],
                weight: 0.8
            },
            
            personal: {
                keywords: ['you', 'your name', 'about you', 'who are you', 'what are you', 'created you', 'made you'],
                patterns: [/who (are|created|made|built|designed) you/i, /tell me about (yourself|you)/i],
                weight: 0.85
            },
            
            gratitude: {
                keywords: ['thanks', 'thank you', 'appreciate', 'grateful', 'helpful'],
                patterns: [/^thank(s| you)/i, /appreciate (it|your help)/i],
                weight: 0.95
            },
            
            farewell: {
                keywords: ['bye', 'goodbye', 'see you', 'talk later', 'until next time', 'have a good day'],
                patterns: [/^(bye|goodbye|see you)/i, /talk (to you|with you) later/i],
                weight: 0.9
            }
        };
        
        // Process each intent pattern
        Object.entries(intentPatterns).forEach(([intent, { keywords, patterns, weight }]) => {
            let score = 0;
            
            // Check keywords
            keywords.forEach(keyword => {
                if (lowerText.includes(keyword)) {
                    // Higher score for exact matches at the beginning
                    if (lowerText.startsWith(keyword + ' ')) {
                        score += 0.4 * weight;
                    } else {
                        score += 0.2 * weight;
                    }
                }
            });
            
            // Check regex patterns
            patterns.forEach(pattern => {
                if (pattern.test(lowerText)) {
                    score += 0.5 * weight;
                }
            });
            
            // Add to intents if score is significant
            if (score > 0.3) {
                intents.push({
                    intent: intent,
                    confidence: Math.min(score, 0.99) // Cap at 0.99
                });
            }
        });
        
        // Sort by confidence (highest first)
        intents.sort((a, b) => b.confidence - a.confidence);
        
        // Check for multi-intent queries
        if (intents.length >= 2) {
            // If two intents are close in confidence, consider it a multi-intent query
            if (intents[0].confidence - intents[1].confidence < 0.3) {
                // Check for common combinations
                const intentSet = new Set(intents.slice(0, 2).map(i => i.intent));
                
                // Code explanation combo
                if (intentSet.has('code') && intentSet.has('explain')) {
                    return 'code_explanation';
                }
                
                // Research and write combo
                if (intentSet.has('research') && intentSet.has('write')) {
                    return 'research_writing';
                }
                
                // Compare and recommend combo
                if (intentSet.has('comparison') && intentSet.has('recommendation')) {
                    return 'comparative_recommendation';
                }
            }
        }
        
        // If we have a high-confidence intent, return it
        if (intents.length > 0 && intents[0].confidence > 0.6) {
            return intents[0].intent;
        }
        
        // Special case: check for question patterns if no strong intent found
        if (intents.length === 0 || intents[0].confidence < 0.6) {
            const questionPatterns = [
                /^(what|how|why|when|where|who|which|can|could|would|should|is|are|do|does|did)\b.+\?$/i,
                /\?$/
            ];
            
            for (const pattern of questionPatterns) {
                if (pattern.test(text)) {
                    return 'question';
                }
            }
        }
        
        // Default intent if none of the above or confidence too low
        return intents.length > 0 ? intents[0].intent : 'default';
    }
    
    // Advanced sentiment analysis with intensity and context awareness
    function analyzeSentiment(text) {
        const lowerText = text.toLowerCase();
        
        // Define sentiment lexicons with intensity scores
        const sentimentLexicon = {
            // Positive words with intensity scores (0.0 to 1.0)
            positive: {
                // High intensity positive (0.8-1.0)
                'amazing': 0.9,
                'excellent': 0.9,
                'outstanding': 0.9,
                'fantastic': 0.9,
                'superb': 0.9,
                'brilliant': 0.9,
                'exceptional': 0.9,
                'extraordinary': 0.9,
                'incredible': 0.9,
                'perfect': 1.0,
                'love': 0.9,
                'adore': 0.9,
                'thrilled': 0.9,
                'ecstatic': 1.0,
                'overjoyed': 0.95,
                
                // Medium intensity positive (0.6-0.79)
                'good': 0.6,
                'great': 0.7,
                'wonderful': 0.75,
                'terrific': 0.75,
                'awesome': 0.75,
                'happy': 0.7,
                'pleased': 0.65,
                'delighted': 0.75,
                'satisfied': 0.65,
                'impressive': 0.7,
                'enjoyable': 0.65,
                'pleasant': 0.6,
                'favorable': 0.6,
                'positive': 0.6,
                
                // Low intensity positive (0.3-0.59)
                'nice': 0.5,
                'fine': 0.4,
                'decent': 0.45,
                'okay': 0.3,
                'acceptable': 0.35,
                'adequate': 0.35,
                'satisfactory': 0.5,
                'sufficient': 0.4,
                'content': 0.5,
                'glad': 0.55,
                'appreciate': 0.55,
                'like': 0.5,
                'helpful': 0.55,
                'useful': 0.5,
                'valuable': 0.55
            },
            
            // Negative words with intensity scores (-1.0 to 0.0)
            negative: {
                // High intensity negative (-1.0 to -0.8)
                'terrible': -0.9,
                'horrible': -0.9,
                'awful': -0.85,
                'dreadful': -0.9,
                'abysmal': -0.95,
                'atrocious': -0.9,
                'appalling': -0.9,
                'disastrous': -0.9,
                'catastrophic': -0.95,
                'hate': -0.9,
                'despise': -0.95,
                'detest': -0.9,
                'furious': -0.9,
                'enraged': -0.95,
                'devastated': -0.9,
                'disgusting': -0.9,
                'horrific': -0.95,
                'miserable': -0.85,
                
                // Medium intensity negative (-0.79 to -0.6)
                'bad': -0.6,
                'poor': -0.65,
                'disappointing': -0.7,
                'frustrated': -0.7,
                'annoyed': -0.65,
                'angry': -0.75,
                'upset': -0.7,
                'sad': -0.65,
                'unhappy': -0.7,
                'dislike': -0.65,
                'negative': -0.6,
                'unpleasant': -0.65,
                'irritated': -0.7,
                'troubled': -0.65,
                'displeased': -0.7,
                
                // Low intensity negative (-0.59 to -0.3)
                'wrong': -0.5,
                'problem': -0.5,
                'issue': -0.4,
                'difficult': -0.45,
                'hard': -0.4,
                'concerned': -0.45,
                'worried': -0.55,
                'unsatisfactory': -0.55,
                'inadequate': -0.5,
                'mediocre': -0.5,
                'subpar': -0.55,
                'flawed': -0.5,
                'deficient': -0.55,
                'inferior': -0.55,
                'questionable': -0.4
            }
        };
        
        // Modifiers that intensify or diminish sentiment
        const intensifiers = {
            'very': 1.5,
            'extremely': 1.8,
            'incredibly': 1.7,
            'really': 1.4,
            'so': 1.3,
            'absolutely': 1.6,
            'completely': 1.5,
            'totally': 1.5,
            'utterly': 1.7,
            'especially': 1.3,
            'particularly': 1.3,
            'highly': 1.4,
            'exceptionally': 1.6,
            'remarkably': 1.5,
            'truly': 1.4
        };
        
        const diminishers = {
            'somewhat': 0.7,
            'slightly': 0.6,
            'a bit': 0.7,
            'a little': 0.7,
            'kind of': 0.6,
            'sort of': 0.6,
            'rather': 0.8,
            'fairly': 0.8,
            'moderately': 0.8,
            'relatively': 0.8,
            'partially': 0.7,
            'barely': 0.5,
            'hardly': 0.5,
            'scarcely': 0.5,
            'almost': 0.8
        };
        
        // Negations that flip sentiment
        const negations = ['not', 'no', 'never', 'none', 'neither', 'nor', "don't", "doesn't", "didn't", "won't", "wouldn't", "can't", "couldn't", "shouldn't", "isn't", "aren't", "wasn't", "weren't", 'without', 'lack', 'lacking', 'lacks'];
        
        // Split text into words
        const words = lowerText.split(/\s+/);
        let sentimentScore = 0;
        let wordCount = 0;
        
        // Process each word in context
        for (let i = 0; i < words.length; i++) {
            const word = words[i].replace(/[^a-z']/g, ''); // Clean the word
            
            // Skip empty words
            if (!word) continue;
            
            // Check if current word is in our sentiment lexicons
            let score = 0;
            if (sentimentLexicon.positive[word]) {
                score = sentimentLexicon.positive[word];
            } else if (sentimentLexicon.negative[word]) {
                score = sentimentLexicon.negative[word];
            }
            
            // If we found a sentiment word
            if (score !== 0) {
                wordCount++;
                
                // Look for preceding modifiers (up to 3 words back)
                let modifier = 1.0;
                for (let j = Math.max(0, i - 3); j < i; j++) {
                    const prevWord = words[j].replace(/[^a-z']/g, '');
                    
                    // Check for intensifiers
                    if (intensifiers[prevWord]) {
                        modifier *= intensifiers[prevWord];
                    }
                    
                    // Check for diminishers
                    if (diminishers[prevWord]) {
                        modifier *= diminishers[prevWord];
                    }
                    
                    // Check for negations (flip the sentiment)
                    if (negations.includes(prevWord)) {
                        modifier *= -1;
                    }
                }
                
                // Apply the modifier to the score
                sentimentScore += score * modifier;
            }
        }
        
        // Calculate final sentiment
        let finalScore = wordCount > 0 ? sentimentScore / wordCount : 0;
        
        // Analyze for question patterns which often indicate neutral sentiment regardless of words
        const isQuestion = /\?$/.test(text) || /^(what|how|why|when|where|who|which|can|could|would|should)\b/i.test(text);
        
        // Questions tend to be more neutral unless they contain strong sentiment words
        if (isQuestion && Math.abs(finalScore) < 0.5) {
            finalScore *= 0.5; // Reduce the sentiment intensity for questions
        }
        
        // Detect mixed sentiment (both positive and negative elements)
        let hasPositive = false;
        let hasNegative = false;
        
        for (const word of words) {
            const cleanWord = word.replace(/[^a-z']/g, '');
            if (sentimentLexicon.positive[cleanWord]) hasPositive = true;
            if (sentimentLexicon.negative[cleanWord]) hasNegative = true;
            if (hasPositive && hasNegative) break;
        }
        
        // Return detailed sentiment analysis
        return {
            sentiment: finalScore > 0.1 ? 'positive' : (finalScore < -0.1 ? 'negative' : 'neutral'),
            score: parseFloat(finalScore.toFixed(2)),
            intensity: Math.abs(finalScore) > 0.6 ? 'high' : (Math.abs(finalScore) > 0.3 ? 'medium' : 'low'),
            mixed: hasPositive && hasNegative,
            isQuestion: isQuestion
        };
    }
    
    // Advanced AI response generation with context awareness and natural language capabilities
    function generateResponse(question, knowledgeBase, botName) {
        console.log(`Generating advanced response for ${botName}`);
        
        // Process the question with NLP
        const nlpResult = processNLP(question);
        console.log('NLP Result:', nlpResult);
        
        // Get conversation history
        const history = conversationMemory[botName];
        
        // Add current question to memory
        history.push({role: 'user', content: question, timestamp: getCurrentTime(), type: 'user', text: question});
        if (history.length > MAX_MEMORY * 2) history.splice(0, 2); // Remove oldest Q&A pair if exceeding limit

        // Get current time for timestamp
        const now = new Date();
        const timestamp = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        // Initialize response object with advanced properties
        let responseObj = {
            text: '',
            timestamp: timestamp,
            followUpSuggestions: [],
            confidence: 0.85,
            type: 'assistant',
            role: 'assistant'
        };
        
        // Extract conversation context for more intelligent responses
        const conversationContext = analyzeConversationContext(history);
        const topicChain = conversationContext.topicChain || [];
        const userPreferences = conversationContext.userPreferences || {};
        const recentTopics = topicChain.slice(-3); // Get the 3 most recent topics
        
        // Base response from knowledge base based on intent
        let baseResponse = '';
        
        // Ensure knowledgeBase is valid
        if (!knowledgeBase || typeof knowledgeBase !== 'object') {
            console.error('Invalid knowledge base:', knowledgeBase);
            baseResponse = "I'm sorry, but I'm having trouble accessing my knowledge base. Please try again later.";
            responseObj.text = baseResponse;
            return responseObj;
        }
        
        // First check if the question matches any key in the knowledge base
        for (const key in knowledgeBase) {
            if (question.toLowerCase().includes(key)) {
                baseResponse = knowledgeBase[key];
                responseObj.confidence = 0.95; // Higher confidence for direct matches
                break;
            }
        }
        
        // If no direct match, use intent-based response
        if (!baseResponse) {
            // Map our intents to knowledge base keys
            const intentMap = {
                'greeting': 'hello',
                'help': 'help',
                'code': 'code',
                'code_explanation': 'code',
                'write': 'write',
                'translate': 'translate',
                'explain': 'explain',
                'question': 'default',
                'ideas': 'ideas',
                'research': 'research',
                'math': 'math'
            };
            
            // Get response based on mapped intent or default
            const mappedIntent = intentMap[nlpResult.intent] || 'default';
            baseResponse = knowledgeBase[mappedIntent];
            
            // If we have a coding intent and detected programming languages, enhance the response
            if ((nlpResult.intent === 'code' || nlpResult.intent === 'code_explanation') && 
                nlpResult.entities.some(e => e.type === 'programming_language')) {
                const languages = nlpResult.entities
                    .filter(e => e.type === 'programming_language')
                    .map(e => e.value);
                    
                baseResponse += `\n\nI see you're working with ${languages.join(', ')}. I can provide specific assistance with these languages.`;
            }
            
            // If we have a writing intent and detected content types, enhance the response
            if (nlpResult.intent === 'write' && nlpResult.entities.some(e => e.type === 'content_type')) {
                const contentTypes = nlpResult.entities
                    .filter(e => e.type === 'content_type')
                    .map(e => e.value);
                    
                baseResponse += `\n\nFor your ${contentTypes.join(', ')}, I'll tailor my assistance to these specific formats.`;
            }
        }
        
        // Apply advanced NLP transformations to make responses more natural and contextual
        let enhancedResponse = baseResponse;
        
        // 1. Contextual awareness - reference previous conversation
        if (history.length > 1) {
            // Find references to previous topics
            const pronouns = ['it', 'that', 'this', 'they', 'them', 'those', 'these'];
            const hasPronouns = pronouns.some(pronoun => 
                question.toLowerCase().includes(` ${pronoun} `) || 
                question.toLowerCase().startsWith(`${pronoun} `));
            
            if (hasPronouns && recentTopics.length > 0) {
                // Replace pronouns with actual topics when appropriate
                const mostRecentTopic = recentTopics[recentTopics.length - 1];
                if (mostRecentTopic && !enhancedResponse.includes(mostRecentTopic)) {
                    // Only add context if it's not already in the response
                    enhancedResponse = enhancedResponse.replace(/\n\nI can/i, `\n\nRegarding ${mostRecentTopic}, I can`);
                }
            }
        }
        
        // 2. Entity-based personalization with more natural language
        if (nlpResult.entities.length > 0) {
            // Group entities by type for more coherent responses
            const entityGroups = {};
            nlpResult.entities.forEach(entity => {
                if (!entityGroups[entity.type]) {
                    entityGroups[entity.type] = [];
                }
                entityGroups[entity.type].push(entity.value);
            });
            
            // Process each entity group
            Object.entries(entityGroups).forEach(([type, values]) => {
                // Deduplicate values
                const uniqueValues = [...new Set(values)];
                
                switch (type) {
                    case 'programming_language':
                        if (uniqueValues.length === 1) {
                            const language = uniqueValues[0];
                            // Add programming language expertise
                            if (nlpResult.intent === 'code' || nlpResult.intent === 'code_explanation') {
                                // Add language-specific details based on the language
                                if (language === 'javascript' || language === 'js') {
                                    responseObj.followUpSuggestions.push("How do I optimize JavaScript performance?");
                                    responseObj.followUpSuggestions.push("What are the best JavaScript frameworks?");
                                } else if (language === 'python') {
                                    responseObj.followUpSuggestions.push("How do I work with Python virtual environments?");
                                    responseObj.followUpSuggestions.push("What are the best Python data science libraries?");
                                } else if (language === 'java') {
                                    responseObj.followUpSuggestions.push("How do I set up a Spring Boot application?");
                                    responseObj.followUpSuggestions.push("What are Java best practices for performance?");
                                }
                            }
                        } else if (uniqueValues.length > 1) {
                            // Multiple programming languages mentioned
                            responseObj.followUpSuggestions.push(`Compare ${uniqueValues[0]} vs ${uniqueValues[1]}`);
                        }
                        break;
                        
                    case 'content_type':
                        if (uniqueValues.length === 1) {
                            const contentType = uniqueValues[0];
                            if (nlpResult.intent === 'write') {
                                if (contentType === 'blog' || contentType === 'article') {
                                    responseObj.followUpSuggestions.push(`How do I optimize a ${contentType} for SEO?`);
                                } else if (contentType === 'email') {
                                    responseObj.followUpSuggestions.push(`What are effective email subject lines?`);
                                } else if (contentType === 'report' || contentType === 'whitepaper') {
                                    responseObj.followUpSuggestions.push(`How should I structure a professional ${contentType}?`);
                                }
                            }
                        }
                        break;
                        
                    case 'topic':
                        if (uniqueValues.length >= 1) {
                            // Add the most relevant topic to the topic chain for future reference
                            if (!topicChain.includes(uniqueValues[0])) {
                                topicChain.push(uniqueValues[0]);
                            }
                        }
                        break;
                }
            });
        }
        
        // 3. Sentiment-based response adjustment with more nuanced language
        if (nlpResult.sentiment.sentiment === 'positive') {
            if (nlpResult.sentiment.intensity === 'high') {
                enhancedResponse += '\n\nI'm delighted by your enthusiasm! Your positive energy makes this conversation particularly enjoyable.';
            } else if (nlpResult.sentiment.intensity === 'medium') {
                enhancedResponse += '\n\nI appreciate your positive approach. It's great to have such constructive interactions.';
            } else {
                enhancedResponse += '\n\nThank you for your positive feedback. Is there anything else I can help with?';
            }
        } else if (nlpResult.sentiment.sentiment === 'negative') {
            if (nlpResult.sentiment.intensity === 'high') {
                enhancedResponse += '\n\nI understand your frustration. Let's work together to address your concerns and find a solution that works for you.';
                responseObj.followUpSuggestions.push("What specifically isn't working for you?");
            } else if (nlpResult.sentiment.intensity === 'medium') {
                enhancedResponse += '\n\nI notice you seem concerned about this. I'd like to help resolve any issues you're experiencing.';
            } else {
                enhancedResponse += '\n\nI understand this might be challenging. Please let me know if my response addresses your concerns.';
            }
        }
        
        // 4. Mixed sentiment handling
        if (nlpResult.sentiment.mixed) {
            enhancedResponse += '\n\nI notice you have mixed feelings about this. Could you tell me more about what aspects you like and what concerns you?';
        }
        
        // 5. Intent-specific enhancements
        switch (nlpResult.intent) {
            case 'greeting':
                // Check time of day for appropriate greeting
                const hour = now.getHours();
                let timeGreeting = '';
                if (hour < 12) timeGreeting = 'Good morning';
                else if (hour < 18) timeGreeting = 'Good afternoon';
                else timeGreeting = 'Good evening';
                
                // Check if this is a returning user
                if (history.length > 10) {
                    enhancedResponse = `${timeGreeting}! It's nice to continue our conversation. How can I assist you today?`;
                }
                break;
                
            case 'farewell':
                enhancedResponse = `It's been a pleasure assisting you. Feel free to return anytime you need help. Have a great ${hour < 18 ? 'day' : 'evening'}!`;
                break;
                
            case 'gratitude':
                enhancedResponse = `You're very welcome! I'm here to help. Is there anything else you'd like assistance with?`;
                break;
                
            case 'code_explanation':
                // Add code explanation pattern
                if (!enhancedResponse.includes('Let me explain')) {
                    enhancedResponse += '\n\nLet me explain this step-by-step:\n1. First, understand the problem requirements\n2. Break down the solution into logical components\n3. Implement each component with appropriate syntax\n4. Test thoroughly to ensure correctness';
                }
                responseObj.followUpSuggestions.push("Can you show me an example?");
                break;
        }
        
        // 6. Add bot-specific personality traits
        if (botName === 'DeepSeek AI') {
            // DeepSeek AI has a more technical, precise personality
            enhancedResponse = enhancedResponse.replace(/I think/g, 'My analysis indicates');
            enhancedResponse = enhancedResponse.replace(/probably/g, 'with high probability');
            
            // Add technical details when appropriate
            if (nlpResult.intent === 'code' || nlpResult.intent === 'explain' || nlpResult.intent.includes('technical')) {
                enhancedResponse += '\n\nFor more technical depth on this topic, I can provide implementation details or theoretical foundations as needed.';
            }
        } else if (botName === 'ChatGPT') {
            // ChatGPT has a more conversational, helpful personality
            enhancedResponse = enhancedResponse.replace(/My analysis indicates/g, 'I think');
            enhancedResponse = enhancedResponse.replace(/with high probability/g, 'likely');
            
            // Add more conversational elements
            if (history.length > 2 && !enhancedResponse.includes('earlier')) {
                enhancedResponse += '\n\nBased on our conversation so far, I hope this helps with what you're looking for.';
            }
        }
        
        // 7. Generate follow-up suggestions if not already added
        if (responseObj.followUpSuggestions.length === 0) {
            // Generate generic follow-ups based on intent
            switch (nlpResult.intent) {
                case 'explain':
                    responseObj.followUpSuggestions.push("Can you explain this in simpler terms?");
                    responseObj.followUpSuggestions.push("What are some practical applications?");
                    break;
                case 'code':
                    responseObj.followUpSuggestions.push("What are best practices for this?");
                    responseObj.followUpSuggestions.push("Can you show an example?");
                    break;
                case 'write':
                    responseObj.followUpSuggestions.push("How can I improve this writing?");
                    responseObj.followUpSuggestions.push("What style would work best?");
                    break;
                case 'question':
                    responseObj.followUpSuggestions.push("Tell me more about this topic");
                    responseObj.followUpSuggestions.push("What are common misconceptions?");
                    break;
                default:
                    responseObj.followUpSuggestions.push("Tell me more about this");
                    responseObj.followUpSuggestions.push("How does this work?");
            }
        }
        
        // 8. Format response with markdown for better readability
        enhancedResponse = enhancedResponse
            .replace(/\n\n- /g, '\n\n• ') // Better bullet points
            .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>') // Bold text
            .replace(/\*([^*]+)\*/g, '<em>$1</em>'); // Italic text
            
        // Set the final response text
        responseObj.text = enhancedResponse;
        responseObj.content = enhancedResponse;
        
        // Limit follow-up suggestions to 3 maximum
        if (responseObj.followUpSuggestions.length > 3) {
            responseObj.followUpSuggestions = responseObj.followUpSuggestions.slice(0, 3);
        }
        
        // Add response to memory
        history.push({
            role: 'assistant', 
            type: 'assistant',
            content: enhancedResponse,
            text: enhancedResponse,
            timestamp: timestamp
        });
        
        return responseObj;
    }
    
    // Analyze conversation context to extract topics and user preferences
    function analyzeConversationContext(conversationHistory) {
        const context = {
            topicChain: [],
            userPreferences: {},
            recentQuestions: [],
            sentimentTrend: 'neutral'
        };
        
        // Skip if history is empty
        if (!conversationHistory || conversationHistory.length === 0) {
            return context;
        }
        
        // Analyze the conversation history
        let positiveCount = 0;
        let negativeCount = 0;
        
        conversationHistory.forEach((message, index) => {
            if (message.type === 'user') {
                // Extract potential topics from user messages
                const entities = extractEntities(message.text);
                entities.forEach(entity => {
                    if (entity.type === 'topic' && !context.topicChain.includes(entity.value)) {
                        context.topicChain.push(entity.value);
                    }
                    
                    // Track programming language preferences
                    if (entity.type === 'programming_language') {
                        context.userPreferences.programmingLanguage = entity.value;
                    }
                    
                    // Track content type preferences
                    if (entity.type === 'content_type') {
                        context.userPreferences.contentType = entity.value;
                    }
                });
                
                // Track recent questions for context
                if (message.text.includes('?')) {
                    context.recentQuestions.push(message.text);
                    if (context.recentQuestions.length > 3) {
                        context.recentQuestions.shift(); // Keep only the 3 most recent questions
                    }
                }
                
                // Analyze sentiment trend
                const sentiment = analyzeSentiment(message.text);
                if (sentiment.sentiment === 'positive') positiveCount++;
                if (sentiment.sentiment === 'negative') negativeCount++;
            }
        });
        
        // Determine overall sentiment trend
        if (positiveCount > negativeCount) {
            context.sentimentTrend = 'positive';
        } else if (negativeCount > positiveCount) {
            context.sentimentTrend = 'negative';
        } else {
            context.sentimentTrend = 'neutral';
        }
        
        return context;
    }
    
    // Function to get current timestamp for messages
    function getCurrentTime() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const minutesStr = minutes < 10 ? '0' + minutes : minutes;
        
        return hours + ':' + minutesStr + ' ' + ampm;
    }
    
    // Function to add a message to the conversation UI
    function addMessageToUI(message, role, botName) {
        console.log(`Adding ${role} message to ${botName}:`, message);
        
        const conversationElement = document.getElementById(`${botName.toLowerCase().replace(' ', '-')}-conversation`);
        if (!conversationElement) {
            console.error(`Conversation element not found for ${botName}`);
            return;
        }
        
        const messageContainer = document.createElement('div');
        messageContainer.className = 'message-container';
        
        const messageElement = document.createElement('div');
        messageElement.className = `message ${role === 'user' ? 'user-message' : 'bot-message'}`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        const messageTime = document.createElement('div');
        messageTime.className = 'message-time';
        messageTime.textContent = getCurrentTime();
        
        // Convert newlines to <br> and handle lists
        let formattedMessage = message.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>');
        
        // Handle bullet points
        formattedMessage = formattedMessage.replace(/- (.*?)(<br>|<\/p>|$)/g, '<li>$1</li>$2');
        formattedMessage = formattedMessage.replace(/<li>.*?<\/li>(<br>|<\/p>|$)/g, '<ul class="feature-list">$&</ul>$1');
        
        // Handle numbered lists
        formattedMessage = formattedMessage.replace(/(\d+)\. (.*?)(<br>|<\/p>|$)/g, '<li>$2</li>$3');
        formattedMessage = formattedMessage.replace(/<li>.*?<\/li>(<br>|<\/p>|$)/g, '<ol>$&</ol>$1');
        
        // Wrap in paragraph tags if not already
        if (!formattedMessage.startsWith('<p>')) {
            formattedMessage = `<p>${formattedMessage}</p>`;
        }
        
        messageContent.innerHTML = formattedMessage;
        messageElement.appendChild(messageContent);
        messageElement.appendChild(messageTime);
        messageContainer.appendChild(messageElement);
        conversationElement.appendChild(messageContainer);
        
        // Scroll to bottom
        const messagesContainer = document.getElementById(`${botName.toLowerCase().replace(' ', '-')}-messages`);
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }
    
    // Function to show typing indicator
    function showTypingIndicator(botName) {
        const conversationElement = document.getElementById(`${botName.toLowerCase().replace(' ', '-')}-conversation`);
        if (!conversationElement) {
            console.error(`Conversation element not found for ${botName}`);
            return null;
        }
        
        const typingContainer = document.createElement('div');
        typingContainer.className = 'message-container typing-container';
        typingContainer.innerHTML = `
            <div class="message bot-message" style="max-width: 120px;">
                <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        conversationElement.appendChild(typingContainer);
        
        // Scroll to bottom
        const messagesContainer = document.getElementById(`${botName.toLowerCase().replace(' ', '-')}-messages`);
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
        
        return typingContainer;
    }
    
    // Function to simulate typing animation
    function typeText(element, text, speed = 30) {
        let i = 0;
        element.innerHTML = '';
        
        function typing() {
            if (i < text.length) {
                // Replace newlines with <br> for proper HTML rendering
                if (text.charAt(i) === '\n') {
                    element.innerHTML += '<br>';
                } else {
                    element.innerHTML += text.charAt(i);
                }
                i++;
                setTimeout(typing, speed);
            } else {
                // Animation complete, add typing-done class
                element.classList.add('typing-done');
                
                // Scroll to bottom of container
                const container = element.closest('.response-container');
                if (container) {
                    container.scrollTop = container.scrollHeight;
                }
            }
        }
        
        typing();
    }

    // Remove typing indicator
    function removeTypingIndicator(typingContainer) {
        if (typingContainer && typingContainer.parentNode) {
            typingContainer.parentNode.removeChild(typingContainer);
        }
    }
    
    // Advanced AI capabilities - Context-aware knowledge enhancement
    function enhanceKnowledgeWithContext(question, knowledgeBase, history) {
        // If we have conversation history, use it to enhance responses
        if (history.length > 0) {
            const enhancedKnowledge = {...knowledgeBase};
            
            // Extract topics from conversation history
            const conversationTopics = new Set();
            history.forEach(msg => {
                if (msg.role === 'user') {
                    const nlpResult = processNLP(msg.content);
                    nlpResult.entities.forEach(entity => conversationTopics.add(entity.value));
                }
            });
            
            // Enhance default response with conversation context
            if (conversationTopics.size > 0) {
                const topicsArray = Array.from(conversationTopics);
                enhancedKnowledge.default = enhancedKnowledge.default + `\n\nBased on our conversation about ${topicsArray.join(', ')}, I can provide more tailored assistance.`;
            }
            
            return enhancedKnowledge;
        }
        
        return knowledgeBase;
    }
    
    // Advanced AI capabilities - Response generation with GPT-like patterns
    function generateGPTStyleResponse(question, intent, entities) {
        // Use more sophisticated patterns for response generation
        const patterns = {
            greeting: [
                "Hello! I'm delighted to assist you today. How can I help you?",
                "Hi there! It's great to connect with you. What can I do for you?",
                "Greetings! I'm here and ready to assist with whatever you need."
            ],
            information: [
                "That's an interesting question about {topic}. Here's what I know:",
                "I'd be happy to provide information about {topic}. Let me share some insights:",
                "When it comes to {topic}, there are several important aspects to consider:"
            ],
            instruction: [
                "I can definitely help you with {topic}. Here's how you can approach it:",
                "For {topic}, I recommend following these steps:",
                "To accomplish {topic}, here's a step-by-step guide:"
            ],
            request: [
                "I'd be happy to help with your request about {topic}. Here's what I can offer:",
                "Regarding your request about {topic}, here's what I can do:",
                "I can certainly assist with {topic}. Here's my response:"
            ],
            default: [
                "I understand you're asking about {topic}. Let me provide a comprehensive response:",
                "Thank you for your question about {topic}. Here's my detailed answer:",
                "Regarding {topic}, I can offer the following insights:"
            ]
        };
        
        // Select pattern based on intent
        const intentPatterns = patterns[intent] || patterns.default;
        const randomPattern = intentPatterns[Math.floor(Math.random() * intentPatterns.length)];
        
        // Extract topic from entities or use question
        let topic = question;
        if (entities && entities.length > 0) {
            topic = entities.map(e => e.value).join(', ');
        }
        
        // Replace placeholder with topic
        return randomPattern.replace('{topic}', topic);
    }
    
    // Function to handle question submission with enhanced capabilities
    function handleQuestion(question, botName, knowledgeBase) {
        console.log(`Handling question for ${botName}:`, question.value);
        
        if (!question.value || !question.value.trim()) {
            console.warn('Empty question submitted');
            alert('Please enter a question');
            return;
        }
        
        // Store the question text
        const questionText = question.value.trim();
        console.log('Processing question:', questionText);
        
        // Add user message to UI
        addMessageToUI(questionText, 'user', botName);
        
        // Show typing indicator
        const typingIndicator = showTypingIndicator(botName);
        
        // Get conversation history
        const history = conversationMemory[botName];
        
        // Enhance knowledge base with context
        const enhancedKnowledge = enhanceKnowledgeWithContext(questionText, knowledgeBase, history);
        
        // Generate intelligent response with a realistic delay
        setTimeout(() => {
            try {
                // Remove typing indicator
                removeTypingIndicator(typingIndicator);
                
                // Process the question with NLP
                const nlpResult = processNLP(questionText);
                console.log('NLP Result:', nlpResult);
                
                // Generate GPT-style introduction
                const introText = generateGPTStyleResponse(questionText, nlpResult.intent, nlpResult.entities);
                
                // Generate main response
                const responseObj = generateResponse(questionText, enhancedKnowledge, botName);
                console.log('Response object:', responseObj);
                
                // Extract the text from the response object
                let mainResponseText = '';
                if (typeof responseObj === 'string') {
                    mainResponseText = responseObj;
                } else if (responseObj && responseObj.text) {
                    mainResponseText = responseObj.text;
                } else if (responseObj && responseObj.content) {
                    mainResponseText = responseObj.content;
                } else {
                    mainResponseText = 'I apologize, but I encountered an issue generating a response. Please try asking your question again.';
                    console.error('Invalid response object:', responseObj);
                }
                
                // Skip the intro text if we already have a complete response
                let enhancedResponse;
                if (mainResponseText.length > 100) {
                    // If we have a substantial response, use it directly
                    enhancedResponse = mainResponseText;
                } else {
                    // Otherwise, combine with the intro for a more sophisticated response
                    enhancedResponse = `${introText}\n\n${mainResponseText}`;
                }
                console.log('Final response:', enhancedResponse);
                
                // Add bot message to UI
                addMessageToUI(enhancedResponse, 'assistant', botName);
                
                // Clear the input field
                question.value = '';
                
                // Add follow-up suggestions based on the conversation
                setTimeout(() => {
                    try {
                        // Use follow-up suggestions from the response object if available
                        if (responseObj && responseObj.followUpSuggestions && responseObj.followUpSuggestions.length > 0) {
                            addCustomFollowUpSuggestions(botName, responseObj.followUpSuggestions);
                        } else {
                            addFollowUpSuggestions(botName, nlpResult);
                        }
                    } catch (suggestionError) {
                        console.error('Error adding follow-up suggestions:', suggestionError);
                    }
                }, 1000);
            } catch (error) {
                console.error('Error generating response:', error);
                removeTypingIndicator(typingIndicator);
                addMessageToUI('I apologize, but I encountered an error processing your request. Please try again.', 'assistant', botName);
            }
        }, 1500);
    }
    
    // Function to copy response
    function copyResponse(content) {
        navigator.clipboard.writeText(content.textContent)
            .then(() => {
                const copyBtn = content.closest('.response-container').querySelector('.copy-response');
                const originalIcon = copyBtn.innerHTML;
                copyBtn.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    copyBtn.innerHTML = originalIcon;
                }, 2000);
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
            });
    }
    
    // Function to clear conversation history
    function clearConversation(botName) {
        conversationMemory[botName] = [];
        console.log(`Cleared conversation history for ${botName}`);
    }

    // Function to add follow-up suggestions
    function addFollowUpSuggestions(botName, nlpResult) {
        const conversationElement = document.getElementById(`${botName.toLowerCase().replace(' ', '-')}-conversation`);
        if (!conversationElement) {
            console.error(`Conversation element not found for ${botName}`);
            return;
        }
        
        const suggestionsContainer = document.createElement('div');
        suggestionsContainer.className = 'follow-up-suggestions';
        
        // Generate suggestions based on intent and entities
        const suggestions = generateSuggestions(nlpResult);
        
        // Create suggestion buttons
        suggestions.forEach(suggestion => {
            const button = document.createElement('button');
            button.className = 'suggestion-btn';
            button.textContent = suggestion;
            
            // Add click event to use the suggestion
            button.addEventListener('click', () => {
                const inputElement = document.getElementById(`${botName.toLowerCase().replace(' ', '-')}-question`);
                inputElement.value = suggestion;
                // Trigger the question handling
                handleQuestion(inputElement, botName, botName === 'DeepSeek AI' ? deepseekKnowledge : chatgptKnowledge);
                
                // Remove suggestions after clicking
                if (suggestionsContainer.parentNode) {
                    suggestionsContainer.parentNode.removeChild(suggestionsContainer);
                }
            });
            
            suggestionsContainer.appendChild(button);
        });
        
        conversationElement.appendChild(suggestionsContainer);
        
        // Scroll to bottom
        const messagesContainer = document.getElementById(`${botName.toLowerCase().replace(' ', '-')}-messages`);
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }
    
    // Function to add custom follow-up suggestions from the response object
    function addCustomFollowUpSuggestions(botName, suggestions) {
        console.log(`Adding custom follow-up suggestions for ${botName}:`, suggestions);
        
        const conversationElement = document.getElementById(`${botName.toLowerCase().replace(' ', '-')}-conversation`);
        if (!conversationElement) {
            console.error(`Conversation element not found for ${botName}`);
            return;
        }
        
        const suggestionsContainer = document.createElement('div');
        suggestionsContainer.className = 'follow-up-suggestions';
        
        // Create suggestion buttons from the custom suggestions
        suggestions.forEach(suggestion => {
            const button = document.createElement('button');
            button.className = 'suggestion-btn';
            button.textContent = suggestion;
            
            // Add click event to use the suggestion
            button.addEventListener('click', () => {
                const inputElement = document.getElementById(`${botName.toLowerCase().replace(' ', '-')}-question`);
                inputElement.value = suggestion;
                // Trigger the question handling
                handleQuestion(inputElement, botName, botName === 'DeepSeek AI' ? deepseekKnowledge : chatgptKnowledge);
                
                // Remove suggestions after clicking
                if (suggestionsContainer.parentNode) {
                    suggestionsContainer.parentNode.removeChild(suggestionsContainer);
                }
            });
            
            suggestionsContainer.appendChild(button);
        });
        
        conversationElement.appendChild(suggestionsContainer);
        
        // Scroll to bottom
        const messagesContainer = document.getElementById(`${botName.toLowerCase().replace(' ', '-')}-messages`);
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }
    
    // Generate follow-up suggestions based on NLP results
    function generateSuggestions(nlpResult) {
        const suggestions = [];
        
        // Based on intent
        switch(nlpResult.intent) {
            case 'greeting':
                suggestions.push('What can you help me with?');
                suggestions.push('Tell me about your capabilities');
                break;
            case 'information':
                suggestions.push('Can you explain that in simpler terms?');
                suggestions.push('Tell me more about this topic');
                break;
            case 'instruction':
                suggestions.push('Can you provide an example?');
                suggestions.push('What are common mistakes to avoid?');
                break;
            default:
                // Generic suggestions
                suggestions.push('How does this work?');
                suggestions.push('Can you give me more details?');
        }
        
        // Based on entities
        if (nlpResult.entities.length > 0) {
            const entity = nlpResult.entities[0];
            if (entity.type === 'programming_language') {
                suggestions.push(`What are best practices for ${entity.value}?`);
                suggestions.push(`Show me a ${entity.value} code example`);
            } else if (entity.type === 'content_type') {
                suggestions.push(`How to write an effective ${entity.value}?`);
                suggestions.push(`What makes a good ${entity.value}?`);
            } else if (entity.type === 'topic') {
                suggestions.push(`Latest trends in ${entity.value}`);
                suggestions.push(`How to learn more about ${entity.value}?`);
            }
        }
        
        // Return 2-3 random suggestions
        return suggestions.sort(() => 0.5 - Math.random()).slice(0, Math.min(3, suggestions.length));
    }
    
    // Initialize chatbots and add event listeners
    function initChatbots() {
        console.log('Initializing chatbot event listeners');
        
        // DeepSeek AI event listeners
        const deepseekQuestion = document.getElementById('deepseek-question');
        const deepseekAsk = document.getElementById('deepseek-ask');
        const deepseekClear = document.getElementById('deepseek-clear');
        
        if (deepseekQuestion && deepseekAsk && deepseekClear) {
            // Add click event listener to the ask button
            deepseekAsk.addEventListener('click', function() {
                console.log('DeepSeek Ask button clicked');
                if (deepseekQuestion.value.trim()) {
                    handleQuestion(deepseekQuestion, 'DeepSeek AI', deepseekKnowledge);
                } else {
                    console.warn('Empty question submitted for DeepSeek AI');
                    alert('Please enter a question');
                }
            });
            
            // Add keypress event listener to the question input
            deepseekQuestion.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    console.log('Enter pressed in DeepSeek input');
                    e.preventDefault();
                    if (deepseekQuestion.value.trim()) {
                        handleQuestion(deepseekQuestion, 'DeepSeek AI', deepseekKnowledge);
                    } else {
                        console.warn('Empty question submitted for DeepSeek AI');
                        alert('Please enter a question');
                    }
                }
            });
            
            // Add click event listener to the clear button
            deepseekClear.addEventListener('click', function() {
                console.log('DeepSeek Clear button clicked');
                clearConversation('DeepSeek AI');
                const conversationElement = document.getElementById('deepseek-conversation');
                if (conversationElement) {
                    conversationElement.innerHTML = '';
                }
                // Add initial welcome message
                const welcomeMessage = "Hello! I'm DeepSeek AI, your advanced AI assistant. How can I help you today?";
                addMessageToUI(welcomeMessage, 'assistant', 'DeepSeek AI');
            });
            
            console.log('DeepSeek AI event listeners attached successfully');
        } else {
            console.error('Could not find DeepSeek AI elements');
            console.log('Elements found:', {
                deepseekQuestion: !!deepseekQuestion,
                deepseekAsk: !!deepseekAsk,
                deepseekClear: !!deepseekClear
            });
        }
        
        // ChatGPT event listeners
        const chatgptQuestion = document.getElementById('chatgpt-question');
        const chatgptAsk = document.getElementById('chatgpt-ask');
        const chatgptClear = document.getElementById('chatgpt-clear');
        
        if (chatgptQuestion && chatgptAsk && chatgptClear) {
            // Add click event listener to the ask button
            chatgptAsk.addEventListener('click', function() {
                console.log('ChatGPT Ask button clicked');
                if (chatgptQuestion.value.trim()) {
                    handleQuestion(chatgptQuestion, 'ChatGPT', chatgptKnowledge);
                } else {
                    console.warn('Empty question submitted for ChatGPT');
                    alert('Please enter a question');
                }
            });
            
            // Add keypress event listener to the question input
            chatgptQuestion.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    console.log('Enter pressed in ChatGPT input');
                    e.preventDefault();
                    if (chatgptQuestion.value.trim()) {
                        handleQuestion(chatgptQuestion, 'ChatGPT', chatgptKnowledge);
                    } else {
                        console.warn('Empty question submitted for ChatGPT');
                        alert('Please enter a question');
                    }
                }
            });
            
            // Add click event listener to the clear button
            chatgptClear.addEventListener('click', function() {
                console.log('ChatGPT Clear button clicked');
                clearConversation('ChatGPT');
                const conversationElement = document.getElementById('chatgpt-conversation');
                if (conversationElement) {
                    conversationElement.innerHTML = '';
                }
                // Add initial welcome message
                const welcomeMessage = "Hi there! I'm ChatGPT, an AI assistant ready to help with your questions. What would you like to know?";
                addMessageToUI(welcomeMessage, 'assistant', 'ChatGPT');
            });
            
            console.log('ChatGPT event listeners attached successfully');
        } else {
            console.error('Could not find ChatGPT elements');
            console.log('Elements found:', {
                chatgptQuestion: !!chatgptQuestion,
                chatgptAsk: !!chatgptAsk,
                chatgptClear: !!chatgptClear
            });
        }
        
        // Add debug button for testing
        document.addEventListener('keydown', function(e) {
            // Ctrl+Shift+D for debug mode
            if (e.ctrlKey && e.shiftKey && e.key === 'D') {
                console.log('Debug mode activated');
                console.log('DeepSeek Knowledge:', deepseekKnowledge);
                console.log('ChatGPT Knowledge:', chatgptKnowledge);
                console.log('Conversation Memory:', conversationMemory);
                alert('Debug info logged to console');
            }
        });
    }
    
    // Initialize chatbots when DOM is fully loaded
    initChatbots();
    
    // Add file upload and voice input functionality
    function setupToolButtons() {
        console.log('Setting up tool buttons');
        
        // Add CSS for new elements
        const style = document.createElement('style');
        style.textContent = `
            .follow-up-suggestions {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                margin: 10px 0;
                animation: fadeIn 0.3s ease-in-out;
            }
            
            .suggestion-btn {
                background-color: #f0f2f5;
                border: 1px solid #e4e6eb;
                border-radius: 18px;
                padding: 6px 12px;
                font-size: 0.85rem;
                color: var(--primary-color);
                cursor: pointer;
                transition: all 0.2s ease;
            }
            
            .suggestion-btn:hover {
                background-color: var(--primary-color);
                color: white;
                transform: translateY(-2px);
            }
            
            .recording-indicator {
                position: absolute;
                bottom: 100%;
                left: 0;
                background-color: #ef4444;
                color: white;
                padding: 6px 12px;
                border-radius: 16px;
                font-size: 0.85rem;
                margin-bottom: 8px;
                animation: pulse 1.5s infinite;
            }
            
            @keyframes pulse {
                0% { opacity: 1; }
                50% { opacity: 0.6; }
                100% { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        // Add functionality to file upload buttons
        document.querySelectorAll('.tool-buttons .btn[title="Upload file"]').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Create a simulated file upload experience
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = '.txt,.pdf,.doc,.docx';
                
                input.addEventListener('change', function() {
                    if (this.files && this.files[0]) {
                        const file = this.files[0];
                        const botName = button.closest('.chatbot-window').querySelector('.chatbot-header h3').textContent;
                        const inputElement = document.getElementById(`${botName.toLowerCase().replace(' ', '-')}-question`);
                        
                        // Simulate file processing
                        addMessageToUI(`I'm uploading: ${file.name}`, 'user', botName);
                        
                        // Show typing indicator
                        const typingIndicator = showTypingIndicator(botName);
                        
                        setTimeout(() => {
                            removeTypingIndicator(typingIndicator);
                            
                            // Simulate AI response to file upload
                            const response = `I've received your file: ${file.name} (${(file.size / 1024).toFixed(2)} KB)\n\nI can analyze this file and answer questions about its content. What would you like to know about this document?`;
                            
                            addMessageToUI(response, 'assistant', botName);
                            
                            // Add follow-up suggestions specific to file analysis
                            setTimeout(() => {
                                const suggestionsContainer = document.createElement('div');
                                suggestionsContainer.className = 'follow-up-suggestions';
                                
                                const suggestions = [
                                    'Summarize this document',
                                    'Extract key points',
                                    'Explain complex terms'
                                ];
                                
                                suggestions.forEach(suggestion => {
                                    const button = document.createElement('button');
                                    button.className = 'suggestion-btn';
                                    button.textContent = suggestion;
                                    
                                    button.addEventListener('click', () => {
                                        inputElement.value = suggestion + ' from ' + file.name;
                                        handleQuestion(inputElement, botName, botName === 'DeepSeek AI' ? deepseekKnowledge : chatgptKnowledge);
                                        
                                        if (suggestionsContainer.parentNode) {
                                            suggestionsContainer.parentNode.removeChild(suggestionsContainer);
                                        }
                                    });
                                    
                                    suggestionsContainer.appendChild(button);
                                });
                                
                                const conversationElement = document.getElementById(`${botName.toLowerCase().replace(' ', '-')}-conversation`);
                                if (conversationElement) {
                                    conversationElement.appendChild(suggestionsContainer);
                                    
                                    // Scroll to bottom
                                    const messagesContainer = document.getElementById(`${botName.toLowerCase().replace(' ', '-')}-messages`);
                                    if (messagesContainer) {
                                        messagesContainer.scrollTop = messagesContainer.scrollHeight;
                                    }
                                }
                            }, 500);
                        }, 1500);
                    }
                });
                
                input.click();
            });
        });
        
        // Add functionality to voice input buttons
        document.querySelectorAll('.tool-buttons .btn[title="Voice input"]').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const botName = button.closest('.chatbot-window').querySelector('.chatbot-header h3').textContent;
                const inputElement = document.getElementById(`${botName.toLowerCase().replace(' ', '-')}-question`);
                
                // Add recording indicator
                const recordingIndicator = document.createElement('div');
                recordingIndicator.className = 'recording-indicator';
                recordingIndicator.innerHTML = '<i class="fas fa-microphone-alt"></i> Listening...';
                button.parentNode.appendChild(recordingIndicator);
                
                // Simulate recording for 3 seconds
                setTimeout(() => {
                    // Remove recording indicator
                    if (recordingIndicator.parentNode) {
                        recordingIndicator.parentNode.removeChild(recordingIndicator);
                    }
                    
                    // Simulate transcription result
                    const phrases = [
                        'Tell me about artificial intelligence',
                        'How can I improve my website SEO',
                        'What are the latest trends in web development',
                        'Explain machine learning in simple terms'
                    ];
                    
                    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
                    inputElement.value = randomPhrase;
                    
                    // Trigger the question handling
                    handleQuestion(inputElement, botName, botName === 'DeepSeek AI' ? deepseekKnowledge : chatgptKnowledge);
                }, 3000);
            });
        });
    }
    
    // Setup tool buttons when DOM is fully loaded
    setupToolButtons();
}); 