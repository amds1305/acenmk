
// Export configuration utilities
export * from './config';

// Export get and save functions
export * from './getConfig';
export * from './saveConfig';

// Export section management functions
export * from './sectionManagement';

// Export migration functions
export * from './migration';

// Main service exports (compatible with original structure)
export { getHomepageConfig } from './getConfig';
export { saveHomepageConfig } from './saveConfig';
export { addSection, removeSection } from './sectionManagement';
export { migrateLocalStorageToSupabase } from './migration';
