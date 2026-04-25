import type { Document, InlineProvocation } from '../types';

export const DOCUMENT: Document = {
  id: 'react-useeffect-strict-mode',
  title: 'React useEffect & Strict Mode',
  subtitle: 'Understanding side effects, cleanup, and double-invocation in React 18+',
  sections: [
    {
      heading: 'useEffect Basics and the Dependency Array',
      body: `useEffect lets you synchronize a component with an external system. It runs after the component renders, not during. The function you pass to useEffect is your "setup" function — it runs when the component mounts and after every re-render where a dependency has changed.

The dependency array is the second argument to useEffect. It tells React which values to watch. If you pass an empty array [], the effect runs only once after the initial render. If you pass [count], it re-runs every time count changes. If you omit the array entirely, the effect runs after every single render — which is almost never what you want.

A common mistake is putting an object or array literal in the dependency array. Because JavaScript creates a new reference on every render, React sees it as "changed" even if the contents are identical. This triggers the effect on every render, defeating the purpose of the dependency array entirely.`,
      provocations: [
        {
          id: 'prov-1a',
          phraseText: 'synchronize a component with an external system',
          sectionIndex: 0,
          question: 'What exactly counts as an "external system" here — and what happens if the system you\'re syncing with has its own state lifecycle?',
        },
        {
          id: 'prov-1b',
          phraseText: 'runs after the component renders, not during',
          sectionIndex: 0,
          question: 'Why would React deliberately delay this execution? What would break if effects ran during render instead?',
        },
        {
          id: 'prov-1c',
          phraseText: 'new reference on every render',
          sectionIndex: 0,
          question: 'If React uses reference equality for dependency comparison, what does that imply about how you should structure data passed to useEffect?',
        },
      ],
    },
    {
      heading: 'Cleanup Functions and Memory Leaks',
      body: `The function returned from useEffect is the "cleanup" function. React calls it before running the effect again with new dependencies, and once more when the component unmounts. Its job is to undo whatever the setup function did — cancel subscriptions, remove event listeners, abort fetch requests.

Memory leaks happen when cleanup is missing or incomplete. If you add a window event listener in the setup but never remove it in cleanup, every re-render adds another listener. After 50 re-renders you have 50 duplicate listeners firing on every event. The component might look fine, but the browser is doing 50x the work.

The pattern for cleanup is always symmetric: whatever you create, you destroy. addEventListener pairs with removeEventListener. setInterval pairs with clearInterval. A fetch request pairs with an AbortController signal. If you can't name the cleanup for an effect, you probably have a leak.`,
      provocations: [
        {
          id: 'prov-2a',
          phraseText: 'undo whatever the setup function did',
          sectionIndex: 1,
          question: 'Are there side effects that genuinely cannot be undone? What would you do with those?',
        },
        {
          id: 'prov-2b',
          phraseText: '50 duplicate listeners firing on every event',
          sectionIndex: 1,
          question: 'How would you detect this problem if the UI appeared to work correctly? What symptoms would be visible only in dev tools?',
        },
      ],
    },
    {
      heading: 'Strict Mode and Double-Invocation',
      body: `In development, React.StrictMode intentionally runs your effects twice: mount → unmount → mount. This is not a bug — it's a diagnostic tool. React is testing whether your cleanup works correctly by simulating a mount-unmount-remount cycle.

If your effect only works correctly on the first mount, Strict Mode exposes that. For example, if your setup opens a WebSocket connection but your cleanup doesn't close it, you'll see two connections open in dev mode. In production only one would open, but the missing cleanup is still a bug — it just hasn't bitten you yet.

The correct mental model is: effects should be idempotent with respect to their cleanup. Running setup-cleanup-setup should leave the system in the same state as running setup once. If it doesn't, your cleanup is incomplete. Strict Mode is the test that proves it.`,
      provocations: [
        {
          id: 'prov-3a',
          phraseText: 'intentionally runs your effects twice',
          sectionIndex: 2,
          question: 'If double-invocation only happens in development, why should you care about it at all? What class of bugs does it catch that would otherwise only appear in production?',
        },
        {
          id: 'prov-3b',
          phraseText: 'idempotent with respect to their cleanup',
          sectionIndex: 2,
          question: 'Can you think of a real-world analogy where "do it, undo it, do it again" should leave things identical? Where does this analogy break down with side effects?',
        },
      ],
    },
  ],
};

export const MOCK_LENS_QUESTIONS: Record<'watch' | 'prereq' | 'misc', string[]> = {
  watch: [
    'What is the relationship between the dependency array and when React decides to re-run an effect?',
    'How does the cleanup function interact with the component lifecycle — and what happens if it\'s missing?',
    'Why does Strict Mode run effects twice, and what specific class of bugs does this catch?',
    'What makes an effect "idempotent with respect to cleanup" — and why does that matter for production reliability?',
  ],
  prereq: [
    'Can you explain what "rendering" means in React — specifically, what happens before and after the virtual DOM diff?',
    'What is reference equality in JavaScript, and why does `{} === {}` evaluate to false?',
    'Can you describe what a closure is and why a stale closure inside useEffect would produce wrong values?',
    'What is the event loop, and why does understanding it help you predict when useEffect callbacks execute?',
  ],
  misc: [
    'Many developers believe an empty dependency array means "run once on mount" — but that\'s a simplification. What is it actually telling React?',
    'A common assumption is that useEffect is the React equivalent of componentDidMount. In what ways is this comparison misleading?',
    'Some developers think Strict Mode\'s double-invocation is a bug they should work around. What are they missing about its purpose?',
  ],
};

export const MOCK_PROVOCATIONS: InlineProvocation[] = DOCUMENT.sections.flatMap(
  (s) => s.provocations
);

export const MOCK_EXPLAIN_PROVOCATIONS: string[][] = [
  [
    'You mentioned useEffect "runs code" — but when exactly does it run relative to the browser paint?',
    'Your explanation covers the dependency array but doesn\'t mention what happens when dependencies are objects. Why might that matter?',
    'You described cleanup but didn\'t connect it to Strict Mode. How does double-invocation test your cleanup logic?',
  ],
  [
    'You\'ve added detail about timing — now can you explain why React chose this timing model instead of running effects synchronously?',
    'Your revised explanation mentions reference equality. What specific coding pattern would you use to avoid triggering unnecessary effect re-runs?',
  ],
];

export const MOCK_QUESTION_EVAL = {
  accepted: {
    message: 'This question requires explaining a mechanism — exactly the kind of reasoning that builds understanding.',
  },
  rejected: {
    message: 'This looks like a recall question. Try rewriting it to ask about a mechanism, a consequence, or a comparison. Start with "Why", "How", "What would happen if", or "Compare".',
  },
};

export const MOCK_SCORES: { score: number; label: 'Strong reasoning' | 'Partial credit' | 'Needs rigor'; note: string }[] = [
  {
    score: 5,
    label: 'Strong reasoning',
    note: 'Your answer traces the causal chain from setup to cleanup and connects it to the component lifecycle.',
  },
  {
    score: 3,
    label: 'Partial credit',
    note: 'You identified the core mechanism but didn\'t explain why the consequence follows from the cause.',
  },
  {
    score: 1,
    label: 'Needs rigor',
    note: 'Your answer names the concept but doesn\'t explain how it works or why it matters.',
  },
];

export const MOCK_PEER_ANSWERS: { author: string; text: string }[][] = [
  [
    {
      author: 'Alex M.',
      text: 'When the cleanup function is missing, each re-render stacks another subscription on top of the previous one. The effect setup assumes a clean slate, but without cleanup it never gets one. After N renders you have N active subscriptions competing for the same events, which causes duplicate handlers and memory growth that never gets garbage collected.',
    },
    {
      author: 'Sam K.',
      text: 'The cleanup runs before the next effect and on unmount. If you skip it, the old effect\'s side effects persist alongside the new one\'s. For event listeners specifically, the browser doesn\'t deduplicate them, so each render adds a new one without removing the old.',
    },
  ],
  [
    {
      author: 'Alex M.',
      text: 'Strict Mode\'s double-mount is testing idempotency. If your effect opens a connection in setup and doesn\'t close it in cleanup, you get two connections after the double-mount. In production you\'d only see one, but the bug is the same — your cleanup doesn\'t fully reverse the setup, so any unmount-remount cycle (like Suspense or fast navigation) would leak.',
    },
    {
      author: 'Sam K.',
      text: 'The double run simulates what happens during concurrent features. React might need to mount, unmount, and remount a component. If your effect can\'t survive that cycle cleanly, it\'s fragile. Strict Mode makes this visible in dev so you fix it before users hit edge cases.',
    },
  ],
  [
    {
      author: 'Alex M.',
      text: 'Reference equality means React compares dependency values with Object.is(). Primitive values like numbers and strings compare by value, but objects and arrays compare by reference. A new object literal {} created each render is a different reference even if the contents match, so React sees it as changed and re-runs the effect every time.',
    },
    {
      author: 'Sam K.',
      text: 'JavaScript objects are compared by their memory address, not their shape. So even { a: 1 } === { a: 1 } is false. In the dependency array, this means any inline object or array will trigger the effect on every render, because React can\'t tell the "new" object is semantically identical to the old one.',
    },
  ],
];
