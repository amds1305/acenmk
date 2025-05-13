
/**
 * This file provides project configuration information
 * that would normally be in package.json, but in a format
 * that can be imported by TypeScript code.
 */

export const packageConfig = {
  name: "ace-numerik",
  version: "1.0.0",
  description: "Site professionnel pour ESN",
  author: "AceNumérik",
  dependencies: {
    // Mock of key dependencies for reference
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.26.2",
    "@supabase/supabase-js": "^2.49.4",
    "@tanstack/react-query": "^5.56.2"
  }
};

/**
 * Helper function to get dependency version information
 */
export const getDependencyVersion = (dependencyName: string): string | undefined => {
  return packageConfig.dependencies[dependencyName as keyof typeof packageConfig.dependencies];
};

/**
 * Helper function to check if a dependency exists
 */
export const hasDependency = (dependencyName: string): boolean => {
  return dependencyName in packageConfig.dependencies;
};
