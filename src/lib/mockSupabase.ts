
// Mock implementation of Supabase client for development
const mockSupabase = {
  auth: {
    signIn: async () => ({ user: null, session: null, error: null }),
    signOut: async () => ({ error: null }),
    signUp: async () => ({ user: null, session: null, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    getSession: async () => ({ data: { session: null } }),
  },
  from: (table: string) => ({
    select: (columns: string) => ({
      eq: (column: string, value: any) => ({
        single: async () => ({ data: null, error: null }),
        order: (orderColumn: string) => ({ data: [], error: null }),
      }),
    }),
    insert: async (data: any) => ({ data, error: null }),
    update: async (data: any) => ({ data, error: null }),
    upsert: async (data: any) => ({ data, error: null }),
    delete: async () => ({ error: null }),
  }),
  storage: {
    from: (bucket: string) => ({
      upload: async (path: string, file: File) => ({ data: { path }, error: null }),
      getPublicUrl: (path: string) => ({ data: { publicUrl: path } }),
    }),
    listBuckets: async () => ({ data: [], error: null }),
    createBucket: async (name: string) => ({ data: { name }, error: null }),
  },
};

export default mockSupabase;
