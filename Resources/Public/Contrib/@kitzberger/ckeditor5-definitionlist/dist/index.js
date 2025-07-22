import { Plugin, Command } from '@ckeditor/ckeditor5-core';
import { ButtonView } from '@ckeditor/ckeditor5-ui';
import { StyleUtils } from '@ckeditor/ckeditor5-style';

var ckeditor = "<svg width='68' height='64' viewBox='0 0 68 64' xmlns='http://www.w3.org/2000/svg'><g fill='none' fill-rule='evenodd'><path d='M43.71 11.025a11.508 11.508 0 0 0-1.213 5.159c0 6.42 5.244 11.625 11.713 11.625.083 0 .167 0 .25-.002v16.282a5.464 5.464 0 0 1-2.756 4.739L30.986 60.7a5.548 5.548 0 0 1-5.512 0L4.756 48.828A5.464 5.464 0 0 1 2 44.089V20.344c0-1.955 1.05-3.76 2.756-4.738L25.474 3.733a5.548 5.548 0 0 1 5.512 0l12.724 7.292z' fill='#FFF'/><path d='M45.684 8.79a12.604 12.604 0 0 0-1.329 5.65c0 7.032 5.744 12.733 12.829 12.733.091 0 .183-.001.274-.003v17.834a5.987 5.987 0 0 1-3.019 5.19L31.747 63.196a6.076 6.076 0 0 1-6.037 0L3.02 50.193A5.984 5.984 0 0 1 0 45.003V18.997c0-2.14 1.15-4.119 3.019-5.19L25.71.804a6.076 6.076 0 0 1 6.037 0L45.684 8.79zm-29.44 11.89c-.834 0-1.51.671-1.51 1.498v.715c0 .828.676 1.498 1.51 1.498h25.489c.833 0 1.51-.67 1.51-1.498v-.715c0-.827-.677-1.498-1.51-1.498h-25.49.001zm0 9.227c-.834 0-1.51.671-1.51 1.498v.715c0 .828.676 1.498 1.51 1.498h18.479c.833 0 1.509-.67 1.509-1.498v-.715c0-.827-.676-1.498-1.51-1.498H16.244zm0 9.227c-.834 0-1.51.671-1.51 1.498v.715c0 .828.676 1.498 1.51 1.498h25.489c.833 0 1.51-.67 1.51-1.498v-.715c0-.827-.677-1.498-1.51-1.498h-25.49.001zm41.191-14.459c-5.835 0-10.565-4.695-10.565-10.486 0-5.792 4.73-10.487 10.565-10.487C63.27 3.703 68 8.398 68 14.19c0 5.791-4.73 10.486-10.565 10.486v-.001z' fill='#1EBC61' fill-rule='nonzero'/><path d='M60.857 15.995c0-.467-.084-.875-.251-1.225a2.547 2.547 0 0 0-.686-.88 2.888 2.888 0 0 0-1.026-.531 4.418 4.418 0 0 0-1.259-.175c-.134 0-.283.006-.447.018-.15.01-.3.034-.446.07l.075-1.4h3.587v-1.8h-5.462l-.214 5.06c.319-.116.682-.21 1.089-.28.406-.071.77-.107 1.088-.107.218 0 .437.021.655.063.218.041.413.114.585.218s.313.244.422.419c.109.175.163.391.163.65 0 .424-.132.745-.396.961a1.434 1.434 0 0 1-.938.325c-.352 0-.656-.1-.912-.3-.256-.2-.43-.453-.523-.762l-1.925.588c.1.35.258.664.472.943.214.279.47.514.767.706.298.191.63.339.995.443.365.104.749.156 1.151.156.437 0 .86-.064 1.272-.193.41-.13.778-.323 1.1-.581a2.8 2.8 0 0 0 .775-.981c.193-.396.29-.864.29-1.405h-.001z' fill='#FFF' fill-rule='nonzero'/></g></svg>\n";

/**
 * Copied from @ckeditor/ckeditor5-html-support/src/utils.js
 * and renamed to avoid potential conflicts with environments
 * that included said file themselves.
 */ /**
* Helper function for the downcast converter. Updates attributes on the given view element.
*
* @param writer The view writer.
* @param oldViewAttributes The previous GHS attribute value.
* @param newViewAttributes The current GHS attribute value.
* @param viewElement The view element to update.
*/ function updateViewAttributesDefinitionListPlugin(writer, oldViewAttributes, newViewAttributes, viewElement) {
    if (oldViewAttributes) {
        removeViewAttributesDefinitionListPlugin(writer, oldViewAttributes, viewElement);
    }
    if (newViewAttributes) {
        setViewAttributesDefinitionListPlugin(writer, newViewAttributes, viewElement);
    }
}
/**
 * Helper function for the downcast converter. Sets attributes on the given view element.
 *
 * @param writer The view writer.
 * @param viewAttributes The GHS attribute value.
 * @param viewElement The view element to update.
 */ function setViewAttributesDefinitionListPlugin(writer, viewAttributes, viewElement) {
    if (viewAttributes.attributes) {
        for (const [key, value] of Object.entries(viewAttributes.attributes)){
            writer.setAttribute(key, value, viewElement);
        }
    }
    if (viewAttributes.styles) {
        writer.setStyle(viewAttributes.styles, viewElement);
    }
    if (viewAttributes.classes) {
        writer.addClass(viewAttributes.classes, viewElement);
    }
}
/**
 * Helper function for the downcast converter. Removes attributes on the given view element.
 *
 * @param writer The view writer.
 * @param viewAttributes The GHS attribute value.
 * @param viewElement The view element to update.
 */ function removeViewAttributesDefinitionListPlugin(writer, viewAttributes, viewElement) {
    if (viewAttributes.attributes) {
        for (const [key] of Object.entries(viewAttributes.attributes)){
            writer.removeAttribute(key, viewElement);
        }
    }
    if (viewAttributes.styles) {
        for (const style of Object.keys(viewAttributes.styles)){
            writer.removeStyle(style, viewElement);
        }
    }
    if (viewAttributes.classes) {
        writer.removeClass(viewAttributes.classes, viewElement);
    }
}

var definitionListIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100.22509 100.22509\"><g transform=\"translate(-25.036325,-22.233511)\"><rect width=\"54.620625\" height=\"10.888565\" x=\"33.952618\" y=\"39.922672\" ry=\"5.4442825\"/><rect width=\"54.620625\" height=\"10.888565\" x=\"64.154762\" y=\"57.341919\" ry=\"5.4442825\"/><rect width=\"54.620625\" height=\"10.888565\" x=\"34.054344\" y=\"75.9683\" ry=\"5.4442825\"/><rect width=\"54.620625\" height=\"10.888565\" x=\"64.256485\" y=\"93.387543\" ry=\"5.4442825\"/></g></svg>\n";

class DefinitionList extends Plugin {
    static get pluginName() {
        return 'DefinitionList';
    }
    init() {
        const editor = this.editor;
        const t = editor.t;
        this.defineSchema();
        this.defineConverters();
        editor.commands.add('insertDefinitionList', new InsertDefinitionListCommand(editor));
        editor.commands.add('indentDefinitionTerm', new AlterDefinitionListCommand(editor, 'forward'));
        editor.commands.add('outdentDefinitionDescription', new AlterDefinitionListCommand(editor, 'backward'));
        // Register the "definitionList" button, so it can be displayed in the toolbar.
        editor.ui.componentFactory.add('definitionList', (locale)=>{
            const view = new ButtonView(locale);
            view.set({
                label: t('Definition list'),
                icon: definitionListIcon,
                tooltip: true
            });
            const command = editor.commands.get('insertDefinitionList');
            view.bind('isOn').to(command, 'value');
            view.on('execute', ()=>{
                editor.execute('insertDefinitionList');
                editor.editing.view.focus();
            });
            return view;
        });
        if (this.editor.plugins.has('StyleUtils')) {
            const _styleUtils = editor.plugins.get(StyleUtils);
            this.listenTo(_styleUtils, 'isStyleEnabledForBlock', (evt, [definition, block])=>{
                // console.log('isStyleEnabledForBlock(' + definition.element + ')');
                if (block.is('element', 'definitionList') && definition.element === 'dl' || block.is('element', 'definitionTerm') && definition.element === 'dt' || block.is('element', 'definitionDescription') && definition.element === 'dd') {
                    evt.return = true;
                    evt.stop();
                }
            }, {
                priority: 'high'
            });
            this.listenTo(_styleUtils, 'isStyleActiveForBlock', (evt, [definition, block])=>{
                // console.log('isStyleActiveForBlock(' + definition.element + ')');
                if ((block.is('element', 'definitionList') && definition.element === 'dl' || block.is('element', 'definitionTerm') && definition.element === 'dt' || block.is('element', 'definitionDescription') && definition.element === 'dd') && block.getAttribute('class')?.split(' ').includes(definition.classes[0])) {
                    evt.return = true;
                    evt.stop();
                }
            }, {
                priority: 'high'
            });
            this.listenTo(_styleUtils, 'getAffectedBlocks', (evt, [definition, block])=>{
                // console.log('getAffectedBlocks(' + definition.element + ')');
                if (block.is('element', 'definitionList') && definition.element === 'dl' || block.is('element', 'definitionTerm') && definition.element === 'dt' || block.is('element', 'definitionDescription') && definition.element === 'dd') {
                    evt.return = [
                        block
                    ];
                    evt.stop();
                }
            }, {
                priority: 'high'
            });
        }
    }
    afterInit() {
        const editor = this.editor;
        const commands = editor.commands;
        const model = editor.model;
        const doc = model.document;
        const indent = commands.get('indent');
        const outdent = commands.get('outdent');
        if (indent) {
            // Priority is high due to integration with `IndentBlock` plugin. We want to indent list first and if it's not possible
            // user can indent content with `IndentBlock` plugin.
            indent.registerChildCommand(commands.get('indentDefinitionTerm'), {
                priority: 'high'
            });
        }
        this.editor.keystrokes.set('Tab', (keyEvtData, cancel)=>{
            editor.execute('indentDefinitionTerm');
            cancel();
        });
        if (outdent) {
            // Priority is lowest due to integration with `IndentBlock` and `IndentCode` plugins.
            // First we want to allow user to outdent all indendations from other features then he can oudent list item.
            outdent.registerChildCommand(commands.get('outdentDefinitionDescription'), {
                priority: 'lowest'
            });
        }
        this.editor.keystrokes.set('Shift+Tab', (keyEvtData, cancel)=>{
            editor.execute('outdentDefinitionDescription');
            cancel();
        });
        editor.editing.view.document.on('keydown', (evt, data)=>{
            const selection = doc.selection;
            const position = selection.getFirstPosition();
            const parent = position?.parent;
            // Handle Delete at the end of a <dd>
            if (data.domEvent.key === 'Delete' && parent?.is('element', 'definitionDescription') && position?.isAtEnd) {
                const next = parent.nextSibling;
                if (next?.is('element', 'definitionDescription')) {
                    evt.stop();
                    data.preventDefault();
                    model.change((writer)=>{
                        // Move contents of next <dd> into current <dd>
                        const range = writer.createRangeIn(next);
                        const insertPos = writer.createPositionAt(parent, 'end');
                        writer.move(range, insertPos);
                        // Remove the now-empty <dd>
                        writer.remove(next);
                        // Reselect at end of merged content
                        writer.setSelection(insertPos);
                    });
                }
            }
            // Handle Backspace at the beginning of a <dd>
            if (data.domEvent.key === 'Backspace' && parent?.is('element', 'definitionDescription') && position?.isAtStart) {
                const previous = parent.previousSibling;
                if (previous?.is('element', 'definitionDescription')) {
                    evt.stop();
                    data.preventDefault();
                    model.change((writer)=>{
                        // Move contents of current <dd> into the previous <dd>
                        const range = writer.createRangeIn(parent);
                        const insertPos = writer.createPositionAt(previous, 'end');
                        writer.move(range, insertPos);
                        // Remove the now-empty <dd>
                        writer.remove(parent);
                        // Set selection to end of merged content
                        writer.setSelection(insertPos);
                    });
                }
            }
            // Handle Enter at the end of <dd> or <dt>
            if (data.domEvent.key === 'Enter' && data.domEvent.shiftKey === false) {
                if (parent?.is('element', 'definitionDescription') || parent?.is('element', 'definitionTerm')) {
                    const dl = parent.findAncestor('definitionList');
                    const isAtEnd = position?.isAtEnd;
                    if (dl && isAtEnd) {
                        data.preventDefault();
                        evt.stop();
                        if (parent.isEmpty) {
                            // console.log('Create a new <p>!');
                            model.change((writer)=>{
                                const paragraph = writer.createElement('paragraph');
                                writer.insert(paragraph, model.createPositionAfter(dl));
                                writer.setSelection(paragraph, 'in');
                                writer.remove(parent);
                            });
                        } else {
                            if (parent?.is('element', 'definitionDescription')) {
                                // console.log('Create a new <dt>!');
                                model.change((writer)=>{
                                    const dt = writer.createElement('definitionTerm');
                                    writer.insert(dt, model.createPositionAfter(parent));
                                    writer.setSelection(dt, 'in');
                                });
                            } else {
                                // console.log('Create a new <dd>!');
                                model.change((writer)=>{
                                    const dd = writer.createElement('definitionDescription');
                                    writer.insert(dd, model.createPositionAfter(parent));
                                    writer.setSelection(dd, 'in');
                                });
                            }
                        }
                    }
                }
            }
            // Handle Delete/Backspace at an empty <dd> or <dt>
            if (data.domEvent.key === 'Delete' || data.domEvent.key === 'Backspace') {
                if (parent?.is('element', 'definitionDescription') || parent?.is('element', 'definitionTerm')) {
                    if (parent.isEmpty) {
                        data.preventDefault();
                        evt.stop();
                        model.change((writer)=>{
                            const previous = parent.previousSibling;
                            if (previous) {
                                const position = writer.createPositionAt(previous, 'end');
                                writer.setSelection(position);
                            }
                            writer.remove(parent);
                        });
                    }
                }
            }
            // Handle Arrow Down at the end of last <dd>
            if (data.domEvent.key === 'ArrowDown' && parent?.is('element', 'definitionDescription')) {
                const dl = parent.findAncestor('definitionList');
                const isLastChild = dl?.getChild(dl.childCount - 1) === parent;
                const isAtEnd = position?.isAtEnd;
                if (dl && isLastChild && isAtEnd) {
                    data.preventDefault();
                    evt.stop();
                    model.change((writer)=>{
                        const paragraph = writer.createElement('paragraph');
                        writer.insert(paragraph, model.createPositionAfter(dl));
                        writer.setSelection(paragraph, 'in');
                    });
                }
            }
            // Handle Arrow Up at the start of first <dt>
            if (data.domEvent.key === 'ArrowUp' && parent?.is('element', 'definitionTerm')) {
                const dl = parent.findAncestor('definitionList');
                const isFirstChild = dl?.getChild(0) === parent;
                const isAtStart = position?.isAtStart;
                if (dl && isFirstChild && isAtStart) {
                    data.preventDefault();
                    evt.stop();
                    model.change((writer)=>{
                        const paragraph = writer.createElement('paragraph');
                        writer.insert(paragraph, model.createPositionBefore(dl));
                        writer.setSelection(paragraph, 'in');
                    });
                }
            }
        });
    }
    defineSchema() {
        const schema = this.editor.model.schema;
        schema.register('definitionList', {
            allowWhere: '$block',
            allowContentOf: '$block',
            isBlock: true,
            isObject: true,
            allowAttributes: [
                'htmlDlAttributes'
            ]
        });
        schema.register('definitionTerm', {
            allowIn: 'definitionList',
            allowContentOf: '$block',
            isBlock: true,
            isObject: true,
            allowAttributes: [
                'htmlDtAttributes'
            ]
        });
        schema.register('definitionDescription', {
            allowIn: 'definitionList',
            allowContentOf: '$block',
            isBlock: true,
            isObject: true,
            allowAttributes: [
                'htmlDdAttributes'
            ]
        });
    }
    defineConverters() {
        const conversion = this.editor.conversion;
        conversion.for('upcast').elementToElement({
            view: 'dl',
            model: 'definitionList'
        });
        conversion.for('upcast').elementToElement({
            view: 'dt',
            model: 'definitionTerm'
        });
        conversion.for('upcast').elementToElement({
            view: 'dd',
            model: 'definitionDescription'
        });
        conversion.for('dataDowncast').elementToElement({
            model: 'definitionList',
            view: 'dl'
        });
        conversion.for('dataDowncast').elementToElement({
            model: 'definitionTerm',
            view: 'dt'
        });
        conversion.for('dataDowncast').elementToElement({
            model: 'definitionDescription',
            view: 'dd'
        });
        conversion.for('editingDowncast').elementToElement({
            model: 'definitionList',
            view: 'dl'
        });
        conversion.for('editingDowncast').elementToElement({
            model: 'definitionTerm',
            view: 'dt'
        });
        conversion.for('editingDowncast').elementToElement({
            model: 'definitionDescription',
            view: 'dd'
        });
        conversion.for('downcast').add((dispatcher)=>{
            const eventNames = [
                'attribute:htmlDlAttributes',
                'attribute:htmlDtAttributes',
                'attribute:htmlDdAttributes'
            ];
            eventNames.forEach((eventName)=>{
                dispatcher.on(eventName, (evt, data, conversionApi)=>{
                    // Tell the conversion API we're handling this attribute conversion
                    // so nothing else tries to do something with it.
                    if (!conversionApi.consumable.consume(data.item, evt.name)) {
                        return;
                    }
                    const { attributeOldValue, attributeNewValue } = data;
                    const viewCodeElement = conversionApi.mapper.toViewElement(data.item);
                    updateViewAttributesDefinitionListPlugin(conversionApi.writer, attributeOldValue, attributeNewValue, viewCodeElement);
                });
            });
        });
    }
}
class InsertDefinitionListCommand extends Command {
    constructor(editor){
        super(editor);
        this.value = false;
    }
    execute() {
        const editor = this.editor;
        const model = editor.model;
        const selection = model.document.selection;
        const isInsideDefinitionList = !!selection.getFirstPosition()?.findAncestor('definitionList');
        if (isInsideDefinitionList) {
            return; // Prevent insertion if already inside a <dl>
        }
        model.change((writer)=>{
            const dl = writer.createElement('definitionList');
            const dt = writer.createElement('definitionTerm');
            const dd = writer.createElement('definitionDescription');
            let selectedText = '';
            for (const range of selection.getRanges()){
                for (const item of range.getItems()){
                    if (item.is('$textProxy')) {
                        selectedText += item.data;
                    }
                }
            }
            if (selectedText) {
                writer.insertText(selectedText, dt);
                model.deleteContent(selection);
            } else {
                writer.insertText('Term', dt);
            }
            writer.insertText('Definition', dd);
            writer.append(dt, dl);
            writer.append(dd, dl);
            model.insertContent(dl);
            writer.setSelection(dt, 'end');
        });
    }
    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const isInDefinitionList = !!selection.getFirstPosition()?.findAncestor('definitionList');
        this.isEnabled = true;
        this.value = isInDefinitionList;
    }
}
class AlterDefinitionListCommand extends Command {
    _direction;
    _source;
    _target;
    constructor(editor, indentDirection){
        super(editor);
        this._direction = indentDirection;
        this._source = this._direction === 'forward' ? 'definitionTerm' : 'definitionDescription';
        this._target = this._direction === 'backward' ? 'definitionTerm' : 'definitionDescription';
    }
    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const position = selection.getFirstPosition();
        const element = position?.parent;
        this.isEnabled = element?.is('element', this._source) ?? false;
    }
    execute() {
        this._transformElement(this._source, this._target, ()=>{});
    }
    _transformElement(from, to, cancel) {
        const model = this.editor.model;
        const selection = model.document.selection;
        const position = selection.getFirstPosition();
        const element = position?.parent;
        if (element?.is('element', from)) {
            model.change((writer)=>{
                const newElement = writer.createElement(to);
                // Insert the new element after the old one
                writer.insert(newElement, element, 'after');
                // Move all child nodes into the new element
                const range = writer.createRangeIn(element);
                writer.move(range, writer.createPositionAt(newElement, 0));
                // Remove the old element
                writer.remove(element);
                // Set selection into the new element
                writer.setSelection(newElement, 'in');
            });
            cancel(); // prevent native behavior
            return true;
        }
        return false;
    }
}

const icons = {
    ckeditor
};

export { DefinitionList, icons };
//# sourceMappingURL=index.js.map
