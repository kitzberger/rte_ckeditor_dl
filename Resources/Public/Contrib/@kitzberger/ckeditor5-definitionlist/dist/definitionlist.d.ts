import { default as Plugin } from '@ckeditor/ckeditor5-core/src/plugin';
export default class DefinitionList extends Plugin {
    static get pluginName(): "DefinitionList";
    init(): void;
    afterInit(): void;
    private defineSchema;
    private defineConverters;
}
