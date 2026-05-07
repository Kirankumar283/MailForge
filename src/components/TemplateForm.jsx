import { useState, useEffect } from 'react';
import { validateTemplateForm, hasErrors } from '../utils/validators';

export default function TemplateForm({ template, onSubmit, onCancel }) {
  const isEditing = !!template;
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    content: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (template) {
      setFormData({
        name: template.name || '',
        subject: template.subject || '',
        content: template.content || '',
      });
    }
  }, [template]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on type
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateTemplateForm(formData);
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel} />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl shadow-black/50 animate-modal-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/50">
          <h3 className="text-lg font-semibold text-white">
            {isEditing ? 'Edit Template' : 'New Template'}
          </h3>
          <button
            onClick={onCancel}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1.5">
              Template Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Welcome Email"
              className={`w-full px-3 py-2.5 rounded-lg bg-slate-800 border text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 transition-colors ${
                errors.name
                  ? 'border-red-500/50 focus:ring-red-500/30'
                  : 'border-slate-700 focus:ring-indigo-500/30 focus:border-indigo-500/50'
              }`}
            />
            {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
          </div>

          {/* Subject */}
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-1.5">
              Subject Line
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleChange}
              placeholder="e.g., Welcome to Our Platform!"
              className={`w-full px-3 py-2.5 rounded-lg bg-slate-800 border text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 transition-colors ${
                errors.subject
                  ? 'border-red-500/50 focus:ring-red-500/30'
                  : 'border-slate-700 focus:ring-indigo-500/30 focus:border-indigo-500/50'
              }`}
            />
            {errors.subject && <p className="mt-1 text-xs text-red-400">{errors.subject}</p>}
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-slate-300 mb-1.5">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your email template content here..."
              rows={6}
              className={`w-full px-3 py-2.5 rounded-lg bg-slate-800 border text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 transition-colors resize-none ${
                errors.content
                  ? 'border-red-500/50 focus:ring-red-500/30'
                  : 'border-slate-700 focus:ring-indigo-500/30 focus:border-indigo-500/50'
              }`}
            />
            {errors.content && <p className="mt-1 text-xs text-red-400">{errors.content}</p>}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg shadow-indigo-500/25 transition-all duration-200"
            >
              {isEditing ? 'Update Template' : 'Create Template'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
