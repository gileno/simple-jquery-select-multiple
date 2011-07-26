(function($) {
    $.fn.selectMultiple = function(options) {
        var defaults = {
            containers: 1,
            search: true
        };
        var settings = $.extend(defaults, options);
        return this.each(function(x) {
            var select = $(this);
            var selectOptions = select.find("option");
            var container = $("<div />", {
                "class": 'select-multiple-container'
            });
            var column = $("<div />", {
                "class": 'select-multiple-column'
            });
            var containers = settings.containers;
            var search = settings.search;
            var totalOpts = selectOptions.length;
            var remainder = totalOpts % containers;
            var by_columns = (totalOpts - remainder) / containers;
            if(remainder > 0) {
                by_columns = by_columns + 1;
            }
            var counter = 0;
            selectOptions.each(function(y) {
                var opt = $(this);
                var value = opt.val();
                var text = opt.text();
                var selected = true ? opt.is(':selected') : false;
                var id = 'select-multiple-opt-'+ x + '-' + y; 
                var input = $("<input />", {
                    type: 'checkbox',
                    value: value,
                    id: id,
                    checked: selected
                });
                input.change(function(e) {
                    var select_opt = select.find("option[value=" + $(this).val() + "]");
                    if($(this).is(':checked')) {
                        select_opt.attr("selected", "selected");
                    } else {
                        select_opt.attr("selected", "");
                    }
                });
                var label = $("<label />", {
                    'for': id,
                    'text': text
                });
                var optContainer = $("<div />", {
                    "class": 'select-multiple-opt'
                });
                optContainer.append(input);
                optContainer.append(label);
                if(counter < by_columns) {
                    counter = counter + 1;
                } else {
                    container.append(column);
                    column = $("<div />", {
                        "class": 'select-multiple-column'
                    });
                    counter = 1;   
                }
                column.append(optContainer);
                if((y + 1) == totalOpts) {
                    container.append(column);
                }
            });
            container.append("<div class='clear' />");
            if(search) {
                var search_form = $("<form />", {
                    action: '',
                    id: 'form-select-multiple'
                });
                var search_input = $("<input type='text' />");
                search_input.keyup(function() {
                    var filter = normalizeText($(this).val());
                    $('.select-multiple-opt label').each(function() {
                        var filename = normalizeText($(this).text());
                        if (filename.search(filter) != -1) {
                            $(this).closest(".select-multiple-opt").show();
                        } else {
                            $(this).closest(".select-multiple-opt").hide();
                        }
                    });
                });
                search_form.append(search_input);
                select.before(search_form);
                $('.select-multiple-opt label').each(function() {
                    var filename = normalizeText($('a.name', $(this)).text());
                });
            }
            select.after(container);
            select.hide();            
        });
    }
})(jQuery);
