const isDark = useDark();
const toggleDark = useToggle(isDark);
const preferredDark = usePreferredDark();
export default () => ({ isDark, toggleDark, preferredDark });
