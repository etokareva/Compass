Template.language_menu_item.events({
  'click .js-language-change': function(e) {
    return TAPi18n.setLanguageAmplify($(e.currentTarget).data('locale'));
  }
});