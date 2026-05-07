// localStorage keys
export const AUTH_TOKEN_KEY = 'campaign_auth_token';
export const AUTH_USER_KEY = 'campaign_auth_user';
export const TEMPLATES_KEY = 'campaign_templates';

// Mock JWT token
export const MOCK_JWT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6IkFkbWluIFVzZXIiLCJlbWFpbCI6ImFkbWluQGNhbXBhaWduLmNvbSJ9.mock_signature';

// Mock user credentials
export const MOCK_USER = {
  email: 'admin@campaign.com',
  password: 'admin123',
  name: 'Admin User',
  role: 'Administrator',
};

// Default seed templates
export const DEFAULT_TEMPLATES = [
  {
    id: '1',
    name: 'Welcome Email',
    subject: 'Welcome to Our Platform!',
    content: 'Hi {{name}},\n\nWelcome aboard! We\'re thrilled to have you join our community. Here\'s what you can expect:\n\n• Exclusive updates and insights\n• Early access to new features\n• Priority support from our team\n\nLet\'s get started on this exciting journey together!\n\nBest regards,\nThe Campaign Team',
    createdAt: '2026-04-15T10:30:00Z',
  },
  {
    id: '2',
    name: 'Monthly Newsletter',
    subject: 'Your Monthly Digest — May 2026',
    content: 'Hello {{name}},\n\nHere\'s your curated roundup for this month:\n\n📊 Key Metrics\n• 25% increase in engagement\n• 3 new features launched\n• 500+ new users onboarded\n\n📰 Top Stories\nCheck out our latest blog posts, product updates, and community highlights.\n\nStay tuned for more!\nThe Campaign Team',
    createdAt: '2026-05-01T08:00:00Z',
  },
  {
    id: '3',
    name: 'Flash Sale Alert',
    subject: '⚡ 48-Hour Flash Sale — Don\'t Miss Out!',
    content: 'Hey {{name}},\n\n🔥 Our biggest sale of the season is LIVE!\n\nFor the next 48 hours, enjoy:\n• 40% off all premium plans\n• Free onboarding consultation\n• Bonus storage upgrade\n\nUse code FLASH2026 at checkout.\n\nHurry — this deal won\'t last!\n\nCheers,\nThe Campaign Team',
    createdAt: '2026-05-05T14:00:00Z',
  },
  {
    id: '4',
    name: 'Re-engagement Campaign',
    subject: 'We Miss You, {{name}}! Come Back for a Surprise',
    content: 'Hi {{name}},\n\nIt\'s been a while since we last connected, and we\'ve been busy making things better for you.\n\nHere\'s what\'s new:\n• Redesigned dashboard with faster insights\n• New integrations with your favorite tools\n• Improved analytics and reporting\n\nAs a welcome-back gift, here\'s 20% off your next month.\n\nWe\'d love to have you back!\nThe Campaign Team',
    createdAt: '2026-05-03T11:15:00Z',
  },
];
