import { TEMPLATES_KEY, DEFAULT_TEMPLATES } from '../utils/constants';

/**
 * Reads all templates from localStorage.
 * Seeds with defaults on first use.
 * @returns {Array} templates
 */
export function getTemplates() {
  const stored = localStorage.getItem(TEMPLATES_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }
  // Seed default templates on first load
  localStorage.setItem(TEMPLATES_KEY, JSON.stringify(DEFAULT_TEMPLATES));
  return [...DEFAULT_TEMPLATES];
}

/**
 * Saves templates array to localStorage.
 * @param {Array} templates
 */
function saveTemplates(templates) {
  localStorage.setItem(TEMPLATES_KEY, JSON.stringify(templates));
}

/**
 * Adds a new template.
 * @param {{ name: string, subject: string, content: string }} template
 * @returns {Object} the created template with id and createdAt
 */
export function addTemplate(template) {
  const templates = getTemplates();
  const newTemplate = {
    ...template,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  templates.push(newTemplate);
  saveTemplates(templates);
  return newTemplate;
}

/**
 * Updates an existing template by id.
 * @param {string} id
 * @param {{ name?: string, subject?: string, content?: string }} updates
 * @returns {Object|null} updated template or null if not found
 */
export function updateTemplate(id, updates) {
  const templates = getTemplates();
  const index = templates.findIndex((t) => t.id === id);
  if (index === -1) return null;
  templates[index] = { ...templates[index], ...updates };
  saveTemplates(templates);
  return templates[index];
}

/**
 * Deletes a template by id.
 * @param {string} id
 * @returns {boolean} true if deleted, false if not found
 */
export function deleteTemplate(id) {
  const templates = getTemplates();
  const filtered = templates.filter((t) => t.id !== id);
  if (filtered.length === templates.length) return false;
  saveTemplates(filtered);
  return true;
}
