describe('Section', function() {
  var template = {
    auto: '\
      <div id="autoSection" class="section-container auto" data-section> \
      </div>',
    settings: '\
      <div id="firstSection" class="section-container auto" data-section> \
        <section> \
          <p class="title" data-section-title><a href="#first1">Section 1</a></p> \
          <div class="content" data-slug="first1" data-section-content> \
            <p>Content of section 1.</p> \
          </div> \
        </section> \
        <section> \
          <p class="title" data-section-title><a href="#first2">Section 2</a></p> \
          <div class="content" data-slug="first2" data-section-content> \
            <p>Content of section 2.</p> \
          </div> \
        </section> \
      </div> \
      <div id="secondSection" class="section-container auto" data-section> \
        <section> \
          <p class="title" data-section-title><a href="#second1">Section 1</a></p> \
          <div class="content" data-slug="second1" data-section-content> \
            <p>Content of section 1.</p> \
          </div> \
        </section> \
        <section> \
          <p class="title" data-section-title><a href="#second2">Section 2</a></p> \
          <div class="content" data-slug="second2" data-section-content> \
            <p>Content of section 2.</p> \
          </div> \
        </section> \
      </div>'
  };

  var settings = Foundation.libs.section.settings;

  // Initialize with defaults from the start because Foundation
  // doesn't have destroy functionality at present.
  $(document).foundation('section');

  describe('initialization', function() {
    beforeEach(function() {
      $('#htmlFixture').append(template.auto);
    });

    it('should only be called once', function() {
      spyOn(Foundation.libs.section, 'init').andCallThrough();
      $(document).foundation('section');
      // Checking for 0 calls since we initialize before running the tests.
      expect(Foundation.libs.section.init.calls.length).toEqual(0);
    });

    it('should have the correct default settings', function() {
      expect(settings.deep_linking).toBe(false);
      expect(settings.small_breakpoint).toEqual(768);
      expect(settings.one_up).toBe(true);
      expect(settings.multi_expand).toBe(false);
      expect(settings.section_selector).toEqual('[data-section]');
      expect(settings.region_selector).toEqual('section, .section, [data-section-region]');
      expect(settings.title_selector).toEqual('.title, [data-section-title]');
      expect(settings.resized_data_attr).toEqual('data-section-resized');
      expect(settings.small_style_data_attr).toEqual('data-section-small-style');
      expect(settings.content_selector).toEqual('.content, [data-section-content]');
      expect(settings.nav_selector).toEqual('[data-section="vertical-nav"], [data-section="horizontal-nav"]');
      expect(settings.active_class).toEqual('active');

      var callbackCheck = function() {};
      expect(settings.callback.toString()).toEqual(callbackCheck.toString());
    });
  });

  describe('section-specific settings', function() {
    beforeEach(function() {
      $('#htmlFixture').append(template.settings);
    });

    it('should be overridable at the section level', function() {
      spyOn(settings, 'callback').andCallThrough();
      var secondSectionCallback = jasmine.createSpy('secondSectionCallback');

      $('#secondSection').foundation('section', 'overrides', {
        deep_linking: true,
        one_up: false,
        multi_expand: true,
        callback: secondSectionCallback
      });

      $('#firstSection > section > p').click();
      $('#secondSection > section + section > p').click();
      expect(settings.callback.calls.length).toEqual(2);
      expect(secondSectionCallback.calls.length).toEqual(1);
    });
  });

  describe('auto with defaults', function() {

    beforeEach(function() {
      $('#htmlFixture').append(template.auto);
    });

    it('should be tabs at small breakpoint', function() {
        setDocumentWidth(settings.small_breakpoint);

        $(window).triggerHandler('resize.fndtn.section');
        jasmine.Clock.tick(1000); // Let things settle...

        var section = $(settings.section_selector)
        expect(section).isAuto();
        expect(section).not.isAccordion();
        expect(section).isHorizontalTabs();
    }); 

    it('should be accordion below small breakpoint', function() {
        setDocumentWidth(settings.small_breakpoint - 1);

        $(window).triggerHandler('resize.fndtn.section');
        jasmine.Clock.tick(1000); // Let things settle...

        var section = $(settings.section_selector)
        expect(section).isAuto();
        expect(section).isAccordion();
    });
  });
});
