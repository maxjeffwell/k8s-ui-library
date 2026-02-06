import React, { useState } from 'react';
import BookmarkCard from './BookmarkCard';

function AlgoliaSearch({ onDelete, onApplyTag, onEdit, onClose, bookmarks = [], isConfigured = true }) {
  const [query, setQuery] = useState('');

  // Filter bookmarks by search query (static mock of Algolia)
  const filteredBookmarks = query
    ? bookmarks.filter(b =>
        b.title.toLowerCase().includes(query.toLowerCase()) ||
        (b.desc || '').toLowerCase().includes(query.toLowerCase()) ||
        (b.tags || []).some(t => t.toLowerCase().includes(query.toLowerCase()))
      )
    : bookmarks;

  if (!isConfigured) {
    return (
      <div className="card mb-6 bg-yellow-50 border-2 border-yellow-200">
        <div className="flex items-start gap-3">
          <span className="text-2xl">⚠️</span>
          <div>
            <h3 className="font-bold text-gray-900 mb-2">Algolia Search Not Configured</h3>
            <p className="text-sm text-gray-700 mb-2">
              To enable instant search, add your Algolia Search-Only API Key to <code className="bg-gray-200 px-1 rounded">.env.local</code>:
            </p>
            <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
              VITE_ALGOLIA_SEARCH_API_KEY=your-search-only-api-key
            </pre>
            <p className="text-xs text-gray-600 mt-2">
              Get your API key from: <span className="text-firebase-blue">Firebase Console</span> → Extensions → Algolia Search
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-0 sm:p-4 z-50 overflow-y-auto">
      <div className="bg-white w-full h-full sm:h-auto sm:max-h-[90vh] sm:max-w-6xl sm:rounded-2xl shadow-2xl overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <div className="flex-1 mr-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">🔍 Search Bookmarks</h2>
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search bookmarks by title, description, tags..."
                className="w-full px-4 py-3 pr-12 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-firebase-orange focus:border-transparent text-lg"
                autoFocus
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-firebase-orange text-xl">🔍</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="btn-close flex-shrink-0"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Search Results */}
        <div className="p-6">
          <div className="mb-4">
            <p className="text-sm text-gray-600 font-medium">
              Found {filteredBookmarks.length} bookmark{filteredBookmarks.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredBookmarks.map(bookmark => (
              <BookmarkCard
                key={bookmark.id}
                bookmark={bookmark}
                onDelete={onDelete}
                onApplyTag={onApplyTag}
                onEdit={onEdit}
              />
            ))}
          </div>

          {filteredBookmarks.length === 0 && query && (
            <div className="text-center py-12">
              <span className="text-4xl mb-4 block">🔍</span>
              <p className="text-gray-500 text-lg">No bookmarks match "{query}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AlgoliaSearch;
