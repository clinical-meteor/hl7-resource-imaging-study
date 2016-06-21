describe('clinical:hl7-resources-imaging-study', function () {
  var server = meteor();
  var client = browser(server);

  it('ImagingStudies should exist on the client', function () {
    return client.execute(function () {
      expect(ImagingStudies).to.exist;
    });
  });

  it('ImagingStudies should exist on the server', function () {
    return server.execute(function () {
      expect(ImagingStudies).to.exist;
    });
  });

});
