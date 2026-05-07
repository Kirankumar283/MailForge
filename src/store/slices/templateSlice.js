import { createSlice } from '@reduxjs/toolkit';
import { TEMPLATES_KEY, DEFAULT_TEMPLATES } from '../../utils/constants';

/**
 * Load persisted templates from localStorage.
 * Seeds with DEFAULT_TEMPLATES on first use.
 */
function loadInitialState() {
  try {
    const stored = localStorage.getItem(TEMPLATES_KEY);
    if (stored) {
      return { items: JSON.parse(stored) };
    }
  } catch {
    // Corrupted data — fall through to defaults
  }
  return { items: [...DEFAULT_TEMPLATES] };
}

const templateSlice = createSlice({
  name: 'templates',
  initialState: loadInitialState(),
  reducers: {
    /**
     * Add a new template.
     * payload: { name, subject, content }
     */
    addTemplate(state, action) {
      const newTemplate = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      state.items.push(newTemplate);
    },

    /**
     * Update an existing template by id.
     * payload: { id, updates: { name?, subject?, content? } }
     */
    updateTemplate(state, action) {
      const { id, updates } = action.payload;
      const index = state.items.findIndex((t) => t.id === id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...updates };
      }
    },

    /**
     * Delete a template by id.
     * payload: string (template id)
     */
    deleteTemplate(state, action) {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },
  },
});

export const { addTemplate, updateTemplate, deleteTemplate } = templateSlice.actions;
export default templateSlice.reducer;
