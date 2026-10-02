import { describe, it, expect } from 'vitest';
import { AVATAR_PRESETS, ACCENT_PALETTE, BACKGROUND_TONES } from '../src/components/profile/UserProfileModal';

describe('User Profile & Customization System', () => {
  it('should provide 8 distinct mascot avatar presets', () => {
    expect(AVATAR_PRESETS).toHaveLength(8);
    const presetIds = AVATAR_PRESETS.map((p) => p.id);
    expect(presetIds).toContain('coder_bear');
    expect(presetIds).toContain('ai_robot');
    expect(presetIds).toContain('girl_coder');
    expect(presetIds).toContain('boy_explorer');
    expect(presetIds).toContain('curious_fox');
    expect(presetIds).toContain('hero_champion');
    expect(presetIds).toContain('creative_spark');
    expect(presetIds).toContain('logic_kitty');
  });

  it('should provide accessible color accent options', () => {
    expect(ACCENT_PALETTE.length).toBeGreaterThanOrEqual(6);
    const hexes = ACCENT_PALETTE.map((a) => a.hex);
    expect(hexes).toContain('#00A86B'); // CodeRa Emerald
    expect(hexes).toContain('#2563eb'); // Royal Blue
    expect(hexes).toContain('#9333ea'); // Vibrant Violet
  });

  it('should provide soothing background tones matching platform aesthetic', () => {
    expect(BACKGROUND_TONES.length).toBeGreaterThanOrEqual(4);
    const hexes = BACKGROUND_TONES.map((b) => b.hex);
    expect(hexes).toContain('#fcfbf7'); // Signature Cream
    expect(hexes).toContain('#ffffff'); // Crisp White
    expect(hexes).toContain('#f8fafc'); // Soft Slate
  });

  it('should render SVGs correctly for each avatar preset', () => {
    AVATAR_PRESETS.forEach((preset) => {
      expect(preset.name).toBeTruthy();
      expect(preset.svg).toBeDefined();
      expect(preset.borderColor).toBeTruthy();
    });
  });
});
