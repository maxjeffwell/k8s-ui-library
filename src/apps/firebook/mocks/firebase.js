// Mock firebase functions and firestore for Storybook
export const functions = {};

export const db = {};

export const auth = {
  currentUser: { uid: 'demo-user-123', email: 'demo@firebook.app', displayName: 'Demo User' },
};

// Mock httpsCallable that returns a resolved promise after a short delay
export function mockHttpsCallable(functionsRef, name) {
  return async (data) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    switch (name) {
      case 'enhanceBookmarkWithAI':
        return { data: { success: true } };
      case 'generateBookmarkEmbedding':
        return { data: { success: true } };
      case 'findSimilarBookmarks':
        return { data: { similar: [
          { id: 'sim-1', title: 'Similar Bookmark 1', url: 'https://example.com/similar-1', score: 0.92 },
          { id: 'sim-2', title: 'Similar Bookmark 2', url: 'https://example.com/similar-2', score: 0.85 },
        ]}};
      case 'retryScreenshot':
      case 'retryMetadata':
        return { data: { success: true } };
      case 'retryAll':
        return { data: { success: true, message: 'All operations retried' } };
      default:
        return { data: { success: true } };
    }
  };
}

// Mock useAuth hook
export function useAuth() {
  return {
    user: auth.currentUser,
    loading: false,
    error: null,
    signIn: async () => {},
    signUp: async () => {},
    signInWithGoogle: async () => {},
    signOut: async () => {},
    clearError: () => {},
  };
}
