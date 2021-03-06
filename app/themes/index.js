/**
 * Injects intitial theme into DOM.
 *
 * Tries to get theme from localstorage, otherwise loads
 * default built-in theme.
 */
import CSSInjector from './CSSInjector';
import registry from './registry';
import utils from '~/utils';

const customTheme = () => utils.localStorage.load('theme');
const defaultTheme = () => registry.defaultTheme;

const theme = customTheme() || defaultTheme();

// Loads theme by injecting it into the DOM as CSS4 variables
CSSInjector.injectTheme(theme);
