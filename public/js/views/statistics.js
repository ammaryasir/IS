window.StatisticsView = Backbone.View.extend({
    tagName: "table",

    className: "table",

    initialize: function () {
        this.render();
    },

    render: function () {
	console.log(this.model);
        var shelfs = this.model.models;
        var len = shelfs.length;
        $(this.el).html('<thead><th> Warehouse Statistics</th></thead><tbody><tr class="shelf"></tr></tbody>');
        for (var i = 0; i < len; i++) {
             $(".shelf",this.el).append(new ShelfStatisticsView({model: shelfs[i]}).render().el);
        }
        return this;
    }
});


window.ShelfStatisticsView = Backbone.View.extend({

    tagName: "td",

    render: function () {
	var len = this.model.get("boxes").length;
	var maxItems = 0;
	var totalItems = 0;
	
        for (var i = 0; i < len; i++) {
	    if(this.model.get("boxes")[i].items > maxItems)
		maxItems = this.model.get("boxes")[i].items;
	    totalItems = totalItems + this.model.get("boxes")[i].items;
	}

        $(this.el).html(this.template(this.model.toJSON()));
        $(".stats",this.el).append('<tr><td> Maximum items in a box </td><td>' + maxItems  + '</td></tr>');
        $(".stats",this.el).append('<tr><td> Total items in a box </td><td>' + totalItems + '</td></tr>');
        $(".stats",this.el).append('<tr><td> Avegage items in a box </td><td>' + totalItems/ parseInt(this.model.get('totalboxes')) + '</td></tr>');
        return this;
    }
});
