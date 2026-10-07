import {
  UserProfile,
  SkillCompetency,
  SkillGapItem,
  PlanDay,
  Question,
  InterviewSession,
  FinalInterviewReport
} from '../types/interview';

export const initialUserProfile: UserProfile = {
  name: 'Alex Kumar',
  email: 'alex.kumar@example.com',
  targetRole: 'Java Backend Developer',
  experienceLevel: 'Entry to Mid Level (1-3 yrs)',
  currentReadiness: 80,
  skills: ['Java 17', 'Spring Boot', 'SQL & PostgreSQL', 'REST APIs', 'Hibernate/JPA', 'Docker', 'Git'],
  targetCompanies: ['Google', 'Amazon', 'Salesforce', 'Goldman Sachs', 'Stripe'],
  interviewsCompleted: 4,
  streakDays: 4,
  bestScore: 91,
  averageScore: 80,
  resumeFileName: 'Alex_Kumar_Backend_Resume.pdf',
  resumeSummary: 'Backend software engineer with 2 years of Java & Spring Boot experience building high-throughput microservices and relational data layers.'
};

export const initialSkillCompetencies: SkillCompetency[] = [
  { name: 'Technical Knowledge', score: 84, benchmark: 80, trend: '+6% vs target' },
  { name: 'Communication & Delivery', score: 76, benchmark: 75, trend: '+3% vs target' },
  { name: 'Problem Solving & Logic', score: 83, benchmark: 80, trend: '+5% vs target' },
  { name: 'Confidence & Clarity', score: 79, benchmark: 75, trend: '+4% vs target' },
  { name: 'Behavioral Skills', score: 72, benchmark: 75, trend: '-3% vs target' },
];

export const scoreHistoryData = [
  { id: '1', interview: 'Interview 1', date: 'Sep 24', score: 72, role: 'Java Backend Developer' },
  { id: '2', interview: 'Interview 2', date: 'Sep 28', score: 78, role: 'Java Backend Developer' },
  { id: '3', interview: 'Interview 3', date: 'Oct 01', score: 84, role: 'Spring Boot & Microservices' },
  { id: '4', interview: 'Interview 4', date: 'Oct 04', score: 80, role: 'Java Concurrency & DB' },
  { id: '5', interview: 'Interview 5', date: 'Oct 06', score: 91, role: 'Java Backend Developer (Current Best)' },
];

export const skillGapData: SkillGapItem[] = [
  {
    skill: 'Java',
    currentLevel: 91,
    targetLevel: 85,
    status: 'strong',
    gapDescription: 'Demonstrates deep mastery of Java language features, memory model, and collection framework internals.',
    recommendedTopics: ['Java 21 Virtual Threads', 'Garbage Collection tuning (G1GC/ZGC)']
  },
  {
    skill: 'SQL',
    currentLevel: 87,
    targetLevel: 80,
    status: 'strong',
    gapDescription: 'Solid proficiency in complex joins, subqueries, group by aggregation, and relational schema normalization.',
    recommendedTopics: ['Query execution plan optimization', 'Partitioning and composite indexing']
  },
  {
    skill: 'OOP',
    currentLevel: 84,
    targetLevel: 80,
    status: 'strong',
    gapDescription: 'Clear understanding of SOLID principles, polymorphic design patterns, and clean architecture abstractions.',
    recommendedTopics: ['Design patterns in Spring framework (Factory, Singleton, Proxy)']
  },
  {
    skill: 'System Design',
    currentLevel: 61,
    targetLevel: 80,
    status: 'needs_improvement',
    gapDescription: 'Needs more confidence articulating horizontal scaling, distributed caching (Redis), message queues (Kafka), and DB sharding.',
    recommendedTopics: ['CAP theorem & trade-offs', 'Caching strategies & eviction', 'Load balancer algorithms']
  },
  {
    skill: 'DSA',
    currentLevel: 65,
    targetLevel: 80,
    status: 'needs_improvement',
    gapDescription: 'Good with standard arrays and hashmaps, but hesitates on tree traversals, dynamic programming, and binary search boundaries.',
    recommendedTopics: ['Two-pointer and sliding window patterns', 'Graph BFS/DFS', 'Heap / PriorityQueue']
  },
  {
    skill: 'Communication',
    currentLevel: 72,
    targetLevel: 80,
    status: 'needs_improvement',
    gapDescription: 'Sometimes jumps directly into code before clarifying problem constraints or explaining high-level algorithmic intent.',
    recommendedTopics: ['STAR method for behavioral questions', 'Active requirement clarification phrasing']
  }
];

export const sevenDayPlan: PlanDay[] = [
  {
    day: 1,
    title: 'Java Collections',
    topic: 'ArrayList vs LinkedList, HashMap internals, ConcurrentHashMap',
    status: 'completed',
    description: 'Master time/space complexity of all standard Java Collections Framework classes and concurrency safety.',
    estimatedMinutes: 45,
    tasks: [
      { id: 'd1-1', title: 'Review HashMap bucket hashing & treeification (Red-Black Tree)', completed: true, type: 'concept', duration: '15 min' },
      { id: 'd1-2', title: 'Compare ConcurrentHashMap segment locking vs Java 8 synchronized node', completed: true, type: 'code', duration: '20 min' },
      { id: 'd1-3', title: 'Collection Framework 5-question Rapid Fire Quiz', completed: true, type: 'mock', duration: '10 min' }
    ]
  },
  {
    day: 2,
    title: 'SQL Joins',
    topic: 'Inner, Left, Right, Full Outer Joins, Indexing & Query Plans',
    status: 'completed',
    description: 'Practice writing performant SQL queries, understanding explain analyze plans, and relational indexing.',
    estimatedMinutes: 50,
    tasks: [
      { id: 'd2-1', title: 'Study B-Tree vs Hash indexing tradeoffs in PostgreSQL', completed: true, type: 'concept', duration: '15 min' },
      { id: 'd2-2', title: 'Solve 3 complex join and window function problems (ROW_NUMBER, RANK)', completed: true, type: 'code', duration: '25 min' },
      { id: 'd2-3', title: 'Mock SQL schema design interview', completed: true, type: 'mock', duration: '10 min' }
    ]
  },
  {
    day: 3,
    title: 'DSA Arrays',
    topic: 'Two Pointers, Sliding Window, Prefix Sum & Cyclic Sort',
    status: 'in_progress',
    description: 'Master standard algorithmic patterns frequently asked in mid-level backend engineering interviews.',
    estimatedMinutes: 60,
    tasks: [
      { id: 'd3-1', title: 'Implement Two Sum & 3Sum with two pointers in O(n log n)', completed: true, type: 'code', duration: '20 min' },
      { id: 'd3-2', title: 'Master Maximum Subarray sum (Kadane’s Algorithm)', completed: false, type: 'code', duration: '20 min' },
      { id: 'd3-3', title: 'Explain time & space complexity out loud without hesitating', completed: false, type: 'mock', duration: '20 min' }
    ]
  },
  {
    day: 4,
    title: 'Communication',
    topic: 'STAR Method, Structured Problem Solving & Architecture Clarification',
    status: 'upcoming',
    description: 'Structure your answers using Situation, Task, Action, Result and practice confident vocal delivery.',
    estimatedMinutes: 40,
    tasks: [
      { id: 'd4-1', title: 'Prepare 3 STAR stories: Conflict, Production Outage, Complex Bug', completed: false, type: 'concept', duration: '15 min' },
      { id: 'd4-2', title: 'Practice clarifying questions: "Before I write code, let me verify..."', completed: false, type: 'mock', duration: '15 min' },
      { id: 'd4-3', title: 'AI speech delivery clarity assessment', completed: false, type: 'mock', duration: '10 min' }
    ]
  },
  {
    day: 5,
    title: 'System Design',
    topic: 'Scalability, Load Balancing, Redis Caching, DB Sharding',
    status: 'upcoming',
    description: 'Learn how to approach high-level system design interviews from requirements to component architecture.',
    estimatedMinutes: 60,
    tasks: [
      { id: 'd5-1', title: 'Design a URL Shortener (TinyURL) end-to-end', completed: false, type: 'concept', duration: '25 min' },
      { id: 'd5-2', title: 'Cache-Aside vs Write-Through vs Write-Back strategies in Redis', completed: false, type: 'concept', duration: '20 min' },
      { id: 'd5-3', title: 'Practice back-of-the-envelope capacity calculations', completed: false, type: 'mock', duration: '15 min' }
    ]
  },
  {
    day: 6,
    title: 'Mock Interview',
    topic: 'Comprehensive 45-min Adaptive AI Mock Interview',
    status: 'upcoming',
    description: 'Full-length simulated interview with real-time speech feedback, follow-up pressure testing, and scoring.',
    estimatedMinutes: 45,
    tasks: [
      { id: 'd6-1', title: 'Full 10-question adaptive technical interview', completed: false, type: 'mock', duration: '35 min' },
      { id: 'd6-2', title: 'Review instant AI feedback & breakdown', completed: false, type: 'mock', duration: '10 min' }
    ]
  },
  {
    day: 7,
    title: 'Final Assessment',
    topic: 'Interview Readiness Score & Certificate of Completion',
    status: 'upcoming',
    description: 'Final calibration to ensure your readiness score reaches 85%+ across all key engineering competencies.',
    estimatedMinutes: 40,
    tasks: [
      { id: 'd7-1', title: 'Final readiness simulation exam', completed: false, type: 'mock', duration: '30 min' },
      { id: 'd7-2', title: 'Generate updated Skill Gap Report & export cheatsheet', completed: false, type: 'concept', duration: '10 min' }
    ]
  }
];

export const curatedQuestionBank: Question[] = [
  {
    id: 'q-java-1',
    role: 'Java Backend Developer',
    category: 'Java',
    difficulty: 'Medium',
    type: 'Conceptual',
    question: 'Explain the difference between ArrayList and LinkedList in Java.',
    context: 'Standard Java Collections interview question to evaluate memory allocation, time complexity, and internal implementation understanding.',
    hints: [
      'Mention how elements are stored internally (contiguous array vs nodes with pointers).',
      'Compare time complexity for get(i), add(i), and remove(i).',
      'Discuss memory overhead and CPU cache locality.'
    ],
    sampleAnswer: 'ArrayList is backed by a dynamically resizing array that provides O(1) random access by index, but adding/removing in the middle requires O(n) element shifts. LinkedList is implemented as a doubly linked list where each node has pointers to next and previous nodes; insertions/deletions at known positions are O(1), but random access is O(n). In modern architectures, ArrayList is almost always preferred due to CPU cache locality and lower memory footprint (no object node pointers).',
    keyPointsToMention: [
      'Contiguous memory vs doubly-linked node pointers',
      'O(1) random access in ArrayList vs O(n) in LinkedList',
      'Cache friendliness / locality in ArrayList',
      'Memory overhead of 24 bytes per node in LinkedList'
    ],
    adaptiveBranchNote: 'If answered well: AI escalates to HashMap collision resolution & Treeify threshold.'
  },
  {
    id: 'q-java-2',
    role: 'Java Backend Developer',
    category: 'Java',
    difficulty: 'Hard',
    type: 'Conceptual',
    question: 'How does HashMap handle hash collisions internally in Java 8+, and what is the significance of TREEIFY_THRESHOLD?',
    context: 'Tests deep knowledge of Java collections optimization and amortized time complexity.',
    hints: [
      'Mention bucket indexing using (n - 1) & hash.',
      'Explain linked list chaining vs Red-Black Tree.',
      'State the TREEIFY_THRESHOLD (8) and UNTREEIFY_THRESHOLD (6).'
    ],
    sampleAnswer: 'In Java 8+, HashMap stores entries in buckets using hashCode. When collisions occur, entries were traditionally stored in a singly linked list with O(n) lookup. If the number of items in a bucket exceeds TREEIFY_THRESHOLD (8) and the table capacity is at least 64, Java converts that bucket into a balanced Red-Black Tree (TreeNode), reducing worst-case lookup from O(n) to O(log n). If elements decrease to UNTREEIFY_THRESHOLD (6), it converts back to a linked list.',
    keyPointsToMention: [
      'TREEIFY_THRESHOLD = 8 and UNTREEIFY_THRESHOLD = 6',
      'Red-Black Tree worst case O(log n)',
      'Minimum capacity requirement (MIN_TREEIFY_CAPACITY = 64)',
      'hashCode distribution and hash tampering mitigation'
    ]
  },
  {
    id: 'q-java-3',
    role: 'Java Backend Developer',
    category: 'Java',
    difficulty: 'Medium',
    type: 'Conceptual',
    question: 'What is the contract between equals() and hashCode() in Java, and what happens if you override one without the other?',
    context: 'Core OOP and object lifecycle question frequently asked at all levels.',
    hints: ['If two objects are equal by equals(), what must their hashCodes be?', 'How does this affect HashSet or HashMap?'],
    sampleAnswer: 'The contract states: 1) If two objects are equal according to equals(), they must produce the identical integer hashCode. 2) If two objects have the same hashCode, they do NOT necessarily have to be equal (a collision). If you override equals() without hashCode(), objects that are logically identical will produce different hash codes, causing hash-based collections (HashSet, HashMap) to lose or duplicate entries silently.',
    keyPointsToMention: [
      'Equal objects MUST produce equal hash codes',
      'Different objects may produce same hash code (collision)',
      'Violating contract breaks HashSet and HashMap lookups'
    ]
  },
  {
    id: 'q-sql-1',
    role: 'Java Backend Developer',
    category: 'SQL',
    difficulty: 'Medium',
    type: 'Conceptual',
    question: 'Explain the difference between clustered and non-clustered indexes in a relational database.',
    context: 'Evaluates relational database fundamentals and storage engine knowledge.',
    hints: ['How is physical data sorted on disk?', 'How many clustered indexes can a table have?'],
    sampleAnswer: 'A clustered index determines the physical order of data on disk. Because rows can only be physically ordered in one way, a table can have only one clustered index (typically the Primary Key). A non-clustered index is stored separately from the data rows; it contains the indexed columns and a pointer (or clustered index key) back to the actual row, functioning like an index at the back of a book. Tables can have many non-clustered indexes.',
    keyPointsToMention: [
      'Physical storage order on disk',
      'Single clustered index per table vs multiple non-clustered',
      'B-Tree leaf nodes containing actual data vs row pointers'
    ]
  },
  {
    id: 'q-sql-2',
    role: 'Java Backend Developer',
    category: 'SQL',
    difficulty: 'Hard',
    type: 'Coding & Architecture',
    question: 'How would you identify and resolve an N+1 query problem when using JPA / Hibernate with Spring Boot?',
    context: 'Directly tests practical backend ORM performance troubleshooting.',
    hints: ['Mention Lazy loading of related entities.', 'How does JOIN FETCH or @EntityGraph solve this?'],
    sampleAnswer: 'The N+1 problem occurs when Hibernate executes 1 query to fetch a parent entity list of size N, and then executes N subsequent queries to fetch each lazily loaded child association. We identify it by enabling SQL logging or using tools like Hypersistence Optimizer. To resolve it, we can: 1) Use JOIN FETCH in JPQL, 2) Use JPA @EntityGraph to eagerly fetch specific associations, or 3) Configure batch fetching via @BatchSize.',
    keyPointsToMention: [
      'Lazy loading triggering 1 + N SQL queries',
      'JOIN FETCH in JPQL',
      '@EntityGraph attribute paths',
      '@BatchSize or subselect fetching'
    ]
  },
  {
    id: 'q-sys-1',
    role: 'Java Backend Developer',
    category: 'System Design',
    difficulty: 'Medium',
    type: 'System Design',
    question: 'How would you design a rate limiter for an API with multiple backend server instances?',
    context: 'Common distributed systems question testing caching and concurrency.',
    hints: ['Algorithms: Token Bucket, Leaky Bucket, Sliding Window Counter.', 'Where is rate limiting state stored across instances?'],
    sampleAnswer: 'In a distributed multi-instance backend, local in-memory counters fail because traffic is load-balanced across nodes. I would use a centralized in-memory store like Redis. The Sliding Window Counter or Token Bucket algorithm can be implemented using Redis Lua scripts for atomic execution (checking and incrementing the count atomically). We return HTTP 429 Too Many Requests with Retry-After headers when the limit is exceeded.',
    keyPointsToMention: [
      'Redis centralized store with atomic Lua scripts',
      'Token Bucket or Sliding Window Log/Counter',
      'HTTP 429 Too Many Requests response code',
      'Fallback or graceful degradation if Redis goes down'
    ]
  },
  {
    id: 'q-dsa-1',
    role: 'Java Backend Developer',
    category: 'DSA',
    difficulty: 'Medium',
    type: 'Coding & Architecture',
    question: 'How do you detect a cycle in a singly linked list in O(n) time and O(1) space?',
    context: 'Classic pointer algorithm test.',
    hints: ['Floyd’s Cycle-Finding Algorithm (Tortoise and Hare).'],
    sampleAnswer: 'We use Floyd’s Cycle-Finding Algorithm (Tortoise and Hare) with two pointers: a slow pointer moving 1 step at a time and a fast pointer moving 2 steps at a time. If there is a cycle, the fast pointer will eventually loop around and equal the slow pointer (slow == fast). If fast reaches null or fast.next reaches null, there is no cycle. This achieves O(n) time and O(1) auxiliary space.',
    keyPointsToMention: [
      'Floyd’s Tortoise and Hare algorithm',
      'Slow pointer moves 1 step, Fast pointer moves 2 steps',
      'O(n) time complexity and O(1) auxiliary space',
      'Finding entry node of cycle using reset pointer'
    ]
  },
  {
    id: 'q-beh-1',
    role: 'Java Backend Developer',
    category: 'Behavioral',
    difficulty: 'Medium',
    type: 'Behavioral',
    question: 'Tell me about a time you resolved a critical production bug under time pressure.',
    context: 'Tests composure, triage methodology, and root cause analysis.',
    hints: ['Use the STAR method.', 'Mention monitoring, rollback vs fix forward, and blameless post-mortem.'],
    sampleAnswer: 'Using STAR: In my previous project, a payment webhook deployment caused intermittent 500 errors during peak hours (Situation). As the on-call engineer, my task was to restore service and prevent double charges (Task). I immediately inspected Datadog logs, isolated a NullPointerException in payload deserialization, rolled back the deployment within 8 minutes, and wrote a failing regression test (Action). Service was restored with zero financial discrepancy, and I led a blameless post-mortem adding strict payload schema validation (Result).',
    keyPointsToMention: [
      'Structured STAR format',
      'Immediate mitigation (rollback) prior to deep fix',
      'Root cause analysis and regression test',
      'Post-mortem prevention measures'
    ]
  },
  {
    id: 'q-python-1',
    role: 'Python Data Engineer',
    category: 'Python',
    difficulty: 'Medium',
    type: 'Conceptual',
    question: 'Explain the Global Interpreter Lock (GIL) in CPython and how it affects multithreading.',
    context: 'Core Python concurrency interview staple.',
    hints: ['Why does CPython have a GIL?', 'CPU-bound vs I/O-bound tasks.'],
    sampleAnswer: 'The GIL is a mutex that protects access to Python objects, preventing multiple native threads from executing Python bytecodes at the same time in CPython. For CPU-bound tasks, multithreading does not provide true parallelism because only one thread executes at a time. However, for I/O-bound tasks (network, disk), threads release the GIL while waiting. For true CPU parallelism in Python, developers use multiprocessing or C-extensions.',
    keyPointsToMention: ['CPython reference counting memory safety', 'Only one thread executes bytecode at a time', 'I/O bound benefits from threading, CPU bound requires multiprocessing']
  },
  {
    id: 'q-oop-1',
    role: 'Java Backend Developer',
    category: 'OOP',
    difficulty: 'Medium',
    type: 'Conceptual',
    question: 'Explain the SOLID principles with a concise example for the Dependency Inversion Principle.',
    context: 'Evaluates architectural cleanliness and design pattern foundations.',
    hints: ['Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion.'],
    sampleAnswer: 'SOLID stands for Single Responsibility, Open-Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion. The Dependency Inversion Principle states that high-level modules should not depend on low-level modules; both should depend on abstractions. For example, instead of an OrderService directly instantiating a SqlOrderRepository, it depends on an OrderRepository interface, which Spring injects via constructor injection.',
    keyPointsToMention: ['All 5 principles defined', 'Depend on abstractions, not concretions', 'Enables loose coupling and unit testability with mocks']
  }
];

export const sampleBestReport: FinalInterviewReport = {
  sessionId: 'sess-best-91',
  role: 'Java Backend Developer',
  date: 'October 6, 2026',
  overallScore: 91,
  readinessBadge: 'Excellent — Interview Ready',
  readinessSummary: 'Outstanding demonstration of Java core memory mechanics, collection internals, and clean architectural explanations. Candidate communicated trade-offs with high precision.',
  technicalKnowledge: 92,
  communication: 88,
  problemSolving: 94,
  confidence: 90,
  answerRelevance: 95,
  strengths: [
    'Deep mastery of JVM memory allocation and Java Collections Framework internals',
    'Precise explanation of CPU cache locality and time complexity comparisons',
    'Proactive clarification of edge cases and concurrency safety considerations',
    'Articulate and structured vocal delivery'
  ],
  areasToImprove: [
    'Expand more on distributed caching failure scenarios (Redis cache stampede/penetration)',
    'Mention specific database indexing B-Tree vs Hash trade-offs when discussing persistence layers'
  ],
  aiRecommendation: 'You are ready for mid-level Java backend interviews at top-tier tech companies. Before your upcoming rounds, spend 1 session refining System Design capacity estimations (QPS & bandwidth).',
  questionBreakdown: [
    {
      question: curatedQuestionBank[0],
      userAnswer: 'ArrayList is backed by a dynamic array, giving O(1) random lookup by index, but middle insertions take O(n). LinkedList is doubly linked with O(1) node insertion once pointer is held, but O(n) access. In production, ArrayList is preferred because contiguous memory leverages CPU L1/L2 cache prefetching.',
      evaluation: {
        technicalAccuracy: 9.5,
        communication: 9,
        relevance: 9.5,
        clarity: 9,
        overallScore: 93,
        feedback: 'Excellent explanation. Mentioning CPU cache prefetching and contiguous memory locality separated your answer from standard textbook responses.',
        strengths: ['Mentioned CPU cache locality', 'Accurate time complexities'],
        areasToImprove: ['Could briefly mention memory footprint per node'],
        modelAnswer: curatedQuestionBank[0].sampleAnswer || '',
        adaptiveAction: 'harder_question',
        adaptiveExplanation: 'High performance triggered an advanced JVM internals question.'
      }
    },
    {
      question: curatedQuestionBank[1],
      userAnswer: 'HashMap hashes keys and uses modulo/bitwise AND with table length. On collisions, Java 8 puts entries in linked list buckets until 8 elements (TREEIFY_THRESHOLD), then converts to a Red-Black Tree if capacity is >= 64, making worst-case search O(log n) instead of O(n).',
      evaluation: {
        technicalAccuracy: 9,
        communication: 8.5,
        relevance: 9,
        clarity: 8.5,
        overallScore: 89,
        feedback: 'Very strong answer. You accurately identified both the TREEIFY_THRESHOLD of 8 and the MIN_TREEIFY_CAPACITY of 64.',
        strengths: ['Accurate threshold values', 'Identified Red-Black tree data structure'],
        areasToImprove: ['Could also mention UNTREEIFY_THRESHOLD = 6 on shrinking'],
        modelAnswer: curatedQuestionBank[1].sampleAnswer || '',
        adaptiveAction: 'advanced_question',
        adaptiveExplanation: 'Candidate demonstrated mastery; escalating to concurrency.'
      }
    }
  ]
};
