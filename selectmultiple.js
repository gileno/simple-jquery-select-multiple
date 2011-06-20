(function($) {
    $.fn.selectMultiple = function(options) {
        var defaults = {};
        var settings = $.extend(defaults, options);
        this.each(function(x) {
            var select = $(this);
            var selectOptions = select.find("option");
            var container = $("<div />", {
                "class": 'select-multiple-container'
            });
            selectOptions.each(function(y) {
                var opt = $(this);
                var value = opt.val();
                var text = opt.html();
                var id = 'select-multiple-opt-'+ x + '-' + y; 
                var input = $("<input />", {
                    type: 'checkbox',
                    value: value,
                    id: id
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
                container.append(optContainer);
            });
            select.after(container);
            select.hide();            
        });
    }
})(jQuery);
