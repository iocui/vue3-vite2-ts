import IconsFont from '@/components/icons-font/index.vue';

export default (iconName: string, iconType?: 'font' | 'svg' | undefined) => h(IconsFont, { name: iconName, type: iconType });
