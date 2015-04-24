(function() {
  "use strict";
  window.GOVUK = window.GOVUK || {};

  var ReportAProblem = function ($container) {
    this.$container = $container;
    var $form = $container.find('form'),
        form = new GOVUK.ReportAProblemForm($form),
        renderOriginal = this.renderOriginal.bind(this),
        renderVariant = this.renderVariant.bind(this);

    $form.on('reportAProblemForm.success', this.showConfirmation.bind(this));
    $form.on('reportAProblemForm.error', this.showError.bind(this));

    if (ReportAProblem.isBeingTestedOnThisPage()) {
      this.multivariateTest = new GOVUK.MultivariateTest({
        name: 'report-a-problem-redesign-ab-test',
        contentExperimentId: "SnpcHld1SJuQig-_SsaN_Q",
        cohorts: {
          variant_0: {variantId: 0, callback: renderOriginal},
          variant_1: {variantId: 1, callback: renderVariant}
        }
      });
    } else {
      renderOriginal();
    }

  };

  ReportAProblem.isBeingTestedOnThisPage = function() {
    return true;
  };

  ReportAProblem.prototype.renderOriginal = function() {
    this.addToggleLink();
  };

  ReportAProblem.prototype.renderVariant = function() {
    console.log('variant runs');
    this.addToggleLink();
  };

  ReportAProblem.prototype.addToggleLink = function() {
    var $toggle = $('\
      <div class="report-a-problem-toggle-wrapper js-footer">\
        <p class="report-a-problem-toggle">\
          <a href="">Is there anything wrong with this page?</a>\
        </p>\
      </div>');

    this.$container.before($toggle);
    $toggle.on("click", ".report-a-problem-toggle a", function(evt) {
      this.$container.toggle();
      evt.preventDefault();
    }.bind(this));
  };

  ReportAProblem.prototype.showConfirmation = function(evt, data) {
    this.$container.find('.report-a-problem-content').html(data.message);
  }

  ReportAProblem.prototype.showError = function() {
    var response = "\
      <h2>Sorry, we’re unable to receive your message right now.</h2>\
      <p>We have other ways for you to provide feedback on the \
      <a href='/contact'>contact page</a>.</p>";

    this.$container.find('.report-a-problem-content').html(response);
  }

  GOVUK.ReportAProblem = ReportAProblem;

  $(document).ready(function() {
    new GOVUK.ReportAProblem($('.report-a-problem-container'));
  });
}());
