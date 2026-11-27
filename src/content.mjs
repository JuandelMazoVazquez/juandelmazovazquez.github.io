export const SITE_URL = 'https://juandelmazovazquez.vercel.app';
export const MIRROR_URL = 'https://juandelmazovazquez.github.io';

export const contact = {
  email: 'delmazo.vazquez@gmail.com',
  phone: '+34 678 64 17 03',
  phoneHref: 'tel:+34678641703',
  linkedin: 'https://www.linkedin.com/in/juan-del-mazo-7500a7276',
  github: 'https://github.com/JuandelMazoVazquez',
};

const gh = (repo) => `https://github.com/JuandelMazoVazquez/${repo}`;

export const content = {
  en: {
    lang: 'en',
    path: '/',
    locale: 'en_GB',
    title: 'Juan del Mazo Vázquez · Analyst by profession, engineer by training',
    description:
      'Junior Business Analyst at Bankinter. Computer engineer with an MSc in Big Data Analytics (1st Class). Experience, projects, what I am building now and CV.',
    ogAlt: 'Juan del Mazo Vázquez. Analyst by profession, engineer by training. Junior Business Analyst at Bankinter, Madrid.',
    nav: { about: 'About', experience: 'Experience', projects: 'Projects', now: 'In progress', education: 'Education', stack: 'Stack', contact: 'Contact' },
    ui: {
      skip: 'Skip to content',
      theme: 'Toggle colour theme',
      langSwitchLabel: 'Leer en español',
      cv: 'Download CV',
      cvOther: 'Spanish version',
      code: 'Code',
      demo: 'Live app',
      private: 'Private repository',
      present: 'Present',
      awards: 'Honours',
      footer: 'Built by hand, no tracking.',
    },
    hero: {
      kicker: 'Madrid · Junior Business Analyst at Bankinter',
      lead: ['Analyst by profession,', 'engineer by training.'],
      value: 'Sociable, proactive and curious. I like building things, deciding with data and stepping up when it is time to lead.',
      legend: ['data', 'decision', 'build'],
    },
    about: {
      heading: 'About',
      blocks: [
        {
          label: 'Now',
          text: 'Since September 2025 I have been a Junior Business Analyst at Bankinter, in the Pre-approved Consumer Loans Analysis team. We use data to make decisions on the pre-approved loan portfolio, with a twofold goal: maximise production and minimise risk. I prepare analyses and business proposals and present them to the Analysis and Consumer Lending directors.',
        },
        {
          label: 'How I work',
          text: 'I learn by building, whether it is production software, a model or a side project that fixes a problem of my own. I would rather settle a discussion with data than with opinions, and I enjoy working with people: when a call has to be made, I am happy to make it and own the result.',
        },
        {
          label: 'Background',
          text: 'I studied Computer Engineering at Universidad Politécnica de Madrid, with an Erasmus year at the University of Bristol. While finishing my degree I spent almost a year and a half at Idaero Solutions building software for the aerospace industry, where I led the development of the visualisation interface of a digital twin. Then I took the MSc in Big Data Analytics at Universidad Carlos III de Madrid and finished it with 1st Class honours.',
        },
      ],
    },
    experience: {
      heading: 'Experience',
      items: [
        {
          role: 'Junior Business Analyst',
          org: 'Bankinter',
          place: 'Pre-approved Consumer Loans Analysis · Madrid',
          start: 'Sep 2025',
          end: null,
          points: [
            'Use data to support decisions on the pre-approved consumer loan portfolio, with a twofold goal: maximise production and minimise risk.',
            'Run segmentation and risk-monitoring analyses to find room for growth and track how the portfolio’s risk evolves.',
            'Prepare business proposals and present them to the Analysis and Consumer Lending directors to optimise the business.',
          ],
        },
        {
          role: 'Software Developer',
          org: 'Idaero Solutions',
          place: 'Aerospace software',
          start: 'Jun 2023',
          end: 'Jun 2024',
          points: [
            'Led the development of the visualisation interface of a digital twin that predicts defects in composite manufacturing for aerospace.',
            'Coordinated stakeholders from 5 companies, aligning technical requirements and project milestones.',
            'Built a low-level library of 8,000+ lines in under 3 months, used by the main application.',
            'Fixed critical and minor bugs and provided technical support.',
          ],
        },
        {
          role: 'Software Development Intern',
          org: 'Idaero Solutions',
          place: 'Aerospace software',
          start: 'Feb 2023',
          end: 'Jun 2023',
          points: ['Shipped high-impact features in C# (6,000+ lines) in an Agile team, using GitHub for version control.'],
        },
      ],
    },
    projects: {
      heading: 'Selected projects',
      intro: 'Research, analysis and software. Each card links to its repository, where the README tells the full story.',
      items: [
        {
          title: 'Lead-lag effects in trading',
          tag: 'MSc thesis · 2025',
          body: 'Which stocks move first? I built an unsupervised pipeline that detects lead-lag relationships across 500 U.S. stocks over 20 years (4,700+ rolling windows) with Dynamic Time Warping and spectral clustering, and turned them into a trading signal. Best model: Sharpe ratio of 0.596, 35% above the cross-correlation baseline (0.442).',
          stack: ['Python', 'DTW', 'Spectral clustering', 'Backtesting'],
          repo: gh('Lead-Lag-Trading-Strategy'),
        },
        {
          title: 'Shuffl',
          tag: 'Side project · 2026',
          body: 'A web app with no server that gives Spotify playlists a truly uniform shuffle: an unbiased Fisher–Yates over crypto.getRandomValues. Designed, built and released end to end; now at v1.4, with 300+ unit and end-to-end tests in CI.',
          stack: ['JavaScript', 'PWA', 'Playwright', 'GitHub Actions'],
          repo: gh('new-spoti'),
          demo: 'https://juandelmazovazquez.github.io/new-spoti/?demo=1',
          demoNote: 'demo mode, no account needed',
        },
        {
          title: 'Optimisation under uncertainty',
          tag: 'MSc · 2025',
          body: 'Regularised regression written as an optimisation problem, constrained nonlinear minimisation and a two-stage stochastic crop-planning model with up to 301 scenarios: EVPI of 4,969.91 and VSS of 899.15.',
          stack: ['Python', 'Pyomo', 'SciPy', 'Stochastic programming'],
          repo: gh('Advanced-Optimization-Nonlinear-Uncertainty'),
        },
        {
          title: 'Sales forecasting from marketing spend',
          tag: 'MSc · 2024',
          body: 'Forecasting weekly sales from advertising investment and web traffic, with time-aware cross-validation. A weighted ensemble of Elastic Net, Random Forest, XGBoost, KNN and a neural network reached a validation MAE of 298.75. Team project.',
          stack: ['R', 'Elastic Net', 'Random Forest', 'XGBoost'],
          repo: gh('Sales-Prediction-Advanced-Regression'),
        },
        {
          title: 'Employee attrition prediction',
          tag: 'MSc · 2024',
          body: 'Predicting which employees will leave when only 16% do: SMOTE and class weights, hyperparameter search with Optuna and SHAP explanations. The tuned XGBoost reached 0.92 balanced accuracy on the test set. Team project.',
          stack: ['Python', 'scikit-learn', 'XGBoost', 'SHAP'],
          repo: gh('Employee-Attrition-Prediction-ML'),
        },
      ],
    },
    now: {
      heading: 'Currently cooking',
      intro: 'What I am building outside work right now. Private repositories are described but not linked.',
      items: [
        {
          title: 'Automated video channel',
          status: 'Live · on autopilot',
          body: 'An AI pipeline that turns verified facts into short vertical videos: an LLM writes the script, text-to-speech voices it, FFmpeg edits it and GitHub Actions publishes it to YouTube and TikTok twice a day. 20,000+ lines of Python and 6,900+ tests.',
          stack: ['Python', 'Gemini API', 'Azure Speech', 'FFmpeg', 'GitHub Actions'],
        },
        {
          title: 'Personal cloud',
          status: 'MVP deployed · testing',
          body: 'Somewhere to back up photos and files from my iPhone and free up space: a PWA on a Cloudflare Worker with private R2 storage, built so that originals are never modified or lost.',
          stack: ['TypeScript', 'Cloudflare Workers', 'R2', 'PWA', 'Vitest'],
        },
        {
          title: 'Shuffl',
          status: 'v1.4 shipped · iterating',
          body: 'Shuffl, the Spotify app above, keeps growing: it is at v1.4 and I keep adding features and polishing the next release.',
          stack: ['JavaScript', 'PWA', 'Playwright'],
          repo: gh('new-spoti'),
        },
      ],
    },
    education: {
      heading: 'Education',
      items: [
        { title: 'MSc in Big Data Analytics', org: 'Universidad Carlos III de Madrid', years: '2024 – 2025', note: 'Final grade: 1st Class (Hons.). Taught in English.' },
        { title: 'BSc in Computer Engineering', org: 'Universidad Politécnica de Madrid', years: '2019 – 2024', note: 'Average grade: 1st Class (Hons.).' },
        { title: 'Erasmus, Computer Science', org: 'University of Bristol', years: '2021 – 2022', note: 'Average grade: 1st Class (Hons.).' },
      ],
      awardsIntro: 'Matrícula de Honor, the top distinction in a Spanish university course, in:',
      awards: [
        ['Web Data Analytics and Usage', 'UC3M', '2025'],
        ['Language Processors', 'UPM', '2022'],
        ['Discrete Mathematics II', 'UPM', '2021'],
        ['Computer Architecture', 'UPM', '2021'],
        ['Concurrency Structure', 'UPM', '2021'],
      ],
      otherHeading: 'Also',
      other: [
        'Private tutor of secondary-school mathematics and university Computer Architecture (2021 – 2023).',
        'Intern at the UPM Student Representative Committee (2022): tracked and allocated the credits of 92 students.',
        'Organised and ran a 26-player padel tournament (2022).',
      ],
    },
    stack: {
      heading: 'Stack',
      groups: [
        ['Proficient', ['Python', 'C#', 'SQL', 'Java']],
        ['Advanced', ['R', 'Spark', 'C++', 'C']],
        ['Intermediate', ['MATLAB', 'Bash', 'Assembly', 'JavaScript', 'TypeScript']],
        ['Libraries & tools', ['pandas', 'scikit-learn', 'XGBoost', 'PySpark', 'Pyomo', 'Playwright', 'Git', 'GitHub Actions']],
        ['AI', ['LLM APIs (Gemini)', 'Claude Code', 'T3 Code', 'Multi-agent workflows', 'Prompt engineering', 'Text-to-speech', 'AI automation']],
      ],
      areasHeading: 'Areas',
      areas: ['Data analytics', 'Credit risk', 'Machine learning', 'Quantitative finance', 'Optimisation', 'Software development'],
      languagesHeading: 'Languages',
      languages: 'Spanish (native) · English (fluent)',
    },
    contactSection: {
      heading: 'Contact',
      body: 'Email is the quickest way to reach me. For anything else, LinkedIn.',
      email: 'Email',
      phone: 'Phone',
      linkedin: 'LinkedIn',
      github: 'GitHub',
    },
  },

  es: {
    lang: 'es',
    path: '/es/',
    locale: 'es_ES',
    title: 'Juan del Mazo Vázquez · Analista de profesión, ingeniero de formación',
    description:
      'Junior Business Analyst en Bankinter. Ingeniero informático con un máster en Big Data Analytics (1st Class). Experiencia, proyectos, lo que construyo ahora y CV.',
    ogAlt: 'Juan del Mazo Vázquez. Analista de profesión, ingeniero de formación. Junior Business Analyst en Bankinter, Madrid.',
    nav: { about: 'Sobre mí', experience: 'Experiencia', projects: 'Proyectos', now: 'En marcha', education: 'Formación', stack: 'Competencias', contact: 'Contacto' },
    ui: {
      skip: 'Saltar al contenido',
      theme: 'Cambiar entre tema claro y oscuro',
      langSwitchLabel: 'Read in English',
      cv: 'Descargar CV',
      cvOther: 'Versión en inglés',
      code: 'Código',
      demo: 'Probar la app',
      private: 'Repositorio privado',
      present: 'actualidad',
      awards: 'Matrículas de Honor',
      footer: 'Hecha a mano y sin rastreadores.',
    },
    hero: {
      kicker: 'Madrid · Junior Business Analyst en Bankinter',
      lead: ['Analista de profesión,', 'ingeniero de formación.'],
      value: 'Sociable, proactivo y curioso. Me gusta construir cosas, decidir con datos y dar un paso al frente cuando toca liderar.',
      legend: ['datos', 'decisión', 'construcción'],
    },
    about: {
      heading: 'Sobre mí',
      blocks: [
        {
          label: 'Ahora',
          text: 'Desde septiembre de 2025 soy Junior Business Analyst en Bankinter, en el equipo de Análisis de Préstamos Preautorizados de Consumo. Trabajamos con datos para decidir sobre la cartera de preautorizados con un doble objetivo: maximizar la producción y minimizar el riesgo. Preparo análisis y propuestas de negocio y los presento a los directores de Análisis y de Consumo.',
        },
        {
          label: 'Cómo trabajo',
          text: 'Aprendo construyendo, ya sea software en producción, un modelo o un proyecto propio que me resuelve un problema. Prefiero que una discusión la zanjen los datos y no las opiniones, y disfruto trabajando con gente: cuando hay que decidir, no me cuesta tomar la decisión y responder por ella.',
        },
        {
          label: 'Trayectoria',
          text: 'Estudié Ingeniería Informática en la Universidad Politécnica de Madrid, con un año de Erasmus en la Universidad de Bristol. Mientras terminaba el grado trabajé casi año y medio en Idaero Solutions haciendo software para el sector aeroespacial, donde dirigí el desarrollo de la interfaz de visualización de un gemelo digital. Después cursé el Máster en Big Data Analytics de la Universidad Carlos III de Madrid, que terminé con 1st Class, la calificación más alta.',
        },
      ],
    },
    experience: {
      heading: 'Experiencia',
      items: [
        {
          role: 'Junior Business Analyst',
          org: 'Bankinter',
          place: 'Análisis de Préstamos Preautorizados de Consumo · Madrid',
          start: 'sept. 2025',
          end: null,
          points: [
            'Analizo datos para apoyar las decisiones sobre la cartera de préstamos preautorizados de consumo, con un doble objetivo: maximizar la producción y minimizar el riesgo.',
            'Hago análisis de segmentación y seguimiento del riesgo para detectar margen de crecimiento y vigilar cómo evoluciona el riesgo de la cartera.',
            'Preparo propuestas para optimizar el negocio y las presento a los directores de Análisis y de Consumo.',
          ],
        },
        {
          role: 'Desarrollador de software',
          org: 'Idaero Solutions',
          place: 'Software para el sector aeroespacial',
          start: 'jun. 2023',
          end: 'jun. 2024',
          points: [
            'Dirigí el desarrollo de la interfaz de visualización de un gemelo digital que predice defectos en la fabricación de materiales compuestos para el sector aeroespacial.',
            'Coordiné a stakeholders de 5 empresas para alinear requisitos técnicos e hitos del proyecto.',
            'Desarrollé en menos de 3 meses una librería de bajo nivel de 8.000+ líneas que usa la aplicación principal.',
            'Corregí errores críticos y menores y di soporte técnico.',
          ],
        },
        {
          role: 'Becario de desarrollo de software',
          org: 'Idaero Solutions',
          place: 'Software para el sector aeroespacial',
          start: 'feb. 2023',
          end: 'jun. 2023',
          points: ['Desarrollé en C# funcionalidades de alto impacto (6.000+ líneas) en un equipo ágil, con GitHub para el control de versiones.'],
        },
      ],
    },
    projects: {
      heading: 'Proyectos destacados',
      intro: 'Investigación, análisis y software. Cada tarjeta enlaza a su repositorio, donde el README lo cuenta con detalle.',
      items: [
        {
          title: 'Efectos lead-lag en trading',
          tag: 'TFM · 2025',
          body: '¿Qué acciones se mueven primero? Construí un sistema no supervisado que detecta relaciones lead-lag entre 500 acciones de EE. UU. a lo largo de 20 años (4.700+ ventanas móviles) con Dynamic Time Warping y clustering espectral, y las convertí en una señal de trading. El mejor modelo logra un ratio de Sharpe de 0,596, un 35 % por encima del modelo de referencia de correlación cruzada (0,442).',
          stack: ['Python', 'DTW', 'Clustering espectral', 'Backtesting'],
          repo: gh('Lead-Lag-Trading-Strategy'),
        },
        {
          title: 'Shuffl',
          tag: 'Proyecto personal · 2026',
          body: 'Una aplicación web sin servidor que baraja las playlists de Spotify de forma realmente uniforme, con un Fisher–Yates sin sesgo sobre crypto.getRandomValues. La diseñé, construí y publiqué yo; va por la v1.4 y tiene 300+ pruebas unitarias y end-to-end en CI.',
          stack: ['JavaScript', 'PWA', 'Playwright', 'GitHub Actions'],
          repo: gh('new-spoti'),
          demo: 'https://juandelmazovazquez.github.io/new-spoti/?demo=1',
          demoNote: 'modo demo, sin cuenta',
        },
        {
          title: 'Optimización con incertidumbre',
          tag: 'Máster · 2025',
          body: 'Regresión regularizada planteada como problema de optimización, minimización no lineal con restricciones y un modelo estocástico en dos etapas para planificar cultivos con hasta 301 escenarios: EVPI de 4.969,91 y VSS de 899,15.',
          stack: ['Python', 'Pyomo', 'SciPy', 'Programación estocástica'],
          repo: gh('Advanced-Optimization-Nonlinear-Uncertainty'),
        },
        {
          title: 'Previsión de ventas según la inversión en marketing',
          tag: 'Máster · 2024',
          body: 'Previsión de las ventas semanales a partir de la inversión publicitaria y el tráfico web, con una validación cruzada que respeta el orden temporal. Una combinación ponderada (ensemble) de Elastic Net, Random Forest, XGBoost, KNN y una red neuronal consiguió un MAE de validación de 298,75. Proyecto en equipo.',
          stack: ['R', 'Elastic Net', 'Random Forest', 'XGBoost'],
          repo: gh('Sales-Prediction-Advanced-Regression'),
        },
        {
          title: 'Predicción de la rotación de empleados',
          tag: 'Máster · 2024',
          body: 'Predecir quién dejará la empresa cuando solo se va el 16 % de la plantilla: SMOTE y pesos por clase, ajuste de hiperparámetros con Optuna y explicaciones con SHAP. El XGBoost ajustado alcanzó una balanced accuracy de 0,92 en el conjunto de prueba. Proyecto en equipo.',
          stack: ['Python', 'scikit-learn', 'XGBoost', 'SHAP'],
          repo: gh('Employee-Attrition-Prediction-ML'),
        },
      ],
    },
    now: {
      heading: 'Ahora mismo en el horno',
      intro: 'Lo que estoy construyendo ahora fuera del trabajo. De los repositorios privados cuento de qué van, pero no los enlazo.',
      items: [
        {
          title: 'Canal de vídeo automatizado',
          status: 'En marcha · piloto automático',
          body: 'Un sistema con IA que convierte hechos verificados en vídeos verticales cortos: un LLM escribe el guion, la síntesis de voz lo narra, FFmpeg lo monta y GitHub Actions lo publica dos veces al día en YouTube y TikTok. 20.000+ líneas de Python y 6.900+ pruebas.',
          stack: ['Python', 'API de Gemini', 'Azure Speech', 'FFmpeg', 'GitHub Actions'],
        },
        {
          title: 'Nube personal',
          status: 'MVP desplegado · en pruebas',
          body: 'Un sitio donde guardar las fotos y los archivos del iPhone para liberar espacio: una PWA sobre un Cloudflare Worker con almacenamiento privado en R2, pensada para que los originales nunca se modifiquen ni se pierdan.',
          stack: ['TypeScript', 'Cloudflare Workers', 'R2', 'PWA', 'Vitest'],
        },
        {
          title: 'Shuffl',
          status: 'v1.4 publicada · sigo iterando',
          body: 'Shuffl, la app de Spotify de más arriba, sigue creciendo: va por la v1.4 y sigo añadiendo funciones y puliendo la siguiente versión.',
          stack: ['JavaScript', 'PWA', 'Playwright'],
          repo: gh('new-spoti'),
        },
      ],
    },
    education: {
      heading: 'Formación',
      items: [
        { title: 'Máster en Big Data Analytics', org: 'Universidad Carlos III de Madrid', years: '2024 – 2025', note: 'Calificación final: 1st Class (Hons.). Impartido en inglés.' },
        { title: 'Grado en Ingeniería Informática', org: 'Universidad Politécnica de Madrid', years: '2019 – 2024', note: 'Nota media: 1st Class (Hons.).' },
        { title: 'Erasmus en Informática (Computer Science)', org: 'Universidad de Bristol', years: '2021 – 2022', note: 'Nota media: 1st Class (Hons.).' },
      ],
      awardsIntro: 'Matrícula de Honor en:',
      awards: [
        ['Web Data Analytics and Usage', 'UC3M', '2025'],
        ['Procesadores de Lenguajes', 'UPM', '2022'],
        ['Matemática Discreta II', 'UPM', '2021'],
        ['Arquitectura de Computadores', 'UPM', '2021'],
        ['Estructura de la Concurrencia', 'UPM', '2021'],
      ],
      otherHeading: 'Además',
      other: [
        'Clases particulares de Matemáticas de ESO y Bachillerato y de Arquitectura de Computadores a estudiantes de Ingeniería (2021 – 2023).',
        'Becario en la Delegación de Alumnos de la UPM (2022): llevé el cómputo y la asignación de créditos de 92 estudiantes.',
        'Organicé y dirigí un torneo de pádel de 26 jugadores (2022).',
      ],
    },
    stack: {
      heading: 'Competencias',
      groups: [
        ['Dominio alto', ['Python', 'C#', 'SQL', 'Java']],
        ['Avanzado', ['R', 'Spark', 'C++', 'C']],
        ['Intermedio', ['MATLAB', 'Bash', 'Ensamblador', 'JavaScript', 'TypeScript']],
        ['Librerías y herramientas', ['pandas', 'scikit-learn', 'XGBoost', 'PySpark', 'Pyomo', 'Playwright', 'Git', 'GitHub Actions']],
        ['IA', ['APIs de LLM (Gemini)', 'Claude Code', 'T3 Code', 'Flujos multiagente', 'Prompt engineering', 'Síntesis de voz', 'Automatización con IA']],
      ],
      areasHeading: 'Áreas',
      areas: ['Análisis de datos', 'Riesgo de crédito', 'Aprendizaje automático', 'Finanzas cuantitativas', 'Optimización', 'Desarrollo de software'],
      languagesHeading: 'Idiomas',
      languages: 'Español (nativo) · Inglés (nivel alto)',
    },
    contactSection: {
      heading: 'Contacto',
      body: 'Lo más rápido es escribirme un correo. Para todo lo demás, LinkedIn.',
      email: 'Correo',
      phone: 'Teléfono',
      linkedin: 'LinkedIn',
      github: 'GitHub',
    },
  },
};
