import type { MethodColorVariant } from '@/components/molecules/ImpressionCard';
import type { WorkflowPhaseKey } from '@/components/organisms/WorkflowAtlasTimeline';
import type { Phase } from '@/types/sanity';

/**
 * Maps a phase color string from CMS to a MethodColorVariant.
 * Falls back to 'default' if no match is found.
 */
export function phaseColorToMethodColorVariant(
  phaseColor?: string | null
): MethodColorVariant {
  if (!phaseColor) return 'default';

  const normalizedColor = phaseColor.toLowerCase().trim();

  // Map common color names/values to variants
  const colorMap: Record<string, MethodColorVariant> = {
    blue: 'blue',
    '#06b6d4': 'blue',
    'accent-blue': 'blue',
    purple: 'purple',
    '#a855f7': 'purple',
    'accent-purple': 'purple',
    magenta: 'magenta',
    '#ec4899': 'magenta',
    'accent-magenta': 'magenta',
    orange: 'orange',
    '#f97316': 'orange',
    'accent-orange': 'orange',
    green: 'green',
    '#10b981': 'green',
    'accent-green': 'green',
    darkgrey: 'darkgrey',
    'dark-grey': 'darkgrey',
    'dark gray': 'darkgrey',
    '#64748b': 'darkgrey',
    'accent-darkgrey': 'darkgrey',
  };

  return colorMap[normalizedColor] || 'default';
}

/**
 * Maps a phase to a WorkflowPhaseKey based on the phase name or slug.
 * This is used for the timeline component which expects specific phase keys.
 */
export function phaseToWorkflowPhaseKey(phase: Phase): WorkflowPhaseKey {
  const name = phase.name?.toLowerCase() || '';
  const slug = phase.slug?.current?.toLowerCase() || '';

  // Try to match by name or slug
  if (name.includes('research') || slug.includes('research')) {
    return 'research';
  }
  if (name.includes('analysis') || name.includes('synthesis') || slug.includes('analysis')) {
    return 'analysis';
  }
  if (name.includes('ideation') || name.includes('concept') || slug.includes('ideation')) {
    return 'ideation';
  }
  if (name.includes('design') || name.includes('prototyp') || slug.includes('design')) {
    return 'design';
  }
  if (name.includes('test') || name.includes('validat') || slug.includes('test')) {
    return 'testing';
  }
  if (name.includes('develop') || name.includes('deliver') || slug.includes('develop')) {
    return 'development';
  }

  // Default fallback
  return 'research';
}

/**
 * Formats a number for display in stats, adding "+" for large numbers.
 * Based on Figma reference: "130+" for large counts.
 */
export function formatStatValue(count: number): string {
  if (count >= 100) {
    return `${count}+`;
  }
  return count.toString();
}
