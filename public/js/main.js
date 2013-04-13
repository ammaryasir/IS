var AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "home",
        "inbox"             : "inbox",
	"warehouse"	    : "warehouse",
	"statistics"	    : "statistics",
        "about"             : "about"
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

    home: function (id) {
        if (!this.homeView) {
            this.homeView = new HomeView();
        }
        $('#content').html(this.homeView.el);
        this.headerView.selectMenuItem('home-menu');
    },

    inbox: function (id) {
        var box = new Box();
	box.fetch({success: function(){
            $("#content").html(new InboxView({model: box}).el);
        }});
        this.headerView.selectMenuItem();
    },
    
    warehouse: function (id) {
        var warehouse = new Warehouse();
	warehouse.fetch({success: function(){
            $("#content").html(new WarehouseView({model: warehouse}).el);
        }});
        this.headerView.selectMenuItem();
    },

    about: function () {
        if (!this.aboutView) {
            this.aboutView = new AboutView();
        }
        $('#content').html(this.aboutView.el);
        this.headerView.selectMenuItem('about-menu');
    }

});

utils.loadTemplate(['HomeView', 'HeaderView', 'InboxView', 'BoxView','ShelfStatisticsView','AboutView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});
