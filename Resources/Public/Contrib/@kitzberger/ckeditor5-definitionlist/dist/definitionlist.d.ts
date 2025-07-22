import { Plugin } from 'ckeditor5';
export default class DefinitionList extends Plugin {
    static get pluginName(): "DefinitionList";
    init(): void;
    afterInit(): void;
    private defineSchema;
    private defineConverters;
}
