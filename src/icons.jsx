const Icon = ({ children, size = 20, className = "" }) => (
  <svg
    aria-hidden="true"
    className={className}
    fill="none"
    height={size}
    viewBox="0 0 24 24"
    width={size}
  >
    {children}
  </svg>
);

export const ArrowIcon = () => (
  <Icon size={18}><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" /></Icon>
);

export const CheckIcon = () => (
  <Icon size={18}><path d="m5 12 4 4L19 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></Icon>
);

export const CloudIcon = () => (
  <Icon size={28}><path d="M7 18a5 5 0 0 1-.8-9.94A7 7 0 0 1 19.5 10.5 3.75 3.75 0 0 1 18.75 18H7Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" /></Icon>
);

export const CodeIcon = () => (
  <Icon size={28}><path d="m8.5 7-5 5 5 5M15.5 7l5 5-5 5M14 4l-4 16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" /></Icon>
);

export const DatabaseIcon = () => (
  <Icon size={28}><ellipse cx="12" cy="5" rx="7.5" ry="3" stroke="currentColor" strokeWidth="1.6" /><path d="M4.5 5v7c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3V5M4.5 12v7c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3v-7" stroke="currentColor" strokeWidth="1.6" /></Icon>
);

export const ShieldIcon = () => (
  <Icon size={26}><path d="M12 3 5 6v5c0 4.6 2.9 8.8 7 10 4.1-1.2 7-5.4 7-10V6l-7-3Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.6" /><path d="m9 12 2 2 4-4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" /></Icon>
);

export const SparkIcon = () => (
  <Icon size={28}><path d="M12 2c.8 5.2 4 8.4 9 9-5 .7-8.2 3.8-9 11-.8-7.2-4-10.3-9-11 5-.6 8.2-3.8 9-9Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5" /></Icon>
);

export const MailIcon = () => (
  <Icon><path d="M4 6h16v12H4V6Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" /><path d="m4 7 8 6 8-6" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" /></Icon>
);

export const LinkedInIcon = () => (
  <Icon><path d="M7 9v9M7 6v.01M11 18v-5a4 4 0 0 1 8 0v5M11 9v9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" /></Icon>
);

export const GitHubIcon = () => (
  <Icon><path d="M9 19c-4.5 1.4-4.5-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.7-1.4 5.7-6.2 0-1.4-.5-2.5-1.3-3.4.1-.3.6-1.6-.1-3.3 0 0-1.1-.3-3.5 1.3a12 12 0 0 0-6.4 0C6.5 2.3 5.4 2.6 5.4 2.6c-.7 1.7-.2 3-.1 3.3A5 5 0 0 0 4 9.3c0 4.8 2.9 5.9 5.7 6.2-.4.3-.7.8-.8 1.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" /></Icon>
);

export const MenuIcon = ({ open }) => (
  <Icon size={24}>
    <path d={open ? "M5 5l14 14M19 5 5 19" : "M4 7h16M4 12h16M4 17h16"} stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
  </Icon>
);
