(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['pageHeader.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"page-header\">\n    <img src=\"assets/img/logo.png\" alt=\"pinterest\" class=\"page-header__main-page-link\">\n    <button class=\"page-header__home-button header-button\">Home</button>\n    <button class=\"page-header__today-pins-button header-button\">Today</button>\n    <button class=\"page-header__following-button header-button\">Following</button>\n    <input class=\"page-header__search-bar\" type=\"text\" placeholder=\"Search\">\n    <img src=\"assets/img/bell.jpg\" alt=\"pinterest\" class=\"page-header__updates page-header__user-elem\">\n    <img src=\"assets/img/msg.jpg\" alt=\"messages\" class=\"page-header__messages page-header__user-elem\">\n    <img src=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"user") : depth0)) != null ? lookupProperty(stack1,"avatarURL") : stack1), depth0))
    + "\" alt=\"profile\"\n         class=\"page-header__profile-button page-header__user-elem\">\n    <select class=\"page-header__user-menu page-header__user-elem\"></select>\n</div>\n";
},"useData":true});
templates['pinBuilder.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "                    <option value=\""
    + alias2(alias1(depth0, depth0))
    + "\">"
    + alias2(alias1(depth0, depth0))
    + "</option>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<form method=\"POST\" class=\"pin-builder__form\">\n    <div id=\"pin-builder\">\n        <div class=\"pin-builder__commitment-row\">\n            <img class=\"delete-duplicate-menu\" src=\"assets/img/ellipsis.png\">\n            <select class=\"pin-builder__board-selector\">\n                <option value=\"\" disabled selected hidden>Select</option>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? lookupProperty(depth0,"user") : depth0)) != null ? lookupProperty(stack1,"boards") : stack1),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":7,"column":16},"end":{"line":9,"column":25}}})) != null ? stack1 : "")
    + "            </select>\n            <input type=\"submit\" class=\"pin-builder__save-pin-button\" value=\"Save\">\n        </div>\n        <div class=\"pin-builder__image-drop\">\n            <input type=\"file\" class=\"pin-builder__image-drop-zone\">\n        </div>\n        <textarea class=\"pin-builder__pin-title\" placeholder=\"Add your title\"></textarea>\n        <div class=\"pin-builder__profile-row\">\n            <img src=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"user") : depth0)) != null ? lookupProperty(stack1,"avatarURL") : stack1), depth0))
    + "\" class=\"pin-builder__profile-row__avatar\">\n            <span class=\"pin-builder__profile-row__name\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"user") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "</span>\n        </div>\n        <textarea class=\"pin-builder__pin-description\"\n                  placeholder=\"Tell everyone what your Pin is about\"></textarea>\n        <textarea class=\"pin-builder__destination-link\" placeholder=\"Add a destination link\"></textarea>\n    </div>\n</form>\n";
},"useData":true});
})();