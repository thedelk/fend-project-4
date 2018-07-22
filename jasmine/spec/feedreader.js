///////////////////////////////////////////////////////////////////////////////
//  FEEDREADER JS
//
//  INFORMATION
//  Project.................Feedreader
//  File....................feedreader.js
//  Purpose.................Udacity Front-End Nanodegree Program
//                          Project 4
//  Creator.................Ryan Delk
//  Last Change.............July 22, 2018
//
///////////////////////////////////////////////////////////////////////////////

// feedreader.js

// This is the spec file that Jasmine will read and contains
// all of the tests that will be run against your application.

// We're placing all of our tests within the $() function,
// since some of these tests may require DOM elements. We want
// to ensure they don't run until the DOM is ready.

$(function () {

  // Storing RegEx to validate URL
  const checkURL = /(^(https?):\/\/)?((www|\w+)\.)?\w+\.(com?|net|org).*/;

  // This test validates against the allFeeds variable in app.js.
  describe('RSS Feeds', function () {

    // Validates that the allFeeds variable:
    // -exists
    // -is not empty
    it('are defined', function () {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    // Loops through each feed, validating that 'url':
    // -exists
    // -is not empty
    // -is a valid URL
    it('have valid URLs', function () {
      allFeeds.forEach(function (feed) {
        expect(feed.url).toBeDefined();
        expect(feed.url.length).not.toBe(0);
        expect(feed.url).toMatch(checkURL);
      });
    });

    // Loops through each feed, validating that 'name':
    // -exists
    // -is not empty
    it('have valid names', function () {
      allFeeds.forEach(function (feed) {
        expect(feed.name).toBeDefined();
        expect(feed.name.length).not.toBe(0);
      });
    });
  });

  // This test validates menu button (hamburger icon) functionality
  describe('The menu', function () {

    // Variables to make the tests cleaner
    let body = document.body;
    let icon = $('.menu-icon-link');

    // Menu should be hidden on page load
    it('is hidden by default', function () {
      expect(body.className).toContain('menu-hidden');
    });

    // Menu should toggle visibility each time it is clicked
    it('visibility toggles when menu icon is clicked', function () {
      icon.click();
      expect(body.className).not.toContain('menu-hidden');
      icon.click();
      expect(body.className).toContain('menu-hidden');
    });

  });

  // This test checks to make sure each feed actually has content
  describe('Initial entries', function () {

    // Handle the asynchronicity of loadFeed
    beforeEach(function (done) {
      loadFeed(0, done);
    });

    /* Validates that each feed has at least one entry (i.e. a link) */
    it('have at least one (1) feed entry', function () {
      // let entryLength = $('.feed .entry-link').length;
      expect($('.feed .entry-link').length).toBeTruthy();
    });


    /* Not required, but would be nice to have
        Needs fixed */
    // Loops through each feed entry, checking that they have valid URLs
    it('have valid URLs', function() {
        allFeeds.forEach(function (feed) {
            expect(feed.url).toMatch(checkURL);
        });
        expect($('.feed .entry-link')).toContain(checkURL);
    });
  });

  describe('New feed selection', function () {

    // Preparing variables to hold feed contents for comparison
    let loadOne;
    let loadTwo;
    let feed = $('.feed');

    // Save innerHTML of feed to a variable each time it is loaded
    beforeEach(function (done) {
      loadFeed(0, function () {
        loadOne = feed.html();
        loadFeed(1, function () {
          loadTwo = feed.html();
          done();
        });
      });
    });

    // Compare the html of each feed to ensure the content actually changed
    it('updates (page content changes) when a new feed is loaded', function (done) {
      expect(loadOne).not.toEqual(loadTwo);
      done();
    });
  });
}());