import { ThemeNameType } from '@/store/theme'
import { useStore } from '@/store/index'

export function getThemeColor(themeName: ThemeNameType): string {
  const store = useStore();
  return store.getters['theme/getThemeColor']({ theme: themeName })
}