export type ComponentCategory = 'bubbles' | 'inputs' | 'logic' | 'integrations'; // Add more categories as needed

export interface Component {
  id: string;
  type: string;
  category: string;
  content: string;
  icon: string;
}

// Define the AvailableComponents type using an explicit object structure
export interface AvailableComponents {
  bubbles: Component[];
  inputs: Component[];
  logic: Component[];
  integrations: Component[];
}

export const AVAILABLE_COMPONENTS = {
  bubbles: [
    { id: 'text', type: 'Text', category: 'bubbles', content: 'Text Message', icon: 'fas fa-comment' },
    { id: 'image', type: 'Image', category: 'bubbles', content: 'Image Upload', icon: 'fas fa-image' },
    { id: 'video', type: 'Video', category: 'bubbles', content: 'Video Player', icon: 'fas fa-video' },
    { id: 'embed', type: 'Embed', category: 'bubbles', content: 'Embed Content', icon: 'fas fa-code' }
  ],
  inputs: [
    { id: 'text-input', type: 'Text', category: 'inputs', content: 'Text Input', icon: 'fas fa-font' },
    { id: 'number', type: 'Number', category: 'inputs', content: 'Number Input', icon: 'fas fa-hashtag' },
    { id: 'email', type: 'Email', category: 'inputs', content: 'Email Input', icon: 'fas fa-envelope' },
    { id: 'website', type: 'Website', category: 'inputs', content: 'Website Input', icon: 'fas fa-globe' },
    { id: 'date', type: 'Date', category: 'inputs', content: 'Date Input', icon: 'fas fa-calendar-alt' },
    { id: 'phone', type: 'Phone', category: 'inputs', content: 'Phone Input', icon: 'fas fa-phone' },
    { id: 'button', type: 'Button', category: 'inputs', content: 'Button', icon: 'fas fa-square' }
  ],
  logic: [
    { id: 'set-variable', type: 'Set Variable', category: 'logic', content: 'Set Variable', icon: 'fas fa-code-branch' },
    { id: 'condition', type: 'Condition', category: 'logic', content: 'Condition', icon: 'fas fa-question-circle' },
    { id: 'redirect', type: 'Redirect', category: 'logic', content: 'Redirect', icon: 'fas fa-external-link-alt' },
    { id: 'code', type: 'Code', category: 'logic', content: 'Code Block', icon: 'fas fa-code' },
    { id: 'typebot', type: 'Typebot', category: 'logic', content: 'Typebot', icon: 'fas fa-robot' }
  ],
  integrations: [
    { id: 'sheets', type: 'Sheets', category: 'integrations', content: 'Google Sheets', icon: 'fas fa-table' },
    { id: 'analytics', type: 'Analytics', category: 'integrations', content: 'Analytics', icon: 'fas fa-chart-bar' },
    { id: 'webhook', type: 'Webhook', category: 'integrations', content: 'Webhook', icon: 'fas fa-plug' },
    { id: 'email', type: 'Email', category: 'integrations', content: 'Email', icon: 'fas fa-envelope' }
  ]
};


