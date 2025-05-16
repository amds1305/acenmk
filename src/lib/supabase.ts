
// Placeholder file to satisfy imports
// This is a simplified version without actual Supabase functionality
// since we're using static data instead

export const supabase = {
  from: (table: string) => ({
    select: (columns: string) => ({
      eq: (column: string, value: any) => ({
        single: async () => {
          console.log(`Mock Supabase query: SELECT ${columns} FROM ${table} WHERE ${column} = ${value}`);
          return { data: null, error: null };
        },
        order: (column: string) => ({
          data: [],
          error: null
        })
      })
    })
  })
};
