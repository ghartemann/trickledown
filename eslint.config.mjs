// @ts-check
import pluginVue from 'eslint-plugin-vue';
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
    ...pluginVue.configs['flat/essential'],
    ...pluginVue.configs['flat/strongly-recommended'],
    ...pluginVue.configs['flat/recommended'],
    {
        rules: {
            'vue/script-indent': ['error', 4, { baseIndent: 0 }],
            'vue/html-indent': ['error', 4, {
                baseIndent: 1
            }],
            'vue/html-self-closing': ['error', {
                html: {
                    void: 'never',
                    normal: 'never',
                    component: 'never'
                },
                svg: 'never',
                math: 'never'
            }],
            'vue/no-v-html': 'off',
            'vue/multi-word-component-names': ['error', {
                'ignores': ['index']
            }]
        }
    }
);
