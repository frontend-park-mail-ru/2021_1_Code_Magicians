(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['comment.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"comment\">\n    <a href=\"/home\" class=\"sidebar__home-link\">\n        <img src=\"/assets/img/Logo.png\" alt=\"logo\" class=\"sidebar__logo-image\">\n    </a>\n    <div class=\"comment__text\">\n        <div class=\"comment__text_author\">Best Idea Generator</div>\n        <div class=\"comment__text_message\">Wow, what an amazing pin, wish my life was as amazing as it!</div>\n    </div>\n</div>\n";
},"useData":true});
templates['navbar.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <div class=\"navbar__user-section\">\n            <img src=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"user") : depth0)) != null ? lookupProperty(stack1,"avatarLink") : stack1), depth0))
    + "\" alt=\"Avatar\" class=\"navbar__user-avatar\">\n            <a href=\"/profile\" class=\"navbar__username\"> "
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"user") : depth0)) != null ? lookupProperty(stack1,"username") : stack1), depth0))
    + " </a>\n        </div>\n        <div class=\"navbar__actions\">\n            <a class=\"navbar__action\" href=\"/create-pin\">\n                <i class=\"fas fa-plus navbar__action-icon\"></i>\n            </a>\n            <button class=\"navbar__action\">\n                <i class=\"fas fa-ellipsis-v navbar__action-icon\"></i>\n            </button>\n        </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "        <div class=\"navbar__auth-section\">\n            <a href=\"/login\" class=\"navbar__auth-link navbar__auth-link_primary\">\n                <span class=\"navbar__auth-text\">Sign in</span>\n            </a>\n            <a href=\"/signup\" class=\"navbar__auth-link navbar__auth-link_secondary\">\n                <span class=\"navbar__auth-text\">Sign up</span>\n            </a>\n        </div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"navbar\">\n    <form class=\"navbar__search-form\" novalidate>\n        <i class=\"fas fa-search navbar__search-icon\"></i>\n        <input type=\"text\" class=\"navbar__search-input\" placeholder=\"Looking things up\" required>\n        <button class=\"navbar__search-wiper\">\n            <i class=\"fas fa-times navbar__search-wiper-icon\"></i>\n        </button>\n    </form>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"userIsAuthorised") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":9,"column":4},"end":{"line":31,"column":11}}})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true});
templates['notificationSettings.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<h3 class=\"notification-settings__title\">\n    Coming soon...\n</h3>\n";
},"useData":true});
templates['page.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"page\">\n    "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"page__sidebar") || (depth0 != null ? lookupProperty(depth0,"page__sidebar") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"page__sidebar","hash":{},"data":data,"loc":{"start":{"line":2,"column":4},"end":{"line":2,"column":25}}}) : helper))) != null ? stack1 : "")
    + "\n    "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"page__messagesSlider") || (depth0 != null ? lookupProperty(depth0,"page__messagesSlider") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"page__messagesSlider","hash":{},"data":data,"loc":{"start":{"line":3,"column":4},"end":{"line":3,"column":32}}}) : helper))) != null ? stack1 : "")
    + "\n    "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"page__notificationsSlider") || (depth0 != null ? lookupProperty(depth0,"page__notificationsSlider") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"page__notificationsSlider","hash":{},"data":data,"loc":{"start":{"line":4,"column":4},"end":{"line":4,"column":37}}}) : helper))) != null ? stack1 : "")
    + "\n    <div class=\"page__wrap\">\n        "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"page__navbar") || (depth0 != null ? lookupProperty(depth0,"page__navbar") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"page__navbar","hash":{},"data":data,"loc":{"start":{"line":6,"column":8},"end":{"line":6,"column":28}}}) : helper))) != null ? stack1 : "")
    + "\n        <div class=\"page__content\">\n            "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"page__content") || (depth0 != null ? lookupProperty(depth0,"page__content") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"page__content","hash":{},"data":data,"loc":{"start":{"line":8,"column":12},"end":{"line":8,"column":33}}}) : helper))) != null ? stack1 : "")
    + "\n        </div>\n    </div>\n</div>\n";
},"useData":true});
templates['pinsFeed.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <div class=\"pins-feed__pin-wrapper\">\n            <button class=\"pins-feed__save-button\">\n                <span class=\"pins-feed__save-button-text\">Save</span>\n            </button>\n            <a href=\"/pin/"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"ID") : depth0), depth0))
    + "\" class=\"pins-feed__pin\">\n                <img src=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"imageLink") : depth0), depth0))
    + "\" alt=\"pin's image\" class=\"pins-feed__pin-image\">\n                <span class=\"pins-feed__pin-title\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"title") : depth0), depth0))
    + "</span>\n            </a>\n        </div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"pins-feed\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"pins") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":4},"end":{"line":12,"column":13}}})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true});
templates['profileChanges.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                            value=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"user") : depth0)) != null ? lookupProperty(stack1,"firstName") : stack1), depth0))
    + "\"\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "                            placeholder=\"Add name\"\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"profile-changes\">\n    <h1 class=\"settings__title\">\n        Profile changes\n    </h1>\n    <p class=\"profile-changes__description\">\n        You can change some fields here or make them private (will be available later)\n    </p>\n    <div class=\"profile-changes__settings-form\">\n        <form class=\"profile-changes__avatar-form\">\n            <span class=\"profile-changes__avatar-title\">Avatar</span>\n            <img\n                    src=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"user") : depth0)) != null ? lookupProperty(stack1,"avatarLink") : stack1), depth0))
    + "\"\n                    alt=\"avatar\"\n                    class=\"profile-changes__avatar-preview\"\n            >\n            <button class=\"profile-changes__avatar-change-button\">Change</button>\n            <input\n                    type=\"file\"\n                    class=\"profile-changes__avatar-input\"\n                    name=\"avatar_upload\"\n                    accept=\"image/jpeg,image/png,image/jpg\"\n            >\n        </form>\n        <form class=\"profile-changes__fields\">\n            <div class=\"settings__field\">\n                <span class=\"settings__field-name\">Name</span>\n                <input\n                        type=\"text\"\n                        class=\"settings__field-input\"\n"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? lookupProperty(depth0,"user") : depth0)) != null ? lookupProperty(stack1,"firstName") : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":30,"column":24},"end":{"line":34,"column":31}}})) != null ? stack1 : "")
    + "                        name=\"firstName\"\n                >\n            </div>\n            <div class=\"settings__field\">\n                <span class=\"settings__field-name\">Username</span>\n                <input\n                        type=\"text\"\n                        class=\"settings__field-input\"\n                        value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"user") : depth0)) != null ? lookupProperty(stack1,"username") : stack1), depth0))
    + "\"\n                        name=\"username\"\n                >\n            </div>\n            <div class=\"settings__field\">\n                <span class=\"settings__field-name\">Email</span>\n                <input\n                        type=\"email\"\n                        class=\"settings__field-input\"\n                        value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"user") : depth0)) != null ? lookupProperty(stack1,"email") : stack1), depth0))
    + "\"\n                        name=\"email\"\n                >\n            </div>\n            <input type=\"submit\" class=\"settings__submit-button\">\n        </form>\n    </div>\n</div>\n";
},"useData":true});
templates['profileHeader.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "                <a href=\"/settings\" class=\"profile-info__settings\">\n                    <i class=\"fas fa-cog profile-info__settings-icon\"></i>\n                </a>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "                <button class=\"profile-info__follow-toggle\">\n                    <i class=\"far fa-heart profile-info__follow-icon\"></i>\n                </button>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"profile-info\">\n    <img src=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"profile") : depth0)) != null ? lookupProperty(stack1,"avatarLink") : stack1), depth0))
    + "\" alt=\"avatar\" class=\"profile-info__avatar\">\n    <div class=\"profile-info__main-info\">\n        <div class=\"profile-info__username-zone\">\n            <span class=\"profile-info__username\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"profile") : depth0)) != null ? lookupProperty(stack1,"username") : stack1), depth0))
    + "</span>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"selfProfile") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":6,"column":12},"end":{"line":14,"column":19}}})) != null ? stack1 : "")
    + "        </div>\n        <div class=\"profile-info__additional-info\">\n            <span class=\"profile-info__user-real-name\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"profile") : depth0)) != null ? lookupProperty(stack1,"firstName") : stack1), depth0))
    + "</span>\n        </div>\n    </div>\n    <div class=\"profile-info__stats\">\n        <div class=\"profile-info__stat\">\n            <span class=\"profile-info__stat-counter\">1k</span>\n            <span class=\"profile-info__stat-name\">pins</span>\n        </div>\n        <div class=\"profile-info__stat\">\n            <span class=\"profile-info__stat-counter\">50</span>\n            <span class=\"profile-info__stat-name\">boards</span>\n        </div>\n        <div class=\"profile-info__stat\">\n            <span class=\"profile-info__stat-counter\">2,3k</span>\n            <span class=\"profile-info__stat-name\">month views</span>\n        </div>\n    </div>\n</div>\n<div class=\"profile-links\">\n    <a href=\"/profile\" class=\"profile-links__link\">Overview</a>\n    <a href=\"/profile/boards\" class=\"profile-links__link\">Boards</a>\n    <a href=\"/profile/pins\" class=\"profile-links__link\">Pins</a>\n    <a href=\"/profile/followers\" class=\"profile-links__link\">Followers</a>\n    <a href=\"/profile/following\" class=\"profile-links__link\">Following</a>\n</div>\n";
},"useData":true});
templates['securitySettings.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<form class=\"security-settings\">\n    <h1 class=\"settings__title\">\n        Security\n    </h1>\n    <div class=\"security-settings__fields\">\n        <div class=\"settings__field\">\n            <span class=\"settings__field-name\">New password</span>\n            <input type=\"password\" class=\"settings__field-input\" name=\"new-password\">\n        </div>\n        <div class=\"settings__field\">\n            <span class=\"settings__field-name\">Confirm new password</span>\n            <input type=\"password\" class=\"settings__field-input\" name=\"confirm-password\">\n        </div>\n        <input type=\"submit\" class=\"settings__submit-button\">\n    </div>\n</form>\n";
},"useData":true});
templates['sidebar.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "            <div data-view=\"boards\" class=\"sidebar__view-option\">\n                <a class=\"sidebar__view-link\" href=\"/profile/boards\">\n                    <i class=\"fas fa-layer-group sidebar__view-icon\"></i>\n                </a>\n            </div>\n            <div data-view=\"settings\" class=\"sidebar__view-option\">\n                <a class=\"sidebar__view-link\" href=\"/settings\">\n                    <i class=\"fas fa-cog sidebar__view-icon\"></i>\n                </a>\n            </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "            <button name=\"messages-toggle\" class=\"sidebar__toggle slider-toggle\">\n                <i class=\"fas fa-comment-dots sidebar__toggle-icon\"></i>\n            </button>\n            <button name=\"notifications-toggle\" class=\"sidebar__toggle slider-toggle\">\n                <i class=\"fas fa-bell sidebar__toggle-icon\"></i>\n            </button>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"sidebar\">\n    <a href=\"/home\" class=\"sidebar__home-link\">\n        <img src=\"/assets/img/Logo.png\" alt=\"logo\" class=\"sidebar__logo-image\">\n    </a>\n    <div class=\"sidebar__view-selector\">\n        <div data-view=\"home\" class=\"sidebar__view-option\">\n            <a class=\"sidebar__view-link\" href=\"/home\">\n                <i class=\"fas fa-home sidebar__view-icon\"></i>\n            </a>\n        </div>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"userIsAuthorized") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":11,"column":8},"end":{"line":22,"column":15}}})) != null ? stack1 : "")
    + "    </div>\n    <div class=\"sidebar__toggles\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"userIsAuthorized") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":25,"column":8},"end":{"line":32,"column":15}}})) != null ? stack1 : "")
    + "        <button class=\"sidebar__toggle theme-toggle\">\n            <i class=\"fas fa-moon sidebar__toggle-icon theme-toggle-icon\"></i>\n        </button>\n    </div>\n</div>\n";
},"useData":true});
templates['slider.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <div class=\"slider__item\">\n                    <img src=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"imageLink") : depth0), depth0))
    + "\" alt=\"image\" class=\"slider__item-image\">\n                    <div class=\"slider__item-content\">\n                        <span class=\"slider__item-header\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"header") : depth0), depth0))
    + "</span>\n                        <p class=\"slider__item-text\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"text") : depth0), depth0))
    + "</p>\n                    </div>\n                    <i class=\"fas fa-circle slider__item-indicator "
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"isNew") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":14,"column":67},"end":{"line":14,"column":118}}})) != null ? stack1 : "")
    + "\"></i>\n                </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "slider__item-indicator_new";
},"4":function(container,depth0,helpers,partials,data) {
    return "            <form class=\"slider__message-form message-form message-form_hidden\">\n                <label class=\"message-form__label message-form__target-label\">\n                    To :\n                    <input type=\"text\" class=\"message-form__target-input message-form__input\">\n                </label>\n                <label class=\"message-form__label message-form__text-label\">\n                    Message text :\n                    <textarea class=\"message-form__text-input message-form__input\"></textarea>\n                </label>\n                <button class=\"message-form__close-button\">\n                    <i class=\"fa-times fas message-form__close-icon\"></i>\n                </button>\n            </form>\n            <button class=\"slider__message-button slider__message-button_primary\">New message</button>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div name=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"sliderType") || (depth0 != null ? lookupProperty(depth0,"sliderType") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"sliderType","hash":{},"data":data,"loc":{"start":{"line":1,"column":11},"end":{"line":1,"column":25}}}) : helper)))
    + "Slider\" class=\"slider-wrapper\">\n    <div class=\"slider\">\n        <div class=\"slider__header\">\n            <h2 class=\"slider__header-text\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"sliderType") || (depth0 != null ? lookupProperty(depth0,"sliderType") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"sliderType","hash":{},"data":data,"loc":{"start":{"line":4,"column":44},"end":{"line":4,"column":58}}}) : helper)))
    + "</h2>\n        </div>\n        <div class=\"slider__items\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"items") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":7,"column":12},"end":{"line":16,"column":21}}})) != null ? stack1 : "")
    + "        </div>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"typeIsMessages") : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":18,"column":8},"end":{"line":33,"column":15}}})) != null ? stack1 : "")
    + "    </div>\n    <div class=\"page-shader\"></div>\n</div>\n";
},"useData":true});
templates['loginView.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"login-page\">\n    <div class=\"login-page__wrapper\">\n        <div class=\"login-page__content\">\n            <div class=\"login-page__content-wrapper\">\n                <a class=\"login-page__logo\" href=\"/home\">\n                    <img src=\"../../../assets/img/Logo.png\" alt=\"logo\" class=\"login-page__logo-image\">\n                </a>\n                <div class=\"login-page__title\">Login</div>\n            </div>\n            <div class=\"login-page__content-wrapper\">\n                <form class=\"login-form auth-form\">\n                    <label>\n                        <input class=\"login-form__input\" type=\"text\" name=\"login-username\" placeholder=\"Username\">\n                    </label>\n                    <div class=\"errors name-errors input-error-text\"></div>\n                    <label>\n                        <input class=\"login-form__input\" type=\"password\" name=\"login-pass\" placeholder=\"Password\">\n                    </label>\n                    <div class=\"errors password-errors input-error-text\"></div>\n                    <input class=\"login-form__submit button\" type=\"submit\" value=\"Login\">\n                </form>\n            </div>\n        </div>\n    </div>\n    <div class=\"login-page__side\">\n        No account yet? <a href=\"/signup\" class=\"signup-button button\">Register</a>\n    </div>\n</div>\n";
},"useData":true});
templates['signupView.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"signup-page\">\n    <div class=\"signup-page__wrapper\">\n        <div class=\"signup-page__content\">\n            <div class=\"signup-page__content-wrapper\">\n                <a class=\"signup-page__logo\" href=\"/home\">\n                    <img src=\"../../../assets/img/Logo.png\" alt=\"logo\" class=\"signup-page__logo-image\">\n                </a>\n                <div class=\"signup-page__title\">Register</div>\n            </div>\n            <div class=\"signup-page__content-wrapper\">\n                <form class=\"signup-form auth-form\">\n                    <label>\n                        <input class=\"signup-form__input\" type=\"text\" name=\"signup-username\" placeholder=\"Your Name\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"payload") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "\">\n                    </label>\n                    <div class=\"errors name-errors input-error-text\"></div>\n                    <label>\n                        <input class=\"signup-form__input\" type=\"text\" name=\"signup-email\" placeholder=\"Email\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"payload") : depth0)) != null ? lookupProperty(stack1,"email") : stack1), depth0))
    + "\">\n                    </label>\n                    <div class=\"errors email-errors input-error-text\"></div>\n                    <label>\n                        <input class=\"signup-form__input\" type=\"password\" name=\"signup-pass\" placeholder=\"Password\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"payload") : depth0)) != null ? lookupProperty(stack1,"password") : stack1), depth0))
    + "\">\n                    </label>\n                    <div class=\"errors password-errors input-error-text\"></div>\n                    <input class=\"signup-form__submit button\" type=\"submit\" value=\"Register\">\n                </form>\n            </div>\n        </div>\n    </div>\n    <div class=\"signup-page__side\">\n        Have an account?  <a href=\"/login\" class=\"login-button button\">Login</a>\n    </div>\n</div>\n";
},"useData":true});
templates['feedView.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"pins-feed-wrapper\">\n    "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"pinsFeed") || (depth0 != null ? lookupProperty(depth0,"pinsFeed") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"pinsFeed","hash":{},"data":data,"loc":{"start":{"line":2,"column":4},"end":{"line":2,"column":18}}}) : helper))) != null ? stack1 : "")
    + "\n</div>\n";
},"useData":true});
templates['notFoundView.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"page-error\">\n    <img src=\"/assets/img/notFound-removebg-preview.png\" alt=\"Page not found\" class=\"page-error__image\">\n    <h1 class=\"page-error__title\">\n        Sorry, but page you are looking for doesn't really exist :(\n    </h1>\n    <p class=\"page-error__description\">\n        <span class=\"page-error__contact-text\">\n            Maybe it was here before?  Contact us:\n        </span>\n        <a href=\"https://github.com/frontend-park-mail-ru/2021_1_Code_Magicians\" class=\"page-error__contact-link\">Our github</a>\n    </p>\n    <button class=\"page-error__back-button\">\n        Go back\n    </button>\n</div>\n";
},"useData":true});
templates['pinView.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"comment") || (depth0 != null ? lookupProperty(depth0,"comment") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"comment","hash":{},"data":data,"loc":{"start":{"line":37,"column":20},"end":{"line":37,"column":33}}}) : helper))) != null ? stack1 : "")
    + "\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"pin-browser\">\n    <div class=\"pin-browser__image-panel\">\n    </div>\n    <div class=\"pin-browser__info-panel\">\n        <div class=\"info-panel__title\">Spectacular views</div>\n        <div class=\"info-panel__controls\">controls</div>\n        <div class=\"pin-stats\">\n            <div class=\"pin-stats__item\">\n                <i class=\"fas fa-eye pin-icon\"></i>\n                <div class=\"pin-stats__item_val\">420</div>\n                <div class=\"pin-stats__item_descr\">views</div>\n            </div>\n            <div class=\"pin-stats__item\">\n                <i class=\"fas fa-thumbtack pin-icon\"></i>\n                <div class=\"pin-stats__item_val\">69</div>\n                <div class=\"pin-stats__item_descr\">saves</div>\n            </div>\n            <div class=\"pin-stats__item\">\n                <i class=\"fas fa-external-link-alt pin-icon\"></i>\n                <div class=\"pin-stats__item_val\">13</div>\n                <div class=\"pin-stats__item_descr\">link clicks</div>\n            </div>\n        </div>\n        <div class=\"user-info\">\n            <div class=\"user-info__avatar\"></div>\n            <div class=\"user-info__text\">\n                <div class=\"user-info__text_username\">Username_Usernamov</div>\n                <div class=\"user-info__text_followers\">31 follower</div>\n            </div>\n            <div class=\"user-info__follow-button\">Thats you!</div>\n        </div>\n        <div class=\"pin-description\"> When looking at creative photos, viewers are transported to an\n        otherworldly scene where reality and fantasy become one</div>\n        <div class=\"info-panel__comments\">Comments\n            <div class=\"info-panel__bodies\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"comments") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":36,"column":16},"end":{"line":38,"column":25}}})) != null ? stack1 : "")
    + "            </div>\n            <form class=\"comment-form\">\n                <input type=\"text\">\n                <input type=\"button\">\n            </form>\n        </div>\n    </div>\n    <div class=\"pin-browser__tags-panel\">\n        <div class=\"pin-browser__search-title\">\n            <i class=\"fas fa-search pin-icon pin-browser__search-title_icon\"></i>\n            <div class=\"\">\n                Ideas that may interest you\n            </div>\n        </div>\n        <div class=\"tags-list\">\n            <div class=\"tags-list__tag\">Photo</div>\n            <div class=\"tags-list__tag\">Photo Editing</div>\n            <div class=\"tags-list__tag\">Passing Reviews</div>\n            <div class=\"tags-list__tag\">Finding hopes and dreams</div>\n            <div class=\"tags-list__tag\">Abracadabra</div>\n        </div>\n    </div>\n</div>\n";
},"useData":true});
templates['profileBoardsView.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <a href=\"/board/"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"id") : depth0), depth0))
    + "\" class=\"profile-boards__board\">\n            <img src=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"avatarLink") : depth0), depth0))
    + "\" alt=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"title") : depth0), depth0))
    + "\" class=\"profile-boards__board-avatar\">\n            <span class=\"profile-boards__title\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"title") : depth0), depth0))
    + "</span>\n        </a>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"profile-boards\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"boards") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":4},"end":{"line":7,"column":13}}})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true});
templates['profileView.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"profile-header-wrapper\">\n    "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"profileHeader") || (depth0 != null ? lookupProperty(depth0,"profileHeader") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"profileHeader","hash":{},"data":data,"loc":{"start":{"line":2,"column":4},"end":{"line":2,"column":25}}}) : helper))) != null ? stack1 : "")
    + "\n</div>\n<div class=\"profile-content-wrapper\">\n    "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"profileContent") || (depth0 != null ? lookupProperty(depth0,"profileContent") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"profileContent","hash":{},"data":data,"loc":{"start":{"line":5,"column":4},"end":{"line":5,"column":26}}}) : helper))) != null ? stack1 : "")
    + "\n</div>\n";
},"useData":true});
templates['settingsView.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"settings\">\n    <div class=\"settings__sidebar\">\n        <div class=\"settings__sections\">\n            <a href=\"/settings/profile\" class=\"settings__section-link settings__option\">\n                Profile changes\n            </a>\n            <a href=\"/settings/notifications\" class=\"settings__section-link settings__option\">\n                Notifications\n            </a>\n            <a href=\"/settings/security\" class=\"settings__section-link settings__option\">\n                Security\n            </a>\n        </div>\n        <button class=\"settings__option settings__logout-button\">\n            Log out\n        </button>\n    </div>\n    <div class=\"settings__form-wrapper\">\n        "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"settingsForm") || (depth0 != null ? lookupProperty(depth0,"settingsForm") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"settingsForm","hash":{},"data":data,"loc":{"start":{"line":19,"column":8},"end":{"line":19,"column":28}}}) : helper))) != null ? stack1 : "")
    + "\n    </div>\n</div>\n";
},"useData":true});
})();