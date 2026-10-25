
export const projects = [
  {
    slug: "wizbot",
    title: "WizBot",
    summary:
      "An AI-powered support assistant that helps Shopify merchants automate repetitive customer inquiries using their own business knowledge.",
    category: "AI",
    media: {
      type: "image",
      src: "/projects/wizbot.png",
      alt: "WizBot AI customer support interface",
    },
    technologies: ["Python", "Django REST Framework", "PostgreSQL", "RAG", "Cohere", "Shopify"],
    liveUrl: "https://wizbot-ai-saas.vercel.app/",
    sourceUrl: "",
    order: 1,
    details: {
      problem:
        "Online merchants often spend valuable time answering the same customer questions about products, orders, policies, and other business information. Managing these repetitive inquiries manually can slow down customer support and make it harder to scale.",
      solution:
        "WizBot is an AI-powered support assistant designed to answer customer questions using a merchant's own business knowledge. It retrieves relevant information from crawled website content and knowledge uploaded by administrators, then uses retrieval-augmented generation (RAG) to generate context-aware responses.",
      decisions:
        "I used a retrieval-augmented generation pipeline to ground responses in relevant business information rather than relying solely on a language model's general knowledge. The backend uses Django REST Framework and PostgreSQL, with Cohere for embeddings and language-model capabilities. This architecture separates knowledge ingestion, retrieval, and response generation.",
      outcome:
        "Built a working AI support application that brings website content and administrator-provided knowledge into a single question-answering workflow. The project explores how RAG can help merchants reduce repetitive support work while keeping responses grounded in their business information.",
    },
  },
  {
    slug: "study-companion",
    title: "AI Study Companion",
    summary:
      "A personalized, multi-agent study platform that helps students learn from their own notes, practise exam questions, research topics, and track progress.",
    category: "AI",
    media: {
      type: "image",
      src: "/projects/studycompanion.png",
      alt: "AI Study Companion learning interface",
    },
    technologies: ["Python", "Django REST Framework", "Next.js", "PostgreSQL", "pgvector", "LangGraph"],
    liveUrl: "https://ai-study-companion-taupe.vercel.app/",
    sourceUrl: "",
    order: 2,
    details: {
      problem:
        "Students often study using scattered notes and resources, making it difficult to get personalized explanations, practise exam-style questions, find relevant supporting information, and understand which topics need more attention. Generic AI answers may also go beyond the material a student is preparing from.",
      solution:
        "AI Study Companion is a personalized learning platform built around each student's uploaded study materials. It uses four specialized agents: a Tutor Agent for explanations, a Quiz Agent for practice questions, a Research Agent for exploring topics, and a Progress Agent for analysing quiz performance and identifying areas for improvement. Students can activate the capabilities they need as they prepare for exams.",
      decisions:
        "I designed the application around specialized agents rather than placing every learning task in one general-purpose chatbot. Next.js powers the frontend, while Django REST Framework handles backend functionality. PostgreSQL with pgvector supports semantic retrieval from uploaded materials, and LangGraph provides the foundation for coordinating agent workflows. The design prioritizes personalized learning grounded in the student's own notes.",
      outcome:
        "Built a multi-agent learning application that brings note-based tutoring, quiz generation, research assistance, and performance tracking into one study workflow. The project explores how retrieval and agent-based workflows can support more structured and personalized exam preparation.",
    },
  },
  {
    slug: "barcode-scanner",
    title: "Barcode Generator and Scanner",
    summary:
      "A browser-based tool for generating customized QR codes and barcodes and scanning existing codes.",
    category: "Software",
    media: {
      type: "image",
      src: "/projects/barcodescanner.png",
      alt: "Barcode and QR code generator and scanner interface",
    },
    technologies: ["React", "Tailwind CSS", "ZXing"],
    liveUrl: "https://barcode-studio-chi.vercel.app/",
    sourceUrl: "",
    order: 3,
    details: {
      problem:
        "Generating QR codes or barcodes and scanning existing ones can require separate tools. Users who need to create codes for links or other information and read codes on the go benefit from a simple, accessible solution in one place.",
      solution:
        "I built a browser-based application that lets users generate QR codes and barcodes from their chosen information, customize generated codes, and scan existing codes using a compatible device camera.",
      decisions:
        "I used React to build an interactive interface and Tailwind CSS to style the application. ZXing provides barcode-reading capabilities, allowing scanning functionality to be integrated into the user experience. The application brings code generation and scanning together instead of requiring separate tools.",
      outcome:
        "Built a unified QR code and barcode utility that combines generation, customization, and scanning in one interface, making common code-related tasks easier to access.",
    },
  },
];
