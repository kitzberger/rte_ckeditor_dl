import type { DefinitionList } from './index.js';
declare module '@ckeditor/ckeditor5-core' {
    interface PluginsMap {
        [DefinitionList.pluginName]: DefinitionList;
    }
}
