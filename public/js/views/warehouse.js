window.WarehouseView = Backbone.View.extend({
    tagName: "div",

    className: "row",
  
    initialize: function () {
        this.render();

    },

    render: function () {
        var shelfs = this.model.models;
        var len = shelfs.length;
        for (var i = 0; i < len; i++) {
             $(this.el).append(new ShelfView({model: shelfs[i]}).render().el);
        }
        $(this.el).append('<div class="span2"> </div>');
        $(this.el).append(new MoveBoxView({model:this.model}).render().el);

        return this;
    },


});

window.ShelfView = Backbone.View.extend({	
    tagName: "div",

    className: "span2",

    render: function () {
	var boxes = this.model.get("boxes");
	var len = boxes.length;
	$(this.el).html('<table class="table table-bordered table-condensed"><thead><th>' + this.model.get("name") + '</th></thead><tbody class = "boxes" ></tbody></table>');
        for (var i = len-1; i >= 0; i--) {
	    var newBox = new Box(boxes[i]);
            $('.boxes',this.el).append(new BoxView({model:newBox}).render().el);
	}
        return this;
    }
});

window.BoxView = Backbone.View.extend({
    tagName: "tr",
    className: "success",
    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
});


window.MoveBoxView = Backbone.View.extend({
    className: "span2",
    render: function () {
        $(this.el).html(this.template());
	console.log(parent);
        return this;
    },
    events: {
        "click .save"   : "moveBox",
    },
    moveBox : function(event) {

	var from = parseInt($('#movefromshelf').val()) - 1;	
	var to = parseInt($('#movetoshelf').val()) - 1;	
	var shelfs = this.model.models;
        
        var check1 = shelfs[from].validatePop();
        var check2 = shelfs[to].validatePush();
	console.log(check1);
	console.log(check2);
        if (check1.isValidPop === false) {
            utils.displayValidationErrors(check1.messages);
            return false;
        }
        if (check2.isValidPush === false) {
            utils.displayValidationErrors(check2.messages);
            return false;
        }
	var len = shelfs[from].get("totalboxes");
	var newBox = shelfs[from].get("boxes")[len-1];
	console.log(newBox);
	shelfs[from].get("boxes").pop();
	shelfs[from].set({"totalboxes" : len - 1});
	shelfs[from].save();

	len = shelfs[to].get("totalboxes");
	shelfs[to].get("boxes").push(newBox);
	shelfs[to].set({"totalboxes" : len + 1});
	shelfs[to].save();	
	parent.render();	
        app.navigate('warehouse', false);
	
    }
});
