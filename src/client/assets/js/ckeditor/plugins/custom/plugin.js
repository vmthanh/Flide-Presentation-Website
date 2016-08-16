CKEDITOR.plugins.add('custom', {
    requires: '',
    lang: 'en',
    icons: 'head1,head2,head3,delete,moreOptions',
    init: function(editor) {
        var config = editor.config;
        var lang = editor.lang.custom;

        editor.addCommand('head3', {
            exec: function() {

            }
        });

        editor.ui.add('head1', CKEDITOR.UI_BUTTON, {
            lable: lang['head1'],
            title: 'Title style',
            command: 'head1',
            toolbar: 'head1',
        });

        editor.ui.add('head2', CKEDITOR.UI_BUTTON, {
            lable: lang['head2'],
            title: 'Text style',
            command: 'head2',
            toolbar: 'head2',
        });

        editor.ui.add('head3', CKEDITOR.UI_BUTTON, {
            lable: lang['head3'],
            title: 'Acent text style',
            command: 'head3',
            toolbar: 'head3',
        });

        editor.ui.add('delete', CKEDITOR.UI_BUTTON, {
            lable: lang['delete'],
            title: 'Delete',
            command: 'delete',
            toolbar: 'delete',
        });

        editor.ui.add('moreOptions', CKEDITOR.UI_PANELBUTTON, {
            label: lang["moreOptionsTitle"],
            title: 'More options',
            command: "customAction_moreOptions",
            toolbar: 'custom',
            modes: {
                wysiwyg: 1
            },
            editorFocus: 0,

            panel: {
                attributes: {
                    role: 'lisbox',
                    'aria-label': lang.panelTitle
                },
                className: 'moreOptions',
            },

            onBlock: function(panel, block) {
                block.autosize = true;
                block.element.addClass('cke_moreblock');
                block.element.setHtml(renderContent(editor, panel));
                block.element.getDocument().getBody().setStyle('overflow', 'hidden');
                block.element.setStyle('outline', 'none');
                block.element.setStyle('padding', '0');
                block.element.setStyle('margin', '0');
                CKEDITOR.ui.fire('ready', this);
            },

            onOpen: function() {
                $('.moreOptions').attr("style", $('.moreOptions').attr('style') + '; ' + 'dispaly:block!important;');
                $('.cke_button__moreoptions').css("cssText", 'background-color: #ff6f3b!important');
            },

            onClose: function() {
                var moreOptionsCss = $('.moreOptions').css('cssText')
                $('.moreOptions').attr("style", $('.moreOptions').attr('style') + '; ' + 'height:0!important;');
                $('.cke_button__moreoptions').css("cssText", 'background-color: ""!important');
            }
        });


        function renderContent(editor, panel) {
            var justifyLeftFunc = CKEDITOR.tools.addFunction(editor.leftAlign);
            justifyLeftFunc = justifyLeftFunc.toString();

            var justifyCenterFunc = CKEDITOR.tools.addFunction(editor.centerAlign);
            justifyCenterFunc = justifyCenterFunc.toString();

            var justifyRightFunc = CKEDITOR.tools.addFunction(editor.rightAlign);
            justifyRightFunc = justifyRightFunc.toString();


            var justifyBlockFunc = CKEDITOR.tools.addFunction(editor.justifyAlign);
            justifyBlockFunc = justifyBlockFunc.toString();

            var output = [];
            output.push("<div style=\"margin-top: 10px; margin-left: 11px; border: none; outline: none; height: 0px;\">" +
                "<li class=\"alignLeft\" style=\"display:inline-block\"; list-style: none\">" +
                "<a title=\"justify left\"" +
                "onclick=\"CKEDITOR.tools.callFunction(" + justifyLeftFunc + ",this);return false\"" +
                "href=\"javascript:void('Align Left')\">" +
                "<img style=\"height: 15px; width: 18px; margin-right: 11px;\" src=\"/assets/js/ckeditor/plugins/custom/icons/alignLeft.png\">" +
                "</a>" +
                "</li>" +

                "<li class=\"alignCenter\" style=\"display:inline-block\"; list-style: none\">" +
                "<a title=\"justify center\"" +
                "onclick=\"CKEDITOR.tools.callFunction(" + justifyCenterFunc + ",this);return false\"" +
                "href=\"javascript:void('Align Center')\">" +
                "<img style=\"height: 15px; width: 18px; margin-right: 11px;\" src=\"/assets/js/ckeditor/plugins/custom/icons/alignCenter.png\">" +
                "</a>" +
                "</li>" +

                "<li class=\"alignRight\" style=\"display:inline-block\"; list-style: none\">" +
                "<a title=\"justify right\"" +
                "onclick=\"CKEDITOR.tools.callFunction(" + justifyRightFunc + ",this);return false\"" +
                "href=\"javascript:void('Align Right')\">" +
                "<img style=\"height: 15px; width: 18px; margin-right: 11px;\" src=\"/assets/js/ckeditor/plugins/custom/icons/alignRight.png\">" +
                "</a>" +
                "</li>" +

                "<li class=\"alignJustify\" style=\"display:inline-block\"; list-style: none\">" +
                "<a title=\"justify block\"" +
                "onclick=\"CKEDITOR.tools.callFunction(" + justifyBlockFunc + ",this);return false\"" +
                "href=\"javascript:void('Align Block')\">" +
                "<img style=\"height: 15px; width: 18px; margin-right: 11px;\" src=\"/assets/js/ckeditor/plugins/custom/icons/alignJustify.png\">" +
                "</a>" +
                "</li>" +
                "</div>");

            return output.join('');
        }
    },
});
